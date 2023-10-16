import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.updateSingleCategory,
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  CategoryController.getSingleCategory,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteSingleCategory,
);

router.get('/', CategoryController.getAllCategories);

export const CategoryRoute = router;
