import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as authController from './auth.controller';
import { validate } from '../../middleware/validate';
import { authenticate } from '../../middleware/authenticate';
import {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './auth.schemas';

const router = Router();

// ─── Strict rate limiter for auth endpoints ───────────────────────────────────
// Separate, tighter limit than the global 100/15min
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 auth attempts per 15 min per IP
  message: {
    success: false,
    error: 'Too many attempts. Please wait 15 minutes before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Even stricter for OTP endpoints (prevent brute force)
const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5, // 5 OTP attempts per hour per IP
  message: {
    success: false,
    error: 'Too many OTP attempts. Please wait 1 hour.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Routes ───────────────────────────────────────────────────────────────────

router.post('/register',        authLimiter, validate(registerSchema),        authController.register);
router.post('/verify-email',    otpLimiter,  validate(verifyEmailSchema),      authController.verifyEmail);
router.post('/login',           authLimiter, validate(loginSchema),            authController.login);
router.post('/refresh',                      /* cookie auth — no body schema */ authController.refresh);
router.post('/logout',          authenticate,                                  authController.logout);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema),   authController.forgotPassword);
router.post('/reset-password',  otpLimiter,  validate(resetPasswordSchema),    authController.resetPassword);

export default router;
