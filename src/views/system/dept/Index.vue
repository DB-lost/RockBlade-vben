<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Button
          type="primary"
          @click="handleCreate"
          v-if="hasPermission(['*', 'system.dept.change'])"
        >
          新增部门
        </Button>
        <Button type="primary" danger @click="handleSyncWxCp" v-if="hasPermission(['*'])">
          同步企业微信
        </Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
                auth: ['*', 'system.dept.change'],
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
                auth: ['*', 'system.dept.change'],
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import DeptModal from './component/DeptModal.vue';
  import { columns, searchFormSchema } from './dept_data';
  import { getDeptTreeList, removeDeptById, syncWxCp } from '@/api/system/dept';
  import { useMessage } from '@/hooks/web/useMessage';
  import { usePermission } from '@/hooks/web/usePermission';
  import { Button } from 'ant-design-vue';

  defineOptions({ name: 'Dept' });

  /**
   * 权限控制
   */
  const { hasPermission } = usePermission();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '部门列表',
    api: getDeptTreeList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  const { createMessage } = useMessage();

  function handleDelete(record: Recordable) {
    removeDeptById(record.id).then(() => {
      createMessage.success('删除部门成功!');
      reload();
    });
  }

  function handleSuccess() {
    reload();
  }

  /**
   * 同步企业微信
   */
  function handleSyncWxCp() {
    syncWxCp().then(() => {
      createMessage.success('同步部门成功!');
      reload();
    });
  }
</script>
