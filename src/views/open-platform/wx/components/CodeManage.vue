<template>
  <PageWrapper title="代码管理" contentBackground @back="goBack">
    <template #footer>
      <Tabs default-active-key="template" v-model:activeKey="currentKey">
        <TabPane key="template" tab="模板" />
        <TabPane key="drafts" tab="草稿箱" />
      </Tabs>
    </template>
    <template v-if="currentKey === 'template'">
      <BasicTable @register="registerTemplateTable">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
                {
                  label: '上传代码并生成体验版',
                  icon: 'ant-design:thunderbolt-outlined',
                  onClick: handleCommit.bind(null, record),
                  color: 'warning',
                },
                {
                  label: '获取体验版二维码',
                  icon: 'ant-design:qrcode-outlined',
                  onClick: handleGetTrialQRCode.bind(null, record),
                },
                {
                  label: '提交代码审核',
                  icon: 'ant-design:audit-outlined',
                  onClick: handleSubmitAudit.bind(null, record),
                  color: 'success',
                },
                {
                  label: '获取审核状态',
                  icon: 'ant-design:star-outlined',
                  onClick: handleGetAuditStatus.bind(null, record),
                  color: 'warning',
                },
              ]"
            />
            <TableAction
              :actions="[
                {
                  label: '发布小程序',
                  icon: 'ant-design:audit-outlined',
                  onClick: handleRelease.bind(null, record),
                },
                {
                  label: '撤回代码审核',
                  icon: 'ant-design:star-outlined',
                  onClick: handleUndoAudit.bind(null, record),
                  color: 'error',
                },
                {
                  label: '加急代码审核',
                  icon: 'ant-design:thunderbolt-outlined',
                  onClick: handleSpeedupCodeAudit.bind(null, record),
                  color: 'warning',
                },
                {
                  label: '删除模板',
                  icon: 'ant-design:delete-outlined',
                  color: 'error',
                  popConfirm: {
                    title: '是否确认删除',
                    confirm: handleDeleteTemplate.bind(null, record),
                  },
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>
    </template>
    <template v-if="currentKey === 'drafts'">
      <BasicTable @register="registerDraftsTable">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
                {
                  label: '添加到模板库',
                  icon: 'ant-design:thunderbolt-outlined',
                  onClick: handleAddToTemplate.bind(null, record),
                  color: 'warning',
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>
    </template>
    <BasicModal title="体验版二维码" v-model:open="visible" :showOkBtn="false">
      <Image :src="qrSrc" />
    </BasicModal>
    <TemplateTypeModal @register="registerTemplateTypeModal" />
    <SubmitAuditModal @register="registerSubmitAuditModal" />
    <LatestAuditModal @register="registerLatestAuditModalModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { useGo } from '@/hooks/web/usePage';
  import { Tabs, TabPane, Image } from 'ant-design-vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import {
    commit,
    deleteTemplate,
    getLatestAuditStatus,
    getTemplateDraftList,
    getTemplateList,
    getTrialQrCode,
    release,
    speedupCodeAudit,
    undoAudit,
  } from '@/api/open-platform/wx';
  import { draftsColumns, templateColumns } from '@/views/open-platform/wx/wxData';
  import TemplateTypeModal from '@/views/open-platform/wx/components/TemplateTypeModal.vue';
  import { BasicModal, useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import SubmitAuditModal from '@/views/open-platform/wx/components/SubmitAuditModal.vue';
  import LatestAuditModal from '@/views/open-platform/wx/components/LatestAuditModal.vue';

  defineComponent({ name: 'CodeManage' });

  const go = useGo();

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/open-platform-platform/wx');
  }

  const currentKey = ref('template');

  //使用表单
  const [registerTemplateTable, { reload: templateReload }] = useTable({
    api: getTemplateList,
    //列表字段
    columns: templateColumns,
    //操作栏
    actionColumn: {
      ellipsis: true,
      width: 450,
      title: '操作',
      dataIndex: 'action',
    },
    showTableSetting: true,
    bordered: true,
    striped: true,
    pagination: false,
  });

  //使用表单
  const [registerDraftsTable] = useTable({
    api: getTemplateDraftList,
    //列表字段
    columns: draftsColumns,
    //操作栏
    actionColumn: {
      width: 300,
      title: '操作',
      dataIndex: 'action',
    },
    showTableSetting: true,
    bordered: true,
    striped: true,
    pagination: false,
  });

  const visible = ref<boolean>(false);

  const qrSrc = ref('');

  /**
   * 获取体验版二维码
   */
  function handleGetTrialQRCode(record: Recordable) {
    visible.value = true;
    //获取二维码
    getTrialQrCode({ authorizerAppid: record.sourceMiniProgramAppid, path: '' }).then((res) => {
      qrSrc.value = res;
    });
  }

  /**
   * 模板类型
   */
  const [registerTemplateTypeModal, { openModal: templateTypeOpen }] = useModal();

  /**
   * 提交代码并生成体验版
   */
  const [registerSubmitAuditModal, { openModal: submitAuditOpen }] = useModal();

  /**
   * 获取最新审核状态
   */
  const [registerLatestAuditModalModal, { openModal: latestAuditOpen }] = useModal();

  /**
   * 添加到模板库
   */
  function handleAddToTemplate(record: Recordable) {
    templateTypeOpen(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * 提交代码并生成体验版
   */
  async function handleCommit(record: Recordable) {
    await commit({
      templateId: record.templateId,
      authorizerAppid: record.sourceMiniProgramAppid,
      userVersion: record.userVersion,
      userDesc: record.userDesc,
      templateType: record.templateType,
    }).then(() => {
      createMessage.success('提交成功');
    });
  }

  /**
   * 提交代码审核
   */
  function handleSubmitAudit(record: Recordable) {
    submitAuditOpen(true, {
      data: { templateId: record.templateId, authorizerAppid: record.sourceMiniProgramAppid },
      isUpdate: true,
    });
  }

  /**
   * 消息提醒
   */
  const { createMessage } = useMessage();

  /**
   * 删除模板
   * @param record
   */
  function handleDeleteTemplate(record: Recordable) {
    deleteTemplate(record.templateId).then(() => {
      createMessage.success('删除模板成功');
      templateReload();
    });
  }

  /**
   * 发布小程序
   */
  function handleRelease(record: Recordable) {
    release(record.sourceMiniProgramAppid).then(() => {
      createMessage.success('发布成功!');
    });
  }

  /**
   * 撤回代码审核
   */
  function handleUndoAudit(record: Recordable) {
    undoAudit(record.sourceMiniProgramAppid).then(() => {
      createMessage.success('撤回代码审核成功!');
    });
  }

  /**
   * 获取审核状态
   */
  function handleGetAuditStatus(record: Recordable) {
    getLatestAuditStatus(record.sourceMiniProgramAppid).then((res) => {
      latestAuditOpen(true, res);
    });
  }

  /**
   * 加急代码审核
   */
  function handleSpeedupCodeAudit(record: Recordable) {
    speedupCodeAudit({
      authorizerAppid: record.sourceMiniProgramAppid,
      auditId: record.wxAuditId,
    }).then(() => {
      createMessage.success('加急申请成功!');
    });
  }
</script>
