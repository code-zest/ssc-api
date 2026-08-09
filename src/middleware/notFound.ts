import { Request, Response } from 'express';

/**
 * 404 fallback — must be registered before errorHandler, after all routes.
 */
export function notFound(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}
