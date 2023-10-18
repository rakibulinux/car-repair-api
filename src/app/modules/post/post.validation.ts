import { z } from 'zod';

const createPostZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z.string({
      required_error: 'Content is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
    authorId: z.string().optional(),
    categoryId: z.string({
      required_error: 'CategoryId is required',
    }),
  }),
});
const updatePostZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
    authorId: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const PostValidation = {
  updatePostZodSchema,
  createPostZodSchema,
};
