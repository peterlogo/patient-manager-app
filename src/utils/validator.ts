import { z } from 'zod';
import { DATE_FORMAT_REGEX, STRONG_PASSWORD_REGEX } from './constants';

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

export const patientSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  dateOfBirth: z
    .string()
    .regex(
      DATE_FORMAT_REGEX,
      'Please enter a valid date the format is YYYY-MM-DD'
    ),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string()
  })
});

export const medicationSchema = z.object({
  patientId: z.string(),
  name: z.string(),
  dosage: z.string(),
  frequency: z.string()
});

export const medicalHistorySchema = z.object({
  patientId: z.string(),
  condition: z.string(),
  diagnosedDate: z.string()
});
