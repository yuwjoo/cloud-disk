import request from '@/utils/request';
import type { LoginReqParams, LoginResData, StsReqParams, StsResData } from 'types/src/api/base';

/**
 * @description: 登录
 * @param {LoginReqParams} data 参数
 * @return {Promise<LoginResData>} 响应
 */
export function login(data: LoginReqParams): Promise<LoginResData> {
  return request({
    url: '/user/login',
    method: 'post',
    data
  });
}

/**
 * @description: 获取sts凭证
 * @param {StsReqParams} params 参数
 * @return {Promise<StsResData>} 响应
 */
export function sts(params: StsReqParams): Promise<StsResData> {
  return request({
    url: '/oss/sts',
    method: 'get',
    params
  });
}

export function testPost(data: any) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  });
}

export function testGet(params: any) {
  return request({
    url: '/user/register',
    method: 'get',
    params
  });
}

export function register(data: any) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  });
}
