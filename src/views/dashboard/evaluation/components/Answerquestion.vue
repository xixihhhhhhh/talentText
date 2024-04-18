/** 填报问卷页 */

<template>
  <PageWrapper>
    <BasicForm @register="register" @submit="handleSubmit" v-if="showSubmit" class="-enter-x" />
    <template v-else>
      <div v-if="curQuestionType === 'typeThree'">
        <div v-for="item in questionTitleThree" :key="item">{{ item }}</div>
      </div>
      <div> {{ curQuestionTitle }} </div>
      <RadioGroup v-model:value="selectValue" class="text-base ml-4">
        <Radio
          :value="item.value"
          class="flex mt-2"
          v-for="item in curQues"
          :key="item.option"
          @click="handleNextQues(item)"
          >{{ item.option.slice(2) }}</Radio
        >
      </RadioGroup>
      <div class="text-center mt-5">
        <a-button type="primary" class="mr-4" @click="back">返回</a-button>
        <a-button type="primary" class="mr-4" :disabled="curNum === 1" @click="handleLastQues"
          >上一题</a-button
        >
        <a-button type="primary" class="mr-4" v-show="showSubmitButton" @click="handleEvaluate"
          >评测</a-button
        >
      </div>
    </template>
  </PageWrapper>
  <Modal @register="register2" />
</template>

<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';
  import { getQuesApi } from '@/api/sys/question';
  import { useMessage } from '@/hooks/web/useMessage';
  import { RadioGroup, Radio } from 'ant-design-vue';
  import { schemas, Option, convertToOptionArray, answer, splitString, getScore } from './data';
  import Modal from './modal.vue';
  import { useModal } from '@/components/Modal';
  import { useQuestionStore } from '@/store/modules/question';
  import { data } from './test';

  // import { addEvaluateListApi } from '@/api/sys/evaluateLists';
  const questionStore = useQuestionStore();
  const [register2, { openModal }] = useModal();
  const { createMessage } = useMessage();
  const [register] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: { span: 24, style: { textAlign: 'center' } },
    submitButtonOptions: { text: '开始评测' },
    showResetButton: false,
  });

  const showSubmit = ref(true);
  const showSubmitButton = ref(false);
  const curNum = ref(0);
  let questionTypeOne: object[] = [];
  let questionTypeTwo: object[] = [];
  let questionTypeThree: object[] = [];
  let allquesData: object[] = [];
  const flag = true;
  async function handleSubmit() {
    if (flag) {
      const res = await getQuesApi();
      questionTypeOne = res.questionTypeOne;
      questionTypeTwo = res.questionTypeTwo;
      questionTypeThree = res.questionTypeThree;
      allquesData = [...questionTypeOne, ...questionTypeTwo, ...questionTypeThree];
      curNum.value = 1;
      showSubmit.value = false;
    } else {
      getScore(data);
      openModal();
    }
  }

  const questionNum = computed(() => {
    return allquesData.length;
  });

  const curQuestion: any = computed(() => {
    // @ts-ignore
    return allquesData[curNum.value - 1];
  });

  const curQuestionType = computed(() => {
    return curQuestion.value.quesData.questionType;
  });

  const questionTitleThree = computed(() => {
    // @ts-ignore
    const questionName = curQuestion.value.quesData.questionName;
    console.log(questionName);
    return splitString(questionName, curNum.value);
  });

  const curQuestionTitle = computed(() => {
    // @ts-ignore
    const questionName = curQuestion.value.quesData.questionName;
    return questionName;
  });

  const nextDisable = ref(false);

  const curQues = ref<Option[]>([]);
  watch(curNum, (newVal) => {
    nextDisable.value = false;
    showSubmitButton.value = false;
    // @ts-ignore
    curQues.value = convertToOptionArray(curQuestion.value.quesData);
    if (newVal === questionNum.value) {
      nextDisable.value = true;
      showSubmitButton.value = true;
    }
  });

  const selectValue = ref<string>('');
  const answerArr = ref<answer[]>([]);

  function handleLastQues() {
    selectValue.value = answerArr.value[curNum.value - 2].value;
    curNum.value = curNum.value - 1;
  }

  async function handleNextQues(item: any) {
    selectValue.value = '';
    if (curQuestionTitle.value.includes('我通常做事情时')) {
      answerArr.value[106] = {
        careerField: 'transaction',
        careerAdvantages: 'controlled',
        competency: 'plan',
        value: selectValue.value,
        score: Number(selectValue.value[1]),
      };
    } else if (curQuestionTitle.value.includes('我更习惯通过')) {
      answerArr.value[107] = {
        careerField: 'service',
        careerAdvantages: 'humanistic',
        competency: 'teamwork',
        value: selectValue.value,
        score: Number(selectValue.value[1]),
      };
    }
    selectValue.value = item.value;
    let curAnsObj: answer = {
      careerField: curQuestion.value.careerField,
      careerAdvantages: curQuestion.value.careerAdvantages,
      competency: curQuestion.value.competency,
      value: selectValue.value,
      score: Number(selectValue.value[1]),
    };
    answerArr.value[curNum.value - 1] = curAnsObj;
    selectValue.value = answerArr.value[curNum.value]?.value || '';
    curNum.value = curNum.value + 1;
  }

  function back() {
    answerArr.value = [];
    showSubmit.value = true;
    curNum.value = 1;
    selectValue.value = '';
  }

  function handleEvaluate() {
    if (selectValue.value === '') {
      createMessage.error({
        content: '请回答选择题',
        duration: 3,
      });
    } else {
      if (curQuestionTitle.value.includes('我通常做事情时')) {
        answerArr.value[106] = {
          careerField: 'transaction',
          careerAdvantages: 'controlled',
          competency: 'plan',
          value: selectValue.value,
          score: Number(selectValue.value[1]),
        };
      } else if (curQuestionTitle.value.includes('我更习惯通过')) {
        answerArr.value[107] = {
          careerField: 'service',
          careerAdvantages: 'humanistic',
          competency: 'teamwork',
          value: selectValue.value,
          score: Number(selectValue.value[1]),
        };
      }
      let curAnsObj: answer = {
        careerField: curQuestion.value.careerField,
        careerAdvantages: curQuestion.value.careerAdvantages,
        competency: curQuestion.value.competency,
        value: selectValue.value,
        score: Number(selectValue.value[1]),
      };
      answerArr.value[curNum.value - 1] = curAnsObj;
      questionStore.setQuestionAns(answerArr.value);
      getScore(answerArr.value);
      // const { success } = addEvaluateListApi({});
      openModal();
    }
  }
</script>
