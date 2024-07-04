import { defHttp } from '@/utils/http/axios';

enum Api {
  GetDeptTreeList = '/backstage/dept/getDeptTreeList',
  InsertDept = '/backstage/dept/insertDept',
  UpdateDept = '/backstage/dept/updateDept',
  RemoveDeptById = '/backstage/dept/removeDeptById/',
  SyncWxCp = '/backstage/dept/syncWxCp',
  GetStaffList = '/backstage/dept/getStaffList',
}

/**
 * @description: 获取部门树
 */
export const getDeptTreeList = (params?) => {
  return defHttp.get({ url: Api.GetDeptTreeList, params: params });
};

/**
 * @description: 添加部门 api
 */
export function insertDept(params) {
  return defHttp.post({
    url: Api.InsertDept,
    data: params,
  });
}

/**
 * @description: 修改部门 api
 */
export function updateDept(params) {
  return defHttp.put({
    url: Api.UpdateDept,
    data: params,
  });
}

/**
 * @description: 删除部门 api
 */
export function removeDeptById(params: string) {
  return defHttp.delete({
    url: Api.RemoveDeptById,
    params: params,
  });
}

/**
 * @description: 同步企业微信 api
 */
export function syncWxCp() {
  return defHttp.put({
    url: Api.SyncWxCp,
  });
}

/**
 * @description: 获取员工列表
 */
export const getStaffList = (params?) => {
  return defHttp.get({ url: Api.GetStaffList, params: params });
};
