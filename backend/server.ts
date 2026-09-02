import 'dotenv/config';
import express from 'express';
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

const app = express();
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

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), database: 'sqlite' });
});

// 1. PUBLIC CONTACT FORM ENDPOINT
app.post('/api/messages', contactRateLimiter, postMessage);

// 2. ADMIN AUTHENTICATION ENDPOINTS
app.post('/api/auth/login', login);
app.post('/api/auth/logout', logout);
app.get('/api/auth/me', checkSession);

// 3. PROTECTED ADMIN INBOX ENDPOINTS (Requires valid session)
app.get('/api/admin/messages', requireAdminAuth, getAdminMessages);
app.patch('/api/admin/messages/:id', requireAdminAuth, patchAdminMessage);
app.delete('/api/admin/messages/:id', requireAdminAuth, deleteAdminMessage);
app.get('/api/admin/stats', requireAdminAuth, getAdminStats);

// 404 handler for unmatched API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server listening on all network interfaces (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Backend] Node.js + SQLite API Server running on port ${PORT} (0.0.0.0)`);
  console.log(`[Backend] Database initialized at backend/database/portfolio.db`);
});

export default app;
