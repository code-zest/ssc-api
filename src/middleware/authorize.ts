import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { ApiError } from '../utils/ApiError';

/**
 * Role-based authorization guard. Always use after authenticate().
 *
 * Usage:
 *   router.post('/subjects', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), handler)
 */
export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Not authenticated'));
    }

    if (!roles.includes(req.user.role as Role)) {
      return next(
        ApiError.forbidden(
          `This action requires one of the following roles: ${roles.join(', ')}`,
        ),
      );
    }

    next();
  };
}
