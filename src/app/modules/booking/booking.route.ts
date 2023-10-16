import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BookingValidation.updateBookingZodSchema),
  BookingController.updateSingleBooking,
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.createBooking,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  BookingController.getSingleBooking,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.deleteSingleBooking,
);

router.get('/', BookingController.getAllBookings);

export const BookingRoute = router;
