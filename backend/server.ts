import 'dotenv/config';
import express, { Router } from 'express';
import cors from 'cors';
import { contactRateLimiter } from './middleware/rateLimiter';
import { postMessage } from './controllers/messagesController';

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

// Router definition for /api endpoints
const apiRouter = Router();

// Health Check
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'email-notifications',
    environment: process.env.VERCEL ? 'vercel-serverless' : 'standalone-node',
  });
});

// Contact Form Endpoint (Receives submission -> Dispatches Email Notification)
apiRouter.post('/messages', contactRateLimiter, postMessage);

// Mount API router
app.use('/api', apiRouter);

// Start server in standalone Node.js environment
if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Backend] Email Notification API Server running on port ${PORT} (0.0.0.0)`);
  });
}

export default app;
