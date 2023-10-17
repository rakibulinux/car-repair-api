"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = void 0;
const zod_1 = require("zod");
const createPostZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Post Name is Required',
        }),
    }),
});
const updatePostZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    }),
});
exports.PostValidation = {
    updatePostZodSchema,
    createPostZodSchema,
};
