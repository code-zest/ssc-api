import { Request, Response, NextFunction } from 'express';
import * as mockTestsService from './mockTests.service';
import { ApiResponse } from '../../utils/ApiResponse';

export async function getMockTests(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const examType = req.query.examType as string | undefined;
    const tests = await mockTestsService.getMockTests(isAdmin, examType);
    ApiResponse.success(res, tests);
  } catch (error) {
    next(error);
  }
}

export async function getMockTestById(req: Request, res: Response, next: NextFunction) {
  try {
    const isAdmin = !!req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role);
    const test = await mockTestsService.getMockTestById(req.params.id as string, isAdmin);
    ApiResponse.success(res, test);
  } catch (error) {
    next(error);
  }
}

export async function createMockTest(req: Request, res: Response, next: NextFunction) {
  try {
    const test = await mockTestsService.createMockTest(req.body);
    ApiResponse.created(res, test);
  } catch (error) {
    next(error);
  }
}

export async function updateMockTest(req: Request, res: Response, next: NextFunction) {
  try {
    const test = await mockTestsService.updateMockTest(req.params.id as string, req.body);
    ApiResponse.success(res, test, 'Mock test updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteMockTest(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await mockTestsService.deleteMockTest(req.params.id as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function createSection(req: Request, res: Response, next: NextFunction) {
  try {
    const section = await mockTestsService.createSection(req.params.testId as string, req.body);
    ApiResponse.created(res, section);
  } catch (error) {
    next(error);
  }
}

export async function updateSection(req: Request, res: Response, next: NextFunction) {
  try {
    const section = await mockTestsService.updateSection(req.params.sectionId as string, req.body);
    ApiResponse.success(res, section, 'Section updated successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteSection(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await mockTestsService.deleteSection(req.params.sectionId as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function assignQuestionsToSection(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await mockTestsService.assignQuestionsToSection(req.params.sectionId as string, req.body);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

export async function removeQuestionFromSection(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await mockTestsService.removeQuestionFromSection(req.params.sectionId as string, req.params.questionId as string);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}
