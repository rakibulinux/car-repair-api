import { z } from 'zod';

const createFeedbackZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Feedback Name is Required',
    }),
  }),
});
const updateFeedbackZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const FeedbackValidation = {
  updateFeedbackZodSchema,
  createFeedbackZodSchema,
};
