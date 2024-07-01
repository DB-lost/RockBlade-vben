import { BasicColumn, FormSchema } from '@/components/Table';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';

/**
 *
 */
export const columns: BasicColumn[] = [
  {
    title: '字典名称',
    dataIndex: 'dictName',
    width: 100,
  },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    editRow: true,
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = status === true;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 150,
  },
];

/**
 * 查询表单
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'dictType',
    label: '字典类型',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '停用',
          value: 0,
        },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'dictName',
    label: '字典名',
    component: 'Input',
    required: true,
  },
  {
    field: 'dictType',
    label: '字典类型',
    component: 'Input',
    required: true,
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
    field: 'remarks',
    label: '备注',
    component: 'InputTextArea',
  },
];

/**
 * dictDataColumns
 */
export const dictDataColumns: BasicColumn[] = [
  {
    title: '字典标签',
    dataIndex: 'dictLabel',
    width: 100,
  },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    editRow: true,
    width: 100,
  },
  {
    title: '字典值',
    dataIndex: 'dictValue',
    width: 100,
  },
  {
    title: '排序',
    dataIndex: 'dictSort',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = status === true;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 150,
  },
];

/**
 * 字典数据表单
 */
export const dictDataFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'dictType',
    label: '字典类型',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'dictLabel',
    label: '字典标签',
    component: 'Input',
    required: true,
  },
  {
    field: 'dictValue',
    label: '字典值',
    component: 'Input',
    required: true,
  },
  {
    field: 'cssClass',
    label: '样式属性',
    component: 'Input',
  },
  {
    field: 'dictSort',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'listClass',
    label: '表格回显样式',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '默认(default)',
          value: 'default',
        },
        {
          label: '主要(primary)',
          value: 'primary',
        },
        {
          label: '成功(success)',
          value: 'success',
        },
        {
          label: '信息(info)',
          value: 'info',
        },
        {
          label: '警告(warning)',
          value: 'default',
        },
        {
          label: '危险(danger)',
          value: 'danger',
        },
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
    field: 'remarks',
    label: '备注',
    component: 'InputTextArea',
  },
];

/**
 * 查询表单
 */
export const dictDataSearchFormSchema: FormSchema[] = [
  {
    field: 'dictLabel',
    label: '字典标签',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '停用',
          value: 0,
        },
      ],
    },
    colProps: { span: 6 },
  },
];
