import { baiduyunAuthRequest, baiduyunRequest } from './baiduyunRequest';
import { request } from './request';

/**
 * @description: 使用request实例
 */
export const useRequest = request;

/**
 * @description: 使用百度云认证request实例
 */
export const useBaiduyunAuthRequest = baiduyunAuthRequest;

/**
 * @description: 使用百度云request实例
 */
export const useBaiduyunRequest = baiduyunRequest;
