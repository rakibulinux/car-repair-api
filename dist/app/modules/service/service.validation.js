"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const serviceAvailabilityArray = Object.values(client_1.ServiceAvailability);
const createServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Service Name is Required',
        }),
        description: zod_1.z.string({
            required_error: 'Service description is Required',
        }),
        price: zod_1.z.number({
            required_error: 'Service price is Required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'Service categoryId is Required',
        }),
        availability: zod_1.z.enum([...serviceAvailabilityArray]),
        image: zod_1.z.string({
            required_error: 'Service image is Required',
        }),
    }),
});
const updateServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        categoryId: zod_1.z.string().optional(),
        availability: zod_1.z
            .enum([...serviceAvailabilityArray])
            .optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.ServiceValidation = {
    updateServiceZodSchema,
    createServiceZodSchema,
};
