import type { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // Max 5 submissions per 10 minutes per IP

const ipRecords = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRecords.entries()) {
    if (now > record.resetTime) {
      ipRecords.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export function contactRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();

  const record = ipRecords.get(ip);

  if (!record || now > record.resetTime) {
    ipRecords.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    res.status(429).json({
      error: 'Too many submissions from this IP. Please wait a few minutes before trying again.',
    });
    return;
  }

  record.count += 1;
  next();
}
