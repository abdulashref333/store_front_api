import app from '../app';
import { checkingEnvVariables } from '../config/checking-env-variables';
import Logger from './middlewares/logger';
const port = process.env.PORT || 3000;

const start = async () => {
  checkingEnvVariables();
  // await startDbConnection();

  app.listen(port, () => Logger.info('Listening on port 3000!'));
};

start();
