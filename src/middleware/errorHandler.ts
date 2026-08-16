import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';
import { logger } from '../config/logger';
import { prisma } from '../config/prisma';
import { createFingerprint } from '../utils/fingerprint';


/**
 * Centralised error handler — must be registered LAST in the Express middleware chain.
 * Handles:
 *  - ApiError (operational, known errors)
 *  - Prisma known request errors (unique constraint, not found)
 *  - Unhandled / unexpected errors (logged + auto-saved to error_reports table)
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  // ── Known operational errors (ApiError) ────────────────────────────────
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
  }

  // ── Prisma constraint violations ────────────────────────────────────────
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: 'A record with this value already exists',
        field: (err.meta?.target as string[])?.join(', '),
      });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Record not found',
      });
    }

    if (err.code === 'P2003') {
      const isDelete = req.method === 'DELETE';
      return res.status(isDelete ? 409 : 400).json({
        success: false,
        error: isDelete
          ? 'Cannot delete this record because it is actively used by other data. Please deactivate it instead.'
          : 'Related record does not exist or is invalid.',
        field: err.meta?.field_name,
      });
    }
  }

  // ── Prisma validation errors (schema-level) ─────────────────────────────
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      error: 'Invalid data provided',
    });
  }

  // ── Unexpected / unhandled errors ───────────────────────────────────────
  logger.error('Unhandled server error', { message: err.message, stack: err.stack });

  // Auto-persist to error_reports (fire-and-forget — never blocks the response)
  const userId = req.user?.userId ?? null;
  const routePath = req.path;
  const fingerprint = createFingerprint(err.message, err.stack, routePath);

  prisma.errorReport
    .upsert({
      where: { fingerprint },
      create: {
        fingerprint,
        severity: 'CRITICAL',
        status: 'UNRESOLVED',
        message: err.message,
        stack: err.stack,
        errorBoundary: 'server',
        url: `${req.method} ${req.originalUrl}`,
        routePath,
        userAgent: req.headers['user-agent'],
        appVersion: process.env.APP_VERSION,
        lastAffectedUserId: userId ?? undefined,
        affectedUserCount: userId ? 1 : 0,
        firstSeenAt: new Date(),
        lastSeenAt: new Date(),
      },
      update: {
        occurrenceCount: { increment: 1 },
        lastSeenAt: new Date(),
        lastAffectedUserId: userId ?? undefined,
      },
    })
    .catch((dbErr: unknown) => {
      // Log but never throw — a DB failure must not cause an infinite error loop
      logger.error('Failed to persist server error report', { error: dbErr });
    });

  return res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(env.NODE_ENV === 'development' ? { stack: err.stack, message: err.message } : {}),
  });
}
