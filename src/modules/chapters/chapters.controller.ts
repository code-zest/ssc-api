import { Request, Response, NextFunction } from 'express';
import * as chaptersService from './chapters.service';
import { ApiResponse } from '../../utils/ApiResponse';

export async function getChapterById(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const userId = req.user?.userId;
    const chapter = await chaptersService.getChapterById(req.params.id as string, isAdmin, userId);
    ApiResponse.success(res, chapter);
  } catch (error) {
    next(error);
  }
}

export async function getChapterLessons(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const userId = req.user?.userId;
    const lessons = await chaptersService.getChapterLessons(req.params.id as string, isAdmin, userId);
    ApiResponse.success(res, lessons);
  } catch (error) {
    next(error);
  }
}

export async function createChapter(req: Request, res: Response, next: NextFunction) {
  try {
    const chapter = await chaptersService.createChapter(req.body);
    ApiResponse.created(res, chapter);
  } catch (error) {
    next(error);
  }
}

export async function updateChapter(req: Request, res: Response, next: NextFunction) {
  try {
    const chapter = await chaptersService.updateChapter(req.params.id as string, req.body);
    ApiResponse.success(res, chapter, 'Chapter updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteChapter(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await chaptersService.deleteChapter(req.params.id as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function reorderChapters(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await chaptersService.reorderChapters(req.body.updates);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function getChapterProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await chaptersService.getChapterProduct(req.params.id as string);
    ApiResponse.success(res, product);
  } catch (error) {
    next(error);
  }
}
