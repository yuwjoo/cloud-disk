import { sts } from '@/request/apis/common';
import { batchCreateFile } from '@/request/apis/overview';
import OSS from 'ali-oss';

let client: OSS;
let context: string;

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
    context = res.data!.context;
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
  // 自定义请求头
  const headers = {
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
  };

  try {
    const client = await useOSS();
    const result = await client.put(`storage/${context}/${file.name}`, file, { headers });
    console.log(result);
    batchCreateFile({
      fileList: [
        {
          name: file.name,
          size: file.size,
          ossPath: result.name
        }
      ]
    });
  } catch (e) {
    console.log(e);
  }
}
