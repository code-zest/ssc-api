import { Request, Response, NextFunction } from 'express';
import * as analyticsService from './analytics.service';
import { ApiResponse } from '../../utils/ApiResponse';

export async function getStudentDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const dashboard = await analyticsService.getStudentDashboard(req.user!.userId);
    ApiResponse.success(res, dashboard);
  } catch (error) {
    next(error);
  }
}

export async function getMockTestLeaderboard(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const leaderboard = await analyticsService.getMockTestLeaderboard(req.params.mockTestId as string, limit);
    ApiResponse.success(res, leaderboard);
  } catch (error) {
    next(error);
  }
}

export async function getGlobalLeaderboard(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const leaderboard = await analyticsService.getGlobalLeaderboard(limit);
    ApiResponse.success(res, leaderboard);
  } catch (error) {
    next(error);
  }
}

export async function getAdminDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const dashboard = await analyticsService.getAdminDashboard();
    ApiResponse.success(res, dashboard);
  } catch (error) {
    next(error);
  }
}

export async function getWeakTopics(req: Request, res: Response, next: NextFunction) {
  try {
    const topics = await analyticsService.getWeakTopics(req.user!.userId);
    ApiResponse.success(res, topics);
  } catch (error) {
    next(error);
  }
}

export async function getDailyAgenda(req: Request, res: Response, next: NextFunction) {
  try {
    const agenda = await analyticsService.getDailyAgenda(req.user!.userId);
    ApiResponse.success(res, agenda);
  } catch (error) {
    next(error);
  }
}
