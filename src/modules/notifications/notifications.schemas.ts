import { z } from 'zod';

export const createNotificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  organization: z.string().min(1, 'Organization is required'),
  vacancies: z.number().int().min(0, 'Vacancies must be a positive integer'),
  applicationStartDate: z.string().datetime(),
  applicationEndDate: z.string().datetime(),
  notificationLink: z.string().url('Must be a valid URL'),
  logoUrl: z.string().url('Must be a valid URL').optional().nullable(),
  isActive: z.boolean().optional(),
});

export const updateNotificationSchema = createNotificationSchema.partial();
