import { Request, Response, NextFunction } from 'express';
import * as subjectsService from './subjects.service';
import { ApiResponse } from '../../utils/ApiResponse';

export async function getAllSubjects(req: Request, res: Response, next: NextFunction) {
  try {
    // Treat as admin if user is SUPER_ADMIN or ADMIN
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const subjects = await subjectsService.getAllSubjects(isAdmin);
    ApiResponse.success(res, subjects);
  } catch (error) {
    next(error);
  }
}

export async function getSubjectBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const subject = await subjectsService.getSubjectBySlug(req.params.slug as string, isAdmin);
    ApiResponse.success(res, subject);
  } catch (error) {
    next(error);
  }
}

export async function getSubjectChapters(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const chapters = await subjectsService.getSubjectChapters(req.params.id as string, isAdmin);
    ApiResponse.success(res, chapters);
  } catch (error) {
    next(error);
  }
}

export async function createSubject(req: Request, res: Response, next: NextFunction) {
  try {
    const subject = await subjectsService.createSubject(req.body);
    ApiResponse.created(res, subject);
  } catch (error) {
    next(error);
  }
}

export async function updateSubject(req: Request, res: Response, next: NextFunction) {
  try {
    const subject = await subjectsService.updateSubject(req.params.id as string, req.body);
    ApiResponse.success(res, subject, 'Subject updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteSubject(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await subjectsService.deleteSubject(req.params.id as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}
