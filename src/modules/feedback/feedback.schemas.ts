import { z } from 'zod';
import { FeedbackType, FeedbackStatus } from '@prisma/client';

export const createFeedbackSchema = z.object({
  type: z.nativeEnum(FeedbackType),
  message: z.string().min(1, 'Message is required').max(1000),
  questionId: z.string().optional(),
});

export const updateFeedbackSchema = z.object({
  status: z.nativeEnum(FeedbackStatus).optional(),
  isPublic: z.boolean().optional(),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
export type UpdateFeedbackInput = z.infer<typeof updateFeedbackSchema>;
