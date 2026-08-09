import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../config/logger';

// ─── Transporter ──────────────────────────────────────────────────────────────
// In development with no SMTP config, falls back to Ethereal (catches all mail)
async function createTransporter() {
  if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
  }

  // Dev fallback — logs email content instead of sending
  logger.warn('SMTP not configured — emails will be logged to console only');
  return null;
}

// ─── Send OTP ─────────────────────────────────────────────────────────────────
export async function sendOtpEmail(
  to: string,
  name: string,
  otp: string,
  subject: string,
  purpose: 'verify-email' | 'reset-password',
) {
  const transporter = await createTransporter();

  const purposeText =
    purpose === 'verify-email'
      ? 'verify your email address'
      : 'reset your password';

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Inter, sans-serif; background: #f8fafc; margin: 0; padding: 32px;">
      <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; border: 1px solid #e2e8f0;">
        <h1 style="color: #1e293b; font-size: 22px; margin: 0 0 8px;">CodeZest 🎯</h1>
        <p style="color: #64748b; margin: 0 0 32px;">SSC Exam Preparation Platform</p>

        <p style="color: #334155;">Hi <strong>${name}</strong>,</p>
        <p style="color: #334155;">Use the code below to ${purposeText}. This code expires in <strong>10 minutes</strong>.</p>

        <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
          <p style="color: #64748b; font-size: 12px; margin: 0 0 8px; letter-spacing: 0.05em; text-transform: uppercase;">Your OTP</p>
          <p style="color: #0f172a; font-size: 36px; font-weight: 700; letter-spacing: 0.2em; margin: 0; font-family: monospace;">${otp}</p>
        </div>

        <p style="color: #94a3b8; font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #cbd5e1; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} CodeZest Academy. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    // Dev fallback — log OTP so development can proceed without SMTP
    logger.info(`[DEV EMAIL] To: ${to} | Subject: ${subject} | OTP: ${otp}`);
    return;
  }

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  logger.info(`Email sent: ${subject} → ${to}`);
}
