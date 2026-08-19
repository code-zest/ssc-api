import { Request, Response, NextFunction } from 'express';
import { redis, isRedisReady } from '../config/redis';
import { logger } from '../config/logger';

/**
 * Express middleware to cache responses in Redis.
 * @param ttl Time to live in seconds
 */
export const cacheMiddleware = (ttl: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Bypass if Redis is not ready
    if (!isRedisReady()) {
      return next();
    }

    const role = (req as any).user?.role || 'GUEST';
    const targetExams = (req as any).user?.targetExam?.sort().join(",") || "ALL";
    const key = `cache:${role}:${targetExams}:${req.originalUrl || req.url}`;

    try {
      const cachedResponse = await redis.get(key);

      if (cachedResponse) {
        res.setHeader('X-Cache', 'HIT');
        return res.json(JSON.parse(cachedResponse));
      }

      // Overwrite res.json to capture and cache the output
      const originalJson = res.json.bind(res);
      res.json = (body: any): Response => {
        // Only cache successful responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          redis.setex(key, ttl, JSON.stringify(body)).catch((err) => {
            logger.error(`Error caching response for ${key}: ${err.message}`);
          });
        }
        res.setHeader('X-Cache', 'MISS');
        return originalJson(body);
      };

      next();
    } catch (error) {
      logger.error(`Cache middleware error: ${(error as Error).message}`);
      next(); // Proceed without cache
    }
  };
};
