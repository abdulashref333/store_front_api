import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import ProductController from './product.controller';
import { getProductValidation } from './product.schema';
const products = express.Router();

products
  .get('/', ProductController.getAllProducts)
  .get('/:id', validateRequest(getProductValidation), ProductController.getProductById)
  .post('/', ProductController.createProduct);

export default products;
