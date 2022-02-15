import express, { Express } from 'express';
import userRouter from './user/user.routes';
import porductRoutes from './product/product.routes';
import orders from './order/order.routes';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/products', porductRoutes);
apiRouter.use('/orders', orders);

export default apiRouter;
