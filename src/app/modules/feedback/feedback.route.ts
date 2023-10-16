import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';

const router = express.Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FeedbackValidation.updateFeedbackZodSchema),
  FeedbackController.updateSingleFeedback,
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FeedbackValidation.createFeedbackZodSchema),
  FeedbackController.createFeedback,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  FeedbackController.getSingleFeedback,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FeedbackController.deleteSingleFeedback,
);

router.get('/', FeedbackController.getAllFeedbacks);

export const FeedbackRoute = router;
