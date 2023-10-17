import { ServiceAvailability } from '@prisma/client';
import { z } from 'zod';
const serviceAvailabilityArray = Object.values(ServiceAvailability);

const createServiceZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Service Name is Required',
    }),
    description: z.string({
      required_error: 'Service description is Required',
    }),
    price: z.number({
      required_error: 'Service price is Required',
    }),
    categoryId: z.string({
      required_error: 'Service categoryId is Required',
    }),
    availability: z.enum([...serviceAvailabilityArray] as [
      string,
      ...string[],
    ]),
    image: z.string({
      required_error: 'Service image is Required',
    }),
  }),
});
const updateServiceZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    categoryId: z.string().optional(),
    availability: z
      .enum([...serviceAvailabilityArray] as [string, ...string[]])
      .optional(),
    image: z.string().optional(),
  }),
});

export const ServiceValidation = {
  updateServiceZodSchema,
  createServiceZodSchema,
};
