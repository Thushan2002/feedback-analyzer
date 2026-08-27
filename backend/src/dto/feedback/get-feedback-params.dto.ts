import { z } from 'zod';

export const getFeedbackParamsSchema = z.object({
  id: z
    .string({ error: 'id must be a valid non-empty string' })
    .trim()
    .min(1, 'id must be a valid non-empty string'),
});

export type GetFeedbackParamsDto = z.infer<typeof getFeedbackParamsSchema>;
