import Redis from 'ioredis';
import { logger } from './logger';
import dotenv from 'dotenv';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Initialize Redis client
export const redis = new Redis(REDIS_URL, {
  // Graceful degradation: do not crash if Redis is unavailable
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

redis.on('connect', () => {
  logger.info('Connected to Redis server');
});

redis.on('error', (err) => {
  logger.warn(`Redis connection error: ${err.message}. Caching and distributed rate limiting will be bypassed.`);
});

export const isRedisReady = () => redis.status === 'ready';
