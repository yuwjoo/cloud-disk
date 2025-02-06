/**
 * @description: 用户信息
 */
export interface UserInfo {
  account: string; // 账号
  nickname: string; // 昵称
  avatar: string; // 头像
  status: 'enable' | 'disable'; // 状态
  role: RoleInfo; // 角色信息
  storageOrigin: string; // 存储起点
}

/**
 * @description: 角色信息
 */
export interface RoleInfo {
  name: string; // 名称
  describe: string; // 描述
}
