import { useUserStore } from '@/store/user';

/**
 * @description: 拼接云盘路径
 * @param {string} dir 目录路径
 * @return {string} 云盘完整路径
 */
export function joinCloudPath(dir: string): string {
  const root = useUserStore().user?.storageOrigin || '/';
  if (dir.startsWith(root)) {
    return dir;
  } else {
    return root + (dir.startsWith('/') ? dir.slice(1) : dir);
  }
}
