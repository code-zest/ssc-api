import { Request, Response, NextFunction } from 'express';
import * as practiceSetsService from './practiceSets.service';
import { ApiResponse } from '../../utils/ApiResponse';

export async function getPracticeSets(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const subjectId = typeof req.query.subjectId === 'string' ? req.query.subjectId : undefined;
    const chapterId = typeof req.query.chapterId === 'string' ? req.query.chapterId : undefined;
    const lessonId = typeof req.query.lessonId === 'string' ? req.query.lessonId : undefined;

    const practiceSets = await practiceSetsService.getPracticeSets(isAdmin, subjectId, chapterId, lessonId);
    ApiResponse.success(res, practiceSets);
  } catch (error) {
    next(error);
  }
}

export async function getPracticeSetById(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const practiceSet = await practiceSetsService.getPracticeSetById(req.params.id as string, isAdmin);
    ApiResponse.success(res, practiceSet);
  } catch (error) {
    next(error);
  }
}

export async function createPracticeSet(req: Request, res: Response, next: NextFunction) {
  try {
    const practiceSet = await practiceSetsService.createPracticeSet(req.body);
    ApiResponse.created(res, practiceSet);
  } catch (error) {
    next(error);
  }
}

export async function updatePracticeSet(req: Request, res: Response, next: NextFunction) {
  try {
    const practiceSet = await practiceSetsService.updatePracticeSet(req.params.id as string, req.body);
    ApiResponse.success(res, practiceSet, 'Practice set updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deletePracticeSet(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await practiceSetsService.deletePracticeSet(req.params.id as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function assignQuestionsToSet(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await practiceSetsService.assignQuestionsToSet(req.params.id as string, req.body);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function removeQuestionFromSet(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await practiceSetsService.removeQuestionFromSet(req.params.id as string, req.params.questionId as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}
