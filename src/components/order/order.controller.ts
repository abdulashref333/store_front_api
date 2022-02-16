import { Request, Response } from 'express';
import { kill } from 'process';
import { CustomResponse } from '../../utils/custome-response';
import { ICreateOrder, ICreateOrderProduct } from './order.interfaces';
import Order from './order.model';
import OrderProdcut from './order_product.model';
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

  async addProduct(req: Request, res: Response): Promise<void> {
    const order_id = parseInt(req.params.id);
    const product_id = parseInt(req.params.pid);
    const { quantity } = req.body;

    const result = await OrderProdcut.addProduct({ order_id, product_id, quantity });
    if (result) {
      CustomResponse.send(res, result, 'Added Successfully', 201);
    } else {
      CustomResponse.sendWithError(res, 'something went wrong');
    }
  }
  async addProducts(req: Request, res: Response): Promise<void> {
    const order_id = parseInt(req.params.id);
    const products: ICreateOrderProduct[] = req.body.products.map((k: ICreateOrderProduct) => ({ ...k, order_id }));
    const result = await OrderProdcut.createMany(products);
    if (result) {
      CustomResponse.send(res, result, 'products successfully add to order', 201);
    } else {
      throw new Error();
    }
  }
}
export default new OrderController();
