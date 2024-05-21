<template>
  <BasicModal v-bind="$attrs" title="提交代码并生成体验版" @register="register" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { submitAuditFormSchema } from '@/views/open/wx/wxData';
  import { submitAudit } from '@/api/open/wx/wx';

  /**
   * 消息提醒
   */
  const { createMessage } = useMessage();

  const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
    await resetFields();
    await setFieldsValue({
      ...data.data,
    });
  });

  /**
   * 表单
   */
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: submitAuditFormSchema,
    showActionButtonGroup: false,
  });

  /**
   * 提交
   */
  async function handleSubmit() {
    try {
      const data = await validate();
      setModalProps({ confirmLoading: true });
      submitAudit(data).then(() => {
        createMessage.success('提交成功');
        closeModal();
      });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
