import express from 'express';
import config from './config';
import { handleCORS, isLogin } from './utils/middleware';
import { useRouter } from './router/index';
import { useDatabase } from './utils/database';

const app = express();

app.use(handleCORS, express.json(), isLogin); // 全局中间件

useRouter(app);

useDatabase();

app.listen(config.port, () => {
  console.log(`Server is running on ${config.port} ...`);
});
