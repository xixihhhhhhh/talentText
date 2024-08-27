<template>
  <PageWrapper>
    <div
      v-if="!showResult"
      :class="['py-5', 'px-2', { 'bg-blue': !showAnswerQuestion }]"
      style="min-height: 100vh"
    >
      <div v-show="showAnswerQuestion" class="-enter-x rounded-2" style="min-height: 80vh">
        <BasicForm
          v-show="!hasUnFinished"
          @register="register"
          @submit="handleSubmit"
          class="-enter-x mt-10"
        />
        <div v-show="hasUnFinished" class="-enter-x h-100 flex items-center justify-center">
          <a-button type="primary" class="mr-4" @click="resumeAssessment">继续作答</a-button>
          <Popconfirm @confirm="againAssessment" title="确定后答题情况作废">
            <a-button type="primary" class="mr-4">重新开始</a-button>
          </Popconfirm>
        </div>
      </div>
      <div v-if="!showAnswerQuestion" class="px-2 rounded-2" style="border-radius: 10px">
        <ProgressBar :percent="percent" />
        <div class="text-20px font-600" v-if="isTypeThree">
          <div v-for="(question, questionIndex) in curQuestionTypeThree" :key="questionIndex">
            <div class="bg-#fff my-4 pt-2">
              <div
                v-if="questionTitleThree(question).title"
                class="text-15px py-2 ml-4 user-select-none text-18px"
                >{{ questionTitleThree(question).title }}</div
              >
              <div :class="['parent', 'text-18px']">
                <div :class="['trapezoid1', 'trapezoid']"
                  >{{ handleFenHang(questionTitleThree(question).option[0]) }}
                </div>
                <div :class="['trapezoid2', 'trapezoid']">{{
                  questionTitleThree(question).option[1].replace(/\n/g, '')
                }}</div>
              </div>
              <div class="flex w-full text-lg mt-4 pb-4">
                <div
                  v-for="(item, index) in convertToOptionArray(question.quesData)"
                  :value="item"
                  :key="index"
                  @click="debouncedHandleNextQuesThree(item, question, questionIndex)"
                  style="border-radius: 5px; user-select: none"
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
              :disabled="curIndexTypeThree === 1 && currentQuestionnaireIndex === 2"
              @click="handleLastQuesThree"
              >上一题</a-button
            >
            <a-button
              type="primary"
              @click="handleEvaluate"
              v-if="
                currentQuestionnaireIndex === 2 && curIndexTypeThree === questionTypeThree.length
              "
              >提交测评</a-button
            >
          </div>
        </div>
        <div class="bg-white pt-2 rounded-2 user-select-none" v-else>
          <div v-if="isFenDuan(curQuestionTitle)" class="pl-2 text-20px font-600">
            <div v-for="(item, index) in typeThreeChaoshi(curQuestionTitle)" :key="index">
              {{ item }}</div
            >
          </div>
          <div class="pl-2 text-20px font-600" v-else>
            {{ curQuestionTitle.replace(/[（）]/g, '') }}
          </div>
          <div class="text-lg ml-2 mt-4 pb-4">
            <div
              style="border-radius: 10px"
              :class="[
                'mt-2',
                'text-lg',
                'p-2',
                'bg-#f5f5f8',
                'user-select-none',
                {
                  'bg-#4c7cf6!': item.value === selectValue,
                  'text-white': item.value === selectValue,
                  'text-54px!': isFenDuan(curQuestionTitle) && !isMobile,
                  'text-27px!': isFenDuan(curQuestionTitle) && isMobile,
                },
              ]"
              v-for="(item, index) in curQues"
              :key="index"
              @click="handleNextQues(item)"
              >{{ ouran(item.option.slice(2).replace('。', '')) }}
            </div>
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
    <div v-else>
      <Result />
    </div>
    <Modal centered title="提示" v-model:open="modalVisible" cancelText="休息" okText="继续">
      <div class="p-4">恭喜您，您已完成第一份问卷！</div>
      <div class="p-4">继续完成第二份问卷将获得个人能力评价，您可以选择：</div>
      <template #footer>
        <a-button key="back" @click="relaxAssessment">下次再作答</a-button>
        <a-button key="submit" type="primary" @click="resumeAssessment">继续作答</a-button>
      </template>
    </Modal>
    <Modal
      centered
      title="提示"
      v-model:open="openDisable"
      cancelText="取消"
      okText="确定"
      @ok="openDisable = false"
    >
      <div class="flex justify-center items-center font-bold text-lg">抱歉，您已经测评过了。</div>
      <div class="flex justify-center items-center font-bold text-lg"
        >可以找管理员申请重新测评。</div
      >
    </Modal>
    <Modal
      centered
      title="温馨提醒"
      v-model:open="openModal"
      cancelText="退出本次作答"
      okText="继续作答"
      @ok="continueTimeKeeping"
      @cancel="back"
    >
      <div class="flex justify-center items-center font-bold text-lg"
        >您在当前页面停留时间过长，请您选择：</div
      >
    </Modal>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted, h } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { LeftSquareOutlined, PauseCircleOutlined } from '@ant-design/icons-vue';
  import { Popconfirm, Modal } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { getQuesApi } from '@/api/sys/question';
  import {
    setRelaxAssessment,
    getSecondWenjuan,
    clearSecondWenjuan,
    getCanTextApi,
    continueAnswer,
  } from '@/api/sys/user';
  import { getEvaluateFormDataApi } from '@/api/sys/duty';
  import { useMessage } from '@/hooks/web/useMessage';
  import Result from '@/views/dashboard/result/index.vue';
  import ProgressBar from './progress.vue';
  import {
    convertToOptionArray,
    questionTitleThree,
    getScore,
    convertToTwoDimensionalArray,
    handleFenHang,
    extractAndConvertToLowercase,
  } from './data';
  import { processDepartmentObj, getTime } from './methods';
  import type { Question, Answer, DepartmentInfos } from './type';
  import { isFenDuan, typeThreeChaoshi, debounce, fourRepeatedObj, ouran } from './util';
  import { useQuestionStore } from '@/store/modules/question';
  import { testData } from './test';
  import { useUserStore } from '@/store/modules/user';
  import { addEvaluateListApi } from '@/api/sys/evaluateHistory';
  import { getSchemas } from './evaluateFormData';
  import { useTime } from './useTime';
  import { useWarning } from './useWarning';

  const { createMessage } = useMessage();
  const userStore = useUserStore();
  const [register, { setProps }] = useForm({
    labelWidth: 120,
    actionColOptions: { span: 24, style: { textAlign: 'center' } },
    submitButtonOptions: { text: '开始测评' },
  });
  const { start, getSpendTime } = useTime();
  const { openModal, startTimeKeeping, clearTimeKeeping, continueTimeKeeping } = useWarning();
  const userInfo = userStore.getUserInfo;
  const phone = ref(userInfo.phone);
  const questionStore = useQuestionStore();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let questionTypeOne: Question[] = [];
  let questionTypeTwo: Question[] = [];
  const questionTypeThree = ref<Question[][]>([]);
  let allquesData: Question[] = [];
  let stopRepeatClick = false;

  const departmentForm = ref<DepartmentInfos>();
  const answerArr = ref<Answer[]>([]);
  const showAnswerQuestion = ref(true);
  const curNum = ref(0);
  const currentQuestionnaireIndex = ref(1);
  const curIndexTypeThree = ref(1);
  const secondWenJuans = ref<any>();
  const hasUnFinished = ref(false);
  const modalVisible = ref(false);
  const showResult = ref(false);
  const typeThreeAns = ref<Answer[]>([]);
  const answerArrThree = ref([]);
  const selectValue = ref<string>('');
  const selectValueTypeThree = ref<string[]>([]);
  const fourArray = ref<Answer[]>([]);
  const isTypeThree = ref(false);
  const canTest = ref(true);
  const openDisable = ref(false);

  const percent = computed(() => {
    return Math.round(((curNum.value + (curIndexTypeThree.value - 1) * 3) / 74) * 100);
  });

  const curQuestion = computed(() => {
    return allquesData[curNum.value - 1];
  });

  const curQuestionTypeThree = computed(() => {
    return questionTypeThree.value[curIndexTypeThree.value - 1];
  });

  const curQuestionTitle = computed(() => {
    // @ts-ignore
    const questionName = curQuestion.value.quesData.questionName;
    return questionName;
  });

  const curQues = computed(() => {
    // @ts-ignore
    return convertToOptionArray(curQuestion.value.quesData);
  });

  onMounted(async () => {
    const res = await getCanTextApi({ user_id: userInfo.userId });
    canTest.value = res.canTest;
    const { departmentObj, subDepartmentObj, departmentObjArr, subPosition } =
      await getEvaluateFormDataApi();
    const schemas = getSchemas(departmentObjArr, departmentObj, subDepartmentObj, subPosition);
    const schemasOption = {
      labelWidth: 120,
      schemas,
      actionColOptions: { span: 24, style: { textAlign: 'center' } },
      submitButtonOptions: { text: '开始测评' },
    };
    setProps(schemasOption);
    const secondWenJuan = await getSecondWenjuan({ phone: phone.value });
    hasUnFinished.value = secondWenJuan.hasUnFinish;
    if (hasUnFinished.value) {
      // 如果有未完成的问卷，那么拿到上一次答题的结果即可,并且拿到上一次未完成的题目
      questionStore.setCorrFunc(secondWenJuan.corrFunc);
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

  async function handleSubmit(values: any) {
    if (!canTest.value) {
      openDisable.value = true;
      return;
    }
    values = processDepartmentObj(values);
    departmentForm.value = values;
    const isTest = false;
    if (isTest) {
      const { competencyObj, careerAdvantagesObj, careerFieldObj, echartOptions } =
        getScore(testData);
      questionStore.setScores({ competencyObj, careerAdvantagesObj, careerFieldObj });
      questionStore.setLeidatu(echartOptions);
      if (!departmentForm.value) return;
      addEvaluateListApi({
        user_id: +userInfo.userId,
        name: userInfo.name,
        department: departmentForm.value.department,
        position: departmentForm.value.position,
        finishTime: getTime(),
        subDepartment: departmentForm.value.subDepartment ?? '',
        echartOptions,
        competencyObj,
        careerAdvantagesObj,
        careerFieldObj,
        corrFunc: departmentForm.value.corrFunc,
      });
      showResult.value = true;
    } else {
      const { firstWenJuan, secondWenJuan } = await getQuesApi();
      secondWenJuans.value = secondWenJuan.questionTypeThree;
      questionTypeOne = firstWenJuan.questionTypeOne;
      questionTypeTwo = firstWenJuan.questionTypeTwo;
      questionTypeThree.value = convertToTwoDimensionalArray(firstWenJuan.questionTypeThree, 3);
      allquesData = [...questionTypeOne, ...questionTypeTwo];
      curNum.value = 1;
      showAnswerQuestion.value = false;
      start();
      clearTimeKeeping();
      startTimeKeeping();
    }
  }

  // 继续答题
  async function resumeAssessment() {
    await continueAnswer({ phone: phone.value, spendTime: getSpendTime() });
    answerArr.value.push(...answerArrThree.value.flat(2));
    typeThreeAns.value[0] && answerArr.value.push(typeThreeAns.value[0]);
    isTypeThree.value = true;
    currentQuestionnaireIndex.value = 2;
    questionTypeThree.value = convertToTwoDimensionalArray(secondWenJuans.value, 3);
    answerArrThree.value = [];
    selectValueTypeThree.value = [];
    typeThreeAns.value = [];
    curNum.value = 1;
    curIndexTypeThree.value = 1;
    showAnswerQuestion.value = false;
    modalVisible.value = false;
    start();
    clearTimeKeeping();
    startTimeKeeping();
  }

  // 重新开始
  async function againAssessment() {
    clearTimeKeeping();
    // 清空用户信息先，调接口，传email
    await clearSecondWenjuan({ phone: phone.value });
    curNum.value = 1;
    currentQuestionnaireIndex.value = 1;
    hasUnFinished.value = false;
    answerArr.value = [];
  }

  // 下次再作答
  async function relaxAssessment() {
    clearTimeKeeping();
    answerArr.value.push(...answerArrThree.value.flat(2));
    answerArr.value.push(...fourArray.value);
    answerArr.value.push(typeThreeAns.value[0]);
    answerArr.value = answerArr.value.filter(Boolean);
    await setRelaxAssessment({
      phone: phone.value,
      firstWenJuanAnswer: answerArr.value,
      secondWenJuanQuestion: secondWenJuans.value,
      corrFunc: departmentForm.value!.corrFunc,
      spendTime: getSpendTime(),
    });
    curNum.value = 1;
    curIndexTypeThree.value = 1;
    answerArrThree.value = [];
    hasUnFinished.value = true;
    typeThreeAns.value = [];
    fourArray.value = [];
    modalVisible.value = false;
    showAnswerQuestion.value = true;
  }

  function handleEvaluate() {
    clearTimeKeeping();
    if (selectValueTypeThree.value[0] === '' || selectValueTypeThree.value[1] === '') {
      createMessage.error({
        content: '请回答完选择题',
        duration: 3,
      });
    } else {
      fourArray.value = fourArray.value.filter(Boolean);
      answerArr.value.push(...fourArray.value);
      answerArr.value.push(...typeThreeAns.value);
      answerArr.value.push(...answerArrThree.value.flat(2));
      questionStore.setQuestionAns(answerArr.value);
      const { competencyObj, careerAdvantagesObj, careerFieldObj, echartOptions } = getScore(
        answerArr.value,
      );
      questionStore.setScores({ competencyObj, careerAdvantagesObj, careerFieldObj });
      questionStore.setLeidatu(echartOptions);
      showResult.value = true;
      departmentForm.value && questionStore.setCorrFunc(departmentForm.value.corrFunc);
      clearSecondWenjuan({ phone: phone.value });
      if (!departmentForm.value) return;
      addEvaluateListApi({
        user_id: +userInfo.userId,
        name: userInfo.name,
        department: departmentForm.value.department,
        position: departmentForm.value.position,
        finishTime: getTime(),
        subDepartment: departmentForm.value.subDepartment ?? '',
        echartOptions,
        competencyObj,
        careerAdvantagesObj,
        careerFieldObj,
        corrFunc: departmentForm.value.corrFunc,
        spendTime: getSpendTime(),
      });
    }
  }

  function handleLastQues() {
    clearTimeKeeping();
    startTimeKeeping();
    selectValue.value = answerArr.value[curNum.value - 2].value;
    curNum.value = curNum.value - 1;
  }

  async function handleNextQues(item: any) {
    clearTimeKeeping();
    startTimeKeeping();
    if (stopRepeatClick) return;
    stopRepeatClick = true;
    selectValue.value = item.value;
    let curAnsObj: Answer = {
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
            selectValueTypeThree.value[0] = typeThreeAns.value[0].value || '';
            selectValueTypeThree.value[1] = typeThreeAns.value[1].value || '';
            selectValueTypeThree.value[2] = typeThreeAns.value[2].value || '';
          }
          return;
        }
        curNum.value += 1;
        setTimeout(() => {
          stopRepeatClick = false;
        }, 200);
      }, 200);
    })) as unknown as Promise<void>;
  }

  function isChecked(value: string, index: number) {
    return selectValueTypeThree.value[index] === value;
  }

  function handleLastQuesThree() {
    clearTimeKeeping();
    startTimeKeeping();
    if (curIndexTypeThree.value === 1) {
      selectValue.value = answerArr.value[curNum.value - 1]?.value || '';
      isTypeThree.value = false;
      stopRepeatClick = false;
    } else {
      curIndexTypeThree.value = curIndexTypeThree.value - 1;
      typeThreeAns.value = answerArrThree.value[curIndexTypeThree.value - 1];
      selectValueTypeThree.value[0] = typeThreeAns.value[0].value || '';
      selectValueTypeThree.value[1] = typeThreeAns.value[1].value || '';
      selectValueTypeThree.value[2] = typeThreeAns.value[2].value || '';
    }
  }

  async function handleNextQuesThree(item: any, question: any, index: number) {
    clearTimeKeeping();
    startTimeKeeping();
    selectValueTypeThree.value[index] = item.value;
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
    let curAnsObj: Answer = {
      careerField: question.careerField,
      careerAdvantages: question.careerAdvantages,
      competency: question.competency,
      value: item.value,
      score: Number(item.value[1]),
    };
    typeThreeAns.value[index] = curAnsObj;
    if (
      currentQuestionnaireIndex.value === 2 &&
      curIndexTypeThree.value === questionTypeThree.value.length
    ) {
      return;
    }
    if (typeThreeAns.value[0] && curIndexTypeThree.value === questionTypeThree.value.length) {
      modalVisible.value = true;
      return;
    }
    if (typeThreeAns.value[0] && typeThreeAns.value[1] && typeThreeAns.value[2]) {
      // @ts-ignore
      answerArrThree.value[curIndexTypeThree.value - 1] = typeThreeAns.value;
      if (curIndexTypeThree.value === questionTypeThree.value.length) {
        return;
      }
      (await new Promise(() => {
        setTimeout(() => {
          curIndexTypeThree.value += 1;
          selectValueTypeThree.value = [];
          typeThreeAns.value = answerArrThree.value[curIndexTypeThree.value - 1] || [];
          if (typeThreeAns.value.length > 0) {
            selectValueTypeThree.value[0] = typeThreeAns.value[0].value || '';
            selectValueTypeThree.value[1] = typeThreeAns.value[1].value || '';
            selectValueTypeThree.value[2] = typeThreeAns.value[2].value || '';
          }
        }, 100);
      })) as unknown as Promise<void>;
    }
  }

  const debouncedHandleNextQuesThree = debounce(handleNextQuesThree, 200);

  function back() {
    isTypeThree.value = false;
    selectValueTypeThree.value = [];
    answerArrThree.value = [];
    fourArray.value = [];
    answerArr.value = [];
    showAnswerQuestion.value = true;
    curNum.value = 1;
    curIndexTypeThree.value = 1;
    selectValue.value = '';
    clearTimeKeeping();
  }
</script>

<style scoped>
  .parent {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #f2f2f2;
  }

  .trapezoid {
    width: 50%;
    border-radius: 5px;
  }

  .trapezoid1 {
    padding: 10px 5% 10px 10px;
    background-color: #dae5fb;
    clip-path: polygon(0% 0, 100% 0, 85% 100%, 0% 100%);
  }

  .trapezoid2 {
    padding: 10px 10px 10px 5.5%;
    background-color: #e6effe;
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
  }

  .user-select-none {
    user-select: none;
  }
</style>
