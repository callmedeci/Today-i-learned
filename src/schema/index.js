import { z } from 'zod';

export const createAccountSchema = z
  .object({
    fullName: z
      .string()
      .min(4, { message: 'Min 4 chars' })
      .max(96, { message: 'Max 64 chars' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(8, { message: 'Min 8 chars' })
      .max(64, { message: 'Max 64 chars' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Min 8 chars' })
      .max(64, { message: 'Max 64 chars' }),
  })
  .refine((values) => values.confirmPassword === values.password, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Min 8 chars' }),
});
