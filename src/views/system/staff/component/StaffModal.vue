<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from '../staff.data';
  import { getDeptTreeList } from '@/api/system/dept';
  import { useMessage } from '@/hooks/web/useMessage';
  import { insertStaff, updateStaff } from '@/api/system/staff';

  defineOptions({ name: 'StaffModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      await setFieldsValue({
        ...data.record,
      });
    }

    const treeData = await getDeptTreeList();
    await updateSchema([
      {
        field: 'pwd',
        show: !unref(isUpdate),
      },
      {
        field: 'dept',
        componentProps: { treeData },
      },
    ]);
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

  const { createMessage } = useMessage();

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      //修改
      if (unref(isUpdate)) {
        await updateStaff(values).then(() => {
          createMessage.success('修改员工成功!');
        });
      } else {
        //新增
        await insertStaff(values).then(() => {
          createMessage.success('新增员工成功!');
        });
      }
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
