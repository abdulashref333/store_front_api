import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import OrderController from './order.controller';
import { getOrderValidation } from './order.schema';
const orders = express.Router();

orders
  .get('/', OrderController.getAllOrders)

  .post('/', OrderController.createOrder);

orders.use(validateRequest(getOrderValidation));
orders
  .get('/:id', OrderController.getOrderById)
  .patch('/:id', OrderController.updateOrder)
  .delete('/:id', OrderController.deleteOrder);

export default orders;
