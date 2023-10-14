import { z } from 'zod';

const updateAdminUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const AdminUserValidation = {
  updateAdminUserZodSchema,
};
