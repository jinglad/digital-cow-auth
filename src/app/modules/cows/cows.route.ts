import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CowValidation } from './cows.validation';
import { CowController } from './cows.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getCowById,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getAllCows,
);

router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateCowById,
);

router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCowById);

export const CowRoutes = router;
