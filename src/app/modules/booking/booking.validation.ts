import { z } from 'zod';

const createBookingZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'UserId Is Required',
    }), // Foreign key to User
    serviceId: z.string({
      required_error: 'ServiceId Is Required',
    }), // Foreign key to Service
    status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED'] as [
      string,
      ...string[],
    ]), // Booking status
    dateTime: z.date({
      required_error: 'Date Time Is Required in date format',
    }), // Date and time of the booking
  }),
});
const updateBookingZodSchema = z.object({
  body: z.object({
    userId: z.string().optional(), // Foreign key to User
    serviceId: z.string().optional(), // Foreign key to Service
    status: z
      .enum(['PENDING', 'CONFIRMED', 'CANCELLED'] as [string, ...string[]])
      .optional(), // Booking status
    dateTime: z.date().optional(), // Date and time of the booking,
  }),
});

export const BookingValidation = {
  updateBookingZodSchema,
  createBookingZodSchema,
};
