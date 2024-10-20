<template>
  <div>
    <div class="font-bold text-center text-30px mt-20px">找回密码</div>
    <div class="p-20px bg-#fff mt-20px mx-40px">
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="1" tab="修改密码">
          <Form class="p-4 enter-x" :model="formData" :rules="getFormRules()" ref="formRef">
            <FormItem name="password" class="enter-x">
              <StrengthMeter size="large" v-model:value="formData.password" placeholder="新密码" />
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
              <Button type="primary" size="large" block @click="updatePassword" :loading="loading">
                修改密码
              </Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane key="2" tab="设置问题">
          <BasicForm @register="registerFormQuestions" />
          <div class="flex justify-center">
            <a-button type="primary" class="mr-40px" @click="setSecurityQuestions">确定</a-button>
            <a-button @click="resetQuestionFields">重置</a-button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, unref, type Ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { useFormRules, questionSchemas } from './data'; // 分离 schemas
  import type { FormInstance } from 'ant-design-vue/lib/form/Form';
  import { updatePasswordApi, setSecurityQuestionsApi } from '@/api/sys/user';
  import { StrengthMeter } from '@/components/StrengthMeter';
  import type { NamePath } from 'ant-design-vue/lib/form/interface';
  import { useUserStore } from '@/store/modules/user';
  import { Form, InputPassword, Button, Tabs, TabPane, FormItem } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useI18n } from '@/hooks/web/useI18n';

  const loading = ref(false);
  const { t } = useI18n();
  const formData = reactive({
    password: '',
    checkPassword: '',
  });
  const { getFormRules } = useFormRules(formData);

  const { createMessage } = useMessage();
  const userStore = useUserStore();
  const formRef = ref();
  const activeKey = ref('1');

  // 设置问题表单
  const [registerFormQuestions, { validate: validateQuestions, resetFields: resetQuestionFields }] =
    useForm({
      showActionButtonGroup: false,
      schemas: questionSchemas, // 使用 questionSchemas
    });
  const { validForm } = useFormValid(formRef);

  async function updatePassword() {
    const data = await validForm();
    const res = await updatePasswordApi({
      phone: userStore.getUserInfo.phone,
      newPassword: data.password,
    });
    console.log('🚀 ~ updatePassword ~ res:', res);
    createMessage.success(res.msg);
  }

  function useFormValid<T extends Object = any>(formRef: Ref<FormInstance>) {
    const validate = computed(() => {
      const form = unref(formRef);
      return form?.validate ?? ((_nameList?: NamePath) => Promise.resolve());
    });

    async function validForm() {
      const form = unref(formRef);
      if (!form) return;
      const data = await form.validate();
      return data as T;
    }

    return { validate, validForm };
  }

  async function setSecurityQuestions() {
    let formData = await validateQuestions();
    formData = handleFormData(formData);
    console.log('🚀 ~ setSecurityQuestions ~ formData:', formData);
    if (!formData) return;
    await setSecurityQuestionsApi({ ...formData, phone: userStore.getUserInfo.phone });
    createMessage.success('设置安全问题成功！');
  }

  function handleFormData(data: any) {
    const { customQuestion1, customQuestion2, customQuestion3 } = data;
    data.question1 = customQuestion1 || data.question1;
    data.question2 = customQuestion2 || data.question2;
    data.question3 = customQuestion3 || data.question3;
    return data;
  }
</script>

<style lang="less" scoped></style>
