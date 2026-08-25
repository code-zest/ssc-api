import { Request, Response, NextFunction } from 'express';
import * as lessonsService from './lessons.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { parseLocale } from '../../utils/locale';

export async function getLessonsByChapter(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const userId = req.user?.userId;
    // Service looks up studyPersona from DB using userId for PART_TIME_ASPIRANT sort
    const lessons = await lessonsService.getLessonsByChapter(
      req.params.chapterId as string,
      isAdmin,
      userId,
    );
    ApiResponse.success(res, lessons);
  } catch (error) {
    next(error);
  }
}

export async function getLessonBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const userId = req.user?.userId;
    const subjectSlug = req.params.subjectSlug as string;
    const chapterSlug = req.params.chapterSlug as string;
    const lessonSlug = req.params.lessonSlug as string;
    const locale = parseLocale(req.query.locale as string);
    const lesson = await lessonsService.getLessonBySlug(subjectSlug, chapterSlug, lessonSlug, isAdmin, userId, locale);
    ApiResponse.success(res, lesson);
  } catch (error) {
    next(error);
  }
}

export async function createLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const lesson = await lessonsService.createLesson(req.body);
    ApiResponse.created(res, lesson);
  } catch (error) {
    next(error);
  }
}

export async function updateLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const lesson = await lessonsService.updateLesson(req.params.id as string, req.body);
    ApiResponse.success(res, lesson, 'Lesson updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await lessonsService.deleteLesson(req.params.id as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function updateLessonProgress(req: Request, res: Response, next: NextFunction) {
  try {
    const progress = await lessonsService.updateLessonProgress(req.params.id as string, req.user!.userId, req.body);
    ApiResponse.success(res, progress);
  } catch (error) {
    next(error);
  }
}

export async function reorderLessons(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await lessonsService.reorderLessons(req.body.updates);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}
