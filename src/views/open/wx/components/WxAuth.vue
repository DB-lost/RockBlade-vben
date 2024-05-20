<template>
  <PageWrapper :title="`用户授权页面`" contentBackground @back="goBack">
    <!-- 数据汇总 -->
    <Spin :spinning="loading" size="large" :style="getWrapStyle">
      <iframe
        :src="authUrl"
        :class="`${prefixCls}__main`"
        ref="frameRef"
        @load="hideLoading"
      ></iframe>
    </Spin>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { computed, CSSProperties, ref, unref } from 'vue';
  import { useLayoutHeight } from '@/layouts/default/content/useContentViewHeight';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useWindowSizeFn } from '@vben/hooks';
  import { Spin } from 'ant-design-vue';
  import { getAuthorizedLink } from '@/api/open/wx/wx';
  import { PageWrapper } from '@/components/Page';
  import { useGo } from '@/hooks/web/usePage';

  const loading = ref(true);
  const topRef = ref(50);
  const heightRef = ref(window.innerHeight);
  const frameRef = ref<HTMLFrameElement>();
  const { headerHeightRef } = useLayoutHeight();
  const go = useGo();
  const { prefixCls } = useDesign('iframe-page');
  useWindowSizeFn(calcHeight, 150, { immediate: true });

  const authUrl = ref('');

  handleGetAuthUrl();

  /**
   * 获取授权链接
   */
  function handleGetAuthUrl() {
    getAuthorizedLink().then((res) => {
      authUrl.value = res;
    });
  }

  /**
   * 页面左侧点击返回链接时的操作
   */
  function goBack() {
    // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
    go('/open/wx');
  }

  const getWrapStyle = computed((): CSSProperties => {
    return {
      height: `${unref(heightRef)}px`,
    };
  });

  function calcHeight() {
    const iframe = unref(frameRef);
    if (!iframe) {
      return;
    }
    const top = headerHeightRef.value;
    topRef.value = top;
    heightRef.value = window.innerHeight - top;
    const clientHeight = document.documentElement.clientHeight - top;
    iframe.style.height = `${clientHeight}px`;
  }

  function hideLoading() {
    loading.value = false;
    calcHeight();
  }
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-iframe-page';

  .@{prefix-cls} {
    .ant-spin-nested-loading {
      position: relative;
      height: 100%;

      .ant-spin-container {
        width: 100%;
        height: 100%;
        padding: 10px;
      }
    }

    &__mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__main {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border: 0;
      background-color: @component-background;
    }
  }
</style>
