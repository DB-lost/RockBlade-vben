import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel, WxCpLoginVo } from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Login = '/backstage/login',
  Logout = '/backstage/logout',
  GetUserInfo = '/backstage/getUserInfo',
  GetPermCode = '/backstage/getPermCode',
  TestRetry = '/testRetry',
  GetWxCpQrcode = '/backstage/getWxCpQrcode',
  WxCpLogin = '/backstage/wxCpLogin',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

/**
 * 获取企业微信二维码
 */
export function getWxCpQrcode() {
  return defHttp.get({ url: Api.GetWxCpQrcode });
}

/**
 * 企业微信登录
 */
export function wxCpLogin(params) {
  return defHttp.get<WxCpLoginVo>({ url: Api.WxCpLogin, params: params });
}
