<template>
  <PageWrapper>
    <BasicForm
      @register="register"
      @submit="handleSubmit"
      v-if="showSubmit"
      class="-enter-x mt-10"
    />
    <template v-else>
      <div class="flex items-center justify-center mt-4 mb-4 -enter-x">
        <div class="md:text-lg text-md">第{{ curNum }}题</div>
      </div>
      <BasicForm @register="registerOption" @submit="handleSubmitQues" class="-enter-x">
        <template #resetBefore>
          <a-button type="primary" class="mr-4" @click="back">返回</a-button>
          <a-button type="primary" class="mr-4" :disabled="curNum === 1" @click="handleLastQues"
            >上一题</a-button
          >
          <a-button type="primary" class="mr-4" :disabled="nextDisable" @click="handleNextQues"
            >下一题</a-button
          >
        </template>
      </BasicForm>
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';
  import { ref, watch } from 'vue';
  import { addQuesApi } from '@/api/sys/question';
  import { useMessage } from '@/hooks/web/useMessage';
  import { optionSchema, schemas } from './data';

  const { notification } = useMessage();

  const submitData = ref<any>({});
  const max_question_num = 4;
  function handleSubmit(values: any) {
    showSubmit.value = false;
    submitData.value = { ...values };
  }

  const showSubmit = ref(true);

  const [register] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: { span: 24, style: { textAlign: 'center' } },
    submitButtonOptions: { text: '确认' },
  });

  let optionData: any = [];

  const showSubmitButton = ref(false);

  const [registerOption, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: optionSchema,
    actionColOptions: { span: 24, style: { textAlign: 'center' } },
    submitButtonOptions: { text: '提交' },
    showSubmitButton,
  });

  const curNum = ref(1);

  async function handleSubmitQues(values: any) {
    await validate();
    optionData[curNum.value - 1] = values;
    submitData.value.quesData = optionData;
    const res = await addQuesApi(submitData.value);
    if (res.success) {
      notification.success({
        message: '添加成功',
        description: `添加提示`,
        duration: 1,
      });
      optionData = [];
      submitData.value = {};
      curNum.value = 1;
      showSubmit.value = true;
    } else {
      notification.error({
        message: '添加失败',
        description: `添加提示`,
        duration: 1,
      });
    }
  }

  const nextDisable = ref(false);
  watch(curNum, (newVal) => {
    nextDisable.value = false;
    showSubmitButton.value = false;
    if (newVal === max_question_num) {
      nextDisable.value = true;
      showSubmitButton.value = true;
    }
  });

  function handleLastQues() {
    curNum.value = curNum.value - 1;
    setFieldsValue(optionData[curNum.value - 1]);
  }

  async function handleNextQues() {
    const data = await validate();
    optionData[curNum.value - 1] = data;
    curNum.value = curNum.value + 1;
    optionData[curNum.value - 1] ? setFieldsValue(optionData[curNum.value - 1]) : resetFields();
  }

  function back() {
    showSubmit.value = !showSubmit.value;
    optionData = [];
    curNum.value = 1;
  }
</script>
