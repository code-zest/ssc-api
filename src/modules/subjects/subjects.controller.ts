import { Request, Response, NextFunction } from 'express';
import * as subjectsService from './subjects.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { clearCache } from '../../utils/cache';

export async function getAllSubjects(req: Request, res: Response, next: NextFunction) {
  try {
    // Treat as admin if user is SUPER_ADMIN or ADMIN
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    
    // Support filtering by ?exams=SSC_CGL,SSC_MTS, or fallback to user's targetExam array
    let exams: any[] = [];
    if (req.query.exams) {
      exams = (req.query.exams as string).split(',').map(e => e.trim());
    } else if (req.user && (req.user as any).targetExam) {
      exams = (req.user as any).targetExam;
    }

    const subjects = await subjectsService.getAllSubjects(isAdmin, exams);
    ApiResponse.success(res, subjects);
  } catch (error) {
    next(error);
  }
}

export async function getSubjectBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    
    let exams: any[] = [];
    if (req.query.exams) {
      exams = (req.query.exams as string).split(',').map(e => e.trim());
    } else if (req.user && (req.user as any).targetExam) {
      exams = (req.user as any).targetExam;
    }

    const subject = await subjectsService.getSubjectBySlug(req.params.slug as string, isAdmin, exams);
    ApiResponse.success(res, subject);
  } catch (error) {
    next(error);
  }
}

export async function getSubjectChapters(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const examType = req.query.examType as any;
    const chapters = await subjectsService.getSubjectChapters(req.params.id as string, isAdmin, examType);
    ApiResponse.success(res, chapters);
  } catch (error) {
    next(error);
  }
}

export async function createSubject(req: Request, res: Response, next: NextFunction) {
  try {
    const subject = await subjectsService.createSubject(req.body);
    await clearCache('subjects*');
    ApiResponse.created(res, subject);
  } catch (error) {
    next(error);
  }
}

export async function updateSubject(req: Request, res: Response, next: NextFunction) {
  try {
    const subject = await subjectsService.updateSubject(req.params.id as string, req.body);
    await clearCache('subjects*');
    ApiResponse.success(res, subject, 'Subject updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteSubject(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await subjectsService.deleteSubject(req.params.id as string);
    await clearCache('subjects*');
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}
