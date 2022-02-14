import express, { Express } from 'express';
import userRouter from './user/user.routes';
import porductRoutes from './product/product.routes';

const apiRouter = express.Router();

apiRouter.use(userRouter);
apiRouter.use(porductRoutes);

export default apiRouter;
