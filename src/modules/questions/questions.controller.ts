import { Request, Response, NextFunction } from 'express';
import * as questionsService from './questions.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { getPagination, buildPaginationMeta } from '../../utils/pagination';

export async function getQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const pagination = getPagination(req);
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const subjectId = typeof req.query.subjectId === 'string' ? req.query.subjectId : undefined;
    const chapterId = typeof req.query.chapterId === 'string' ? req.query.chapterId : undefined;

    const { questions, total } = await questionsService.getQuestions(
      pagination.page,
      pagination.limit,
      subjectId,
      chapterId,
      search
    );
    
    const meta = buildPaginationMeta(total, pagination);
    ApiResponse.paginated(res, questions, meta);
  } catch (error) {
    next(error);
  }
}

export async function getQuestionById(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await questionsService.getQuestionById(req.params.id as string);
    ApiResponse.success(res, question);
  } catch (error) {
    next(error);
  }
}

export async function createQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await questionsService.createQuestion(req.body);
    ApiResponse.created(res, question);
  } catch (error) {
    next(error);
  }
}

export async function bulkImportQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await questionsService.bulkImportQuestions(req.body);
    ApiResponse.created(res, result, `Successfully imported ${result.count} questions`);
  } catch (error) {
    next(error);
  }
}

export async function updateQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await questionsService.updateQuestion(req.params.id as string, req.body);
    ApiResponse.success(res, question, 'Question updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await questionsService.deleteQuestion(req.params.id as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}
