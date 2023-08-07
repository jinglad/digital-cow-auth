import express from 'express';
import { CowRoutes } from '../modules/cows/cows.route';
import { UserRoutes } from '../modules/users/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
