<template>
  <BasicModal v-bind="$attrs" title="最新审核结果" @register="register">
    <Description @register="registerDescription" class="mt-4" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Description, useDescription } from '@/components/Description';
  import { auditSchema } from '@/views/open-platform/wx/wxData';

  const auditData = ref({});

  const [register] = useModalInner(async (data) => {
    auditData.value = data;
  });

  const [registerDescription] = useDescription({
    column: 1,
    data: auditData,
    schema: auditSchema,
  });
</script>
小
