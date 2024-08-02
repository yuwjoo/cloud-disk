import type { MultipartUploadReqParams } from 'types/src/api/upload';
import { ConcurrentRequest } from './concurrentRequest';
import type { AxiosRequestConfig } from 'axios';
import { getFileHash } from '../utils';
import { createFile } from '@/api/overview';
import request from '../request';

const concurrentRequest = new ConcurrentRequest(5);

// 上传任务-信息：文件对象，上传进度，上传目标位置，状态（上传中，暂停，成功，失败）
// 上传文件-操作：暂停，继续，删除，打开文件所在目录（可选）

// createFile: 对比文件hash，如果文件hash存在，根据文件名创建文件，如果文件hash不存在，根据上传类型返回上传id或简单上传url
// getMultipartParts: 根据上传id获取分片上传url
// completeMultipart: 根据上传id完成分片上传

class uploadTask {
  status: Ref<'pending' | 'upload' | 'paused' | 'success' | 'fail'> = ref('pending'); // 状态 (pending:等待上传，upload:正在上传，paused:暂停上传，success:上传成功，fail:上传失败)
  progress: Ref<number> = ref(0); // 上传进度
  uploadPath: string; // 上传目标位置
  file: File; // 文件对象
  mimeType: string; // 文件类型
  uploadMode: 'multipart' | 'simple'; // 上传模式

  constructor(file: File, uploadPath: string) {
    this.file = file;
    this.uploadPath = uploadPath;
    this.mimeType = file.type || 'application/octet-stream';
    this.uploadMode = this.file.size > 100 * 1024 * 1024 ? 'multipart' : 'simple';
  }

  async init() {
    const result = await createFile({
      folderPath: this.uploadPath,
      fileHash: await getFileHash(this.file),
      fileSize: this.file.size,
      fileName: this.file.name,
      mimeType: this.mimeType,
      uploadMode: this.uploadMode,
      forceUpload: false
    });
  }

  /**
   * @description: 开始上传
   */
  async play() {
    if (this.status.value !== 'pending' && this.status.value !== 'paused') return;
    this.status.value = 'upload';

    concurrentRequest.addTask(
      {
        url: '/fileSystem/createFile',
        method: 'post',
        data: {
          folderPath: this.uploadPath,
          fileHash: await getFileHash(this.file),
          fileSize: this.file.size,
          fileName: this.file.name,
          mimeType: this.mimeType,
          uploadMode: this.uploadMode,
          forceUpload: false
        }
      },
      { axios: request }
    );
  }

  /**
   * @description: 暂停上传
   */
  pause() {
    if (this.status.value !== 'upload') return;
    this.status.value = 'paused';
  }

  /**
   * @description: 删除上传
   */
  delete() {}
}

class UploadManager {}

export async function multipartUpload(params: MultipartUploadReqParams) {
  const requestConfigs: AxiosRequestConfig[] = params.multipartUrls.map((part) => ({
    url: part.uploadUrl,
    method: 'put',
    data: params.file.slice(part.startPos, part.endPos),
    headers: {
      'Content-Type': params.file.type || 'application/octet-stream'
    }
  }));
  const requestPool = new Set();
  const maxPoolSize = 5;

  while (requestPool.size < maxPoolSize) {
    const config = requestConfigs.shift();
    if (!config) break;
    concurrentRequest.addTask(config).then();
  }

  // const eTags: string[] = []; // 分片eTag列表
  // let submitMultipartUrl = params.submitMultipartUrl;

  // const createUpload = async (url: string, partNumber: number) => {
  //   const res = await axios({
  //     url,
  //     method: 'put',
  //     data: params.file.slice((partNumber - 1) * params.partSize, partNumber * params.partSize),
  //     headers: {
  //       'Content-Type': params.file.type || 'application/octet-stream'
  //     }
  //   });
  //   eTags[partNumber - 1] = res.headers['etag'];
  // };
  // const concurrentRequest = concurrentRequestAll(
  //   params.multipartUrls.map(({ url, partNumber }) => createUpload.bind(null, url, partNumber)),
  //   { retry: 5 }
  // );
  // const addNextRequest = (url?: string) => {
  //   if (!url) return;
  //   const nextRequest = async () => {
  //     const res = await getMultipart(url);
  //     concurrentRequest.insertRequest(
  //       res.data.multipartUrls.map(({ url, partNumber }) =>
  //         createUpload.bind(null, url, partNumber)
  //       )
  //     );
  //     addNextRequest(res.data.nextMultipartUrl);
  //     submitMultipartUrl = res.data.submitMultipartUrl;
  //   };
  //   concurrentRequest.insertRequest([nextRequest]);
  // };

  // addNextRequest(params.nextMultipartUrl);

  // await concurrentRequest.promise;

  // console.log(eTags, submitMultipartUrl);

  // return {} as any;
}
