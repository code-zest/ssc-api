import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { verifyAccessToken } from '../utils/jwt';

// Extend Express Request type globally so req.user is available everywhere
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

/**
 * Extracts and verifies the Bearer token from the Authorization header.
 * Attaches { userId, role } to req.user on success.
 * Calls next(ApiError.unauthorized()) on failure.
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('No access token provided'));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(ApiError.unauthorized('Malformed authorization header'));
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (error: unknown) {
    const message =
      error instanceof Error && error.name === 'TokenExpiredError'
        ? 'Access token has expired — please refresh'
        : 'Invalid access token';
    next(ApiError.unauthorized(message));
  }
}

/**
 * Same as authenticate, but does not throw an error if no token is provided.
 * Use for public routes where you want to know IF they are logged in, but don't require it.
 */
export function authenticateOptional(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next();
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { userId: payload.userId, role: payload.role };
  } catch {
    // Fail silently — they are just treated as unauthenticated
  }
  next();
}

