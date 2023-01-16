import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';

import UserController from './user.controller';
import { getUserValidation, addUserValidation, loginValidation } from './user.schemas';
import { requireAuth } from '../../middlewares/auth';
const users = express.Router();

// TODO: me && getUseres route should be garded by admin middleware.
users
  .get('/', UserController.getUsers)
  .get('/me', requireAuth, UserController.me)
  .get('/:id', [requireAuth, validateRequest(getUserValidation)], UserController.getUser)
  .post('/', validateRequest(addUserValidation), UserController.signUp)
  .post('/login', validateRequest(loginValidation), UserController.logIn)
  .patch('/:id', requireAuth, UserController.updateUser);
export default users;
