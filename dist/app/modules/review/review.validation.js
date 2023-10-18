"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'UserId is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'ServiceId is required',
        }),
        rating: zod_1.z
            .number({
            required_error: 'Rating is required between 0 and 5',
        })
            .min(0)
            .max(5),
        comment: zod_1.z.string({
            required_error: 'Comment is required',
        }),
    }),
});
const updateReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
        rating: zod_1.z.number().min(0).max(5).optional(),
        comment: zod_1.z.string().optional(),
    }),
});
exports.ReviewValidation = {
    updateReviewZodSchema,
    createReviewZodSchema,
};
