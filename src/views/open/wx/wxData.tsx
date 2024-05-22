import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag, Image } from 'ant-design-vue';
import { DescItem } from '@/components/Description';
import { formatToDateTime } from '@/utils/dateUtil';

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

/**
 * templateColumns
 */
export const templateColumns: BasicColumn[] = [
  {
    title: '版本号',
    dataIndex: 'userVersion',
    width: 50,
  },
  {
    title: '用户描述',
    dataIndex: 'userDesc',
    width: 200,
  },
  {
    title: 'appId',
    dataIndex: 'sourceMiniProgramAppid',
    width: 100,
  },
  {
    title: '小程序',
    dataIndex: 'sourceMiniProgram',
    width: 100,
  },
  {
    title: '模板类型',
    dataIndex: 'templateType',
    width: 70,
    customRender: ({ record }) => {
      if (record.templateType === 0) {
        //设置样式
        return h(Tag, { color: 'green' }, () => '普通模板');
      } else {
        return h(Tag, { color: 'blue' }, () => '标准模板');
      }
    },
  },
  {
    title: '草稿id',
    dataIndex: 'draftId',
    width: 50,
  },
  {
    title: '模板创建时间',
    dataIndex: 'createTime',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(new Date(record.createTime * 1000));
    },
  },
];

/**
 * 草稿箱字段
 */
export const draftsColumns: BasicColumn[] = [
  {
    title: '版本号',
    dataIndex: 'userVersion',
    width: 50,
  },
  {
    title: '用户描述',
    dataIndex: 'userDesc',
    width: 400,
  },
  {
    title: '上传时间',
    dataIndex: 'createTime',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(new Date(record.createTime * 1000));
    },
  },
];

export const templateTypeFormSchema: FormSchema[] = [
  {
    field: 'draftId',
    label: '草稿 ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'templateType',
    label: '模板类型',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '普通模板',
          value: '0',
          key: '0',
        },
        {
          label: '标准模板',
          value: '1',
          key: '1',
        },
      ],
    },
    colProps: { span: 12 },
  },
];

export const commitCodeFormSchema: FormSchema[] = [
  {
    field: 'authorizerAppid',
    label: '授权方 appid',
    component: 'Input',
    show: false,
  },
  {
    field: 'templateId',
    label: '代码库中的代码模板Id',
    component: 'Input',
    show: false,
  },
  {
    field: 'userVersion',
    label: '代码版本号',
    component: 'Input',
  },
  {
    field: 'userDesc',
    label: '代码描述',
    component: 'InputTextArea',
  },
  {
    field: 'extJson',
    label: 'extJson',
    component: 'Input',
  },
];

export const submitAuditFormSchema: FormSchema[] = [
  {
    field: 'authorizerAppid',
    label: '授权方 appid',
    component: 'Input',
    show: false,
  },
  {
    field: 'templateId',
    label: '代码库中的代码模板Id',
    component: 'Input',
    show: false,
  },
  {
    field: 'userVersion',
    label: '代码版本号',
    component: 'Input',
  },
  {
    field: 'userDesc',
    label: '代码描述',
    component: 'InputTextArea',
  },
  {
    field: 'extJson',
    label: 'extJson',
    component: 'Input',
  },
];

/**
 * auditColumns
 */
export const auditColumns: BasicColumn[] = [
  {
    title: '微信审核id',
    dataIndex: 'wxAuditId',
    width: 100,
  },
  {
    title: '反馈内容',
    dataIndex: 'feedbackInfo',
    width: 200,
  },
  {
    title: '版本说明',
    dataIndex: 'versionDesc',
    width: 200,
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    width: 80,
    customRender: ({ record }) => {
      if (record.auditStatus === 0) {
        return h(Tag, { color: 'green' }, () => '审核成功');
      } else if (record.auditStatus === 1) {
        return h(Tag, { color: 'red' }, () => '审核被拒绝');
      } else if (record.auditStatus === 2) {
        return h(Tag, { color: 'blue' }, () => '审核中');
      } else if (record.auditStatus === 3) {
        return h(Tag, { color: 'orange' }, () => '审核撤回');
      } else {
        return h(Tag, { color: 'purple' }, () => '审核延后');
      }
    },
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    width: 100,
  },
];

/**
 * 审核返回
 */
export const auditSchema: DescItem[] = [
  {
    field: 'auditId',
    label: '审核id',
  },
  {
    field: 'status',
    label: '状态',
    render: (curVal) => {
      if (curVal === 0) {
        return h(Tag, { color: 'green' }, () => '审核成功');
      } else if (curVal === 1) {
        return h(Tag, { color: 'red' }, () => '审核被拒绝');
      } else if (curVal === 2) {
        return h(Tag, { color: 'blue' }, () => '审核中');
      } else if (curVal === 3) {
        return h(Tag, { color: 'orange' }, () => '审核撤回');
      } else {
        return h(Tag, { color: 'purple' }, () => '审核延后');
      }
    },
  },
  {
    field: 'reason',
    label: '失败原因',
  },
];

/**
 * 小程序基础信息
 */
export const baseInfoSchema: DescItem[] = [
  {
    field: 'appid',
    label: 'appid',
  },
];
