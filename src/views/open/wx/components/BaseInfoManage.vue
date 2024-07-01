<template>
  <PageWrapper contentBackground @back="goBack">
    <Description @register="register" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { useGo } from '@/hooks/web/usePage';
  import { useRoute } from 'vue-router';
  import { nextTick, reactive, ref } from 'vue';
  import { getAccountBasicInfo } from '@/api/open/wx';
  import { Description, useDescription } from '@/components/Description';
  import { baseInfoSchema } from '@/views/open/wx/wxData';

  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const appid = ref(route.params?.appid);

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/open/wx');
  }

  const baseInfoData = reactive({
    appid: '',
  });

  nextTick(() => {
    //获取基础信息
    getAccountBasicInfo({ appid: appid.value }).then((res) => {
      baseInfoData.appid = res.appid;
    });
  });

  const [register] = useDescription({
    data: baseInfoData,
    schema: baseInfoSchema,
    column: 3,
    bordered: false,
  });
</script>

<style scoped lang="less"></style>
