import { defHttp } from '@/utils/http/axios';
import { getMenuInfoModel, getMenuTreeListModel } from '@/api/system/model/menuModel';

enum Api {
  GetMenuTreeList = '/backstage/menu/getMenuTreeList',
  GetMenuById = '/backstage/menu/getMenuById/',
  InsertMenu = '/backstage/menu/insertMenu',
  UpdateMenu = '/backstage/menu/updateMenu',
  DeleteMenu = '/backstage/menu/removeMenu/',
}

/**
 * @description: Get user menu based on id
 */
export const getMenuTreeList = () => {
  return defHttp.get<getMenuTreeListModel>({ url: Api.GetMenuTreeList });
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
