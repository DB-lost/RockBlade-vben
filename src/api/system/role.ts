import { defHttp } from '@/utils/http/axios';
import { RoleStatus } from '@/api/system/model/roleModel';

enum Api {
  GetRolePage = '/backstage/role/getRolePage',
  GetMenuTreeList = '/backstage/role/getMenuTreeList',
  InsertRole = '/backstage/role/insertRole',
  UpdateRole = '/backstage/role/updateRole',
  RemoveRoleById = '/backstage/role/removeRoleById/',
  SetRoleStatus = '/backstage/role/setRoleStatus',
}

/**
 * @description: 获取角色分页
 */
export const getRolePage = (params?) => {
  return defHttp.get({ url: Api.GetRolePage, params: params });
};

/**
 * @description: 获取菜单树
 */
export const getMenuTreeList = () => {
  return defHttp.get({ url: Api.GetMenuTreeList });
};

/**
 * @description: 添加角色 api
 */
export function insertRole(params) {
  return defHttp.post({
    url: Api.InsertRole,
    data: params,
  });
}

/**
 * @description: 修改角色 api
 */
export function updateRole(params) {
  return defHttp.put({
    url: Api.UpdateRole,
    data: params,
  });
}

/**
 * @description: 设置角色状态 api
 */
export function setRoleStatus(params: RoleStatus) {
  return defHttp.put({
    url: Api.SetRoleStatus,
    data: params,
  });
}

/**
 * @description: 删除角色 api
 */
export function removeRoleById(params: string) {
  return defHttp.delete({
    url: Api.RemoveRoleById,
    params: params,
  });
}
