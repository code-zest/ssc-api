import { Request, Response, NextFunction } from 'express';
import * as attemptsService from './attempts.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { parseLocale } from '../../utils/locale';

export async function startAttempt(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = req.user?.userId || null;
    const guestSessionId = req.headers['x-guest-session-id'] as string || null;
    const locale = parseLocale(req.query.locale as string);
    
    if (!studentId && !guestSessionId) {
      throw ApiError.unauthorized('Must provide either auth token or x-guest-session-id header');
    }

    const attemptBase = await attemptsService.startAttempt(studentId, guestSessionId, req.body);
    const attempt = await attemptsService.getAttemptDetails(attemptBase.id, studentId, guestSessionId, locale);
    ApiResponse.created(res, attempt, 'Attempt started');
  } catch (error) {
    next(error);
  }
}
export async function generatePYQAttempt(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = req.user?.userId || null;
    const guestSessionId = req.headers['x-guest-session-id'] as string || null;
    const locale = parseLocale(req.query.locale as string);
    
    if (!studentId && !guestSessionId) {
      throw ApiError.unauthorized('Must provide either auth token or x-guest-session-id header');
    }

    const attemptBase = await attemptsService.generatePYQAttempt(studentId, guestSessionId, req.body);
    const attempt = await attemptsService.getAttemptDetails(attemptBase.id, studentId, guestSessionId, locale);
    ApiResponse.created(res, attempt, 'PYQ Attempt generated');
  } catch (error) {
    next(error);
  }
}

export async function generateDynamicAttempt(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = req.user?.userId || null;
    const locale = parseLocale(req.query.locale as string);
    
    if (!studentId) {
      throw ApiError.unauthorized('Must be logged in to generate a dynamic attempt');
    }

    const attemptBase = await attemptsService.generateDynamicAttempt(studentId, req.body);
    const attempt = await attemptsService.getAttemptDetails(attemptBase.id, studentId, null, locale);
    ApiResponse.created(res, attempt, 'Dynamic Attempt generated');
  } catch (error) {
    next(error);
  }
}


export async function syncAnswers(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = req.user?.userId || null;
    const guestSessionId = req.headers['x-guest-session-id'] as string || null;
    const result = await attemptsService.syncAnswers(req.params.id as string, studentId, guestSessionId, req.body);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function submitAttempt(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = req.user?.userId || null;
    const guestSessionId = req.headers['x-guest-session-id'] as string || null;
    const result = await attemptsService.submitAttempt(req.params.id as string, studentId, guestSessionId);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function getAttemptDetails(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = req.user?.userId || null;
    const guestSessionId = req.headers['x-guest-session-id'] as string || null;
    const locale = parseLocale(req.query.locale as string);
    const attempt = await attemptsService.getAttemptDetails(req.params.id as string, studentId, guestSessionId, locale);
    ApiResponse.success(res, attempt);
  } catch (error) {
    next(error);
  }
}

export async function claimAttempt(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = req.user!.userId;
    const result = await attemptsService.claimAttempt(req.params.id as string, studentId);
    ApiResponse.success(res, result, 'Attempt claimed successfully');
  } catch (error) {
    next(error);
  }
}

export async function startDailyQuizAttempt(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = req.user?.userId || null;
    const guestSessionId = req.headers['x-guest-session-id'] as string || null;
    const locale = parseLocale(req.query.locale as string);
    
    if (!studentId && !guestSessionId) {
      throw ApiError.unauthorized('Must provide either auth token or x-guest-session-id header');
    }
    
    const { dailyQuizId } = req.body;
    if (!dailyQuizId) throw ApiError.badRequest('Missing dailyQuizId');

    const attemptBase = await attemptsService.startDailyQuizAttempt(studentId, guestSessionId, dailyQuizId);
    const attempt = await attemptsService.getAttemptDetails(attemptBase.id, studentId, guestSessionId, locale);
    ApiResponse.created(res, attempt, 'Daily quiz started');
  } catch (error) {
    next(error);
  }
}
