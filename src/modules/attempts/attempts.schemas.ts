import { z } from 'zod';
import { AttemptStatus } from '@prisma/client';

import { AttemptType } from '@prisma/client';

export const startAttemptSchema = z.object({
  attemptType: z.nativeEnum(AttemptType),
  practiceSetId: z.string().optional(),
  mockTestId: z.string().optional(),
}).refine(data => {
  if (data.attemptType === 'PRACTICE' && !data.practiceSetId) return false;
  if (data.attemptType === 'MOCK' && !data.mockTestId) return false;
  return true;
}, {
  message: 'Must provide practiceSetId for PRACTICE or mockTestId for MOCK attempts',
});

export const attemptResponseSchema = z.object({
  questionId: z.string().min(1),
  selectedOption: z.string().nullable().optional(), // "A", "B", etc. or null for skipped
  timeTakenSeconds: z.number().int().nonnegative().optional(),
});

export const syncAnswersSchema = z.object({
  responses: z.array(attemptResponseSchema),
});

export const claimAttemptSchema = z.object({});

export const generatePYQAttemptSchema = z.object({
  subjectId: z.string().optional(),
  chapterId: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(20),
});

export const generateDynamicAttemptSchema = z.object({
  subjectId: z.string().optional(),
  chapterId: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(10),
});

export type StartAttemptInput = z.infer<typeof startAttemptSchema>;
export type SyncAnswersInput = z.infer<typeof syncAnswersSchema>;
export type ClaimAttemptInput = z.infer<typeof claimAttemptSchema>;
export type GeneratePYQAttemptInput = z.infer<typeof generatePYQAttemptSchema>;
export type GenerateDynamicAttemptInput = z.infer<typeof generateDynamicAttemptSchema>;
