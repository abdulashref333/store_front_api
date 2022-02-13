import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, IUserSerialized } from '../components/user/user.interfaces';
import UserStore from '../components/user/user.model';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserSerialized;
    }
  }
}

const User = new UserStore('users');
export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];
  const userPayload = jwt.verify(token, process.env.JWT_KEY as string) as UserPayload;

  const user = await User.findOneById(userPayload.id);
  if (!user) {
    return next();
  }

  req.user = user;
  next();
};
