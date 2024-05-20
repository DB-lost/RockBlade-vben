import { defHttp } from '@/utils/http/axios';

enum Api {
  GetWxOpenAuthPage = '/backstage/wxOpen/getWxOpenAuthPage',
  GetAuthorizedLink = '/backstage/wxOpen/getAuthorizedLink',
  GetAppInfo = '/backstage/wxOpen/getAppInfo',
  UnbindOpenAccount = '/backstage/wxOpen/unbindOpenAccount',
}

/**
 * @description: 查询微信开放平台授权分页列表
 */
export const getWxOpenAuthPage = (params?) => {
  return defHttp.get({ url: Api.GetWxOpenAuthPage, params: params });
};

/**
 * @description: 获取授权链接 api
 */
export function getAuthorizedLink(params?) {
  return defHttp.get({
    url: Api.GetAuthorizedLink,
    params,
  });
}

/**
 * @description: 获取小程序详情 api
 */
export function getAppInfo(params?) {
  return defHttp.get({
    url: Api.GetAppInfo,
    params,
  });
}
