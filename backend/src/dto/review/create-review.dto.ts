import { z } from 'zod';

export const createFeedbackSchema = z.object({
  customer_name: z
    .string({ error: 'customer_name is required and must be a non-empty string' })
    .trim()
    .min(1, 'customer_name is required and must be a non-empty string'),
  review_text: z
    .string({ error: 'review_text is required and must be a non-empty string' })
    .trim()
    .min(1, 'review_text is required and must be a non-empty string'),
  sentiment: z
    .string({ error: 'sentiment is required and must be a non-empty string' })
    .trim()
    .min(1, 'sentiment is required and must be a non-empty string'),
  confident_score: z.number({
    error: 'confident_score is required and must be an integer',
  }).int('confident_score is required and must be an integer'),
  email: z
    .string({ error: 'email is required and must be a valid email address' })
    .trim()
    .toLowerCase()
    .pipe(z.email('email is required and must be a valid email address')),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
