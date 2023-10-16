import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/admins', UserController.getAllAdmins);

router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPERADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateSingleUser,
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
    ENUM_USER_ROLE.SUPERADMIN,
  ),
  UserController.getSingleUser,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPERADMIN),
  UserController.getAllUsers,
);

export const UserRoute = router;
