import { z } from 'zod';

const createBookingZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'UserId Is Required',
    }), // Foreign key to User
    make: z.string({
      required_error: 'Make Is Required',
    }), // Foreign key to User
    model: z.string({
      required_error: 'Model Is Required',
    }), // Foreign key to User
    serviceId: z.string({
      required_error: 'ServiceId Is Required',
    }), // Foreign key to Service
    date: z.string({
      required_error: 'Date Time Is Required in string format',
    }), // Date and time of the booking
    time: z.string({
      required_error: 'Date Time Is Required in string format',
    }), // Date and time of the booking
  }),
});
const updateBookingZodSchema = z.object({
  body: z.object({
    status: z
      .enum(['PENDING', 'FIXING', 'FIXED', 'CANCELED'] as [string, ...string[]])
      .optional(), // Booking status
  }),
});

export const BookingValidation = {
  updateBookingZodSchema,
  createBookingZodSchema,
};
