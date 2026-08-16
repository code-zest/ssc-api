import os from 'os';
import { prisma } from '../../config/prisma';
import { redis, isRedisReady } from '../../config/redis';
import { getLatencyMetrics } from '../../middleware/latency';

export class HealthService {
  public async getMetrics() {
    // OS Metrics
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const cpus = os.cpus();
    const loadAvg = os.loadavg();

    // Process Metrics
    const processMem = process.memoryUsage();
    
    // Database check
    let dbStatus = 'disconnected';
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch (error) {
      dbStatus = 'error';
    }

    // Redis check
    const redisStatus = isRedisReady() ? 'connected' : 'disconnected';

    // Latency
    const latency = getLatencyMetrics();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
      system: {
        platform: os.platform(),
        arch: os.arch(),
        cpuCount: cpus.length,
        loadAverage: loadAvg,
        totalMemoryBytes: totalMem,
        freeMemoryBytes: freeMem,
        usedMemoryBytes: usedMem,
        memoryUsagePercent: ((usedMem / totalMem) * 100).toFixed(2),
      },
      process: {
        rssBytes: processMem.rss,
        heapTotalBytes: processMem.heapTotal,
        heapUsedBytes: processMem.heapUsed,
        externalBytes: processMem.external,
      },
      services: {
        database: dbStatus,
        redis: redisStatus,
      },
      latency,
    };
  }
}
