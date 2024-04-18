import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { addRouterInterceptor } from './interceptor';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

addRouterInterceptor(router);

export default router;
