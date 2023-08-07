import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CowValidation } from './cows.validation';
import { CowController } from './cows.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow,
);

router.get('/:id', CowController.getCowById);

router.get('/', CowController.getAllCows);

router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCowById,
);

router.delete('/:id', CowController.deleteCowById);

export const CowRoutes = router;
