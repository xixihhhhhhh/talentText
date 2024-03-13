/** 填报问卷页 */

<template>
  <PageWrapper>
    <BasicForm @register="register" @submit="handleSubmit" v-if="showSubmit" class="-enter-x" />
    <template v-else>
      <div class="flex items-center justify-center mt-4 mb-4 -enter-x">
        <div class="md:text-lg text-md">第{{ curNum }}题</div>
      </div>
      <div class="text-lg">
        {{ curQuestionTitle }}
      </div>
      <RadioGroup v-model:value="selectValue" class="text-base ml-4">
        <Radio :value="item.value" class="flex mt-4" v-for="item in curQues" :key="item.option">{{
          item.option
        }}</Radio>
      </RadioGroup>
      <div class="text-center mt-40">
        <a-button type="primary" class="mr-4" @click="back">返回</a-button>
        <a-button type="primary" class="mr-4" :disabled="curNum === 1" @click="handleLastQues"
          >上一题</a-button
        >
        <a-button type="primary" class="mr-4" :disabled="nextDisable" @click="handleNextQues"
          >下一题</a-button
        >
        <a-button type="primary" class="mr-4 mt-4" v-show="showSubmitButton" @click="handleEvaluate"
          >评测</a-button
        >
      </div>
    </template>
  </PageWrapper>
  <Modal @register="register2" />
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';
  import { getQuesApi } from '@/api/sys/question';
  import { useMessage } from '@/hooks/web/useMessage';
  import { RadioGroup, Radio } from 'ant-design-vue';
  import { schemas, Option, convertToOptionArray, answer } from './data';
  import Modal from './modal.vue';
  import { useModal } from '@/components/Modal';
  // import { addEvaluateListApi } from '@/api/sys/evaluateLists';

  const [register2, { openModal }] = useModal();

  const { createMessage } = useMessage();

  const [register] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: { span: 24 },
    submitButtonOptions: { text: '开始评测' },
  });

  let questionNum = 0;
  let quesData;
  async function handleSubmit(values: any) {
    const res = await getQuesApi(values);
    questionNum = res.questionNum;
    quesData = res.quesData;
    curNum.value = 1;
    showSubmit.value = false;
  }

  const showSubmit = ref(true);

  const showSubmitButton = ref(false);

  const curNum = ref(0);

  const curQuestionTitle = ref('');
  const nextDisable = ref(false);

  const curQues = ref<Option[]>([]);
  watch(curNum, (newVal) => {
    nextDisable.value = false;
    showSubmitButton.value = false;
    curQuestionTitle.value = quesData[curNum.value - 1].questionName;
    curQues.value = convertToOptionArray(quesData[curNum.value - 1]);
    if (newVal === questionNum) {
      nextDisable.value = true;
      showSubmitButton.value = true;
    }
  });

  const selectValue = ref<string>('');
  const answerArr = ref<answer[]>([]);

  function handleLastQues() {
    let curAnsObj: answer = {
      value: selectValue.value,
      score: Number(selectValue.value[1]),
    };
    answerArr.value[curNum.value - 1] = curAnsObj;
    selectValue.value = answerArr.value[curNum.value - 2].value;
    curNum.value = curNum.value - 1;
  }

  async function handleNextQues() {
    if (selectValue.value === '') {
      createMessage.error({
        content: '请回答选择题',
        duration: 3,
      });
    } else {
      let curAnsObj: answer = {
        value: selectValue.value,
        score: Number(selectValue.value[1]),
      };
      answerArr.value[curNum.value - 1] = curAnsObj;
      selectValue.value = answerArr.value[curNum.value]?.value || '';
      curNum.value = curNum.value + 1;
    }
  }

  function back() {
    answerArr.value = [];
    showSubmit.value = true;
    curNum.value = 1;
    selectValue.value = '';
  }

  const allScore = ref<number>(0);

  function handleEvaluate() {
    if (selectValue.value === '') {
      createMessage.error({
        content: '请回答选择题',
        duration: 3,
      });
    } else {
      let curAnsObj: answer = {
        value: selectValue.value,
        score: Number(selectValue.value[1]),
      };
      answerArr.value[curNum.value - 1] = curAnsObj;
      allScore.value = answerArr.value.reduce(
        (accumulator, currentItem) => accumulator + currentItem.score,
        0,
      );
      // const { success } = addEvaluateListApi({});
      openModal();
    }
  }
</script>
