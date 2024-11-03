/*
 * @FileName: 分片类
 * @FilePath: \cloud-disk\src\utils\uploadManager\class\Part.ts
 * @Author: YH
 * @Date: 2024-08-29 13:16:11
 * @LastEditors: YH
 * @LastEditTime: 2024-08-29 14:15:25
 * @Description:
 */
export class Part {
  number: number; // 序号
  size: number; // 大小
  file: File; // 文件
  url?: string; // 上传地址
  expire?: number; // 过期时间戳
  etag?: string; // etag

  // 二进制数据
  get blob() {
    return this.file.slice((this.number - 1) * this.size, this.number * this.size);
  }

  // 是否有效
  get isValid() {
    return this.url && (!this.expire || Date.now() < this.expire);
  }

  constructor(
    number: number,
    size: number,
    file: File,
    url?: string,
    expire?: number,
    etag?: string
  ) {
    this.number = number;
    this.url = url;
    this.expire = expire;
    this.etag = etag;
    this.size = size;
    this.file = file;
  }
}
