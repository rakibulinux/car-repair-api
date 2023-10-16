import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PostController } from './post.controller';
import { PostValidation } from './post.validation';

const router = express.Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(PostValidation.updatePostZodSchema),
  PostController.updateSinglePost,
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(PostValidation.createPostZodSchema),
  PostController.createPost,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPERADMIN, ENUM_USER_ROLE.ADMIN),
  PostController.getSinglePost,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  PostController.deleteSinglePost,
);

router.get('/', PostController.getAllPosts);

export const PostRoute = router;
