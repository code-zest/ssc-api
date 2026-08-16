import { Request, Response } from 'express';
import { HealthService } from './health.service';
import { logger } from '../../config/logger';

const healthService = new HealthService();

export const getHealthMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = await healthService.getMetrics();
    res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    logger.error('Failed to get health metrics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve system health metrics',
    });
  }
};
