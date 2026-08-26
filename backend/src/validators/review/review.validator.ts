import type { CreateReviewDto } from '../../dto/review/create-review.dto.js';
import { createReviewSchema } from '../../dto/review/create-review.dto.js';
import type { GetReviewParamsDto } from '../../dto/review/get-review-params.dto.js';
import { getReviewParamsSchema } from '../../dto/review/get-review-params.dto.js';
import { AppError } from '../../utils/AppError.js';

export function validateCreateReview(body: unknown): CreateReviewDto {
  const result = createReviewSchema.safeParse(body);

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? 'Invalid request body';
    throw new AppError(message, 400);
  }

  return result.data;
}

export function validateGetReviewParams(params: unknown): GetReviewParamsDto {
  const result = getReviewParamsSchema.safeParse(params);

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? 'Invalid request parameters';
    throw new AppError(message, 400);
  }

  return result.data;
}
