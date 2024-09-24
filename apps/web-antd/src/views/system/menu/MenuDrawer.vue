<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter';

const data = ref();

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {},
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      data.value = drawerApi.getData<Record<string, any>>();
    }
  },
});

const isDir = (type: number) => type === 0;
const isMenu = (type: number) => type === 1;
const isButton = (type: number) => type === 2;

const [Form] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-1/2',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      component: 'Input',
      dependencies: {
        show: false,
        // 随意一个字段改变时，都会触发
        triggerFields: ['id'],
      },
      fieldName: 'id',
      label: 'id',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '目录', value: 0 },
          { label: '菜单', value: 1 },
          { label: '按钮', value: 2 },
        ],
        wrapperCol: { offset: 4, span: 4 },
      },
      defaultValue: 0,
      fieldName: 'type',
      label: '菜单类型',
    },
    {
      component: 'Input',
      fieldName: 'title',
      label: '菜单名称',
      required: true,
    },
    {
      component: 'TreeSelect',
      componentProps: {
        fieldNameNames: {
          label: 'title',
          value: 'id',
        },
        getPopupContainer: () => document.body,
      },
      fieldName: 'parentMenu',
      label: '上级菜单',
    },
    {
      component: 'InputNumber',
      fieldName: 'orderNo',
      label: '排序',
      required: true,
    },
    {
      component: 'IconPicker',
      fieldName: 'icon',
      ifShow: ({ values }) => !isButton(values.type),
      label: '图标',
      required: true,
    },

    {
      component: 'Input',
      fieldName: 'path',
      ifShow: ({ values }) => !isButton(values.type),
      label: '路由地址',
      required: true,
    },
    {
      component: 'Input',
      fieldName: 'component',
      ifShow: ({ values }) => isMenu(values.type),
      label: '组件路径',
    },
    {
      component: 'Input',
      fieldName: 'permission',
      ifShow: ({ values }) => !isDir(values.type),
      label: '权限标识',
    },
    {
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: '启用', value: true },
          { label: '禁用', value: false },
        ],
      },
      defaultValue: true,
      fieldName: 'status',
      label: '状态',
    },
    {
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: '是', value: false },
          { label: '否', value: true },
        ],
      },
      defaultValue: false,
      fieldName: 'ignoreKeepAlive',
      ifShow: ({ values }) => isMenu(values.type),
      label: '是否缓存',
    },
    {
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: '否', value: false },
          { label: '是', value: true },
        ],
      },
      defaultValue: false,
      fieldName: 'hideMenu',
      ifShow: ({ values }) => !isButton(values.type),
      label: '是否隐藏',
    },
  ],
  wrapperClass: 'grid-cols-1',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}
</script>
<template>
  <Drawer>
    <Form />
  </Drawer>
</template>
