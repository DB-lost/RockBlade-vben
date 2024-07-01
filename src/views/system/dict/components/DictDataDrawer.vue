<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { dictDataFormSchema } from '@/views/system/dict/dict_data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { insertDictData, updateDictData } from '@/api/system/dict';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: dictDataFormSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      await setFieldsValue({
        ...data.record,
      });
    } else {
      await setFieldsValue({ dictType: data.dictType });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增字典数据' : '编辑字典数据'));

  const { createMessage } = useMessage();

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      //修改
      if (values.id) {
        await updateDictData(values).then(() => {
          createMessage.success('修改数据成功!');
        });
      } else {
        //新增
        await insertDictData(values).then(() => {
          createMessage.success('新增数据成功!');
        });
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
