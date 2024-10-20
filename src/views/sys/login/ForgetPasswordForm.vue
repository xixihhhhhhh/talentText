<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="phone" class="enter-x">
        <Input size="large" v-model:value="formData.phone" :placeholder="t('sys.login.mobile')" />
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

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleAnswer" :loading="loading">
          回答问题
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
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum, useFormValid } from './useLogin';
  import { StrengthMeter } from '@/components/StrengthMeter';
  import { usePassword } from './useForgetPassword';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const InputPassword = Input.Password;

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    phone: '',
    password: '',
    checkPassword: '',
  });
  const { getFormRules } = useFormRules(formData);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);
  const { validForm } = useFormValid(formRef);
  const { setLoginState } = useLoginState();
  const { setPhone, setNewPassword } = usePassword();

  async function handleAnswer() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      setPhone(data.phone);
      setNewPassword(data.password);
      setLoginState(LoginStateEnum.Answer);
    } finally {
      loading.value = false;
    }
  }
</script>
