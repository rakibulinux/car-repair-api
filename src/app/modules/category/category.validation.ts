import { z } from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Category Name is Required',
    }),
  }),
});
const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const CategoryValidation = {
  updateCategoryZodSchema,
  createCategoryZodSchema,
};
