"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const createFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({
            required_error: 'Comment is Required',
        }),
        userId: zod_1.z.string({
            required_error: 'UserId is Required',
        }),
    }),
});
const updateFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
    }),
});
exports.FeedbackValidation = {
    updateFeedbackZodSchema,
    createFeedbackZodSchema,
};
