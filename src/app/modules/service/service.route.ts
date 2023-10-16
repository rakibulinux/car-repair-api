import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceValidation.updateServiceZodSchema),
  ServiceController.updateSingleService,
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceValidation.createServiceZodSchema),
  ServiceController.createService,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.getSingleService,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteSingleService,
);

router.get('/', ServiceController.getAllServices);

export const ServiceRoute = router;
