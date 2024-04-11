import { defHttp } from '@/utils/http/axios';
import { getMenuInfoModel } from '@/api/system/model/menuModel';

enum Api {
  GetRolePage = '/backstage/role/getRolePage',
  GetMenuById = '/backstage/menu/getMenuById/',
  InsertMenu = '/backstage/menu/insertMenu',
  UpdateMenu = '/backstage/menu/updateMenu',
  DeleteMenu = '/backstage/menu/removeMenu/',
}

/**
 * @description: 获取角色分页
 */
export const getRolePage = (params?) => {
  return defHttp.get({ url: Api.GetRolePage, params: params });
};

/**
 * @description: 根据id获取菜单详情
 */
export const getMenuById = (params?: string) => {
  return defHttp.get<getMenuInfoModel>({ url: Api.GetMenuById + params });
};

/**
 * @description: 添加菜单 api
 */
export function insertMenu(params) {
  return defHttp.post({
    url: Api.InsertMenu,
    data: params,
  });
}

/**
 * @description: 修改菜单 api
 */
export function updateMenu(params) {
  return defHttp.put({
    url: Api.UpdateMenu,
    data: params,
  });
}

/**
 * @description: 删除菜单 api
 */
export function deleteMenu(params: string) {
  return defHttp.delete({
    url: Api.DeleteMenu,
    params: params,
  });
}
