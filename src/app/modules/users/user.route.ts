import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.get('/:id', UserController.getUserById);

router.get('/', UserController.getAllUsers);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUserById,
);

router.delete('/:id', UserController.deleteUserById);

export const UserRoutes = router;
