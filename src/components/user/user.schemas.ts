import Joi from 'joi';
import { IValidationSchema } from '../../utils/joi.interfaces';

export const getUserValidation: IValidationSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }).required(),
};

export const addUserValidation: IValidationSchema = {
  body: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().trim(true).email(),
    password: Joi.string().required().trim(true).min(8),
  }).required(),
};

export const loginValidation: IValidationSchema = {
  body: Joi.object({
    email: Joi.string().required().trim(true).email(),
    password: Joi.string().required().trim(true).min(8),
  }).required(),
};
