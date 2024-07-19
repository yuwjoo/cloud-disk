import { sts } from '@/api/base';
import OSS from 'ali-oss';

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
 * @param {string} hash hash值
 */
export async function putFile(file: File, hash: string) {
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
  const client = await useOSS();
  const result = await client.put(`${uploadPath}/${Date.now()}-${file.name}`, file, options);

  return result;
}

/**
 * @description: 分片上传
 * @param {File} file 文件
 * @param {string} hash hash值
 */
export async function multipartUpload(file: File, hash: string) {
  const progress = (p: any, _checkpoint: any) => {
    // Object的上传进度。
    console.log({ p });
    // 分片上传的断点信息。
    console.log({ _checkpoint });
  };

  const headers = {
    // 指定Object的存储类型。
    // 'x-oss-storage-class': 'Standard'
  };
  const client = await useOSS();

  const result = await client.multipartUpload(`${uploadPath}/${Date.now()}-${file.name}`, file, {
    progress,
    headers,
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
  });

  console.log('返回结果', result);

  return result;
}
