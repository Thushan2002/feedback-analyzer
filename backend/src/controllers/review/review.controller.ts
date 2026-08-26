import type { Request, Response } from 'express';

import * as reviewService from '../../services/review/review.service.js';

export async function createFeedback(req: Request, res: Response): Promise<void> {
  const review = await reviewService.createFeedback(req.body);
  res.status(201).json({ success: true, data: review });
}

export async function fetchFeedback(req: Request, res: Response): Promise<void> {
  const review = await reviewService.fetchFeedback(req.params);
  res.status(200).json({ success: true, data: review });
}
