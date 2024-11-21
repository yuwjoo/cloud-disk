import { createPinia, type Pinia } from 'pinia';

let pinia: Pinia | null = null;

/**
 * @description: 使用pinia实例
 * @return {Pinia} pinia
 */
export function usePinia(): Pinia {
  if (!pinia) pinia = createPinia();
  return pinia;
}
