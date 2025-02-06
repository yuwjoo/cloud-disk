import routes from '@/router';
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalizedLoaded,
  type Router
} from 'vue-router';
import { beforeEach } from './interceptor';

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

/**
 * @description: 使用router实例
 * @return {Router} router
 */
export function useRouter(): Router {
  return router;
}

/**
 * @description: 使用route实例
 * @return {RouteLocationNormalizedLoaded} route
 */
export function useRoute(): RouteLocationNormalizedLoaded {
  return new Proxy(router.currentRoute, {
    get(target: Ref<RouteLocationNormalizedLoaded>, key: keyof RouteLocationNormalizedLoaded) {
      return target.value[key];
    }
  }) as unknown as RouteLocationNormalizedLoaded;
}

router.beforeEach(beforeEach);
