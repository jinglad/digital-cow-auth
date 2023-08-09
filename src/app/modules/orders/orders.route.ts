import express from 'express';
import { orderController } from './orders.controller';

const router = express.Router();

router.post('/', orderController.createOrder);

router.get('/:id', orderController.getOrder);

router.get('/', orderController.getOrders);

export const OrderRoutes = router;
