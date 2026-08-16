import { Request, Response, NextFunction } from 'express';
import { GamificationService } from './gamification.service';
import { ApiResponse } from '../../utils/ApiResponse';

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.userId;
    const profile = await GamificationService.getGamificationProfile(userId);
    
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    ApiResponse.success(res, profile);
  } catch (error) {
    next(error);
  }
}
