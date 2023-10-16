import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Review Name is Required',
    }),
  }),
});
const updateReviewZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const ReviewValidation = {
  updateReviewZodSchema,
  createReviewZodSchema,
};
