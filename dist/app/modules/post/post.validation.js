"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = void 0;
const zod_1 = require("zod");
const createPostZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        content: zod_1.z.string({
            required_error: 'Content is required',
        }),
        image: zod_1.z.string({
            required_error: 'Image is required',
        }),
        authorId: zod_1.z.string().optional(),
        categoryId: zod_1.z.string({
            required_error: 'CategoryId is required',
        }),
    }),
});
const updatePostZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        authorId: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
exports.PostValidation = {
    updatePostZodSchema,
    createPostZodSchema,
};
