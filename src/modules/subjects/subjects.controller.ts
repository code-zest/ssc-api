import { Request, Response, NextFunction } from 'express';
import * as subjectsService from './subjects.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { clearCache } from '../../utils/cache';

export async function getAllSubjects(req: Request, res: Response, next: NextFunction) {
  try {
    // Treat as admin if user is SUPER_ADMIN or ADMIN
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    
    // Support filtering by ?exams=SSC_CGL,SSC_MTS, or fallback to user's targetExam array
    let exams: string[] = [];
    if (req.query.exams) {
      exams = (req.query.exams as string).split(',').map(e => e.trim());
    } else if (req.user?.userId) {
      const user = await import('../../config/prisma').then(m => m.prisma.user.findUnique({ where: { id: req.user!.userId }, select: { targetExam: true } }));
      if (user?.targetExam) {
        exams = user.targetExam;
      }
    }

    const subjects = await subjectsService.getAllSubjects(isAdmin, exams as import('@prisma/client').ExamType[]);
    ApiResponse.success(res, subjects);
  } catch (error) {
    next(error);
  }
}

export async function getSubjectBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    
    let exams: string[] = [];
    if (req.query.exams) {
      exams = (req.query.exams as string).split(',').map(e => e.trim());
    } else if (req.user?.userId) {
      const user = await import('../../config/prisma').then(m => m.prisma.user.findUnique({ where: { id: req.user!.userId }, select: { targetExam: true } }));
      if (user?.targetExam) {
        exams = user.targetExam;
      }
    }

    const subject = await subjectsService.getSubjectBySlug(req.params.slug as string, isAdmin, exams as import('@prisma/client').ExamType[]);
    ApiResponse.success(res, subject);
  } catch (error) {
    next(error);
  }
}

export async function getSubjectChapters(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const examType = req.query.examType as import('@prisma/client').ExamType | undefined;
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
