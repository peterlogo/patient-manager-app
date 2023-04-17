import { z } from 'zod';
import { STRONG_PASSWORD_REGEX } from './constants';

export const newUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(STRONG_PASSWORD_REGEX, 'Please enter a strong password')
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const userParamsSchema = z.object({
  id: z.string()
});
