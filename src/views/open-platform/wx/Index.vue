<template>
  <PageWrapper
    title="微信开放平台授权"
    dense
    contentFullHeight
    contentClass="flex"
    v-if="hasPermission(['*', 'open-platform.wx.list'])"
  >
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Button type="primary" @click="handleGetAuth"> 获取授权 </Button>
        <Button type="warning" @click="handleCodeManage"> 代码管理 </Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '基础信息管理',
                icon: 'ant-design:heat-map-outlined',
                onClick: handleBaseInfoManage.bind(null, record),
                ifShow: record.appType === 0,
              },
              {
                label: '小程序详情',
                icon: 'clarity:info-standard-line',
                tooltip: '查看app详情',
                onClick: handleView.bind(null, record),
              },
            ]"
          />
        </template>
        <template v-else-if="column.key === 'qrcodeUrl'">
          <Image :width="60" :src="record.qrcodeUrl" referrerpolicy="no-referrer" />
        </template>
        <template v-else-if="column.key === 'headImg'">
          <Avatar :size="60" :src="record.headImg" />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { columns } from '@/views/open-platform/wx-open/wxData';
  //import { useMessage } from '@/hooks/web/useMessage';
  import { getWxOpenAuthPage } from '@/api/open-platform/wx-open';
  import { useGo } from '@/hooks/web/usePage';
  import { Avatar, Button, Image } from 'ant-design-vue';
  import { usePermission } from '@/hooks/web/usePermission';

  defineOptions({ name: 'WxOpen' });

  /**
   * 权限控制
   */
  const { hasPermission } = usePermission();
  const go = useGo();
  const [registerTable] = useTable({
    api: getWxOpenAuthPage,
    columns,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 300,
      title: '操作',
      dataIndex: 'action',
    },
  });

  /**
   * 获取授权
   */
  function handleGetAuth() {
    go('/open-platform/wxAuth');
  }

  //const { createMessage } = useMessage();

  /**
   * 展示详情
   * @param record
   */
  function handleView(record: Recordable) {
    go('/open-platform-/wx-open/app-info/' + record.appId);
  }

  /**
   * 代码管理
   */
  function handleCodeManage() {
    go('/open-platform/wx-open/code-manage');
  }

  function handleBaseInfoManage(record: Recordable) {
    go('/open-platform/wx-open/base-info-manage/' + record.appId);
  }
</script>

<style scoped lang="less"></style>
