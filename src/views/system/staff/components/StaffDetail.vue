<template>
  <PageWrapper :title="staffName + `的资料`" contentBackground @back="goBack">
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="用户资料" />
        <a-tab-pane key="logs" tab="操作日志" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey === 'detail'">
        <Description
          size="middle"
          :bordered="false"
          :column="3"
          :data="refundData"
          :schema="refundSchema"
        />
      </template>
      <template v-if="currentKey === 'logs'">
        <BasicTable @register="registerTable" />
      </template>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '@/components/Page';
  import { Description } from '@/components/Description';
  import { useGo } from '@/hooks/web/usePage';
  import { BasicTable, useTable } from '@/components/Table';
  import { Tabs } from 'ant-design-vue';
  import { getStaffInfo, getUserLogList } from '@/api/system/staff';
  import { logColumns, logSearchFormSchema, refundSchema } from '@/views/system/staff/staff_data';
  import { useTabs } from '@/hooks/web/useTabs';

  defineOptions({ name: 'StaffDetail' });

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;
  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const staffId = ref(route.params?.id);
  const currentKey = ref('detail');
  const refundData = ref({});
  const staffName = ref('');
  const searchInfo = ref<Recordable>({ userId: '' });
  //获取员工信息
  getStaffInfo(staffId.value).then((res) => {
    refundData.value = res;
    staffName.value = res.name;
    searchInfo.value.userId = res.userId;
  });
  const { setTitle } = useTabs();
  // 设置Tab的标题（不会影响页面标题）
  setTitle('详情：用户' + staffName.value);
  //日志
  const [registerTable] = useTable({
    title: '日志列表',
    api: getUserLogList,
    columns: logColumns,
    formConfig: {
      labelWidth: 120,
      schemas: logSearchFormSchema,
    },
    searchInfo: searchInfo,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
  });

  // 页面左侧点击返回链接时的操作
  function goBack() {
    // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
    go('/system/staff');
  }
</script>

<style></style>
