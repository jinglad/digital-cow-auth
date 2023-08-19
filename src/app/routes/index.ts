import express from 'express';
import { CowRoutes } from '../modules/cows/cows.route';
import { UserRoutes } from '../modules/users/user.route';
import { OrderRoutes } from '../modules/orders/orders.route';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
