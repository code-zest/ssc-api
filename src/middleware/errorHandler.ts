import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';
import { logger } from '../config/logger';

/**
 * Centralised error handler — must be registered LAST in the Express middleware chain.
 * Handles:
 *  - ApiError (operational, known errors)
 *  - Prisma known request errors (unique constraint, not found)
 *  - Unhandled / unexpected errors (logged, generic 500 returned)
 */
export function errorHandler(
  err: Error,
  _req: Request,
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
      // Unique constraint violation
      return res.status(409).json({
        success: false,
        error: 'A record with this value already exists',
        field: (err.meta?.target as string[])?.join(', '),
      });
    }

    if (err.code === 'P2025') {
      // Record not found (e.g. update/delete on non-existent record)
      return res.status(404).json({
        success: false,
        error: 'Record not found',
      });
    }

    if (err.code === 'P2003') {
      // Foreign key constraint violation (can happen on insert/update or delete/restrict)
      const isDelete = _req.method === 'DELETE';
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
  logger.error('Unhandled error', { message: err.message, stack: err.stack });

  return res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(env.NODE_ENV === 'development' ? { stack: err.stack, message: err.message } : {}),
  });
}
