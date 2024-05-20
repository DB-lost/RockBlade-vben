import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag, Image } from 'ant-design-vue';
import { DescItem } from '@/components/Description';

export const columns: BasicColumn[] = [
  {
    title: '小程序',
    dataIndex: 'appName',
    width: 120,
  },
  {
    title: '原始id',
    dataIndex: 'originalId',
    width: 150,
  },
  {
    title: '类型',
    dataIndex: 'appType',
    width: 80,
    customRender: ({ record }) => {
      const status = record.appType;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'yellow';
      const text = enable ? '小程序' : '公众号';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '二维码',
    dataIndex: 'qrcodeUrl',
    width: 200,
  },
  {
    title: '主体',
    dataIndex: 'principalName',
    width: 180,
  },
  {
    title: '头像',
    dataIndex: 'headImg',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 200,
  },
];

/**
 * 小程序详情
 */
export const appletInfoSchema: DescItem[] = [
  {
    field: 'authorizerAppid',
    label: 'appid',
  },
  {
    field: 'nickName',
    label: '昵称',
  },
  {
    field: 'headImg',
    label: '头像',
    render: (curVal) => {
      return h(Image, {
        src: curVal,
        width: 200,
        height: 200,
      });
    },
  },
  {
    field: 'principalName',
    label: '主体名称',
  },
  {
    field: 'signature',
    label: '账号介绍',
  },
  {
    field: 'qrcodeUrl',
    label: '二维码',
    render: (curVal) => {
      return h(Image, {
        src: curVal,
        width: 200,
        height: 200,
      });
    },
  },
  {
    field: 'userName',
    label: '原始id',
  },
  {
    field: 'categories',
    label: '小程序类目',
  },
];

/**
 * 小程序版本详情
 */
export const expInfoSchema: DescItem[] = [
  {
    field: 'expVersion',
    label: '版本信息',
  },
  {
    field: 'expDesc',
    label: '版本描述',
  },
  {
    field: 'expTime',
    label: '提交时间',
  },
];

/**
 * 小程序版本详情
 */
export const releaseInfoSchema: DescItem[] = [
  {
    field: 'releaseVersion',
    label: '版本信息',
  },
  {
    field: 'releaseDesc',
    label: '版本描述',
  },
  {
    field: 'releaseTime',
    label: '提交时间',
  },
];
