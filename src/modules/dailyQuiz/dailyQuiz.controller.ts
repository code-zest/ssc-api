import { Request, Response, NextFunction } from 'express';
import * as dailyQuizService from './dailyQuiz.service';
import { parseLocale } from '../../utils/locale';

export async function getTodayQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const locale = parseLocale(req.query.locale as string);
    const quiz = await dailyQuizService.getTodayQuiz(locale);
    res.json({ success: true, data: quiz });
  } catch (error) {
    next(error);
  }
}
