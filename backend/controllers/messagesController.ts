import type { Request, Response } from 'express';
import { databaseOperations, type MessageRecord } from '../database/db';
import crypto from 'node:crypto';

// Validation helper
function validateInput(name?: string, email?: string, message?: string): { valid: boolean; error?: string } {
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { valid: false, error: 'Please provide a valid name (at least 2 characters).' };
  }
  if (name.trim().length > 150) {
    return { valid: false, error: 'Name must not exceed 150 characters.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }
  if (email.trim().length > 255) {
    return { valid: false, error: 'Email must not exceed 255 characters.' };
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return { valid: false, error: 'Message must be at least 5 characters long.' };
  }
  if (message.trim().length > 5000) {
    return { valid: false, error: 'Message must not exceed 5000 characters.' };
  }

  return { valid: true };
}

// 1. PUBLIC: Post a new message
export function postMessage(req: Request, res: Response): void {
  const { name, email, message, honeypot } = req.body || {};

  // Honeypot anti-spam check
  if (honeypot && String(honeypot).trim() !== '') {
    // Pretend success silently to trap bots
    res.status(200).json({
      success: true,
      message: "Message sent successfully. I'll get back to you soon.",
    });
    return;
  }

  const validation = validateInput(name, email, message);
  if (!validation.valid) {
    res.status(400).json({
      success: false,
      error: validation.error,
    });
    return;
  }

  try {
    const newRecord: MessageRecord = {
      id: crypto.randomUUID ? crypto.randomUUID() : `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      created_at: new Date().toISOString(),
      read: 0,
      status: 'received',
    };

    databaseOperations.insertMessage(newRecord);

    res.status(201).json({
      success: true,
      message: "Message sent successfully. I'll get back to you soon.",
    });
  } catch (error) {
    console.error('Error inserting message into SQLite:', error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again.',
    });
  }
}

// 2. ADMIN ONLY: Get messages list
export function getAdminMessages(req: Request, res: Response): void {
  try {
    const search = req.query.search as string | undefined;
    const filter = req.query.filter as 'ALL' | 'UNREAD' | 'READ' | undefined;

    const messages = databaseOperations.getAllMessages(search, filter);
    
    // Map read 0/1 to boolean for frontend clarity
    const formatted = messages.map((m) => ({
      ...m,
      read: Boolean(m.read),
    }));

    res.json({
      success: true,
      messages: formatted,
    });
  } catch (error) {
    console.error('Error fetching admin messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve messages.',
    });
  }
}

// 3. ADMIN ONLY: Update message read status
export function patchAdminMessage(req: Request, res: Response): void {
  const { id } = req.params;
  const { read } = req.body || {};

  if (typeof read !== 'boolean') {
    res.status(400).json({ error: "Missing or invalid 'read' boolean property." });
    return;
  }

  try {
    const updated = databaseOperations.updateMessageRead(id, read);
    if (!updated) {
      res.status(404).json({ error: 'Message not found.' });
      return;
    }

    res.json({ success: true, message: 'Message updated.' });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ error: 'Failed to update message.' });
  }
}

// 4. ADMIN ONLY: Delete a message
export function deleteAdminMessage(req: Request, res: Response): void {
  const { id } = req.params;

  try {
    const deleted = databaseOperations.deleteMessage(id);
    if (!deleted) {
      res.status(404).json({ error: 'Message not found.' });
      return;
    }

    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message.' });
  }
}

// 5. ADMIN ONLY: Get metrics stats
export function getAdminStats(req: Request, res: Response): void {
  try {
    const stats = databaseOperations.getStats();
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to retrieve stats.' });
  }
}
