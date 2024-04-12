<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from '../dept.data';
  import { getDeptTreeList, insertDept, updateDept } from '@/api/system/dept';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'DeptModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      await setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getDeptTreeList();
    await updateSchema({
      field: 'parentDept',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));
  const { createMessage } = useMessage();

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      //修改
      if (unref(isUpdate)) {
        await updateDept(values).then(() => {
          createMessage.success('修改菜单成功!');
        });
      } else {
        //新增
        await insertDept(values).then(() => {
          createMessage.success('新增菜单成功!');
        });
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
