import { BasicColumn, FormSchema } from '@/components/Table';
import { getAllRoleList, usernameIsExist } from '@/api/system/staff';
import { DescItem } from '@/components/Description';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'updateTime',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: '所属部门',
    dataIndex: 'deptNames',
    width: 300,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

/**
 * 是否新增
 * @param type
 */
const isInsert = (type: boolean) => type;

export const staffFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    helpMessage: ['检查用户名是否存在'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        trigger: 'blur',
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (!value) return resolve();
            usernameIsExist(value)
              .then(resolve)
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: ({ values }) => !isInsert(values.id),
  },
  {
    label: '姓名',
    field: 'name',
    component: 'Input',
    required: true,
  },
  {
    label: '手机',
    field: 'phone',
    component: 'Input',
    componentProps: {
      maxlength: 11,
    },
    required: true,
  },
  {
    label: '角色',
    field: 'roleId',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
  },
  {
    field: 'sex',
    label: '性别',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '女', value: true },
        { label: '男', value: false },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '禁用', value: false },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];

export const logColumns: BasicColumn[] = [
  {
    title: '操作名称',
    dataIndex: 'info',
  },
  {
    title: '操作人员',
    dataIndex: 'operationUsername',
  },
  {
    title: '操作源IP',
    dataIndex: 'loginIp',
  },
  {
    title: '级别',
    dataIndex: 'level',
    editRow: true,
    editComponent: 'Select',
    editComponentProps: {
      options: [
        { label: '调试', value: 7 },
        { label: '信息', value: 6 },
        { label: '通知', value: 5 },
        { label: '警告', value: 4 },
        { label: '错误', value: 3 },
        { label: '关键', value: 2 },
        { label: '报警', value: 1 },
        { label: '紧急', value: 0 },
      ],
    },
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
  },
  {
    title: '结果',
    dataIndex: 'result',
    editRow: true,
    editComponent: 'Select',
    editComponentProps: {
      options: [
        { label: '成功', value: true },
        { label: '失败', value: false },
      ],
    },
  },
  {
    title: '操作描述',
    dataIndex: 'description',
  },
  {
    title: '行为类型',
    dataIndex: 'actionType',
    editRow: true,
    editComponent: 'Select',
    editComponentProps: {
      options: [
        { label: '一般行为', value: 1 },
        { label: '异常行为', value: 2 },
      ],
    },
  },
  {
    title: '失败原因',
    dataIndex: 'failReason',
  },
];

export const logSearchFormSchema: FormSchema[] = [
  {
    field: 'operationUsername',
    label: '操作用户',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'loginIp',
    label: '操作源IP',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'result',
    label: '结果',
    component: 'Select',
    componentProps: {
      options: [
        { label: '成功', value: 1 },
        { label: '失败', value: -1 },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'level',
    label: '级别',
    component: 'Select',
    componentProps: {
      options: [
        { label: '调试', value: 7 },
        { label: '信息', value: 6 },
        { label: '通知', value: 5 },
        { label: '警告', value: 4 },
        { label: '错误', value: 3 },
        { label: '关键', value: 2 },
        { label: '报警', value: 1 },
        { label: '紧急', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'actionType',
    label: '行为类别',
    component: 'Select',
    componentProps: {
      options: [
        { label: '一般行为', value: 1 },
        { label: '异常行为', value: 2 },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'fieldTime',
    component: 'RangePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
    },
    label: '时间字段',
    colProps: {
      span: 8,
    },
  },
];

export const refundSchema: DescItem[] = [
  {
    field: 'username',
    label: '用户名',
  },
  {
    field: 'name',
    label: '真实姓名',
  },
  {
    field: 'nickname',
    label: '昵称',
  },
  {
    field: 'phone',
    label: '手机号',
  },
  {
    field: 'sex',
    label: '性别',
    render: (curVal) => {
      if (curVal === false) {
        return '男';
      } else {
        return '女';
      }
    },
  },
  {
    field: 'roleName',
    label: '角色',
  },
];

/**
 * 修改密码
 */
export const modifyPasswordSchema: FormSchema[] = [
  {
    field: 'userId',
    label: 'userId',
    component: 'Input',
    colProps: { span: 8 },
    show: false,
  },
  {
    field: 'oldPassword',
    label: '旧密码',
    component: 'InputPassword',
    colProps: { span: 8 },
    required: true,
  },
  {
    field: 'newPassword',
    label: '新密码',
    component: 'InputPassword',
    colProps: { span: 8 },
    required: true,
  },
];
