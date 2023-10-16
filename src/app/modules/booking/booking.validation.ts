import { z } from 'zod';

const createBookingZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Booking Name is Required',
    }),
  }),
});
const updateBookingZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const BookingValidation = {
  updateBookingZodSchema,
  createBookingZodSchema,
};
