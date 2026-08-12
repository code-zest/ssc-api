import { redis, isRedisReady } from '../config/redis';
import { logger } from '../config/logger';

/**
 * Invalidates cache keys matching a pattern.
 * E.g., clearCache('categories*') will delete all keys starting with 'cache:/api/v1/categories'
 * @param pattern The URL path pattern to invalidate
 */
export const clearCache = async (pattern: string): Promise<void> => {
  if (!isRedisReady()) return;

  try {
    const keys = await redis.keys(`cache:*/api/v1/${pattern}`);
    if (keys.length > 0) {
      await redis.del(...keys);
      logger.info(`Invalidated ${keys.length} cache keys for pattern: ${pattern}`);
    }
  } catch (error) {
    logger.error(`Error clearing cache for pattern ${pattern}: ${(error as Error).message}`);
  }
};
