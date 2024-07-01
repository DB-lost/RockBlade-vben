<template>
  <BasicDrawer
    v-bind="$attrs"
    title="修改密码"
    width="50%"
    @register="registerDrawer"
    @ok="handleSubmit"
    showFooter
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { modifyPasswordSchema } from '../staff_data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { RSA256Encrypt } from '@/utils/jesncryptKey';
  import { modifyUserPassword } from '@/api/system/staff';

  const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
    labelWidth: 90,
    schemas: modifyPasswordSchema,
    baseColProps: { lg: 12, md: 24 },
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false });
    await setFieldsValue(data);
  });

  const { createMessage } = useMessage();

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      values.oldPassword = RSA256Encrypt(values.oldPassword);
      values.newPassword = RSA256Encrypt(values.newPassword);
      modifyUserPassword(values).then(() => {
        createMessage.success('修改密码成功!');
      });
      closeDrawer();
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
