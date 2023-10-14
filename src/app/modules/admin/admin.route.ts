import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './admin.controller';
import { AdminUserValidation } from './admin.validation';

const router = express.Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(AdminUserValidation.updateAdminUserZodSchema),
  UserController.updateSingleAdminUser,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleAdminUser,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN),
  UserController.deleteSingleAdminUser,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPERADMIN),
  UserController.getAllAdminUsers,
);

export const AdminUserRoute = router;
