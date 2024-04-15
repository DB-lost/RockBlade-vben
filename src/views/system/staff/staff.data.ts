import { BasicColumn, FormSchema } from '@/components/Table';
import { getAllRoleList, usernameIsExist } from '@/api/system/staff';

/**
 * transform mock data
 * {
 *  0: '华东分部',
 * '0-0': '华东分部-研发部'
 * '0-1': '华东分部-市场部',
 *  ...
 * }
 */
export const deptMap = (() => {
  const pDept = ['华东分部', '华南分部', '西北分部'];
  const cDept = ['研发部', '市场部', '商务部', '财务部'];

  return pDept.reduce((map, p, pIdx) => {
    map[pIdx] = p;

    cDept.forEach((c, cIndex) => (map[`${pIdx}-${cIndex}`] = `${p}-${c}`));

    return map;
  }, {});
})();

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'account',
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
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 200,
  },
  {
    title: '所属部门',
    dataIndex: 'dept',
    customRender: ({ value }) => {
      return deptMap[value];
    },
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
    component: 'InputNumber',
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
    required: true,
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
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
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
