import { BaseModelRepository } from '../base/base.model';
import { IOrder } from './order.interfaces';
class Order extends BaseModelRepository<IOrder> {
  async createOrder(obj: Omit<IOrder, 'id' | 'created_at'>): Promise<IOrder | null> {
    return await this.create(obj);
  }
}
export default new Order('orders');
