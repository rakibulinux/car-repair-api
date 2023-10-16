import express from 'express';
import { AuthRoute } from '../modules/auth/auth.route';

import { CategoryRoute } from '../modules/category/category.route';

import { ServiceRoute } from '../modules/service/service.route';
import { UserRoute } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/users',
    route: UserRoute,
  },

  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/services',
    route: ServiceRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
