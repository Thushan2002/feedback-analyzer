import { z } from 'zod';

export const createFeedbackSchema = z.object({
  text: z
    .string({ error: 'text is required and must be a non-empty string' })
    .trim()
    .min(1, 'text is required and must be a non-empty string'),
  sentiment: z.enum(['POSITIVE', 'NEGATIVE', 'NEUTRAL']).optional(),
  confidence: z.number().min(0).max(1).optional(),
  urgencyScore: z.number().min(0).optional(),
  source: z.string().trim().optional(),
  userId: z
    .string({ error: 'userId is required' })
    .trim()
    .min(1, 'userId is required'),
});

export type CreateFeedbackDto = z.infer<typeof createFeedbackSchema>;
