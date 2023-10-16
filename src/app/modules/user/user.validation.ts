import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    address: z.string().optional(),
    phoneNo: z.string().optional(),
    bloodGroup: z.string().optional(),
    gender: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
  createUserZodSchema,
};
