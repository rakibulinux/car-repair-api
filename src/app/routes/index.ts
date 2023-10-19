import express from 'express';
import { AuthRoute } from '../modules/auth/auth.route';

import { CategoryRoute } from '../modules/category/category.route';

import { BookingRoute } from '../modules/booking/booking.route';
import { FeedbackRoute } from '../modules/feedback/feedback.route';
import { PostRoute } from '../modules/post/post.route';
import { ReviewRoute } from '../modules/review/review.route';
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
  {
    path: '/posts',
    route: PostRoute,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoute,
  },
  {
    path: '/reviews',
    route: ReviewRoute,
  },
  {
    path: '/bookings',
    route: BookingRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
