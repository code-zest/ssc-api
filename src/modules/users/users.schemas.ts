import { z } from 'zod';
import { Role, ExamType, DailyStudyTime, Gender, EducationLevel } from '@prisma/client';


export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).optional(),
  avatarUrl: z.string().url('Invalid URL format').optional().nullable(),
  phone: z.string().max(15).optional(),
  targetExam: z.array(z.nativeEnum(ExamType)).optional(),
  examYear: z.number().int().min(2025).max(2035).optional(),
  city: z.string().max(100).optional(),
  age: z.number().int().min(15).max(45).optional(),
  gender: z.nativeEnum(Gender).optional(),
  educationLevel: z.nativeEnum(EducationLevel).optional(),
  occupation: z.string().max(100).optional(),
  incomeRange: z.string().max(50).optional(),
  dailyStudyTime: z.nativeEnum(DailyStudyTime).optional(),
});

export const onboardingSchema = z.object({
  targetExam: z.array(z.nativeEnum(ExamType)).min(1, "Select at least one exam"),
  examYear: z.number().int().min(2025).max(2035),
  occupation: z.string().min(1).max(100),
  hasAttemptedBefore: z.boolean(),
  dailyStudyTime: z.nativeEnum(DailyStudyTime),
  // Optional demographics (Step 4)
  age: z.number().int().min(15).max(45).optional(),
  gender: z.nativeEnum(Gender).optional(),
  educationLevel: z.nativeEnum(EducationLevel).optional(),
  city: z.string().max(100).optional(),
  incomeRange: z.string().max(50).optional(),
});


export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const updateRoleSchema = z.object({
  role: z.nativeEnum(Role),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;

