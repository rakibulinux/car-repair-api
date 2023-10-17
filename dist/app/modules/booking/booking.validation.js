"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Booking Name is Required',
        }),
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    }),
});
exports.BookingValidation = {
    updateBookingZodSchema,
    createBookingZodSchema,
};
