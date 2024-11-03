/*
 * @FileName: axios包装类
 * @FilePath: \cloud-disk\src\utils\uploadManager\multipartUpload\AxiosWrapper.ts
 * @Author: YH
 * @Date: 2024-08-29 14:27:24
 * @LastEditors: YH
 * @LastEditTime: 2024-08-30 10:45:03
 * @Description:
 */
import axios, { type AxiosInstance, type AxiosRequestConfig, type CancelTokenSource } from 'axios';

export type AxiosWrapperConfigs = {
  axios: AxiosInstance;
  configs: AxiosRequestConfig;
  options?: {
    maxRetryCount?: number;
  };
};

export class AxiosWrapper {
  cancelSource: CancelTokenSource = axios.CancelToken.source(); // 取消请求标识
  axios: AxiosInstance; // axios实例
  configs: AxiosRequestConfig; // 请求配置
  maxRetryCount: number = 0; // 最大重试次数

  constructor(configs: AxiosWrapperConfigs) {
    this.axios = configs.axios;
    this.configs = configs.configs;
    this.maxRetryCount = configs.options?.maxRetryCount || 0;
  }

  /**
   * @description: 发起请求
   * @return {Promise<any>} promise
   */
  send(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i <= this.maxRetryCount; i++) {
        try {
          const res = await this.axios({ ...this.configs, cancelToken: this.cancelSource.token });
          resolve(res);
          break;
        } catch (err) {
          if (axios.isCancel(err) || i === this.maxRetryCount) {
            reject(err);
            break;
          }
        }
      }
    });
  }

  /**
   * @description: 取消请求
   */
  cancel() {
    this.cancelSource.cancel();
  }
}
