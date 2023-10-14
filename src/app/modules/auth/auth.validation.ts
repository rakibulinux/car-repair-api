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
    role: z.string().optional(),
  }),
});
// const createAdminUserZodSchema = z.object({
//   body: z.object({
//     name: z.string({
//       required_error: 'Name is required',
//     }),
//     email: z.string({
//       required_error: 'Email is required',
//     }),
//     password: z.string({
//       required_error: 'Password is required',
//     }),
//     profileImg: z.string().optional(),
//   }),
// });
const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'ID Is Required',
    }),
  }),
});
export const UserValidation = {
  updateUserZodSchema,
  createUserZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
  // createAdminUserZodSchema,
};
