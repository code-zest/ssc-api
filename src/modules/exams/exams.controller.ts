import { Request, Response, NextFunction } from 'express';
import * as examsService from './exams.service';
import { ApiResponse } from '../../utils/ApiResponse';

export async function getAllExams(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const name = req.query.name as string | undefined;
    const exams = await examsService.getAllExams(isAdmin, name);
    ApiResponse.success(res, exams);
  } catch (error) {
    next(error);
  }
}

export async function getExamById(req: Request, res: Response, next: NextFunction) {
  try {
    const exam = await examsService.getExamById(req.params.id as string);
    ApiResponse.success(res, exam);
  } catch (error) {
    next(error);
  }
}

export async function createExam(req: Request, res: Response, next: NextFunction) {
  try {
    const exam = await examsService.createExam(req.body);
    ApiResponse.created(res, exam);
  } catch (error) {
    next(error);
  }
}

export async function updateExam(req: Request, res: Response, next: NextFunction) {
  try {
    const exam = await examsService.updateExam(req.params.id as string, req.body);
    ApiResponse.success(res, exam, 'Exam updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteExam(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await examsService.deleteExam(req.params.id as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function getExamSyllabus(req: Request, res: Response, next: NextFunction) {
  try {
    const syllabus = await examsService.getExamSyllabus(req.params.id as string);
    ApiResponse.success(res, syllabus);
  } catch (error) {
    next(error);
  }
}

export async function addSyllabusNode(req: Request, res: Response, next: NextFunction) {
  try {
    const node = await examsService.addSyllabusNode(req.params.id as string, req.body);
    ApiResponse.created(res, node);
  } catch (error) {
    next(error);
  }
}

export async function deleteSyllabusNode(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await examsService.deleteSyllabusNode(req.params.nodeId as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}
