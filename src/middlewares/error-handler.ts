import { Request, Response, NextFunction } from 'express';
import Logger from './logger';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ status: err.statusCode, errors: err.serializeErrors() });
  } // For any thrown errors in the application
  Logger.error(err.message);

  res.status(400).send({
    status: 400,
    message: 'Something went wrong',
  });
};
