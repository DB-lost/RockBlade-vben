import { requestClient } from '#/api/request';

export namespace MenuApi {
  /** 登录接口参数 */
  export interface MenuParams {
    title: string;
    status: boolean;
  }
}

/**
 * 获取系统菜单树列表
 */
export async function getMenuTreeList(params: MenuApi.MenuParams) {
  return requestClient.get('/backstage/menu/getMenuTreeList', {
    params,
  });
}
