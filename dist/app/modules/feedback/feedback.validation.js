"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const createFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Feedback Name is Required',
        }),
    }),
});
const updateFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    }),
});
exports.FeedbackValidation = {
    updateFeedbackZodSchema,
    createFeedbackZodSchema,
};
