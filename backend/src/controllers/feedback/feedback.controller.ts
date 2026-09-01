import type { Request, Response } from 'express';

import type { CreateFeedbackDto } from '../../dto/feedback/create-feedback.dto.js';
import type { GetFeedbackParamsDto } from '../../dto/feedback/get-feedback-params.dto.js';
import * as feedbackService from '../../services/feedback/feedback.service.js';

export async function createFeedback(
  req: Request<unknown, unknown, CreateFeedbackDto>,
  res: Response,
): Promise<void> {
  const feedback = await feedbackService.createFeedback(req.body);
  res.status(201).json({ success: true, data: feedback });
}

export async function fetchFeedback(
  req: Request<GetFeedbackParamsDto>,
  res: Response,
): Promise<void> {
  const feedback = await feedbackService.fetchFeedback(req.params);
  res.status(200).json({ success: true, data: feedback });
}
