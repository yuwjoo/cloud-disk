import { useUserStore } from '@/store/user';

const userStore = useUserStore();

/**
 * @description: 拼接云盘路径
 * @param {string} dir 目录路径
 * @return {string} 云盘完整路径
 */
export function joinCloudPath(dir: string): string {
  const root = userStore.user?.storageOrigin || '/';
  if (dir.startsWith(root)) {
    return dir;
  } else {
    return root + (dir.startsWith('/') ? dir.slice(1) : dir);
  }
}

/**
 * @description: 解析云盘相对路径
 * @param {string} cloudPath 云盘路径
 * @return {string} 云盘完整路径
 */
export function parseCloudRelativePath(cloudPath: string): string {
  const root = userStore.user?.storageOrigin || '/';
  const relativePath = cloudPath.startsWith(root) ? cloudPath.replace(root, '') : cloudPath;
  return '/' + relativePath;
}
