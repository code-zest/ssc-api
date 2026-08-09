import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').toLowerCase(),
  password: passwordSchema,
  referralCode: z.string().optional(),
});

export const verifyEmailSchema = z.object({
  email: z.string().email().toLowerCase(),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email().toLowerCase(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email().toLowerCase(),
  otp: z.string().length(6, 'OTP must be 6 digits'),
  newPassword: passwordSchema,
});

export type RegisterInput      = z.infer<typeof registerSchema>;
export type VerifyEmailInput   = z.infer<typeof verifyEmailSchema>;
export type LoginInput         = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
