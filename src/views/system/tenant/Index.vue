<template>
  <div>
    <BasicTable @register="registerTable" v-if="hasPermission(['*', 'system.tenant.list'])">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增租户</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <TenantDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { usePermission } from '@/hooks/web/usePermission';
  import { useDrawer } from '@/components/Drawer';
  import TenantDrawer from './components/TenantDrawer.vue';
  import { columns, searchFormSchema } from './tenant_data';
  import { getTenantPage, removeTenantById } from '@/api/system/tenant';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'Tenant' });

  /**
   * 权限控制
   */
  const { hasPermission } = usePermission();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '租户列表',
    api: getTenantPage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    pagination: true,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  const { createMessage } = useMessage();

  function handleDelete(record: Recordable) {
    removeTenantById(record.id).then(() => {
      createMessage.success('删除租户成功!');
      reload();
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
