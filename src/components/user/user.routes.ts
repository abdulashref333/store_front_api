import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';

import UserController from './user.controller';
import { getUserValidation } from './user.schemas';
import { requireAuth } from '../../middlewares/auth';
const userRouter = express.Router();

// TODO: me && getUseres route should be garded by admin middleware.
userRouter.get('/users', UserController.getUsers);
userRouter.get('/users/me', requireAuth, UserController.me);
userRouter.get('/users/:id', [requireAuth, validateRequest(getUserValidation)], UserController.getUser);
userRouter.post('/users', UserController.signUp);

export default userRouter;
