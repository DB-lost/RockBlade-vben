/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  roles: RoleInfo[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

/**
 * @description: 企微登录参数
 */
export interface WxCpLoginParams {
  code: string;
}

/**
 * @description: 注册参数
 */
export interface RegisterParams {
  phone: string;
  idCard: string;
  bankCard: string;
  email: string;
  code: string;
  sex: boolean;
}
