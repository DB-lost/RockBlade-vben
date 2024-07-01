<template>
  <PageWrapper :title="`字典数据`" contentBackground @back="goBack">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Button type="primary" @click="handleCreate"> 新增数据</Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DictDataDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useGo } from '@/hooks/web/usePage';
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { removeDictDataById, getDictDataPage } from '@/api/system/dict';
  import { dictDataColumns, dictDataSearchFormSchema } from '@/views/system/dict/dict_data';
  import DictDataDrawer from '@/views/system/dict/components/DictDataDrawer.vue';
  import { useDrawer } from '@/components/Drawer';
  import { useMessage } from '@/hooks/web/useMessage';

  /**
   * 消息提醒
   */
  const { createMessage } = useMessage();
  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const dictType = ref(route.params?.dictType);
  // 页面左侧点击返回链接时的操作
  function goBack() {
    // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
    go('/system/dict');
  }

  //使用表单
  const [registerTable, { reload }] = useTable({
    api: getDictDataPage,
    searchInfo: { dictType: dictType.value },
    columns: dictDataColumns,
    useSearchForm: true,
    //查询表单
    formConfig: {
      labelWidth: 120,
      schemas: dictDataSearchFormSchema,
    },
    //操作栏
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
    },
    showTableSetting: true,
    bordered: true,
  });

  const [registerDrawer, { openDrawer }] = useDrawer();

  /**
   * 新增
   */
  function handleCreate() {
    openDrawer(true, {
      dictType: dictType.value,
      isUpdate: false,
    });
  }

  /**
   * 编辑
   * @param record
   */
  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * 删除
   * @param record
   */
  function handleDelete(record: Recordable) {
    removeDictDataById(record.id).then(() => {
      createMessage.success('删除数据成功!');
      reload();
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
