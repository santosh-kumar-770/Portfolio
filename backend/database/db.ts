import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

export interface MessageRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: number; // 0 or 1 in SQLite
  status: string;
}

// Ensure database directory exists
const dbDir = path.resolve(process.cwd(), 'backend', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'portfolio.db');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode for high performance and concurrency
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA synchronous = NORMAL;');

// Initialize tables and indexes
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL,
    read INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'received'
  );

  CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);
`);

// Prepared statement caches
const stmtInsert = db.prepare(`
  INSERT INTO messages (id, name, email, message, created_at, read, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const stmtSelectAll = db.prepare(`
  SELECT id, name, email, message, created_at, read, status
  FROM messages
  ORDER BY created_at DESC
`);

const stmtSelectById = db.prepare(`
  SELECT id, name, email, message, created_at, read, status
  FROM messages
  WHERE id = ?
`);

const stmtUpdateRead = db.prepare(`
  UPDATE messages
  SET read = ?
  WHERE id = ?
`);

const stmtDelete = db.prepare(`
  DELETE FROM messages
  WHERE id = ?
`);

export const databaseOperations = {
  insertMessage(msg: MessageRecord): void {
    stmtInsert.run(msg.id, msg.name, msg.email, msg.message, msg.created_at, msg.read, msg.status);
  },

  getAllMessages(search?: string, filter?: 'ALL' | 'UNREAD' | 'READ'): MessageRecord[] {
    let query = 'SELECT id, name, email, message, created_at, read, status FROM messages WHERE 1=1';
    const params: (string | number)[] = [];

    if (filter === 'UNREAD') {
      query += ' AND read = 0';
    } else if (filter === 'READ') {
      query += ' AND read = 1';
    }

    if (search && search.trim() !== '') {
      query += ' AND (name LIKE ? OR email LIKE ? OR message LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params) as unknown as MessageRecord[];
  },

  getMessageById(id: string): MessageRecord | null {
    const result = stmtSelectById.get(id);
    return (result as unknown as MessageRecord) || null;
  },

  updateMessageRead(id: string, read: boolean): boolean {
    const changes = stmtUpdateRead.run(read ? 1 : 0, id);
    return Boolean(changes);
  },

  deleteMessage(id: string): boolean {
    const changes = stmtDelete.run(id);
    return Boolean(changes);
  },

  getStats(): { total: number; unread: number; today: number; thisWeek: number } {
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM messages');
    const unreadStmt = db.prepare('SELECT COUNT(*) as count FROM messages WHERE read = 0');
    
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const todayStmt = db.prepare('SELECT COUNT(*) as count FROM messages WHERE created_at >= ?');
    const weekStmt = db.prepare('SELECT COUNT(*) as count FROM messages WHERE created_at >= ?');

    const total = (totalStmt.get() as any)?.count || 0;
    const unread = (unreadStmt.get() as any)?.count || 0;
    const today = (todayStmt.get(startOfToday) as any)?.count || 0;
    const thisWeek = (weekStmt.get(sevenDaysAgo) as any)?.count || 0;

    return { total, unread, today, thisWeek };
  }
};
