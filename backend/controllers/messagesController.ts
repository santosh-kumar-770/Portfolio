import type { Request, Response } from 'express';
import { Resend } from 'resend';

// Server-side validation helper
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

// Sanitize input to prevent HTML injection in emails
function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function postMessage(req: Request, res: Response): Promise<void> {
  const { name, email, message, honeypot } = req.body || {};

  // 1. Honeypot spam trap
  if (honeypot && String(honeypot).trim() !== '') {
    res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
    });
    return;
  }

  // 2. Validate input
  const validation = validateInput(name, email, message);
  if (!validation.valid) {
    res.status(400).json({
      success: false,
      error: validation.error,
    });
    return;
  }

  // 3. Environment configuration checks
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
  if (!receiverEmail || receiverEmail.trim() === '') {
    console.error('[Configuration Error]: CONTACT_RECEIVER_EMAIL environment variable is not defined.');
    res.status(500).json({
      success: false,
      error: 'Unable to send message at this time. Please try again later.',
    });
    return;
  }

  const sanitizedName = sanitize(String(name).trim());
  const sanitizedEmail = String(email).trim().toLowerCase();
  const sanitizedMessage = sanitize(String(message).trim());
  const submissionDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  // 4. Send email notification via Resend API
  if (resendApiKey) {
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
              Sent securely via Itte Santosh Kumar Portfolio
            </div>
          </div>
        `,
      });

      if (emailResponse.error) {
        console.error('[Email Notification Error]:', emailResponse.error);
        res.status(500).json({
          success: false,
          error: 'Unable to send message at this time. Please try again later.',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Message sent successfully.',
      });
      return;
    } catch (error) {
      console.error('[Email Dispatch Exception]:', error);
      res.status(500).json({
        success: false,
        error: 'Unable to send message at this time. Please try again later.',
      });
      return;
    }
  }

  // 5. Local development fallback when RESEND_API_KEY is not configured
  console.log('----------------------------------------------------');
  console.log('[LOCAL DEV CONTACT SUBMISSION RECEIVED]');
  console.log(`Target Receiver: [Configured via CONTACT_RECEIVER_EMAIL]`);
  console.log(`From: ${sanitizedName} <${sanitizedEmail}>`);
  console.log(`Date: ${submissionDate} IST`);
  console.log(`Message:\n${String(message).trim()}`);
  console.log('----------------------------------------------------');

  res.status(200).json({
    success: true,
    message: 'Message sent successfully.',
  });
}
