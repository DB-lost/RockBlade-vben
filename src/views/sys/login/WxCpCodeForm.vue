<template>
  <div v-show="getShow">
    <LoginFormTitle class="enter-x" />
    <div id="ww_login"></div>
    <Divider class="enter-x">{{ t('sys.login.scanSign') }}</Divider>
    <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
      {{ t('sys.login.backSignIn') }}
    </Button>
  </div>
</template>
<script lang="ts" setup>
  import { computed, unref, onMounted, ref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useLoginState, LoginStateEnum } from './useLogin';
  //企业微信相关组件
  import * as ww from '@wecom/jssdk';
  import { WWLoginRedirectType, WWLoginType } from '@wecom/jssdk';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useDesign } from '@/hooks/web/useDesign';
  import { Button, Divider } from 'ant-design-vue';

  const { t } = useI18n();
  const { getLoginState, handleBackLogin } = useLoginState();

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.WX_CP_LOGIN);
  const loading = ref(false);
  const userStore = useUserStore();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  onMounted(async () => {
    ww.createWWLoginPanel({
      el: '#ww_login',
      params: {
        login_type: WWLoginType.corpApp,
        appid: 'ww35e414c950ec774e',
        agentid: '1000004',
        redirect_uri: 'https://system.rockblade.cn',
        state: 'loginState',
        redirect_type: WWLoginRedirectType.callback,
        scope: 'snsapi_privateinfo',
      },
      onCheckWeComLogin({ isWeComLogin }) {
        console.log(isWeComLogin);
      },
      async onLoginSuccess({ code }) {
        try {
          loading.value = true;
          const userInfo = await userStore.wxCpLogin({
            code: code,
            mode: 'none', //不要默认的错误提示
          });
          if (userInfo) {
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
              duration: 3,
            });
          }
        } catch (error) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
            getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
          });
        } finally {
          loading.value = false;
        }
      },
      onLoginFail(err) {
        console.log(err);
      },
    });
  });
</script>
