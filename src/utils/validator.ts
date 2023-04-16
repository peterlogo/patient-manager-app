import { z } from 'zod';

export const newUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const userParamsSchema = z.object({
  id: z.string(),
})