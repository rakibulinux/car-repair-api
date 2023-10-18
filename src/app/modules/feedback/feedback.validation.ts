import { z } from 'zod';

const createFeedbackZodSchema = z.object({
  body: z.object({
    comment: z.string({
      required_error: 'Comment is Required',
    }),
    userId: z.string({
      required_error: 'UserId is Required',
    }),
  }),
});
const updateFeedbackZodSchema = z.object({
  body: z.object({
    comment: z.string().optional(),
    userId: z.string().optional(),
  }),
});

export const FeedbackValidation = {
  updateFeedbackZodSchema,
  createFeedbackZodSchema,
};
