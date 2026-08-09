import type { Request, Response } from 'express';
import { z } from 'zod';
import * as feedbackService from './feedback.service';
import { createFeedbackSchema, updateFeedbackSchema } from './feedback.schemas';

export async function createFeedback(req: Request, res: Response) {
  const input = createFeedbackSchema.parse(req.body);
  const userId = req.user!.userId;
  const feedback = await feedbackService.createFeedback(userId, input);
  res.status(201).json({ status: 'success', data: feedback });
}

export async function getFeedback(req: Request, res: Response) {
  const filters = {
    type: req.query.type as string,
    status: req.query.status as string,
  };
  const feedback = await feedbackService.getAllFeedback(filters);
  res.json({ status: 'success', data: feedback });
}

export async function updateFeedback(req: Request, res: Response) {
  const id = req.params.id as string;
  const input = updateFeedbackSchema.parse(req.body);
  const feedback = await feedbackService.updateFeedback(id, input);
  res.json({ status: 'success', data: feedback });
}

export async function getPublicTestimonials(req: Request, res: Response) {
  const testimonials = await feedbackService.getPublicTestimonials();
  res.json({ status: 'success', data: testimonials });
}
