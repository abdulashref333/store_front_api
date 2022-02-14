import { BaseModelRepository } from '../base/base.model';
import { IProduct } from './product.interfaces';
class Product extends BaseModelRepository<IProduct> {
  async createProduct(obj: Omit<IProduct, 'id' | 'created_at'>): Promise<IProduct | null> {
    return await this.create(obj);
  }
}
export default new Product('products');
