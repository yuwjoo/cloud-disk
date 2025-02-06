import { fileURLToPath, URL } from "url";
import path from "path";

/**
 * @description: 解析成文件路径
 * @param {string} filePath 路径
 * @return {string} 文件路径
 */
export function toFilePath(filePath: string): string {
  return fileURLToPath(new URL(path.join("../", filePath), import.meta.url));
}
