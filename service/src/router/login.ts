import type { Request, Response } from 'express';
import type { ResponseBody } from '../utils/response';
import { createResponseJSON, enumCode } from '../utils/response';
import { RolesTable, UsersTable, useDatabase } from '../utils/database';
import { createUserToken } from '../utils/jwt';

// 请求参数
type ReqBody = {
  username: string;
  password: string;
};

// 响应数据
type ResBody = ResponseBody<
  | {
      token: string;
      info: {
        name: string;
        role: string;
        avatar?: string;
      };
    }
  | undefined
>;

/**
 * @description: 登录接口
 * @param {Request} req 请求
 * @param {Response} res 响应
 */
export default async function login(req: Request<any, any, ReqBody>, res: Response<ResBody>) {
  try {
    const data = req.body;

    if (!data || !data.username || !data.password) {
      res.json(createResponseJSON(undefined, '用户名或密码不能为空', enumCode.error));
      return;
    }

    const user = await useDatabase().promiseGet<UsersTable>(
      `SELECT * FROM users  
        WHERE username = '${data.username}'  
        AND password = '${data.password}';`
    ); // 在数据库中查找用户

    if (!user) {
      res.json(createResponseJSON(undefined, '用户名或密码错误', enumCode.error));
      return;
    }

    const [, role] = await Promise.all([
      useDatabase().promiseRun(
        `UPDATE users  
        SET last_login = datetime('now', 'localtime')  
        WHERE id = ${user.id};`
      ), // 更新最后登录时间
      useDatabase().promiseGet<Pick<RolesTable, 'name'>>(
        `SELECT name  
          FROM roles  
          WHERE id = '${user.role_id}';`
      ) // 查找当前用户角色名
    ]);
    console.log(user.avatar, typeof user.avatar)

    const token = await createUserToken({ id: user.id }); // 生成token
    const info = {
      name: user.username,
      role: role?.name || '',
      avatar: user.avatar
    }; // 用户信息
    res.json(createResponseJSON({ token, info }));
  } catch (error) {
    res.json(createResponseJSON(undefined, '服务器内部错误', enumCode.serverError));
  }
}
