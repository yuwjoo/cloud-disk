import type { Request, Response } from 'express';
import type { ResponseBody } from '../utils/response';
import { createResponseJSON, enumCode } from '../utils/response';
import { type RolesTable, type UsersTable, useDatabase } from '../utils/database';
import { createUserToken } from '../utils/jwt';
import type { LoginReqParams, LoginResData } from 'types/src/router/login';

/**
 * @description: 登录接口
 * @param {Request} req 请求
 * @param {Response} res 响应
 */
export default async function login(
  req: Request<any, any, LoginReqParams>,
  res: Response<ResponseBody<LoginResData | undefined>>
) {
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

    res.json(
      createResponseJSON({
        token: await createUserToken({ id: user.id, password: user.password }), // 生成token
        info: {
          name: user.username,
          roleId: user.role_id,
          role: role?.name || '',
          avatar: user.avatar
        } // 用户信息
      })
    );
  } catch (error) {
    res.json(createResponseJSON(undefined, '服务器内部错误', enumCode.serverError));
  }
}
