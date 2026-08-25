import { Request, Response, NextFunction } from 'express';
import * as translationsService from './translations.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { getPagination } from '../../utils/pagination';
import type { Language } from '@prisma/client';

export async function getTranslations(req: Request, res: Response, next: NextFunction) {
  try {
    const pagination = getPagination(req);
    const locale = req.query.locale as Language | undefined;
    
    let isVerified: boolean | undefined = undefined;
    if (req.query.isVerified === 'true') isVerified = true;
    if (req.query.isVerified === 'false') isVerified = false;

    const type = req.query.type as 'question' | 'lesson' ?? 'question';

    if (type === 'question') {
      const result = await translationsService.getQuestionTranslations(locale, isVerified, pagination.page, pagination.limit);
      ApiResponse.paginated(res, result.data, result.meta, 'Translations fetched successfully');
    } else {
      const result = await translationsService.getLessonTranslations(locale, isVerified, pagination.page, pagination.limit);
      ApiResponse.paginated(res, result.data, result.meta, 'Translations fetched successfully');
    }
  } catch (error) {
    next(error);
  }
}

export async function updateQuestionTranslation(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const data = req.body;
    // req.user should be available from requireAuth middleware
    const userId = (req as any).user?.id || 'admin';

    const result = await translationsService.updateQuestionTranslation(id, data, userId);
    ApiResponse.success(res, result, 'Question translation updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function updateLessonTranslation(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const data = req.body;
    const userId = (req as any).user?.id || 'admin';

    const result = await translationsService.updateLessonTranslation(id, data, userId);
    ApiResponse.success(res, result, 'Lesson translation updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function getTranslationStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await translationsService.getTranslationStats();
    ApiResponse.success(res, stats, 'Translation stats fetched successfully');
  } catch (error) {
    next(error);
  }
}
