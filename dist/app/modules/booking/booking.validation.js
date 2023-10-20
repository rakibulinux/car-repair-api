"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'UserId Is Required',
        }),
        make: zod_1.z.string({
            required_error: 'Make Is Required',
        }),
        model: zod_1.z.string({
            required_error: 'Model Is Required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'ServiceId Is Required',
        }),
        date: zod_1.z.string({
            required_error: 'Date Time Is Required in string format',
        }),
        time: zod_1.z.string({
            required_error: 'Date Time Is Required in string format',
        }), // Date and time of the booking
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z
            .enum(['PENDING', 'FIXING', 'FIXED', 'CANCELED'])
            .optional(), // Booking status
    }),
});
exports.BookingValidation = {
    updateBookingZodSchema,
    createBookingZodSchema,
};
