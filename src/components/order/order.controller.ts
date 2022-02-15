import { Request, Response } from 'express';
import { CustomResponse } from '../../utils/custome-response';
import { ICreateOrder } from './order.interfaces';
import Order from './order.model';

class OrderController {
  async getAllOrders(req: Request, res: Response): Promise<void> {
    const result = await Order.findAll();
    if (result) {
      CustomResponse.send(res, result);
    } else if (Array.from(result).length !== 0) {
      CustomResponse.sendWithError(res, 'No Orders has Found');
    } else {
      throw new Error();
    }
  }
  async getOrderById(req: Request, res: Response): Promise<void> {
    const order = await Order.findOne({ id: parseInt(req.params.id) });
    if (order) {
      return CustomResponse.send(res, order);
    }
    CustomResponse.sendWithError(res, 'Not Found', 404);
  }
  async createOrder(req: Request, res: Response): Promise<void> {
    const { customer_id, total, billing_address, order_status, payment_type } = req.body;

    const orderData: ICreateOrder = { customer_id, total, order_status, payment_type };
    const order = await Order.createOrder(orderData);

    if (order) {
      return CustomResponse.send(res, order, 'Created Successfully', 201);
    } else {
      throw new Error();
    }
  }
  async updateOrder(req: Request, res: Response): Promise<void> {
    const result = await Order.update({ id: parseInt(req.params.id) }, req.body);
    if (result) {
      CustomResponse.send(res, result);
    } else {
      CustomResponse.sendWithError(res, 'Order Not Found');
    }
  }
  async deleteOrder(req: Request, res: Response): Promise<void> {
    const result = await Order.delete({ id: parseInt(req.params.id) });
    CustomResponse.send(res, result);
  }
}
export default new OrderController();
