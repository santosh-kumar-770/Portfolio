import type { IncomingMessage, ServerResponse } from 'node:http';
import { Resend } from 'resend';

type ExtendedRequest = IncomingMessage & {
  body?: any;
  method?: string;
  headers: Record<string, string | string[] | undefined>;
};

type ExtendedResponse = ServerResponse & {
  status?: (statusCode: number) => ExtendedResponse;
  json?: (data: unknown) => void;
};

// In-memory rate limiting map for serverless execution context
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

// Helper to parse JSON body from incoming stream if not pre-parsed
async function parseBody(req: ExtendedRequest): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return new Promise((resolve) => {
    let rawData = '';
    req.on('data', (chunk) => {
      rawData += chunk;
      if (rawData.length > 100 * 1024) {
        // 100KB limit
        req.destroy();
        resolve({});
      }
    });
    req.on('end', () => {
      try {
        resolve(rawData ? JSON.parse(rawData) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

// Input validation
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

// HTML character escaping
function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // Helper for JSON response
  const sendJson = (statusCode: number, data: unknown) => {
    if (typeof res.status === 'function') {
      res.status(statusCode);
      if (typeof res.json === 'function') {
        res.json(data);
        return;
      }
    }
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(405, { success: false, error: 'Method Not Allowed' });
  }

  // 1. Rate Limiting Check
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = typeof forwardedFor === 'string'
    ? forwardedFor.split(',')[0].trim()
    : req.socket?.remoteAddress || 'unknown-ip';

  if (isRateLimited(ip)) {
    return sendJson(429, {
      success: false,
      error: 'Too many requests. Please wait a few minutes before trying again.',
    });
  }

  // 2. Parse Body
  const body = await parseBody(req);
  const { name, email, message, honeypot } = body || {};

  // 3. Honeypot check (silently drop bot submissions)
  if (honeypot && String(honeypot).trim() !== '') {
    return sendJson(200, {
      success: true,
      message: 'Message sent successfully.',
    });
  }

  // 4. Validate Input
  const validation = validateInput(name, email, message);
  if (!validation.valid) {
    return sendJson(400, {
      success: false,
      error: validation.error,
    });
  }

  // 5. Environment Variables Check (Strictly Required)
  const resendApiKey = process.env.RESEND_API_KEY;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  if (!resendApiKey || !receiverEmail) {
    console.error('[Configuration Error]: Missing required RESEND_API_KEY or CONTACT_RECEIVER_EMAIL environment variables.');
    return sendJson(500, {
      success: false,
      error: 'Unable to send message at this time. Please try again later.',
    });
  }

  const sanitizedName = sanitize(String(name).trim());
  const sanitizedEmail = String(email).trim().toLowerCase();
  const sanitizedMessage = sanitize(String(message).trim());
  const submissionDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  // 6. Send Email via Resend
  try {
    const resend = new Resend(resendApiKey);

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: receiverEmail,
      replyTo: sanitizedEmail,
      subject: `New Portfolio Message from ${sanitizedName}`,
      text: `You received a new contact message from your portfolio:\n\nName: ${sanitizedName}\nEmail: ${sanitizedEmail}\nDate: ${submissionDate} IST\n\nMessage:\n${String(message).trim()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #06b6d4; padding-bottom: 12px;">New Portfolio Inquiry</h2>
          <div style="margin-bottom: 16px;">
            <p style="margin: 4px 0; color: #64748b; font-size: 13px;">SENDER NAME</p>
            <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1e293b;">${sanitizedName}</p>
            
            <p style="margin: 4px 0; color: #64748b; font-size: 13px;">EMAIL ADDRESS</p>
            <p style="margin: 0 0 12px 0; font-size: 16px; color: #0284c7;"><a href="mailto:${sanitizedEmail}" style="color: #0284c7; text-decoration: none;">${sanitizedEmail}</a></p>
            
            <p style="margin: 4px 0; color: #64748b; font-size: 13px;">RECEIVED AT</p>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #475569;">${submissionDate} (IST)</p>
          </div>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #06b6d4; padding: 16px; border-radius: 6px; margin-top: 16px;">
            <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #475569; text-transform: uppercase;">Message Content:</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
          
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center;">
            Sent securely via Santosh Kumar Itte Portfolio
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error('[Resend API Error]:', emailResponse.error);
      return sendJson(500, {
        success: false,
        error: 'Unable to send message at this time. Please try again later.',
      });
    }

    return sendJson(200, {
      success: true,
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error('[Email Dispatch Exception]:', error);
    return sendJson(500, {
      success: false,
      error: 'Unable to send message at this time. Please try again later.',
    });
  }
}
