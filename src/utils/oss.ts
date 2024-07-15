import { sts } from '@/api/base';
import { createFile, getResourceFlag } from '@/api/overview';
import OSS from 'ali-oss';
import type { UploadCallbackResponseData } from 'types/src/api/overview';

let client: OSS;
let uploadPath: string;

/**
 * @description: 使用oss
 * @return {OSS} OSS
 */
export async function useOSS(): Promise<OSS> {
  if (client) return client;

  const stsData = await getSts();

  client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: stsData.accessKeyId,
    accessKeySecret: stsData.accessKeySecret,
    stsToken: stsData.stsToken,
    bucket: `yuwjoo-private-cloud-storage`,
    refreshSTSToken: getSts,
    // @ts-ignore
    authorizationV4: true,
    secure: true
  });

  return client;
}

/**
 * @description: 获取sts临时凭证
 */
async function getSts(): Promise<{
  accessKeyId: string;
  accessKeySecret: string;
  stsToken: string;
}> {
  return sts().then((res) => {
    uploadPath = res.data!.uploadPath;
    return {
      accessKeyId: res.data!.AccessKeyId,
      accessKeySecret: res.data!.AccessKeySecret,
      stsToken: res.data!.SecurityToken
    };
  });
}

/**
 * @description: 简单上传
 * @param {File} file 文件
 */
export async function putFile(file: File) {
  console.log(file);
  const hash = await getFileHash(file);

  const res = await getResourceFlag({ fileHash: hash, fileSize: file.size });

  if (res.data) {
    createFile({
      resourceFlag: res.data,
      filename: file.name
    });
    return;
  }

  const options = {
    headers: {
      // 指定Object的存储类型。
      'x-oss-storage-class': 'Standard',
      // 指定Object的访问权限。
      'x-oss-object-acl': 'private',
      // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
      'Content-Disposition': 'attachment; filename="example.txt"',
      // 设置Object的标签，可同时设置多个标签。
      'x-oss-tagging': 'Tag1=1&Tag2=2',
      // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
      'x-oss-forbid-overwrite': 'false'
    },
    callback: {
      // 设置回调请求的服务器地址
      url: import.meta.env.VITE_APP_SERVERURL + '/oss/uploadCallback',
      // 设置发起回调时请求body的值。
      body: 'object=${object}&size=${size}&mimeType=${mimeType}&hash=${x:hash}&token=${x:token}',
      // 设置发起回调请求的Content-Type。
      contentType: 'application/x-www-form-urlencoded',
      // 设置发起回调请求的自定义参数。
      customValue: {
        hash,
        token: localStorage.getItem('token')
      }
    }
  };

  try {
    const client = await useOSS();
    const result = await client.put(`${uploadPath}/${Date.now()}-${file.name}`, file, options);
    console.log(result);
    createFile({
      resourceFlag: (result.data as UploadCallbackResponseData).data!.resourceFlag,
      filename: file.name
    });
  } catch (e) {
    console.log(e);
  }
}

/**
 * @description: 获取文件hash
 * @param {File} file 文件
 * @return {Promise<string>} 文件hash
 */
function getFileHash(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const buffer = e.target?.result;

      if (!buffer) {
        reject(new Error('读取失败'));
        return;
      }

      crypto.subtle
        .digest('SHA-256', buffer as ArrayBuffer)
        .then((hashBuffer) => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
          resolve(hashHex);
        })
        .catch((error) => {
          reject(error);
        });
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
}
