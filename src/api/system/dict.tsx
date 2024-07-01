import { defHttp } from '@/utils/http/axios';

enum Api {
  GetDictTypePage = '/backstage/dictType/getDictTypePage',
  GetDictTypeInfo = '/backstage/dictType/getDictTypeInfo/',
  InsertDictType = '/backstage/dictType/insertDictType',
  UpdateDictType = '/backstage/dictType/updateDictType',
  RemoveById = '/backstage/dictType/removeById/',
  RefreshCache = '/backstage/dictType/refreshCache',
  OptionSelect = '/backstage/dictType/optionSelect',
  InsertDictData = '/backstage/dictData/insertDictData',
  UpdateDictData = '/backstage/dictData/updateDictData',
  GetDictDataPage = '/backstage/dictData/getDictDataPage',
  RemoveDictDataById = '/backstage/dictData/removeDictData/',
  GetDictDataByDictType = '/backstage/dictData/getDictDataByDictType/',
}

/**
 * @description: 获取系统字典类型分页 api
 */
export function getDictTypePage(params?) {
  return defHttp.get({
    url: Api.GetDictTypePage,
    params,
  });
}

/**
 * @description: 获取系统字典类型详情 api
 */
export function getDictTypeInfo(params?) {
  return defHttp.get({
    url: Api.GetDictTypeInfo,
    params,
  });
}

/**
 * @description: 获取字典选择框列表 api
 */
export function optionSelect() {
  return defHttp.get({
    url: Api.OptionSelect,
  });
}

/**
 * @description: 新增字典类型 api
 */
export function insertDictType(params) {
  return defHttp.post({
    url: Api.InsertDictType,
    data: params,
  });
}

/**
 * @description: 修改字典类型 api
 */
export function updateDictType(params) {
  return defHttp.put({
    url: Api.UpdateDictType,
    data: params,
  });
}

/**
 * @description: 刷新字典缓存 api
 */
export function refreshCache() {
  return defHttp.put({
    url: Api.RefreshCache,
  });
}

/**
 * @description: 删除字典数据类型 api
 */
export function removeById(params: string) {
  return defHttp.delete({
    url: Api.RemoveById,
    params: params,
  });
}

/**
 * @description: 新增字典数据 api
 */
export function insertDictData(params) {
  return defHttp.post({
    url: Api.InsertDictData,
    data: params,
  });
}

/**
 * @description: 修改字典数据 api
 */
export function updateDictData(params) {
  return defHttp.put({
    url: Api.UpdateDictData,
    data: params,
  });
}

/**
 * @description: 获取系统字典数据分页 api
 */
export function getDictDataPage(params?) {
  return defHttp.get({
    url: Api.GetDictDataPage,
    params,
  });
}

/**
 * @description: 删除字典数据 api
 */
export function removeDictDataById(params: string) {
  return defHttp.delete({
    url: Api.RemoveDictDataById,
    params: params,
  });
}

/**
 * @description: 根据字典类型获取字典数据 api
 */
export function getDictDataByDictType(params) {
  return defHttp.get({
    url: Api.GetDictDataByDictType + params.value,
  });
}
