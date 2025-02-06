import { createPinia, type Pinia } from 'pinia';

const pinia = createPinia();

/**
 * @description: 使用pinia实例
 * @return {Pinia} pinia
 */
export function usePinia(): Pinia {
  return pinia;
}
