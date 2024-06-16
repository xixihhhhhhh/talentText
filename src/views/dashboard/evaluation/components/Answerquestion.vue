/** 填报问卷页 */

<template>
  <PageWrapper>
    <div
      v-if="!showResult"
      :class="['py-5', 'px-2', { 'bg-blue': !showSubmit }]"
      style="min-height: 100vh"
    >
      <div
        v-if="showSubmit"
        class="-enter-x flex items-center justify-center rounded-2"
        style="min-height: 80vh"
      >
        <a-button v-if="!hasUnFinish" type="primary" class="mr-4" @click="handleSubmit"
          >开始测评</a-button
        >
        <div v-else class="-enter-x flex items-center">
          <a-button type="primary" class="mr-4" @click="resumeAssessment">继续作答</a-button>
          <a-button type="primary" class="mr-4" @click="againAssessment">重新开始</a-button>
        </div>
      </div>
      <div v-else class="px-2 rounded-2" style="border-radius: 10px">
        <progressBar :percent="percent" />
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
                  @click="debouncedhandleNextQuesThree(item, question, questionIndex)"
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
              ><a-button :icon="h(LeftSquareOutlined)" type="primary" class="w-25">返回</a-button>
            </Popconfirm>
            <a-button
              :icon="h(PauseCircleOutlined)"
              class="w-25"
              :disabled="curNumTypeThree === 1 && currentQuestionnaireIndex === 2"
              @click="handleLastQuesThree"
              >上一题</a-button
            >
            <a-button
              type="primary"
              @click="handleEvaluate"
              v-if="currentQuestionnaireIndex === 2 && curNumTypeThree === questionTypeThree.length"
              >测评结果</a-button
            >
          </div>
        </div>
        <div class="bg-white pt-2 rounded-2" v-else>
          <div v-if="isFenDuan(curQuestionTitle)" class="pl-2 text-20px font-600">
            <div v-for="item in typeThreeChaoshi(curQuestionTitle)" :key="item"> {{ item }}</div>
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
              @click="debouncedHandleNextQues(item)"
              >{{ item.option.slice(2).replace('。', '') }}</div
            >
          </div>
          <div class="text-center mt-5 pb-5 flex justify-around">
            <Popconfirm @confirm="back" title="确定后答题情况作废"
              ><a-button :icon="h(LeftSquareOutlined)" type="primary" class="w-30">返回</a-button>
            </Popconfirm>
            <a-button
              :icon="h(PauseCircleOutlined)"
              class="mr-4 w-30"
              :disabled="curNum === 1"
              @click="handleLastQues"
              >上一题</a-button
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else><Result /></div>
    <Modal centered title="提示" v-model:open="modalVisible" cancelText="休息" okText="继续">
      <p class="indent-4"
        >恭喜您，您已完成第一份问卷，继续完成第二份问卷将获得个人能力评价，您可以选择：</p
      >
      <template #footer>
        <a-button key="back" @click="relaxAssessment">下次再作答</a-button>
        <a-button key="submit" type="primary" @click="resumeAssessment">继续作答</a-button>
      </template>
    </Modal>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, watch, computed, onMounted, h } from 'vue';
  import { LeftSquareOutlined, PauseCircleOutlined } from '@ant-design/icons-vue';
  import { Popconfirm, Modal } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { getQuesApi } from '@/api/sys/question';
  import { setRelaxAssessment, getSecondWenjuan, clearSecondWenjuan } from '@/api/sys/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import Result from '@/views/dashboard/result/index.vue';
  import progressBar from './progress.vue';
  import {
    Option,
    convertToOptionArray,
    answer,
    splitString,
    getScore,
    convertToTwoDimensionalArray,
    handleFenHang,
    extractAndConvertToLowercase,
  } from './data';
  import { isFenDuan, stringArr, debounce, fourRepeatedObj } from './util';
  import { useQuestionStore } from '@/store/modules/question';
  import { data } from './test';
  import { useUserStore } from '@/store/modules/user';

  // import { addEvaluateListApi } from '@/api/sys/evaluateLists';
  const questionStore = useQuestionStore();
  const { createMessage } = useMessage();
  const answerArr = ref<answer[]>([]);
  const showSubmit = ref(true);
  const showSubmitButton = ref(false);
  const curNum = ref(0);
  let questionTypeOne: object[] = [];
  let questionTypeTwo: object[] = [];
  let questionTypeThree = ref<object[]>([]);
  let allquesData: object[] = [];
  const currentQuestionnaireIndex = ref(1);
  const curNumTypeThree = ref(1);
  const secondWenJuans = ref<any>();
  const hasUnFinish = ref(false);
  const userStore = useUserStore();
  const modalVisible = ref(false);
  const percent = computed(() => {
    return Math.round(((curNum.value + (curNumTypeThree.value - 1) * 3) / 70) * 100);
  });
  onMounted(async () => {
    const email = userStore.getUserInfo.email;
    const secondWenJuan = await getSecondWenjuan({ email });
    hasUnFinish.value = !!secondWenJuan.hasUnFinish;
    if (hasUnFinish.value) {
      // 如果有未完成的问卷，那么拿到上一次答题的结果即可,并且拿到上一次未完成的题目
      currentQuestionnaireIndex.value = 2;
      answerArr.value.push(...secondWenJuan.firstWenJuanAnswer);
      secondWenJuans.value = secondWenJuan.secondWenJuanQuestion;
      questionTypeThree.value = convertToTwoDimensionalArray(
        secondWenJuan.secondWenJuanQuestion,
        3,
      );
    } else {
      currentQuestionnaireIndex.value = 1;
    }
  });

  async function handleSubmit() {
    const isTest = false;
    if (!isTest) {
      const { firstWenJuan, secondWenJuan } = await getQuesApi();
      secondWenJuans.value = secondWenJuan.questionTypeThree;
      questionTypeOne = firstWenJuan.questionTypeOne;
      questionTypeTwo = firstWenJuan.questionTypeTwo;
      questionTypeThree.value = convertToTwoDimensionalArray(firstWenJuan.questionTypeThree, 3);
      allquesData = [...questionTypeOne, ...questionTypeTwo];
      curNum.value = 1;
      showSubmit.value = false;
    } else {
      getScore(data);
      await new Promise(() => {
        setTimeout(() => {
          showResult.value = true;
        }, 0);
      });
    }
  }

  const typeThreeAns = ref<answer[]>([]);
  const answerArrThree = ref([]);
  // 继续答题
  function resumeAssessment() {
    answerArr.value.push(...answerArrThree.value.flat(2));
    isTypeThree.value = true;
    currentQuestionnaireIndex.value = 2;
    questionTypeThree.value = convertToTwoDimensionalArray(secondWenJuans.value, 3);
    answerArrThree.value = [];
    selectValueOne.value = '';
    selectValueTwo.value = '';
    selectValueThree.value = '';
    typeThreeAns.value = [];
    curNum.value = 1;
    curNumTypeThree.value = 1;
    showSubmit.value = false;
    modalVisible.value = false;
  }

  // 重新开始
  async function againAssessment() {
    // 清空用户信息先，调接口，传email
    const email = userStore.getUserInfo.email;
    await clearSecondWenjuan({ email });
    curNum.value = 1;
    currentQuestionnaireIndex.value = 1;
    hasUnFinish.value = false;
    answerArr.value = [];
  }

  // 下次再作答
  async function relaxAssessment() {
    const email = userStore.getUserInfo.email;
    answerArr.value.push(...answerArrThree.value.flat(2));
    answerArr.value.push(...fourArray.value);
    answerArr.value = answerArr.value.filter(Boolean);
    await setRelaxAssessment({
      email,
      firstWenJuanAnswer: answerArr.value,
      secondWenJuanQuestion: secondWenJuans.value,
    });
    curNum.value = 1;
    curNumTypeThree.value = 1;
    answerArrThree.value = [];
    hasUnFinish.value = true;
    answerArr.value = [];
    fourArray.value = [];
    modalVisible.value = false;
    showSubmit.value = true;
  }

  function handleEvaluate() {
    if (selectValueOne.value === '') {
      createMessage.error({
        content: '请回答完选择题',
        duration: 3,
      });
    } else {
      fourArray.value = fourArray.value.filter(Boolean);
      answerArr.value.push(...fourArray.value);
      answerArr.value.push(typeThreeAns.value[0]);
      answerArr.value.push(...answerArrThree.value.flat(2));
      questionStore.setQuestionAns(answerArr.value);
      getScore(answerArr.value);
      showResult.value = true;
    }
  }

  function typeThreeChaoshi(str: string) {
    const isChaoShi = str.includes('超市');
    return isChaoShi ? stringArr.chaoshi : stringArr.changge;
  }

  const curQuestion: any = computed(() => {
    return allquesData[curNum.value - 1];
  });

  const curQuestionTypeThree = computed(() => {
    return questionTypeThree.value[curNumTypeThree.value - 1];
  });

  const questionTitleThree = function (item: { quesData: any }) {
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
  const questionNum = computed(() => {
    return allquesData.length;
  });
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
    (await new Promise(() => {
      setTimeout(() => {
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
        curNum.value += 1;
      }, 200);
    })) as unknown as Promise<void>;
  }

  const debouncedHandleNextQues = debounce(handleNextQues, 200);

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

  const fourArray = ref<answer[]>([]);
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
    if (quesData.isRepeat) {
      const oppisteCompetency = extractAndConvertToLowercase(quesData.repeatField);
      const repeatCompetency = ['teamwork1', 'teamwork2', 'plan', 'norms'];
      const index = repeatCompetency.indexOf(oppisteCompetency);
      const answerObj = fourRepeatedObj[index];
      answerObj.value = item.value;
      answerObj.score = Number(item.value[1]);
      fourArray.value[index] = answerObj;
    }
    let curAnsObj: answer = {
      careerField: question.careerField,
      careerAdvantages: question.careerAdvantages,
      competency: question.competency,
      value: item.value,
      score: Number(item.value[1]),
    };
    typeThreeAns.value[index] = curAnsObj;
    if (
      currentQuestionnaireIndex.value === 2 &&
      curNumTypeThree.value === questionTypeThree.value.length
    ) {
      return;
    }
    if (!!typeThreeAns.value[0] && !!typeThreeAns.value[1] && !!typeThreeAns.value[2]) {
      // @ts-ignore
      answerArrThree.value[curNumTypeThree.value - 1] = typeThreeAns.value;
      if (curNumTypeThree.value === questionTypeThree.value.length) {
        modalVisible.value = true;
        return;
      }
      if (curNumTypeThree.value === questionTypeThree.value.length) {
        return;
      }
      (await new Promise(() => {
        setTimeout(() => {
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
        }, 100);
      })) as unknown as Promise<void>;
    }
  }

  const debouncedhandleNextQuesThree = debounce(handleNextQuesThree, 200);
  const isTypeThree = ref(false);

  function back() {
    isTypeThree.value = false;
    selectValueOne.value = '';
    selectValueTwo.value = '';
    selectValueThree.value = '';
    answerArrThree.value = [];
    fourArray.value = [];
    answerArr.value = [];
    showSubmit.value = true;
    curNum.value = 1;
    curNumTypeThree.value = 1;
    selectValue.value = '';
  }

  const showResult = ref(false);
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
