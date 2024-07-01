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
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from '../menu_data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { getMenuById, getMenuTreeList, insertMenu, updateMenu } from '@/api/system/menu';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'MenuDrawer' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      getMenuById(data.record.id).then((res) => {
        setFieldsValue({
          ...res,
        });
      });
    }
    const treeData = await getMenuTreeList();
    await updateSchema({
      field: 'parentMenu',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

  const { createMessage } = useMessage();

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      //修改
      if (unref(isUpdate)) {
        await updateMenu(values).then(() => {
          createMessage.success('修改菜单成功!');
        });
      } else {
        //新增
        await insertMenu(values).then(() => {
          createMessage.success('新增菜单成功!');
        });
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
