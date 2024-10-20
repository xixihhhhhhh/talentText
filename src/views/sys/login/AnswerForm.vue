<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x w-full" :model="formData" :rules="formRules" ref="formRef">
      <FormItem name="answerOne" class="enter-x">
        <div class="mb-2">{{ question1 }}</div>
        <Input v-model:value="formData.answerOne" placeholder="问题一答案" size="large" />
      </FormItem>

      <FormItem name="answerTwo" class="enter-x">
        <div class="mb-2">{{ question2 }}</div>
        <Input v-model:value="formData.answerTwo" placeholder="问题二答案" size="large" />
      </FormItem>

      <FormItem name="answerThree" class="enter-x">
        <div class="mb-2">{{ question3 }}</div>
        <Input v-model:value="formData.answerThree" placeholder="问题三答案" size="large" />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleUpdatePassword" :loading="loading">
          修改密码
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>

    <FormItem name="password" class="enter-x h-0px">
      <InputPassword
        class="h-0px opacity-0"
        size="large"
        visibilityToggle
        v-model:value="password"
      />
    </FormItem>
  </template>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch, unref, computed } from 'vue';
  import { getSecurityQuestionsApi, updatePasswordApi } from '@/api/sys/user';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Button, Input, InputPassword } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, LoginStateEnum, useFormValid } from './useLogin';
  import { usePassword } from './useForgetPassword';
  import { useMessage } from '@/hooks/web/useMessage';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const { getPhone, getNewPassword } = usePassword();

  const formRef = ref();
  const password = ref();
  const answer1 = ref('');
  const answer2 = ref('');
  const answer3 = ref('');
  const question1 = ref('');
  const question2 = ref('');
  const question3 = ref('');
  const loading = ref(false);
  const formRules = {
    answerOne: [{ required: true, message: '请输入问题一答案' }],
    answerTwo: [{ required: true, message: '请输入问题二答案' }],
    answerThree: [{ required: true, message: '请输入问题三答案' }],
  };

  const formData = reactive({
    answerOne: '',
    answerTwo: '',
    answerThree: '',
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.Answer);
  const { validForm } = useFormValid(formRef);
  const { setLoginState } = useLoginState();
  const { createMessage } = useMessage();

  watch(getShow, async (val) => {
    if (val) {
      const res = await getSecurityQuestionsApi({ phone: getPhone() });
      answer1.value = res.answer1;
      answer2.value = res.answer2;
      answer3.value = res.answer3;
      question1.value = res.question1;
      question2.value = res.question2;
      question3.value = res.question3;
      console.log('🚀 ~ res:', res);
    }
  });

  async function handleUpdatePassword() {
    const data = await validForm();
    console.log('🚀 ~ handleUpdatePassword ~ data:', data);
    if (!data) return;
    try {
      const { answerOne, answerTwo, answerThree } = data;
      loading.value = true;
      if (
        answer1.value === answerOne &&
        answer2.value === answerTwo &&
        answer3.value === answerThree
      ) {
        const res = await updatePasswordApi({ phone: getPhone(), newPassword: getNewPassword() });
        console.log('🚀 ~ handleUpdatePassword ~ res:', res);
        createMessage.success(res.msg);
      } else {
        createMessage.error('回答错误！');
      }
      setLoginState(LoginStateEnum.Answer);
    } finally {
      loading.value = false;
    }
  }
</script>
