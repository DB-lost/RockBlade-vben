import { defHttp } from '@/utils/http/axios';

enum Api {
  GetDeptTreeList = '/backstage/staff/getDeptTreeList',
  GetStaffPage = '/backstage/staff/getStaffPage',
  GetAllRoleList = '/backstage/staff/getAllRoleList',
  UsernameIsExist = '/backstage/staff/usernameIsExist',
  InsertStaff = '/backstage/staff/insertStaff',
  UpdateStaff = '/backstage/staff/updateStaff',
  RemoveStaffById = '/backstage/staff/removeStaffById/',
}

/**
 * @description: 获取部门树
 */
export const getDeptTreeList = (params?) => {
  return defHttp.get({ url: Api.GetDeptTreeList, params: params });
};

/**
 * @description: 获取员工分页
 */
export const getStaffPage = (params?) => {
  return defHttp.get({ url: Api.GetStaffPage, params: params });
};

/**
 * @description: 获取所有角色信息
 */
export const getAllRoleList = () => {
  return defHttp.get({ url: Api.GetAllRoleList });
};

export const usernameIsExist = (account: string) =>
  defHttp.post({ url: Api.UsernameIsExist, params: { account } }, { errorMessageMode: 'none' });

/**
 * @description: 添加部门 api
 */
export function insertStaff(params) {
  return defHttp.post({
    url: Api.InsertStaff,
    data: params,
  });
}

/**
 * @description: 修改部门 api
 */
export function updateStaff(params) {
  return defHttp.put({
    url: Api.UpdateStaff,
    data: params,
  });
}

/**
 * @description: 删除部门 api
 */
export function removeStaffById(params: string) {
  return defHttp.delete({
    url: Api.RemoveStaffById,
    params: params,
  });
}
