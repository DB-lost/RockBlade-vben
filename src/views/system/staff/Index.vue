<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <Button
          type="primary"
          @click="handleCreate"
          v-if="hasPermission(['*', 'system.staff.change'])"
          >新增账号</Button
        >
        <Button type="primary" danger @click="handleSyncWxCp" v-if="hasPermission(['*'])">
          同步企业微信
        </Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看用户详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑用户资料',
                onClick: handleEdit.bind(null, record),
                auth: ['*', 'system.staff.change'],
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此账号',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
                auth: ['*', 'system.staff.change'],
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <StaffModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { usePermission } from '@/hooks/web/usePermission';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import DeptTree from '@/views/system/staff/components/DeptTree.vue';
  import { useModal } from '@/components/Modal';
  import StaffModal from '@/views/system/staff/components/StaffModal.vue';
  import { Button } from 'ant-design-vue';
  import { columns, searchFormSchema } from './staff_data';
  import { useGo } from '@/hooks/web/usePage';
  import { getStaffPage, removeStaffById, syncWxCp } from '@/api/system/staff';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'Staff' });

  /**
   * 权限控制
   */
  const { hasPermission } = usePermission();
  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload }] = useTable({
    title: '账号列表',
    api: getStaffPage,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
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

  function handleDelete(record: Recordable) {
    removeStaffById(record.id);
    reload();
  }

  function handleSuccess() {
    reload();
  }

  function handleSelect(deptId = '') {
    searchInfo.deptId = deptId;
    reload();
  }

  function handleView(record: Recordable) {
    go('/system/staff_detail/' + record.id);
  }

  const { createMessage } = useMessage();

  /**
   * 同步企业微信
   */
  function handleSyncWxCp() {
    syncWxCp().then(() => {
      createMessage.success('同步员工成功!');
      reload();
    });
  }
</script>
