import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'UserId is required',
    }), // Foreign key to User
    serviceId: z.string({
      required_error: 'ServiceId is required',
    }), // Foreign key to Service
    rating: z
      .number({
        required_error: 'Rating is required between 0 and 5',
      })
      .min(0)
      .max(5), // Rating given by the user (between 0 and 5)
    comment: z.string({
      required_error: 'Comment is required',
    }),
  }),
});
const updateReviewZodSchema = z.object({
  body: z.object({
    userId: z.string().optional(), // Foreign key to User
    serviceId: z.string().optional(), // Foreign key to Service
    rating: z.number().min(0).max(5).optional(), // Rating given by the user (between 0 and 5)
    comment: z.string().optional(),
  }),
});

export const ReviewValidation = {
  updateReviewZodSchema,
  createReviewZodSchema,
};
