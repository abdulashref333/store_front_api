import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-auhorize-error';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user === null || req.user === undefined) {
    throw new NotAuthorizedError();
  }
  next();
};
