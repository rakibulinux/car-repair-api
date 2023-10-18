import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPERADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateSingleReview,
);
router.post(
  '/',
  auth(
    ENUM_USER_ROLE.SUPERADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview,
);

router.get('/:id', ReviewController.getSingleReview);

router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPERADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  ReviewController.deleteSingleReview,
);

router.get('/', ReviewController.getAllReviews);

export const ReviewRoute = router;
