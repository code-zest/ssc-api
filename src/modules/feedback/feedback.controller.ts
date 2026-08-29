import type { Request, Response } from 'express';
import { z } from 'zod';
import * as feedbackService from './feedback.service';
import { createFeedbackSchema, updateFeedbackSchema } from './feedback.schemas';
import { catchAsync } from '../../utils/catchAsync';
import { getPagination, buildPaginationMeta } from '../../utils/pagination';

export const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const input = createFeedbackSchema.parse(req.body);
  const userId = req.user!.userId;
  const feedback = await feedbackService.createFeedback(userId, input);
  res.status(201).json({ success: true, data: feedback });
});

export const getFeedback = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    type: req.query.type as string,
    status: req.query.status as string,
  };
  const pagination = getPagination(req);
  const { total, feedback } = await feedbackService.getAllFeedback(filters, pagination);
  res.json({ 
    success: true, 
    data: feedback, 
    meta: buildPaginationMeta(total, pagination) 
  });
});

export const updateFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const input = updateFeedbackSchema.parse(req.body);
  const feedback = await feedbackService.updateFeedback(id, input);
  res.json({ success: true, data: feedback });
});

export const getPublicTestimonials = catchAsync(async (req: Request, res: Response) => {
  const testimonials = await feedbackService.getPublicTestimonials();
  res.json({ success: true, data: testimonials });
});
