import { prisma } from '../../config/prisma.js';
import type { CreateFeedbackDto } from '../../dto/feedback/create-feedback.dto.js';
import type { FeedbackResponseDto } from '../../dto/feedback/feedback-response.dto.js';
import { toFeedbackResponseDto } from '../../dto/feedback/feedback-response.dto.js';
import type { GetFeedbackParamsDto } from '../../dto/feedback/get-feedback-params.dto.js';
import type { Prisma } from '../../generated/prisma/client.js';
import { AppError } from '../../utils/AppError.js';

export async function createFeedback(dto: CreateFeedbackDto): Promise<FeedbackResponseDto> {
  const data: Prisma.FeedbackCreateInput = {
    text: dto.text,
    sentiment: dto.sentiment,
    confidence: dto.confidence,
    urgencyScore: dto.urgencyScore,
    source: dto.source,
    user: {
      connect: { id: dto.userId },
    },
  };

  const feedback = await prisma.feedback.create({ data });
  return toFeedbackResponseDto(feedback);
}

export async function fetchFeedback(params: GetFeedbackParamsDto): Promise<FeedbackResponseDto> {
  const { id } = params;
  const feedback = await prisma.feedback.findUnique({ where: { id } });

  if (!feedback) {
    throw new AppError('Feedback not found', 404);
  }

  return toFeedbackResponseDto(feedback);
}
