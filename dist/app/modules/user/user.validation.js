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
        role: zod_1.z.string({
            required_error: 'Role is required',
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        phoneNo: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    updateUserZodSchema,
    createUserZodSchema,
};
