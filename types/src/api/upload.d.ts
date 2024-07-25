import type { ResponseBody } from '../utils/request';

// 分片上传请求参数
export type MultipartUploadReqParams = {
  file: File; // 文件
  partSize: number; // 分片大小
  multipartUrls: { partNumber: number; url: string }[]; // 上传url列表
  nextMultipartUrl?: string; // 继续上传的url
  submitMultipartUrl?: string; // 提交分片的url
};

// 分片上传响应数据
export type MultipartUploadResData = ResponseBody<{
  folderPath: string; // 文件夹路径
  file?: {
    fullPath: string; // 完整路径
    name: string; // 名称
    size: number; // 大小
    type: 'file'; // 类型
    cover: string; // 封面
    createTime: number; // 创建日期时间戳
    modifiedTime: number; // 修改日期时间戳
  };
}>;
