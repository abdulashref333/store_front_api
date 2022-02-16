import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import ProductController from './product.controller';
import { getProductValidation, addProductValidation } from './product.schema';
const products = express.Router();

products
  .get('/', ProductController.getAllProducts)
  .post('/', validateRequest(addProductValidation), ProductController.createProduct)
  .get('/:id', validateRequest(getProductValidation), ProductController.getProductById)
  .patch('/:id', validateRequest(getProductValidation), ProductController.updateProduct)
  .delete('/:id', validateRequest(getProductValidation), ProductController.deleteProduct);

export default products;
