import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AuthUserController } from './auth.controller';
import { UserValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  // validateRequest(UserValidation.createUserZodSchema),
  AuthUserController.createAuthUser,
);
router.post(
  '/admin-signup',
  // validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.SUPERADMIN),
  AuthUserController.createAdminAuthUser,
);
router.post(
  '/signin',
  validateRequest(UserValidation.loginUserZodSchema),
  AuthUserController.loginUser,
);
router.post(
  '/admin-signin',
  validateRequest(UserValidation.loginUserZodSchema),
  AuthUserController.loginAdminUser,
);
router.post(
  '/super-admin-signin',
  validateRequest(UserValidation.loginUserZodSchema),
  AuthUserController.loginSuperAdminUser,
);
router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenZodSchema),
  AuthUserController.refreshToken,
);

export const AuthRoute = router;
