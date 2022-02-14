import express, { Express } from 'express';
import userRouter from './user/user.routes';
import porductRoutes from './product/product.routes';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/products', porductRoutes);

export default apiRouter;
