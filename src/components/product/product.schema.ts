import Joi from 'joi';
import { IValidationSchema } from '../../utils/joi.interfaces';

export const getProductValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }).required(),
};
export const addProductValidation: IValidationSchema = {
  body: Joi.object({
    price: Joi.number().required(),
    title: Joi.string().required(),
    summary: Joi.string().required(),
    image_url: Joi.string().required(),
  }).required(),
};
export const updateProductValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }).required(),
  body: Joi.object({
    price: Joi.number(),
    title: Joi.string(),
    summary: Joi.string(),
    image_url: Joi.string(),
  })
    .min(1)
    .required(),
};
