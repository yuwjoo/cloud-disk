import { createPinia, type Pinia } from 'pinia';

const pinia = createPinia();

/**
 * @description: 获取pinia
 * @return {Pinia} pinia
 */
export function usePinia(): Pinia {
  return pinia;
}
