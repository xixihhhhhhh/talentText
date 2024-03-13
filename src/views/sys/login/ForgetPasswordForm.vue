<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="email" class="enter-x">
        <Input size="large" v-model:value="formData.email" :placeholder="t('sys.login.email')" />
      </FormItem>

      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>

      <FormItem name="checkPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.checkPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
          :sendCodeApi="sendCode"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import { CountdownInput } from '@/components/CountDown';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum, useFormValid } from './useLogin';
  import { StrengthMeter } from '@/components/StrengthMeter';
  import { useUserStore } from '@/store/modules/user';

  import { useMessage } from '@/hooks/web/useMessage';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const InputPassword = Input.Password;

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    email: '',
    password: '',
    checkPassword: '',
    sms: '',
  });
  const { getFormRules } = useFormRules(formData);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);
  const { validForm } = useFormValid(formRef);
  const randonNumber = Math.floor(100000 + Math.random() * 900000) + '';
  const userStore = useUserStore();
  const { notification } = useMessage();

  async function handleReset() {
    const data = await validForm();
    if (!data) return;
    if (randonNumber !== formData.sms) {
      notification.error({
        message: t('sys.login.verfiyCodeErrot'),
        description: `${randonNumber}`,
        duration: 5,
      });
    }
    try {
      loading.value = true;
      await userStore.resetPassword({
        password: data.password,
        email: data.email,
        mode: 'none', //不要默认的错误提示
      });
      notification.success({
        message: t('sys.api.successTip'),
        description: `重置密码成功`,
        duration: 3,
      });
    } finally {
      loading.value = false;
    }
  }
  async function sendCode(): Promise<boolean> {
    notification.success({
      message: t('sys.login.randonNumber'),
      description: `${randonNumber}`,
      duration: 5,
    });
    return true; // or false based on your logic
  }
</script>
