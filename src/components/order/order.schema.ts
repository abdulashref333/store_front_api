import Joi, { number } from 'joi';
import { IValidationSchema } from '../../utils/joi.interfaces';

export const getOrderValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }).required(),
};

export const addProductValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
    pid: Joi.number().required(),
  }).required(),
  body: Joi.object({
    quantity: Joi.number().required(),
  }).required(),
};

export const addOrderValidation: IValidationSchema = {
  body: Joi.object({
    customer_id: Joi.number().required(),
    total: Joi.number().required(),
    order_status: Joi.string().required(),
    payment_type: Joi.string().required(),
  }).required(),
};
export const updateOrderValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }).required(),
  body: Joi.object({
    customer_id: Joi.number().min(1),
    total: Joi.number().min(0),
    order_status: Joi.string().trim().min(1),
    payment_type: Joi.string().trim().min(1),
  })
    .min(1)
    .required(),
};
export const addOrderProductsValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }).required(),
  body: Joi.object({
    products: Joi.array().items({
      product_id: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  }).required(),
};
