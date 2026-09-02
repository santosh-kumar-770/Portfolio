import type { Request, Response } from 'express';
import { ADMIN_EMAIL, verifyAdminPassword, generateAdminToken, verifyAdminToken } from '../auth/auth';

const COOKIE_NAME = 'admin_token';
const IS_PROD = process.env.NODE_ENV === 'production';

export function login(req: Request, res: Response): void {
  const { email, password } = req.body || {};

  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email and password are required.' });
    return;
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  if (normalizedEmail !== ADMIN_EMAIL) {
    res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
    return;
  }

  const isValidPassword = verifyAdminPassword(String(password));
  if (!isValidPassword) {
    res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
    return;
  }

  const token = generateAdminToken(normalizedEmail);

  // Set secure HTTP-only cookie
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });

  res.json({
    success: true,
    message: 'Authenticated successfully.',
    admin: { email: normalizedEmail },
    token, // Also provided for Authorization header fallback
  });
}

export function logout(req: Request, res: Response): void {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax',
    path: '/',
  });

  res.json({ success: true, message: 'Logged out successfully.' });
}

export function checkSession(req: Request, res: Response): void {
  let token = req.cookies?.[COOKIE_NAME];

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    res.status(401).json({ authenticated: false });
    return;
  }

  const verification = verifyAdminToken(token);
  if (!verification.valid) {
    res.status(401).json({ authenticated: false });
    return;
  }

  res.json({
    authenticated: true,
    email: verification.email,
  });
}
