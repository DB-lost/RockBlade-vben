import { defHttp } from '@/utils/http/axios';

enum Api {
  GetTenantPage = '/backstage/tenant/getTenantPage',
  InsertTenant = '/backstage/tenant/insertTenant',
  UpdateTenant = '/backstage/tenant/updateTenant',
  RemoveTenantById = '/backstage/tenant/removeTenantById/',
}

/**
 * @description: 获取租户分页
 */
export const getTenantPage = (params?) => {
  return defHttp.get({ url: Api.GetTenantPage, params: params });
};

/**
 * @description: 添加租户 api
 */
export function insertTenant(params) {
  return defHttp.post({
    url: Api.InsertTenant,
    data: params,
  });
}

/**
 * @description: 修改租户 api
 */
export function updateTenant(params) {
  return defHttp.put({
    url: Api.UpdateTenant,
    data: params,
  });
}

/**
 * @description: 删除租户 api
 */
export function removeTenantById(params: string) {
  return defHttp.delete({
    url: Api.RemoveTenantById,
    params: params,
  });
}
