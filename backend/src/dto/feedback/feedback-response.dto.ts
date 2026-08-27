import type { Feedback, Sentiment } from '../../generated/prisma/client.js';

export interface FeedbackResponseDto {
  id: string;
  text: string;
  sentiment: Sentiment | null;
  confidence: number | null;
  urgencyScore: number | null;
  source: string | null;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export function toFeedbackResponseDto(feedback: Feedback): FeedbackResponseDto {
  return {
    id: feedback.id,
    text: feedback.text,
    sentiment: feedback.sentiment,
    confidence: feedback.confidence,
    urgencyScore: feedback.urgencyScore,
    source: feedback.source,
    userId: feedback.userId,
    createdAt: feedback.createdAt,
    updatedAt: feedback.updatedAt,
  };
}
