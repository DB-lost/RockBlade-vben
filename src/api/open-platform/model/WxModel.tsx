/**
 * 小程序信息
 */
export interface AppInfo {
  authorizerInfo: AuthorizerInfo;
  authorizationInfo: AuthorizationInfo;
}

interface AuthorizerInfo {
  nickName: string;
  headImg: string;
  principalName: string;
  signature: string;
  qrcodeUrl: string;
  userName: string;
  miniProgramInfo: MiniProgramInfo;
}

interface AuthorizationInfo {
  authorizerAppid: string;
}

interface MiniProgramInfo {
  categories: Categories[];
}

interface Categories {
  first: string;
  second: string;
}

/**
 * 基础信息
 */
export interface BaseInfo {
  appid: string;
  account_type: number;
  principal_type: number;
  principal_name: string;
  realname_status: number;
}
