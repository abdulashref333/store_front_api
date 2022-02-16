import { BaseModelRepository } from '../base/base.model';
import { IOrderProduct } from './order.interfaces';
class OrderProduct extends BaseModelRepository<IOrderProduct> {
  async addProduct(obj: Omit<IOrderProduct, 'id' | 'created_at'>): Promise<IOrderProduct | null> {
    return await this.create(obj);
  }
}
export default new OrderProduct('order_products');
