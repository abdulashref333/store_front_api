import { Request, Response } from 'express';
import { CustomResponse } from '../../utils/custome-response';
import Product from './product.model';
import { ICreateProduct } from './product.interfaces';

class ProductController {
  async getAllProducts(req: Request, res: Response): Promise<void> {
    const products = await Product.findAll();
    if (!products) {
      throw new Error('Something Went Wrong Try again later');
    }
    if (products.length) {
      CustomResponse.send(res, products, 'Sucess');
    } else {
      CustomResponse.sendWithoutData(res, 'No Products have founded.');
    }
  }
  async getProductById(req: Request, res: Response): Promise<void> {
    const product = await Product.findOne({ id: parseInt(req.params.id as string) });
    if (product) {
      CustomResponse.send(res, product, 'Success');
    } else {
      CustomResponse.sendWithError(res, 'Not Found!', 400);
    }
  }
  async createProduct(req: Request, res: Response): Promise<void> {
    const { title, price, image_url, summary } = req.body;

    const productData: ICreateProduct = { title, price, image_url, summary };
    const product = await Product.createProduct(productData);

    if (product) {
      return CustomResponse.send(res, product, 'Created Successfully', 201);
    } else {
      throw new Error('Something Went Wrong Try again.');
    }
  }
  async updateProduct(req: Request, res: Response): Promise<void> {
    const result = await Product.update({ id: parseInt(req.params.id) }, req.body);
    if (result) {
      CustomResponse.send(res, result);
    } else {
      CustomResponse.sendWithError(res, 'Order Not Found');
    }
  }
  async deleteProduct(req: Request, res: Response): Promise<void> {
    const result = await Product.delete({ id: parseInt(req.params.id) });
    CustomResponse.send(res, result);
  }
}

export default new ProductController();
