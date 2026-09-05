import axios from 'axios';
import { env } from '../../config/env.js';
import { prisma } from '../../config/prisma.js';
import type { CreateFeedbackDto } from '../../dto/feedback/create-feedback.dto.js';
import type { FeedbackResponseDto } from '../../dto/feedback/feedback-response.dto.js';
import { toFeedbackResponseDto } from '../../dto/feedback/feedback-response.dto.js';
import type { GetFeedbackParamsDto } from '../../dto/feedback/get-feedback-params.dto.js';
import type { Prisma, Sentiment } from '../../generated/prisma/client.js';
import { AppError } from '../../utils/AppError.js';
import { logger } from '../../utils/logger/logger.js';

export interface feedbackAnalyserResponse{
  label: Sentiment | null;
  score: number | null;
}

export async function feedbackAnalyser(text:string): Promise<feedbackAnalyserResponse> {
  if (!env.fastApiEnv) {                                                                                                                             
    return { label: null, score: null };                                                                                                    
  } 
  try {
    const response = await axios.post(`${env.fastApiEnv}/analyze`,{
      text: text
    },{timeout: 5000, headers: { 'X-Internal-API-Key': env.aiServiceApiKey}})
    return {
      label: response.data.label,
      score: response.data.score
    }
  } catch (error) {
    logger.error({ error }, 'AI service failed or timed out. Ingesting without AI analysis.')
    return{
      label: null,
      score: null
    }
  }
}

export async function createFeedback(dto: CreateFeedbackDto): Promise<FeedbackResponseDto> {

  const analyse = await feedbackAnalyser(dto.text)
  const data: Prisma.FeedbackCreateInput = {
    text: dto.text,
    sentiment: analyse.label,
    confidence: analyse.score,
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
