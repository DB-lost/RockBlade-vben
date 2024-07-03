<template>
  <PageWrapper title="基础信息" contentBackground @back="goBack">
    <Description @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { nextTick, reactive, ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { Description, useDescription } from '@/components/Description';
  import { getAppInfo } from '@/api/open-platform/wx-open';
  import { useRoute } from 'vue-router';
  import { useGo } from '@/hooks/web/usePage';
  import { appletInfoSchema } from '@/views/open-platform/wx-open/wxData';

  defineOptions({ name: 'AppletInfo' });

  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const appid = ref(route.params?.appid);
  const nickName = ref('');

  const appletInfoData = reactive({
    authorizerAppid: '',
    nickName: '',
    headImg: '',
    principalName: '',
    signature: '',
    qrcodeUrl: '',
    categories: '',
    userName: '',
  });

  nextTick(() => {
    //获取小程序详情
    getAppInfo({ appid: appid.value }).then((res) => {
      appletInfoData.nickName = res.authorizerInfo.nickName;
      nickName.value = appletInfoData.nickName;
      appletInfoData.authorizerAppid = res.authorizationInfo.authorizerAppid;
      appletInfoData.headImg = res.authorizerInfo.headImg;
      appletInfoData.principalName = res.authorizerInfo.principalName;
      appletInfoData.signature = res.authorizerInfo.signature;
      appletInfoData.qrcodeUrl = res.authorizerInfo.qrcodeUrl;
      appletInfoData.userName = res.authorizerInfo.userName;
      res.authorizerInfo.miniProgramInfo.categories.forEach((item) => {
        if (appletInfoData.categories === '') {
          appletInfoData.categories = item.first + '|' + item.second;
        } else {
          appletInfoData.categories =
            appletInfoData.categories + ',' + item.first + '|' + item.second;
        }
      });
    });
  });

  const [register] = useDescription({
    data: appletInfoData,
    schema: appletInfoSchema,
    column: 3,
    bordered: false,
  });

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/open-platform/wx-open');
  }
</script>
