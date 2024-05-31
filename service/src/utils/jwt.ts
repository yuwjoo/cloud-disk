import type { JwtPayload } from 'jsonwebtoken';
import type { UsersTable } from './database';
import jwt from 'jsonwebtoken';
import config from '../config';

export type UserParams = {
  id: UsersTable['id'];
  password: UsersTable['password'];
};

export type JwtUserPayload = UserParams & JwtPayload;

const jwtSecretKey =
  'AAAAB3NzaC1yc2EAAAADAQABAAABgQDK8f3vfQmOul83ElRKIgin72PRNQX0zMzlc9JOQyU385xwGP39tUyRGshSW1EsP2Yc3Oqqis7fHR158kTAkuOxNttAkd2xcwdy9+Z18x6ehGyQxNNuGDp8Myfv+sIfDmrScuLywt2CHFTzufKWJosEECv3MmBtbZcixZ4Zs3HcbiDGEYtblQTUVvChegoBI2d8wW8evpIUHMCJQv5A3QcWZGFIB0+34Ww6c7X4SkY7jjYyiXGt9FYV1M9TqKNJqzNCZ1umSSXw4t7bPvq0+XeHXWIsga1+LS6vnGoqxTb1H6o+hSBgVdyeEj54Gqt5K816zHM0kGSnI1nG1uTZHWezRawdj+pUfF2z/2nCHDiwQ/BmqEDULWBSz11RVBApQDK4NgnAwKUjjsQ/xIYZV74kTLsQVABDcklot89RYpmH+6u6n7ebbnH+R/8rNQIFSdluUS0qH8FoN3S4LTczYGbvrOsAzHpFqjFQNSqjtsDV67JIHCFnETLEqMnPG4M9J0s=';

/**
 * @description: 创建用户token
 * @param {UserParams} data 额外信息
 * @return {Promise<string>} token
 */
export async function createUserToken(data: UserParams): Promise<string> {
  return jwt.sign(data, jwtSecretKey, { expiresIn: config.tokenExpirationTime });
}

/**
 * @description: 校验用户token
 * @param {string} token token
 * @return {Promise<JwtUserPayload>} token信息
 */
export async function verifyUserToken(token: string): Promise<JwtUserPayload> {
  return jwt.verify(token, jwtSecretKey) as Promise<JwtUserPayload>;
}
