import { prisma } from '../../config/prisma.js';
import { CreateFeedbackInput } from '../../dto/review/create-review.dto.js';
import type { GetReviewParamsDto } from '../../dto/review/get-review-params.dto.js';
import type { ReviewResponseDto } from '../../dto/review/review-response.dto.js';
import { toReviewResponseDto } from '../../dto/review/review-response.dto.js';
import { Prisma } from '../../generated/prisma/client.js';
import { AppError } from '../../utils/AppError.js';

export async function createFeedback(input: CreateFeedbackInput): Promise<ReviewResponseDto> {
  const data: Prisma.ReviewsCreateInput = {
    customer_name: input.customer_name,
    review_text: input.review_text,
    sentiment: input.sentiment,
    confident_score: input.confident_score,
    email: input.email,
  };

  try {
    const review = await prisma.reviews.create({ data });
    return toReviewResponseDto(review);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError('A review with this email already exists', 409);
    }
    throw err;
  }
}

export async function fetchFeedback(params: GetReviewParamsDto): Promise<ReviewResponseDto> {
  const { id } = params;
  const review = await prisma.reviews.findUnique({ where: { id } });

  if (!review) {
    throw new AppError('Review not found', 404);
  }

  return toReviewResponseDto(review);
}
