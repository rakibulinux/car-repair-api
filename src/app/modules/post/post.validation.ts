import { z } from 'zod';

const createPostZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Post Name is Required',
    }),
  }),
});
const updatePostZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const PostValidation = {
  updatePostZodSchema,
  createPostZodSchema,
};
