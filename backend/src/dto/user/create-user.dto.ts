import { z } from 'zod';

export const createUserSchema = z.object({
  email: z
    .string({ error: 'Email is required' })
    .trim()
    .email('Please enter a valid email address'),
  password: z
    .string({ error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long'),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
