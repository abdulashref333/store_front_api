import { Request, Response } from 'express';
import { ICreateUser, IUserSerialized } from './user.interfaces';
import UserStore from './user.model';
import { CustomResponse } from '../../utils/custome-response';
import { NotFoundError } from '../../errors/not-found-error';
import { JWT } from '../../utils/jwt';
import { BadRequestError } from '../../errors/bad-request-error';
import { Password } from '../../utils/password';
import { emit } from 'process';

const User = new UserStore('users');

class UserController {
  async getUser(req: Request, res: Response): Promise<void> {
    const user = await User.findOneById(parseInt(req.params.id as string));
    if (!user) {
      throw new NotFoundError('User Not Found!');
    }
    if (req.user && req.user.email === 'Admin') {
    }
    if (req.user && req.user.id !== user.id) {
      return CustomResponse.sendWithoutData(res, 'Not authorize!', 401);
    }
    CustomResponse.send(res, { user });
  }

  async me(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw new NotFoundError('Please sign up');
    }
    CustomResponse.send(res, { user: req.user });
  }
  async getUsers(req: Request, res: Response) {}

  async signUp(req: Request, res: Response): Promise<void> {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await User.findOneByEmail(email);
    if (existingUser) {
      // eslint-disable-next-line quotes
      throw new BadRequestError("There's a user with this email already!");
    }
    const hashedPassword = await Password.toHash(password);

    const dataObject: ICreateUser = { firstname, lastname, email, password: hashedPassword };

    const user = await User.createUser(dataObject);
    if (user) {
      // Creating a JWT token for this user, and returning it back in the response
      // so that it can be used in the Authentication process
      const token = JWT.sign(user);
      const result = { user, token };

      return CustomResponse.send(res, result, 'Created Successfully', 201);
    } else {
      throw new Error();
    }
  }

  async logIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Missing Password or Email');
    }
    const user = await User.findOneByEmail(email);
    if (!user) {
      return CustomResponse.sendWithError(res, 'Invalid Credentials!', 400);
    }

    const isMatch = await Password.compare(user.password, password);
    if (isMatch) {
      const token = JWT.sign(user);

      const userSerialization = user as IUserSerialized;
      userSerialization.password = undefined;

      const result = { user: userSerialization, token };
      CustomResponse.send(res, result, `Welcome Back, ${user.firstname}`);
    } else {
      return CustomResponse.sendWithError(res, 'Invalid Credentials!', 400);
    }
  }
}

export default new UserController();
