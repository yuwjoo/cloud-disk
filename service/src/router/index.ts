import type { Express } from 'express';
import login from './login';

/**
 * @description: 服务路由-hook
 * @param {Express} app 服务实例
 */
export function useRouter(app: Express) {
  app.post('/login', login);
}
