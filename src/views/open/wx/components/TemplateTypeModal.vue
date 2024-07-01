<template>
  <BasicModal v-bind="$attrs" title="添加到模板库" @register="register" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { templateTypeFormSchema } from '@/views/open/wx/wxData';
  import { addToTemplate } from '@/api/open/wx';
  import { useMessage } from '@/hooks/web/useMessage';

  /**
   * 消息提醒
   */
  const { createMessage } = useMessage();

  const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
    await resetFields();
    await setFieldsValue({
      ...data.record,
    });
  });

  /**
   * 表单
   */
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: templateTypeFormSchema,
    showActionButtonGroup: false,
  });

  /**
   * 提交
   */
  async function handleSubmit() {
    try {
      const data = await validate();
      setModalProps({ confirmLoading: true });
      await addToTemplate(data).then(() => {
        createMessage.success('添加成功');
        closeModal();
      });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
