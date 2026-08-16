import { Request, Response, NextFunction } from 'express';

// In-memory stats
export const latencyStats = {
  requestCount: 0,
  totalLatencyNs: BigInt(0),
  recentLatencies: [] as number[], // Keep last 100 requests in ms
};

export const latencyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const latencyNs = end - start;
    const latencyMs = Number(latencyNs) / 1e6;

    latencyStats.requestCount++;
    latencyStats.totalLatencyNs += latencyNs;
    
    latencyStats.recentLatencies.push(latencyMs);
    if (latencyStats.recentLatencies.length > 100) {
      latencyStats.recentLatencies.shift();
    }
  });

  next();
};

export const getLatencyMetrics = () => {
  const avgLatencyNs = latencyStats.requestCount === 0 
    ? BigInt(0) 
    : latencyStats.totalLatencyNs / BigInt(latencyStats.requestCount);
  
  const avgLatencyMs = Number(avgLatencyNs) / 1e6;
  
  const recentAvgMs = latencyStats.recentLatencies.length === 0
    ? 0
    : latencyStats.recentLatencies.reduce((a, b) => a + b, 0) / latencyStats.recentLatencies.length;

  return {
    totalRequests: latencyStats.requestCount,
    averageLatencyMs: Number(avgLatencyMs.toFixed(2)),
    recentAverageLatencyMs: Number(recentAvgMs.toFixed(2)),
  };
};
