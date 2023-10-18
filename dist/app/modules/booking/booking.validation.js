"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'UserId Is Required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'ServiceId Is Required',
        }),
        status: zod_1.z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']),
        dateTime: zod_1.z.date({
            required_error: 'Date Time Is Required in date format',
        }), // Date and time of the booking
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
        status: zod_1.z
            .enum(['PENDING', 'CONFIRMED', 'CANCELLED'])
            .optional(),
        dateTime: zod_1.z.date().optional(), // Date and time of the booking,
    }),
});
exports.BookingValidation = {
    updateBookingZodSchema,
    createBookingZodSchema,
};
