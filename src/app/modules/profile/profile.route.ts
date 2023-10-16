import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';

const router = express.Router();

router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPERADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  ProfileController.updateSingleProfile,
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPERADMIN,
    ENUM_USER_ROLE.CUSTOMER,
  ),
  ProfileController.getSingleProfile,
);

export const ProfileRoute = router;
