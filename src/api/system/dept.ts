import { defHttp } from '@/utils/http/axios';

enum Api {
  GetDeptTreeList = '/backstage/dept/getDeptTreeList',
  InsertDept = '/backstage/dept/insertDept',
  UpdateDept = '/backstage/dept/updateDept',
  RemoveDeptById = '/backstage/dept/removeDeptById/',
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
