import folder from '@/assets/images/fileSystem/small/folder.png';
import compressedFile from '@/assets/images/fileSystem/small/compressedFile.png';
import docmentFile from '@/assets/images/fileSystem/small/docmentFile.png';
import executionFile from '@/assets/images/fileSystem/small/executionFile.png';
import pdfFile from '@/assets/images/fileSystem/small/pdfFile.png';
import type { FileType } from '../types';
import dayjs from 'dayjs';

/**
 * @description: 解析文件封面
 * @param {string} name 文件名
 * @param {FileType} type 文件类型
 * @return {string} 文件封面
 */
export function parseFileCover(name: string, type: FileType): string {
  const suffix = name.match(/\.([^.]*)$/)?.[1].toLocaleLowerCase();

  if (type === 'dir') {
    return folder;
  }

  if (suffix === 'zip' || suffix === '7z' || suffix === 'rar') {
    return compressedFile;
  } else if (suffix === 'exe') {
    return executionFile;
  } else if (suffix === 'pdf') {
    return pdfFile;
  } else if (suffix === 'txt' || suffix === 'html') {
    return docmentFile;
  } else {
    return docmentFile;
  }
}

/**
 * @description: 字节大小到字符大小
 * @param {number} size 字节大小
 * @return {string} 字符大小
 */
export function byteSizeToString(size: number): string {
  if (size < 1024) {
    return `${size}B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)}KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)}MB`;
  } else {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`;
  }
}

/**
 * @description: 解析文件日期
 * @param {number} time 时间戳
 * @return {string} 文件日期
 */
export function parseFileDate(time: number): string {
  return dayjs(time).format('YYYY/MM/DD HH:mm:ss');
}
