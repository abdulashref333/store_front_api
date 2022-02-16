import express from 'express';
import { requireAuth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validate-request';
import ProductController from './product.controller';
import { getProductValidation, addProductValidation } from './product.schema';
const products = express.Router();

products
  .get('/', ProductController.getAllProducts)
  .post('/', [requireAuth, validateRequest(addProductValidation)], ProductController.createProduct)
  .get('/:id', validateRequest(getProductValidation), ProductController.getProductById)
  .patch('/:id', [requireAuth, validateRequest(getProductValidation)], ProductController.updateProduct)
  .delete('/:id', [requireAuth, validateRequest(getProductValidation)], ProductController.deleteProduct);

export default products;
