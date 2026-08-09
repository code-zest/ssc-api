import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import { signAccessToken } from '../../utils/jwt';
import { sendOtpEmail } from '../../services/email.service';
import { logger } from '../../config/logger';
import type {
  RegisterInput,
  VerifyEmailInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from './auth.schemas';

const BCRYPT_ROUNDS = 12;
const OTP_EXPIRY_MINUTES = 10;
const REFRESH_TOKEN_EXPIRY_DAYS_PERSISTENT = 30;
const REFRESH_TOKEN_EXPIRY_DAYS_SESSION = 1;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateOtp(): string {
  return crypto.randomInt(100_000, 999_999).toString();
}

function otpExpiresAt(): Date {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
}

function refreshTokenExpiresAt(rememberMe = false): Date {
  const days = rememberMe ? REFRESH_TOKEN_EXPIRY_DAYS_PERSISTENT : REFRESH_TOKEN_EXPIRY_DAYS_SESSION;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

// ─── Register ─────────────────────────────────────────────────────────────────

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw ApiError.conflict('An account with this email already exists');
  }

  let referredById: string | undefined;
  if (input.referralCode) {
    const referrer = await prisma.user.findUnique({ where: { referralCode: input.referralCode } });
    if (referrer) {
      referredById = referrer.id;
    }
  }

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
  const otp = generateOtp();
  const referralCode = `CZ-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
      otpCode: otp,
      otpExpiresAt: otpExpiresAt(),
      referralCode,
      ...(referredById ? { referredById } : {}),
    },
    select: { id: true, name: true, email: true, role: true, isEmailVerified: true },
  });

  await sendOtpEmail(
    user.email,
    user.name,
    otp,
    'Verify your CodeZest account',
    'verify-email',
  );

  logger.info(`New user registered: ${user.email} (Referred by: ${referredById || 'none'})`);
  return user;
}

// ─── Verify Email ─────────────────────────────────────────────────────────────

export async function verifyEmail(input: VerifyEmailInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user || user.otpCode !== input.otp) {
    throw ApiError.badRequest('Invalid OTP');
  }
  if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
    throw ApiError.badRequest('OTP has expired. Please request a new one.');
  }
  if (user.isEmailVerified) {
    throw ApiError.badRequest('Email is already verified');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { isEmailVerified: true, otpCode: null, otpExpiresAt: null },
  });

  logger.info(`Email verified: ${user.email}`);
  return { message: 'Email verified successfully. You can now log in.' };
}

// ─── Login ────────────────────────────────────────────────────────────────────

export async function login(input: LoginInput, deviceInfo?: string) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  // Constant-time check prevents email enumeration
  const dummyHash = '$2a$12$dummyhashthatisfakeandwillnotmatch';
  const isValid = user
    ? await bcrypt.compare(input.password, user.passwordHash)
    : await bcrypt.compare(input.password, dummyHash);

  if (!user || !isValid) {
    throw ApiError.unauthorized('Invalid email or password');
  }
  if (!user.isEmailVerified) {
    throw ApiError.forbidden('Please verify your email before logging in');
  }
  if (!user.isActive) {
    throw ApiError.forbidden('Your account has been deactivated. Contact support.');
  }

  const accessToken = signAccessToken({ userId: user.id, role: user.role });
  const rawRefreshToken = crypto.randomBytes(64).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash,
      deviceInfo,
      expiresAt: refreshTokenExpiresAt(input.rememberMe),
    },
  });

  logger.info(`Login: ${user.email}`);

  return {
    accessToken,
    refreshToken: rawRefreshToken, // sent as httpOnly cookie by controller
    rememberMe: input.rememberMe,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      targetExam: user.targetExam,
      subscriptionTier: user.subscriptionTier,
      subscriptionExpiresAt: user.subscriptionExpiresAt,
    },
  };
}

// ─── Refresh ──────────────────────────────────────────────────────────────────

export async function refresh(rawRefreshToken: string) {
  if (!rawRefreshToken) {
    throw ApiError.unauthorized('No refresh token provided');
  }

  const tokenHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!stored || stored.expiresAt < new Date()) {
    throw ApiError.unauthorized('Refresh token is invalid or expired. Please log in again.');
  }
  if (!stored.user.isActive) {
    throw ApiError.forbidden('Account is deactivated');
  }

  const accessToken = signAccessToken({
    userId: stored.user.id,
    role: stored.user.role,
  });

  // Refresh Token Rotation: Delete the old token
  await prisma.refreshToken.delete({ where: { id: stored.id } });

  const newRawRefreshToken = crypto.randomBytes(64).toString('hex');
  const newTokenHash = crypto.createHash('sha256').update(newRawRefreshToken).digest('hex');
  
  // Determine if it was persistent by checking if original expiration > 2 days
  const wasPersistent = stored.expiresAt.getTime() - stored.createdAt.getTime() > 2 * 24 * 60 * 60 * 1000;
  const newExpiresAt = refreshTokenExpiresAt(wasPersistent);

  await prisma.refreshToken.create({
    data: {
      userId: stored.user.id,
      tokenHash: newTokenHash,
      deviceInfo: stored.deviceInfo,
      expiresAt: newExpiresAt,
    },
  });

  return { accessToken, refreshToken: newRawRefreshToken, rememberMe: wasPersistent };
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logout(rawRefreshToken: string) {
  if (!rawRefreshToken) return;

  const tokenHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
  await prisma.refreshToken.deleteMany({ where: { tokenHash } });
}

// ─── Forgot Password ──────────────────────────────────────────────────────────

export async function forgotPassword(input: ForgotPasswordInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  // Always return the same message — prevents email enumeration
  if (!user || !user.isActive) {
    return { message: 'If this email exists, a reset code has been sent.' };
  }

  const otp = generateOtp();

  await prisma.user.update({
    where: { id: user.id },
    data: { otpCode: otp, otpExpiresAt: otpExpiresAt() },
  });

  await sendOtpEmail(
    user.email,
    user.name,
    otp,
    'Reset your CodeZest password',
    'reset-password',
  );

  logger.info(`Password reset OTP sent: ${user.email}`);
  return { message: 'If this email exists, a reset code has been sent.' };
}

// ─── Reset Password ───────────────────────────────────────────────────────────

export async function resetPassword(input: ResetPasswordInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user || user.otpCode !== input.otp) {
    throw ApiError.badRequest('Invalid or expired reset code');
  }
  if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
    throw ApiError.badRequest('Reset code has expired. Please request a new one.');
  }

  const passwordHash = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { passwordHash, otpCode: null, otpExpiresAt: null },
    }),
    // Invalidate all existing sessions after password reset
    prisma.refreshToken.deleteMany({ where: { userId: user.id } }),
  ]);

  logger.info(`Password reset: ${user.email}`);
  return { message: 'Password reset successfully. Please log in with your new password.' };
}
