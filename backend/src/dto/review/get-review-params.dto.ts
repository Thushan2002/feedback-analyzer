import { z } from 'zod';

export const getReviewParamsSchema = z.object({
  id: z.coerce
    .number({ error: 'id must be a valid integer' })
    .int('id must be a valid integer')
    .positive('id must be a valid integer'),
});

export type GetReviewParamsDto = z.infer<typeof getReviewParamsSchema>;
