import routes from '@/router';
import { createRouter as createVueRouter, createWebHistory, type Router } from 'vue-router';
import { beforeEach } from './interceptor';

const router = createVueRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

router.beforeEach(beforeEach);

/**
 * @description: 获取router
 * @return {Router} router
 */
export function useRouter(): Router {
  return router;
}
