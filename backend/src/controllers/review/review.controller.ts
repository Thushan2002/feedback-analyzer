import { Request, Response } from "express";
import * as reviewService from "../../services/review/review.service.js";

export async function createReview(req: Request, res: Response): Promise<void> {
  const review = await reviewService.createReview(req.body);
  res.status(201).json({ success: true, data: review });
}

export async function fetchReview(req: Request, res: Response): Promise<void> {
  const review = await reviewService.fetchReview(req.params);
  res.status(200).json({ success: true, data: review });
}
