import express from 'express';
import { requireAuth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validate-request';
import OrderController from './order.controller';
import {
  getOrderValidation,
  addProductValidation,
  addOrderValidation,
  addOrderProductsValidation,
} from './order.schema';
const orders = express.Router();

orders.use(requireAuth);
orders
  .get('/', OrderController.getAllOrders)
  .post('/', validateRequest(addOrderValidation), OrderController.createOrder)
  .get('/:id', validateRequest(getOrderValidation), OrderController.getOrderById)
  .patch('/:id', validateRequest(getOrderValidation), OrderController.updateOrder)
  .delete('/:id', validateRequest(getOrderValidation), OrderController.deleteOrder)

  // Products
  .post('/:id/products', validateRequest(addOrderProductsValidation), OrderController.addProducts)
  .post('/:id/products/:pid', validateRequest(addProductValidation), OrderController.addProduct);

export default orders;
