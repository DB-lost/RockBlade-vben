export interface MenuTreeList {
  id: string;
  parentMenu?: string;
  icon: string;
  component: any;
  title: string;
  permission?: string;
  status: boolean;
  orderNo: number;
  updateTime?: string;
  children: MenuTreeList[];
}

/**
 * @description: Get menu return value
 */
export type getMenuTreeListModel = MenuTreeList[];

export interface MenuInfo {
  id: string;
  parentMenu?: string;
  name: string;
  icon: string;
  component: any;
  status: boolean;
  type: number;
  permission?: string;
  redirect?: string;
  orderNo: number;
  path: string;
  title: string;
  hideMenu: boolean;
  ignoreKeepAlive: boolean;
}

/**
 * @description: 菜单详情
 */
export type getMenuInfoModel = MenuInfo;
