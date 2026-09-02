import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SESSION_SECRET || process.env.JWT_SECRET || 'santosh_portfolio_dev_secret_key_2026_secure';
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'santoshkumaritte7@gmail.com').toLowerCase().trim();

// Default fallback admin password hash for initial local development if not set in .env
// Defaults to 'Santosh@2026'
const DEFAULT_INITIAL_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Santosh@2026', 10);
const CONFIGURED_HASH = process.env.ADMIN_PASSWORD_HASH || DEFAULT_INITIAL_HASH;

export function verifyAdminPassword(plainPassword: string): boolean {
  if (!plainPassword) return false;
  return bcrypt.compareSync(plainPassword, CONFIGURED_HASH);
}

export function generateAdminToken(email: string): string {
  return jwt.sign(
    {
      role: 'admin',
      email: email.toLowerCase().trim(),
      iss: 'santosh-portfolio-backend',
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyAdminToken(token: string): { valid: boolean; email?: string } {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded && decoded.role === 'admin') {
      return { valid: true, email: decoded.email };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}
