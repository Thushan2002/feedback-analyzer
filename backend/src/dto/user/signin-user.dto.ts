import { z } from 'zod';

export const signinUserSchema = z.object({
  email: z
    .string({ error: 'Email is required' })
    .trim()
    .email('Please enter a valid email address'),
  password: z
    .string({ error: 'Password is required' })
    .min(1, 'Password is required'),
});

export type SigninUserDto = z.infer<typeof signinUserSchema>;
