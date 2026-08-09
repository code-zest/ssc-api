import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';

type ValidationTarget = 'body' | 'query' | 'params';

/**
 * Zod validation middleware.
 * Defaults to validating req.body. Pass 'query' or 'params' for URL-level validation.
 * Mutates req[target] with the parsed (type-coerced) data on success.
 *
 * Usage:
 *   router.post('/subjects', validate(createSubjectSchema), handler)
 *   router.get('/subjects', validate(listSubjectsSchema, 'query'), handler)
 */
export function validate(
  schema: ZodSchema,
  target: ValidationTarget = 'body',
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const errors = (result.error as ZodError).flatten().fieldErrors;
      return next(ApiError.badRequest('Validation failed', errors));
    }

    // Replace req[target] with parsed data (type coercion applied)
    req[target] = result.data;
    next();
  };
}
