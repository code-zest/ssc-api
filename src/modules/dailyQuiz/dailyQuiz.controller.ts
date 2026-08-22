import { Request, Response, NextFunction } from 'express';
import * as dailyQuizService from './dailyQuiz.service';

export async function getTodayQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const quiz = await dailyQuizService.getTodayQuiz();
    res.json({ status: 'success', data: quiz });
  } catch (error) {
    next(error);
  }
}
