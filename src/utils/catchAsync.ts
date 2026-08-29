import { Request, Response, NextFunction } from 'express';

/**
 * Wraps an async Express controller function to automatically catch rejected promises
 * and pass the error to the global error handler via next().
 */
export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
