import express, { Request, Response } from 'express';

// to pass the async errors to the error handler automatically
// without the need to use next() with every route
require('express-async-errors');

import { errorHandler } from './middlewares/error-handler';
import apiRouter from './components/routes';
import morganMiddleware from './middlewares/morgan';
import { currentUser } from './middlewares/current-user';

const app = express();
app.use(express.json());
app.use(currentUser);
app.use(morganMiddleware);

app.get('/', (req: Request, res: Response): void => {
  res.send('Welcome to the home page!');
});

app.use('/api', apiRouter);

app.all('*', async (req, res) => {
  res.status(404).send('Not Found!');
});

app.use(errorHandler);

export default app;
