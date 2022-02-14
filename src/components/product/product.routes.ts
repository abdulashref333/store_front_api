import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import ProductController from './product.controller';
import { getProductValidation } from './product.schema';
const products = express.Router();

products
  .get('/products', ProductController.getAllProducts)
  .get('/products/:id', validateRequest(getProductValidation), ProductController.getProductById)
  .post('/products', ProductController.createProduct);

export default products;
