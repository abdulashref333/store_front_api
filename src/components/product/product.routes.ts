import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import ProductController from './product.controller';
import { getProductValidation } from './product.schema';
const products = express.Router();

products
  .get('/', ProductController.getAllProducts)

  .post('/', ProductController.createProduct);

products.use(validateRequest(getProductValidation));
products
  .get('/:id', ProductController.getProductById)
  .patch('/:id', ProductController.updateProduct)
  .delete('/:id', ProductController.deleteProduct);

export default products;
