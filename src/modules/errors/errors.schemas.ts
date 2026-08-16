import { z } from 'zod';

export const createErrorReportSchema = z.object({
  body: z.object({
    fingerprint:    z.string().min(1).max(64),
    severity:       z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('MEDIUM'),
    message:        z.string().min(1).max(2000),
    stack:          z.string().max(10000).optional(),
    componentStack: z.string().max(5000).optional(),
    errorBoundary:  z.string().max(50).optional(),
    url:            z.string().url().max(2000),
    routePath:      z.string().max(500).optional(),
    routeParams:    z.record(z.string(), z.unknown()).optional(),
    userAgent:      z.string().max(500).optional(),
    appVersion:     z.string().max(50).optional(),
  }),
});

export const listErrorReportsSchema = z.object({
  query: z.object({
    status:       z.enum(['UNRESOLVED', 'IN_PROGRESS', 'RESOLVED', 'IGNORED', 'REGRESSED']).optional(),
    severity:     z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    routePath:    z.string().optional(),
    assignedToId: z.string().optional(),
    from:         z.string().datetime().optional(),
    to:           z.string().datetime().optional(),
    sortBy:       z.enum(['lastSeenAt', 'affectedUserCount', 'occurrenceCount', 'firstSeenAt']).default('lastSeenAt'),
    page:         z.coerce.number().int().positive().default(1),
    limit:        z.coerce.number().int().positive().max(100).default(30),
  }),
});

export const updateErrorReportSchema = z.object({
  body: z.object({
    status:       z.enum(['UNRESOLVED', 'IN_PROGRESS', 'RESOLVED', 'IGNORED', 'REGRESSED']).optional(),
    severity:     z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    notes:        z.string().max(2000).optional(),
    assignedToId: z.string().nullable().optional(),
  }),
});

export type CreateErrorReportInput = z.infer<typeof createErrorReportSchema>['body'];
export type ListErrorReportsQuery  = z.infer<typeof listErrorReportsSchema>['query'];
export type UpdateErrorReportInput = z.infer<typeof updateErrorReportSchema>['body'];
