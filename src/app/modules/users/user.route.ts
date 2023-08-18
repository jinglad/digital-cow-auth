import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/auth/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getUserById);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUserById,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteUserById,
);

export const UserRoutes = router;
