import express from 'express';
import { AuthRoute } from '../modules/auth/auth.route';

import { AdminUserRoute } from '../modules/admin/admin.route';
import { ProfileRoute } from '../modules/profile/profile.route';
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
    path: '/profile',
    route: ProfileRoute,
  },
  {
    path: '/admin',
    route: AdminUserRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
