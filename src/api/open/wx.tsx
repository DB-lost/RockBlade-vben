import { defHttp } from '@/utils/http/axios';
import { AppInfo, BaseInfo } from '@/api/open/model/WxModel';

enum Api {
  GetWxOpenAuthPage = '/backstage/wxOpen/getWxOpenAuthPage',
  GetAuthorizedLink = '/backstage/wxOpen/getAuthorizedLink',
  GetAppInfo = '/backstage/wxOpen/getAppInfo',
  GetTemplateList = '/backstage/wxOpen/getTemplateList',
  GetTrialQrCode = '/backstage/wxOpen/getTrialQrCode',
  GetTemplateDraftList = '/backstage/wxOpen/getTemplateDraftList',
  AddToTemplate = '/backstage/wxOpen/addToTemplate',
  DeleteTemplate = '/backstage/wxOpen/deleteTemplate/',
  Commit = '/backstage/wxOpen/commit',
  SubmitAudit = '/backstage/wxOpen/submitAudit',
  GetOpenPlatformAuditPageList = '/backstage/wxOpen/getOpenPlatformAuditPageList',
  Release = '/backstage/wxOpen/release/',
  UndoAudit = '/backstage/wxOpen/undoAudit/',
  GetLatestAuditStatus = '/backstage/wxOpen/getLatestAuditStatus',
  SpeedupCodeAudit = '/backstage/wxOpen/speedupCodeAudit',
  GetAccountBasicInfo = '/backstage/wxOpen/getAccountBasicInfo',
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
  return defHttp.get<AppInfo>({
    url: Api.GetAppInfo,
    params,
  });
}

/**
 * @description: 获取模板列表 api
 */
export function getTemplateList(params?) {
  return defHttp.get({
    url: Api.GetTemplateList,
    params: params,
  });
}

/**
 * @description: 获取体验版二维码 api
 */
export function getTrialQrCode(params?) {
  return defHttp.post({
    url: Api.GetTrialQrCode,
    data: params,
  });
}

/**
 * @description: 获取草稿箱列表 api
 */
export function getTemplateDraftList(params?) {
  return defHttp.get({
    url: Api.GetTemplateDraftList,
    params: params,
  });
}

/**
 * @description: 将草稿添加到模板库 api
 */
export function addToTemplate(params?) {
  return defHttp.post({
    url: Api.AddToTemplate,
    data: params,
  });
}

/**
 * @description: 删除模板 api
 */
export function deleteTemplate(params?) {
  return defHttp.delete({
    url: Api.DeleteTemplate + params,
  });
}

/**
 * @description: 上传代码并生成体验版 api
 */
export function commit(params?) {
  return defHttp.post({
    url: Api.Commit,
    data: params,
  });
}

/**
 * @description: 提交代码审核 api
 */
export function submitAudit(params?) {
  return defHttp.post({
    url: Api.SubmitAudit,
    data: params,
  });
}

/**
 * @description: 获取草稿箱列表 api
 */
export function getOpenPlatformAuditPageList(params?) {
  return defHttp.get({
    url: Api.GetOpenPlatformAuditPageList,
    params,
  });
}

/**
 * @description: 发布已通过审核的小程序 api
 */
export function release(params?) {
  return defHttp.put({
    url: Api.Release + params,
  });
}

/**
 * @description: 发布已通过审核的小程序 api
 */
export function undoAudit(params?) {
  return defHttp.put({
    url: Api.UndoAudit + params,
  });
}

/**
 * @description: 查询最新一次审核单状态 api
 */
export function getLatestAuditStatus(params?) {
  return defHttp.get({
    url: Api.GetLatestAuditStatus + '/' + params,
  });
}

/**
 * @description: 发布已通过审核的小程序 api
 */
export function speedupCodeAudit(params?) {
  return defHttp.post({
    url: Api.SpeedupCodeAudit,
    data: params,
  });
}

/**
 * @description: 获取小程序基础信息 api
 */
export function getAccountBasicInfo(params?) {
  return defHttp.get<BaseInfo>({
    url: Api.GetAccountBasicInfo,
    params: params,
  });
}
