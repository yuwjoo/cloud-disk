/*
 * @FileName: 分片上传类
 * @FilePath: \cloud-disk\src\utils\transferManager\utils\multipartUpload\MultipartUpload.ts
 * @Author: YH
 * @Date: 2024-08-13 16:50:00
 * @LastEditors: YH
 * @LastEditTime: 2024-08-21 18:00:37
 * @Description:
 */

import request from '@/utils/request';
import axios from 'axios';
import { TaskExecutor } from '../taskExecutorManager/TaskExecutor';

export type PartsUploadOptions = {
  file: File; // 文件
  uploadId: string; // 上传id
  partSize?: number; // 分片大小 (btye)
  defaultPartList?: PartsUploadPart[]; // 默认分片列表
};

export type PartsUploadPart = {
  number: number; // 下标
  url?: string; // 上传地址
  expire?: number; // 过期时间戳
  ETag?: string; // ETag
};

class PartsUpload {
  status: 'uploading' | 'pausing' | 'success' | 'fail'; // 状态 uploading: 上传中, pausing: 暂停中,  success: 成功 fail: 失败
  file: File; // 文件
  uploadId: string; // 上传id
  partSize: number; // 分片大小
  partList: PartsUploadPart[]; // 分片列表
  unknownNumbers: number[] = []; // 未知分片下标数组

  constructor(options: PartsUploadOptions) {
    this.status = 'pausing';
    this.file = options.file;
    this.uploadId = options.uploadId;
    this.partSize = options.partSize || 1024 * 1024; // 默认分片大小为1M
    this.partList = this.initPartList(options.defaultPartList || []);
  }

  /**
   * @description: 初始化分片列表
   * @param {PartsUploadPart} defaultPartList 默认分片列表
   * @return {PartsUploadPart[]} 分片列表
   */
  initPartList(defaultPartList: PartsUploadPart[]): PartsUploadPart[] {
    const partList = Array.from({ length: Math.ceil(this.file.size / this.partSize) }, (_, i) => {
      return { number: i + 1 };
    });

    for (const part of defaultPartList) {
      partList[part.number - 1] = part;
    }

    return partList;
  }

  /**
   * @description: 开始上传
   */
  async start() {
    this.status = 'uploading';

    for (const part of this.partList) {
      if (part.ETag) continue; // 跳过已经上传完成的分片
      this.#addUploadTask(part);
    }

    // this.status = 'uploading';
    // try {
    //   while (this.asyncTaskManager.taskPool.size > 0) {
    //     await Promise.race(this.asyncTaskManager.taskPool);
    //   }
    // } catch (err) {
    //   this.status = 'fail';
    // }
  }

  /**
   * @description: 添加上传任务
   */
  #addUploadTask(part: PartsUploadPart) {
    const { token, cancel } = axios.CancelToken.source();

    const taskExecutor = new TaskExecutor(async (success, fail) => {
      if (part.url && (!part.expire || Date.now() < part.expire)) {
        // 上传分片数据
        axios
          .put(
            part.url,
            this.file.slice((part.number - 1) * this.partSize, part.number * this.partSize),
            {
              headers: {
                'Content-Type': this.file.type || 'application/octet-stream',
                'x-oss-forbid-overwrite': true
              },
              cancelToken: token
            }
          )
          .then((res) => {
            part.ETag = res.headers['etag'];
            success();
          })
          .catch(fail);
      } else if (this.unknownNumbers.length < 20) {
        // 添加需要获取上传地址的分片序号
        this.unknownNumbers.push(part.number);
        fail('cancel');
      } else {
        // 请求分片上传地址
        request
          .post(
            '/api/oss/uploadPart',
            {
              uploadId: this.uploadId,
              numbers: this.unknownNumbers
            },
            {
              cancelToken: token
            }
          )
          .then((res) => {
            res.data.forEach((item: Required<Omit<PartsUploadPart, 'ETag'>>) => {
              this.partList[item.number - 1] = item;
              this.#addUploadTask(item);
            });
            success();
          })
          .catch(fail);
        this.unknownNumbers.length = 0;
      }
    }, cancel);
  }

  // /**
  //  * @description: 添加上传任务
  //  */
  // async addUploadTask() {
  //   await this.setPartList();
  //   this.uploadPart();
  //   this.startPartNumber += this.pageSize;
  //   if (this.startPartNumber < this.partTotal) this.addUploadTask();
  // }

  // /**
  //  * @description: 设置分片列表
  //  */
  // async setPartList() {
  //   new PromiseTask(async (resolve, reject, abort) => {
  //     const {token, cancel} = axios.CancelToken.source();

  //     request({
  //       url: '/fileSystem/multipartUpload',
  //       method: 'post',
  //       data: {
  //         uploadId: this.uploadId,
  //         startPartNumber: this.startPartNumber,
  //         count: this.pageSize
  //       },
  //       cancelToken: token
  //     }).then(resolve, err => axios.isCancel(err) ? abort() : reject(err));

  //     return cancel;
  //   })
  //     .then((res: any) => {
  //       console.log('成功', res);
  //     })
  //     .catch((err: any) => {
  //       console.log('失败', err);
  //     })
  //     .finally(() => {
  //       console.log('完成');
  //     })
  //     .mount(this.asyncTaskManager);
  // }

  //   // request, {
  //   //   url: '/fileSystem/multipartUpload',
  //   //   method: 'post',
  //   //   data: {
  //   //     uploadId: this.uploadId,
  //   //     startPartNumber: this.startPartNumber,
  //   //     count: this.pageSize
  //   //   }
  //   // });
  //   // const parts = data.uploadUrls.map((url: string) => ({ url }));

  //   // this.partList.splice(this.startPartNumber - 1, this.pageSize, ...parts);
  // }

  // /**
  //  * @description: 上传分片
  //  */
  // uploadPart() {
  //   for (let i = this.startPartNumber - 1; i < this.partList.length; i++) {
  //     if (this.partList[i].etag) continue; // 跳过已经上传完成的分片

  //     this.asyncTaskManager
  //       .push(axios, {
  //         url: this.partList[i].url,
  //         method: 'put',
  //         data: this.file.slice(i * this.partSize, (i + 1) * this.partSize),
  //         headers: {
  //           'Content-Type': this.file.type || 'application/octet-stream',
  //           'x-oss-forbid-overwrite': true,
  //           'x-oss-object-acl': 'private',
  //           'x-oss-storage-class': 'Standard'
  //         }
  //       })
  //       .then((res) => {
  //         this.partList[i].etag = res.headers['etag'];
  //       });
  //   }
  // }
}

export function usePartsUpload(options: PartsUpload) {
  return new PartsUpload(options);
}
