import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';

import UserController from './user.controller';
import { getUserValidation } from './user.schemas';
import { requireAuth } from '../../middlewares/auth';
const users = express.Router();

// TODO: me && getUseres route should be garded by admin middleware.
users.get('/users', UserController.getUsers);
users.get('/users/me', requireAuth, UserController.me);
users.get('/users/:id', [requireAuth, validateRequest(getUserValidation)], UserController.getUser);
users.post('/users', UserController.signUp);

export default users;
