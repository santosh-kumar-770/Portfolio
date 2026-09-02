import type { Request, Response, NextFunction } from 'express';
import { verifyAdminToken } from '../auth/auth';

export interface AuthenticatedRequest extends Request {
  adminEmail?: string;
}

export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // Extract token from HTTP-only cookie first, then fallback to Authorization header
  let token = req.cookies?.admin_token;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication required.' });
    return;
  }

  const verification = verifyAdminToken(token);
  if (!verification.valid) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired session token.' });
    return;
  }

  req.adminEmail = verification.email;
  next();
}
