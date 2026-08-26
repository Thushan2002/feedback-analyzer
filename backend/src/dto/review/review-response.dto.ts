import type { Reviews } from '../../generated/prisma/client.js';

export interface ReviewResponseDto {
  id: number;
  customer_name: string;
  review_text: string;
  sentiment: string;
  confident_score: number;
  email: string;
  createdAt: Date;
}

export function toReviewResponseDto(review: Reviews): ReviewResponseDto {
  return {
    id: review.id,
    customer_name: review.customer_name,
    review_text: review.review_text,
    sentiment: review.sentiment,
    confident_score: review.confident_score,
    email: review.email,
    createdAt: review.createdAt,
  };
}
