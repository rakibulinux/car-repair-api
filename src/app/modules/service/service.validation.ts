import { z } from 'zod';

const createServiceZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Service Name is Required',
    }),
  }),
});
const updateServiceZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const ServiceValidation = {
  updateServiceZodSchema,
  createServiceZodSchema,
};
