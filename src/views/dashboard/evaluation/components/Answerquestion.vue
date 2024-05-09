/** 填报问卷页 */

<template>
  <PageWrapper>
    <div
      v-if="!showResult"
      :class="['py-5', 'px-2', { 'bg-blue': !showSubmit }]"
      style="min-height: 80vh"
    >
      <BasicForm
        @register="register"
        @submit="handleSubmit"
        v-if="showSubmit"
        class="mt-10 -enter-x"
      />
      <div v-else class="px-2 pt-4 border-radius-lg" style="border-radius: 10px" ref="pdfDom">
        <div v-if="isTypeThree" class="text-20px font-600">
          <div v-for="(question, questionIndex) in curQuestionTypeThree" :key="question">
            <div class="bg-#fff my-4 pt-2">
              <div v-if="questionTitleThree(question).title" class="text-15px py-2 ml-4">{{
                questionTitleThree(question).title
              }}</div>
              <div :class="['parent', 'text-14px']">
                <div :class="['trapezoid1', 'trapezoid']"
                  >{{ handleFenHang(questionTitleThree(question).option[0]) }}
                </div>
                <div :class="['trapezoid2', 'trapezoid']">{{
                  questionTitleThree(question).option[1].replace(/\n/g, '')
                }}</div>
              </div>
              <div class="flex w-full text-lg mt-4 pb-4">
                <div
                  v-for="item in convertToOptionArrays(question.quesData)"
                  :value="item"
                  :key="item"
                  @click="handleNextQuesThree(item, question, questionIndex)"
                  style="border-radius: 5px"
                  :class="[
                    'flex',
                    'justify-center',
                    'items-center',
                    'mx-1',
                    'py-2',
                    'flex-1',
                    'text-14px',
                    'bg-#f5f5f8',
                    'border-2',
                    'border-#eee',
                    {
                      'bg-#4c7cf6!': isChecked(item.value, questionIndex),
                      'text-white': isChecked(item.value, questionIndex),
                    },
                  ]"
                  >{{ item.option.slice(2).trim() }}</div
                >
              </div>
            </div>
          </div>
          <div class="text-center mt-5 pb-5 flex justify-around">
            <Popconfirm @confirm="back" title="确定后答题情况作废"
              ><a-button type="primary">返回</a-button>
            </Popconfirm>
            <a-button
              type="primary"
              class="mr-4"
              :disabled="curNum === 1"
              @click="handleLastQuesThree"
              >上一题</a-button
            >
            <a-button
              type="primary"
              class="mr-4"
              v-show="curNumTypeThree === questionTypeThree.length"
              @click="handleEvaluate"
              >评测</a-button
            >
          </div>
        </div>
        <div class="bg-white pt-2" v-else>
          <div v-if="isFenDuan(curQuestionTitle)" class="pl-2 text-20px font-600">
            <div v-for="item in strings(curQuestionTitle)" :key="item"> {{ item }}</div>
          </div>
          <div class="pl-2 text-20px font-600" v-else>
            {{ curQuestionTitle.replace(/[（）]/g, '') }}
          </div>
          <div class="text-lg ml-2 mt-4 pb-4">
            <div
              :value="item.value"
              style="border-radius: 10px"
              :class="[
                'mt-2',
                'text-lg',
                'p-2',
                'bg-#f5f5f8',
                {
                  'bg-#4c7cf6!': item.value === selectValue,
                  'text-white': item.value === selectValue,
                },
              ]"
              v-for="item in curQues"
              :key="item"
              @click="handleNextQues(item)"
              >{{ item.option.slice(2).replace('。', '') }}</div
            >
          </div>
          <div class="text-center mt-5 pb-5 flex justify-around">
            <Popconfirm @confirm="back" title="确定后答题情况作废"
              ><a-button type="primary" class="mr-10">返回</a-button>
            </Popconfirm>
            <a-button type="primary" class="mr-4" :disabled="curNum === 1" @click="handleLastQues"
              >上一题</a-button
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else><Result /></div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { Popconfirm } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';
  import { getQuesApi } from '@/api/sys/question';
  import { useMessage } from '@/hooks/web/useMessage';
  import Result from '@/views/dashboard/result/index.vue';
  import {
    schemas,
    Option,
    convertToOptionArray,
    answer,
    splitString,
    getScore,
    convertToTwoDimensionalArray,
    stringArr,
    handleFenHang,
  } from './data';
  import { useQuestionStore } from '@/store/modules/question';
  import { data } from './test';

  const pdfDom = ref(null);
  // import { addEvaluateListApi } from '@/api/sys/evaluateLists';
  const questionStore = useQuestionStore();
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
  let questionTypeThree = ref<object[]>([]);
  let allquesData: object[] = [];
  const flag = true;
  const curNumTypeThree = ref(1);

  async function handleSubmit() {
    if (flag) {
      const res = await getQuesApi();
      questionTypeOne = res.questionTypeOne;
      questionTypeTwo = res.questionTypeTwo;
      questionTypeThree.value = convertToTwoDimensionalArray(res.questionTypeThree, 3);
      allquesData = [...questionTypeOne, ...questionTypeTwo];
      curNum.value = 1;
      showSubmit.value = false;
    } else {
      getScore(data);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 0);
      });
      showResult.value = true;
    }
  }

  function isFenDuan(str: string) {
    return str.includes('①');
  }

  function strings(str: string) {
    const isChaoShi = str.includes('超市');
    return isChaoShi ? stringArr.chaoshi : stringArr.changge;
  }

  const questionNum = computed(() => {
    return allquesData.length;
  });

  const curQuestion: any = computed(() => {
    // @ts-ignore
    return allquesData[curNum.value - 1];
  });

  const curQuestionTypeThree = computed(() => {
    // @ts-ignore
    return questionTypeThree.value[curNumTypeThree.value - 1];
  });

  const questionTitleThree = function (item: object) {
    // @ts-ignore
    return splitString(item.quesData.questionName);
  };

  const curQuestionTitle = computed(() => {
    // @ts-ignore
    const questionName = curQuestion.value.quesData.questionName;
    return questionName;
  });

  const nextDisable = ref(false);

  function convertToOptionArrays(quesData: any) {
    return convertToOptionArray(quesData);
  }

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
    selectValue.value = item.value;
    let curAnsObj: answer = {
      careerField: curQuestion.value.careerField,
      careerAdvantages: curQuestion.value.careerAdvantages,
      competency: curQuestion.value.competency,
      value: item.value,
      score: Number(item.value[1]),
    };
    answerArr.value[curNum.value - 1] = curAnsObj;
    (await new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 200);
    })) as unknown as Promise<void>;
    selectValue.value = answerArr.value[curNum.value]?.value || '';
    if (curNum.value === allquesData.length) {
      isTypeThree.value = true;
      if (answerArrThree.value[0]) {
        typeThreeAns.value = answerArrThree.value[0];
        selectValueOne.value = typeThreeAns.value[0].value;
        selectValueTwo.value = typeThreeAns.value[1]?.value || '';
        selectValueThree.value = typeThreeAns.value[2]?.value || '';
      }
      return;
    }
    curNum.value = curNum.value + 1;
  }

  const typeThreeAns = ref<answer[]>([]);

  const selectValueOne = ref('');
  const selectValueTwo = ref('');
  const selectValueThree = ref('');
  function isChecked(value: string, index: number) {
    if (index === 0) {
      return selectValueOne.value === value;
    } else if (index === 1) {
      return selectValueTwo.value === value;
    } else {
      return selectValueThree.value === value;
    }
  }

  const answerArrThree = ref([]);
  const twoArray = ref<answer[]>([]);
  function handleLastQuesThree() {
    if (curNumTypeThree.value === 1) {
      selectValue.value = answerArr.value[curNum.value - 1]?.value || '';
      isTypeThree.value = false;
    } else {
      curNumTypeThree.value = curNumTypeThree.value - 1;
      typeThreeAns.value = answerArrThree.value[curNumTypeThree.value - 1];
      selectValueOne.value = typeThreeAns.value[0]?.value || '';
      selectValueTwo.value = typeThreeAns.value[1]?.value || '';
      selectValueThree.value = typeThreeAns.value[2]?.value || '';
    }
  }

  async function handleNextQuesThree(item: any, question: any, index: number) {
    if (index === 0) {
      selectValueOne.value = item.value;
    } else if (index === 1) {
      selectValueTwo.value = item.value;
    } else {
      selectValueThree.value = item.value;
    }
    const quesData = question.quesData;
    const title = quesData.questionName;
    if (title.includes('我通常做事情时')) {
      twoArray.value[0] = {
        careerField: 'transaction',
        careerAdvantages: 'controlled',
        competency: 'plan',
        value: item.value,
        score: Number(item.value[1]),
      };
    } else if (title.includes('我更习惯通过')) {
      twoArray.value[1] = {
        careerField: 'transaction',
        careerAdvantages: 'controlled',
        competency: 'plan',
        value: item.value,
        score: Number(item.value[1]),
      };
    }
    let curAnsObj: answer = {
      careerField: question.careerField,
      careerAdvantages: question.careerAdvantages,
      competency: question.competency,
      value: item.value,
      score: Number(item.value[1]),
    };
    typeThreeAns.value[index] = curAnsObj;
    if (!!typeThreeAns.value[0] && !!typeThreeAns.value[1] && !!typeThreeAns.value[2]) {
      // @ts-ignore
      answerArrThree.value[curNumTypeThree.value - 1] = typeThreeAns.value;
      if (curNumTypeThree.value === questionTypeThree.value.length) {
        return;
      }
      (await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 200);
      })) as unknown as Promise<void>;
      curNumTypeThree.value += 1;
      selectValueOne.value = '';
      selectValueTwo.value = '';
      selectValueThree.value = '';
      typeThreeAns.value = answerArrThree.value[curNumTypeThree.value - 1] || [];
      if (typeThreeAns.value.length > 0) {
        selectValueOne.value = typeThreeAns.value[0].value;
        selectValueTwo.value = typeThreeAns.value[1].value;
        selectValueThree.value = typeThreeAns.value[2].value;
      }
    }
  }

  const isTypeThree = ref(false);

  function back() {
    isTypeThree.value = false;
    selectValueOne.value = '';
    selectValueTwo.value = '';
    selectValueThree.value = '';
    answerArrThree.value = [];
    twoArray.value = [];
    answerArr.value = [];
    showSubmit.value = true;
    curNum.value = 1;
    curNumTypeThree.value = 1;
    selectValue.value = '';
  }

  const showResult = ref(false);
  function handleEvaluate() {
    if (
      selectValueOne.value === '' ||
      selectValueTwo.value === '' ||
      selectValueThree.value === ''
    ) {
      createMessage.error({
        content: '请回答选择题',
        duration: 3,
      });
    } else {
      answerArr.value.push(...twoArray.value);
      // @ts-ignore
      answerArr.value.push(...answerArrThree.value.flat(2));
      questionStore.setQuestionAns(answerArr.value);
      getScore(answerArr.value);
      // const { success } = addEvaluateListApi({});
      showResult.value = true;
    }
  }
</script>

<style scoped>
  .parent {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 10px;
    background-color: #f2f2f2;
  }

  .trapezoid {
    width: 50%;
    border-radius: 5px;
  }

  .trapezoid1 {
    padding: 10px 12.5% 10px 5px;
    background-color: #dae5fb;
    clip-path: polygon(0% 0, 100% 0, 75% 100%, 0% 100%);
  }

  .trapezoid2 {
    padding: 10px 5px 10px 12.5%;
    background-color: #e6effe;
    clip-path: polygon(25% 0, 100% 0, 100% 100%, 0% 100%);
  }
</style>
