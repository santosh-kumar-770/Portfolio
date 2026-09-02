import 'dotenv/config';
import express, { Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { requireAdminAuth } from './middleware/authMiddleware';
import { contactRateLimiter } from './middleware/rateLimiter';
import {
  postMessage,
  getAdminMessages,
  patchAdminMessage,
  deleteAdminMessage,
  getAdminStats,
} from './controllers/messagesController';
import { login, logout, checkSession } from './controllers/authController';

export const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Security & Parsing Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow localhost dev servers, local IP addresses, or same origin
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '100kb' })); // Max payload protection
app.use(cookieParser());

// Router definition for all /api endpoints
const apiRouter = Router();

// Health Check
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'sqlite',
    environment: process.env.VERCEL ? 'vercel-serverless' : 'standalone-node',
  });
});

// 1. PUBLIC CONTACT FORM ENDPOINT
apiRouter.post('/messages', contactRateLimiter, postMessage);

// 2. ADMIN AUTHENTICATION ENDPOINTS
apiRouter.post('/auth/login', login);
apiRouter.post('/auth/logout', logout);
apiRouter.get('/auth/me', checkSession);

// 3. PROTECTED ADMIN INBOX ENDPOINTS (Requires valid session)
apiRouter.get('/admin/messages', requireAdminAuth, getAdminMessages);
apiRouter.patch('/admin/messages/:id', requireAdminAuth, patchAdminMessage);
apiRouter.delete('/admin/messages/:id', requireAdminAuth, deleteAdminMessage);
apiRouter.get('/admin/stats', requireAdminAuth, getAdminStats);

// Mount API router
app.use('/api', apiRouter);

// Start server in standalone Node.js environment
if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Backend] Node.js + SQLite API Server running on port ${PORT} (0.0.0.0)`);
    console.log(`[Backend] Database initialized`);
  });
}

export default app;
