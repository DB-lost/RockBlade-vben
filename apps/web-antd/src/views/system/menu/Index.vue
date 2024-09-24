<script lang="ts" setup>
import type { ColumnType } from 'ant-design-vue/es/vc-table/interface';

import { h, onMounted, type Ref, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { CoverIconToComponent } from '@vben/icons';

import { Button, Divider, Table, Tag } from 'ant-design-vue';

import { useVbenForm } from '#/adapter';
import { getMenuTreeList } from '#/api/system/menu';

import MenuDrawer from './MenuDrawer.vue';

/**
 * 组件加载后调用
 */
onMounted(() => {
  onSearch({});
});

const [QueryForm] = useVbenForm({
  // 默认展开
  collapsed: false,
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSearch,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入菜单名称',
      },
      // 字段名
      fieldName: 'title',
      // 界面显示的label
      label: '菜单名称',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            label: '启用',
            value: true,
          },
          {
            label: '禁用',
            value: false,
          },
        ],
        placeholder: '请选择',
        showSearch: true,
      },
      fieldName: 'status',
      label: '状态',
    },
  ],
  // 是否可展开
  showCollapseButton: true,
  submitButtonOptions: {
    text: '查询',
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});

const columns: ColumnType<any>[] = [
  {
    align: 'left',
    dataIndex: 'title',
    title: '菜单名称',
    width: '12%',
  },
  {
    align: 'center',
    customRender: ({ record }) => {
      return h(CoverIconToComponent(record.icon));
    },
    dataIndex: 'icon',
    title: '图标',
    width: '3%',
  },
  {
    align: 'center',
    dataIndex: 'permission',
    title: '权限标识',
    width: '12%',
  },
  {
    align: 'center',
    dataIndex: 'component',
    title: '组件',
    width: '25%',
  },
  {
    align: 'center',
    dataIndex: 'order',
    title: '排序',
    width: '8%',
  },
  {
    align: 'center',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = Math.trunc(status);
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color }, () => text);
    },
    dataIndex: 'status',
    title: '状态',
    width: '5%',
  },
  {
    align: 'center',
    dataIndex: 'updateTime',
    title: '更新时间',
    width: '10%',
  },
  {
    align: 'center',
    dataIndex: 'operation',
    fixed: 'right',
    title: '操作',
  },
];

interface DataItem {
  id: number;
  title: string;
  parentMenu: string;
  icon: string;
  component: string;
  status: boolean;
  permission: string;
  order: number;
  updateTime: string;
  children?: DataItem[];
}

const data: Ref<DataItem[]> = ref([]);

/**
 * 查询
 * @param values
 */
async function onSearch(values: Record<string, any>) {
  await getMenuTreeList({ status: values.status, title: values.title }).then(
    (res) => {
      data.value = res;
    },
  );
}

const [Drawer, drawerApi] = useVbenDrawer({
  // 连接抽离的组件
  connectedComponent: MenuDrawer,
});

/**
 * 打开抽屉
 * @param title 标题
 * @param record 数据
 */
function open(title: string, record: any) {
  drawerApi.setState({ title });
  drawerApi.setData({ record });
  drawerApi.open();
}
</script>

<template>
  <div>
    <QueryForm style="margin: 20px" />
    <Button
      style="margin: 0 20px 20px"
      type="primary"
      @click="open('新增菜单', undefined)"
    >
      新增菜单
    </Button>
    <Table
      :columns="columns"
      :data-source="data"
      :row-key="(record) => record.id"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <Button type="primary" @click="open('编辑菜单', record)">
            编辑菜单
          </Button>
          <Divider type="vertical" />
          <Button danger type="primary">删除</Button>
        </template>
      </template>
    </Table>
    <Drawer />
  </div>
</template>

<style scoped></style>
