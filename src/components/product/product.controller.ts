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
}

export default new ProductController();
