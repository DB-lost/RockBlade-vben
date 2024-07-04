<template>
  <div v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="rules" ref="formRef">
      <FormItem name="phone" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.phone"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="idCard" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.idCard"
          :placeholder="'身份证'"
        />
      </FormItem>
      <FormItem name="bankCard" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.bankCard"
          :placeholder="'工资卡'"
        />
      </FormItem>
      <FormItem name="sex" class="enter-x">
        <RadioGroup
          size="large"
          v-model:value="formData.sex"
          :placeholder="'性别'"
          class="fix-auto-fill"
          button-style="solid"
        >
          <RadioButton :value="false">男</RadioButton>
          <RadioButton :value="true">女</RadioButton>
        </RadioGroup>
      </FormItem>
      <FormItem name="email" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.email"
          :placeholder="'邮箱'"
        />
      </FormItem>
      <FormItem name="code" class="enter-x" v-show="false">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.code"
          :placeholder="'code'"
        />
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
    </Form>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed, nextTick } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, RadioGroup, RadioButton } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, LoginStateEnum } from './useLogin';
  import { Rule } from 'ant-design-vue/es/form';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useUserStore } from '@/store/modules/user';

  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();
  const FormItem = Form.Item;
  const { t } = useI18n();
  const { getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    phone: '',
    idCard: '',
    bankCard: '',
    email: '',
    code: '',
    sex: false,
  });

  const rules: Record<string, Rule[]> = {
    phone: [
      { required: true, message: '请输入手机号', trigger: 'change' },
      { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
    ],
    idCard: [{ required: true, message: '请输入身份证', trigger: 'change' }],
  };

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  /**
   * 截取需要的字符串
   * @param name
   * @constructor
   */
  function GetQueryString(name: string) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    let context = '';
    if (r != null) context = r[2];
    r = null;
    return context == null || context == '' || context == 'undefined' ? '' : context;
  }

  nextTick(async () => {
    formData.code = GetQueryString('code');
  });

  async function handleRegister() {
    formRef.value.validate().then(async () => {
      try {
        loading.value = true;
        const userInfo = await userStore.wxCpStaffRegister({
          phone: formData.phone,
          idCard: formData.idCard,
          bankCard: formData.bankCard,
          email: formData.email,
          code: formData.code,
          sex: formData.sex,
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
    });
  }
</script>
