"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        role: zod_1.z.string().optional(),
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
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is Required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'ID Is Required',
        }),
    }),
});
exports.UserValidation = {
    updateUserZodSchema,
    createUserZodSchema,
    loginUserZodSchema,
    refreshTokenZodSchema,
    // createAdminUserZodSchema,
};
