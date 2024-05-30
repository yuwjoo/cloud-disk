import { request } from '..';

export function login(data: any) {
  return request({
    url: '/login',
    method: 'post',
    data
  });
}

export function getList() {
  return request({});
}
