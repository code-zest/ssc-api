import morgan from 'morgan';
import { morganStream } from '../config/logger';

/**
 * HTTP request logger middleware.
 *
 * Uses morgan's battle-tested request parsing but routes all output
 * through the winston logger (morganStream) so every log line — both
 * HTTP traffic and application logs — ends up in one unified stream.
 *
 * Format: METHOD /path STATUS size - responseTime ms
 * Example: GET /api/v1/subjects 200 1.2 kb - 12.340 ms
 *
 * Skipped entirely in the test environment to keep test output clean.
 */
export const httpLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: morganStream,
    skip: () => process.env.NODE_ENV === 'test',
  },
);
