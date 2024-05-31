// 请求参数
export type LoginReqParams = {
  username: string;
  password: string;
};

// 响应数据
export type LoginResData = {
  token: string;
  info: {
    name: string;
    roleId: string;
    role: string;
    avatar: string | null;
  };
};

export {};
