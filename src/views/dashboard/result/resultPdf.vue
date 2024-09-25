<template>
  <Spin size="large" :spinning="spinning">
    <PageWrapper :class="prefixCls">
      <div ref="cover">
        <div class="py-200px">
          <div class="flex">
            <div
              class="w-80% h-220px pt-10px pl-30px bg-#4773ca polygon flex-col justify-center items-center"
            >
              <div class="text-white text-100px mb-15px" :style="{ letterSpacing: '55px' }"
                >测评报告</div
              >
              <div class="text-#29bccb text-60px">ASSESSMENT REPORT</div>
            </div>
            <div>
              <div class="w-140px h-140px bg-#28B8C5 transform transformTop"> </div>
              <div class="w-140px h-140px bg-#28B8C5 transform transformBottom"> </div>
            </div>
            <div class="w-140px h-140px bg-#4773ca transform transformRight"> </div>
          </div>
          <div class="text-40px font-bold ml-100px relative bottom-20px">
            姓名: {{ userInfo.name }}
          </div>
          <div class="flex mt-8 h-60px text-25px">
            <div class="form">
              <div class="w-200px flex justify-between mr-15px">
                <span>所</span><span>属</span><span>部</span><span>门:</span>
              </div>
              {{ department }}
            </div>
            <div class="form">
              <div class="w-200px flex justify-between mr-15px">
                <span>所</span><span>属</span><span>岗</span><span>位:</span>
              </div>
              {{ position }}
            </div>
          </div>
          <div class="flex h-60px text-25px">
            <div class="form">
              <div class="w-200px flex justify-between mr-15px">
                <span>电</span><span>话:</span>
              </div>
              {{ userInfo.phone }}
            </div>
            <div class="form">
              <div class="w-200px flex justify-between mr-15px">
                <span>完</span><span>成</span><span>时</span><span>间:</span>
              </div>
              {{ finishTime }}
            </div>
          </div>
          <div class="flex text-25px">
            <div class="form">
              <div class="w-200px flex justify-between mr-15px">
                <span>报</span><span>告</span><span>可</span><span>信</span><span>度:</span>
              </div>
              {{ handleReportTruth(spendTime) }}
            </div>
          </div>
          <div class="flex justify-center mt-800px text-25px">本报告涉及个人隐私，请注意保密</div>
        </div>
      </div>
      <div class="p-100px" ref="secondPage">
        <CollapseContainer>
          <template #title>
            <div ref="personMsgRef" class="font-bold text-20px">个人信息</div>
          </template>
          <BasicForm @register="personMsgRegister" class="m-16px" />
        </CollapseContainer>
        <CollapseContainer>
          <template #title>
            <div ref="careerRef" class="font-bold text-20px mr-10px">职业成长履历</div>
          </template>
          <div class="text-18px">教育（培训）经历（学历为大专以下的可填写高中/中专教育经历） :</div>
          <Table :dataSource="careerArr" :columns="careerColumns.slice(0, -1)" />
        </CollapseContainer>
        <CollapseContainer>
          <template #title>
            <div ref="workRef" class="font-bold text-20px mr-10px">工作经历</div>
          </template>
          <Table :dataSource="workArr" :columns="workColumns.slice(0, -1)" />
        </CollapseContainer>
        <CollapseContainer>
          <template #title>
            <div class="font-bold text-20px mr-10px">借用、交流锻炼经历</div>
          </template>
          <Table :dataSource="borrowArr" :columns="borrowColumns.slice(0, -1)" />
        </CollapseContainer>
      </div>
      <div class="p-100px" ref="otherPage">
        <CollapseContainer>
          <template #title>
            <div class="font-bold text-20px mr-10px">奖惩情况</div>
          </template>
          <Table :dataSource="rewardsArr" :columns="rewardsColumns.slice(0, -1)" />
        </CollapseContainer>
        <CollapseContainer>
          <template #title>
            <div class="font-bold text-20px mr-10px">职业资格情况</div>
          </template>
          <Table :dataSource="professionalArr" :columns="professionalColumns.slice(0, -1)" />
        </CollapseContainer>
        <CollapseContainer>
          <template #title>
            <div class="font-bold text-20px mr-10px">年度考核情况</div>
          </template>
          <div class="text-18px">近三年年度考核情况 (年度考核情况所有次数加起来需要等于三) :</div>
          <BasicForm @register="annualRegister" class="m-16px" />
        </CollapseContainer>
      </div>
      <div class="pt-100px" ref="thirdPage">
        <Card>
          <div class="font-bold text-lg border-b-2 mb-100px">结果分析</div>
        </Card>
        <template v-if="isMobile">
          <div class="w-full">
            <Leidatu :options="echartOptions" class="w-full" />
          </div>
          <CareerFieldPdf :careerFieldObj="careerFieldObj" />
        </template>
        <div class="flex justify-center bg-white" v-else>
          <leidatu :options="echartOptions" />
          <CareerFieldPdf :careerFieldObj="careerFieldObj" />
        </div>
        <advantageousFieldsExplanation
          :avatar="avatar"
          :name="userInfo.name"
          :max-field-index="getMaxField()"
        />
        <topThreeAdvantages :options="getTopThreeScores()" />
      </div>
      <div class="pt-50px" ref="fourthPage">
        <competencyAnalysis :obvious="obvious" :notObvious="notObvious" />
        <managementSuggestions :management-advice="managementAdvice" />
      </div>
      <div ref="page">
        <div class="pt-100px border-t-2px">
          <occupationalRecommendation
            :top-two="getTopTwo()"
            :end-two="getEndTwo()"
            :corr-func="corrFunc"
          />
          <matchingSuggestions :avatar="avatar" :name="userInfo.name" :end-three="getEndThree()" />
          <jobCompetencyRequirements
            :name="userInfo.name"
            :avatar="avatar"
            :post-data-source="postDataSource"
          />
          <trainingSupport :competency-obj="supportCompetencyObj" :corr-func="corrFunc" />
        </div>
      </div>
    </PageWrapper>
  </Spin>
</template>

<script lang="ts" setup>
  import { ref, PropType, onMounted, nextTick } from 'vue';
  import { Card, Spin, Table } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import Leidatu from './components/leidatu.vue';
  import advantageousFieldsExplanation from './components/advantageousFieldsExplanation.vue';
  import topThreeAdvantages from './components/topThreeAdvantages.vue';
  import managementSuggestions from './components/managementSuggestions.vue';
  import occupationalRecommendation from './components/occupationalRecommendation.vue';
  import matchingSuggestions from './components/matchingSuggestions.vue';
  import jobCompetencyRequirements from './components/jobCompetencyRequirements.vue';
  import trainingSupport from './components/trainingSupport.vue';
  import CareerFieldPdf from './careerFieldPdf.vue';
  import competencyAnalysis from './competencyAnalysis.vue';
  import headerImg from '@/assets/images/header.jpg';
  import {
    careerAdvantagesMap,
    advantageMap,
    competencyDefinition,
    careerAdvantageMap,
  } from './data';
  import { getPersonMsgApi } from '@/api/sys/personMsg';
  import { handleReportTruth } from '../reportManagementAdmin/data';
  import { BasicForm, useForm } from '@/components/Form';
  import { sortPdf } from './methods';
  import htmlPdf from './pdf';
  import { CollapseContainer } from '@/components/Container';
  import {
    schemas,
    annualSchemas,
    careerColumns,
    workColumns,
    borrowColumns,
    rewardsColumns,
    professionalColumns,
  } from '../info/data';

  const props = defineProps({
    userInfo: {
      type: Object as PropType<any>,
      required: true,
    },
    recordProps: {
      type: Object as PropType<any>,
      required: true,
    },
  });

  const emits = defineEmits(['close']);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const prefixCls = 'result';

  const cover = ref();
  const secondPage = ref();
  const thirdPage = ref();
  const fourthPage = ref();
  const otherPage = ref();
  const page = ref();
  const managementAdvice = ref<any[]>([]);
  const obvious = ref<any[]>([]);
  const notObvious = ref<any[]>([]);
  const postDataSource = ref<any[]>([]);
  const spinning = ref(true);

  const [personMsgRegister, { setFieldsValue: msgSetFieldsValue }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 15,
    },
    schemas,
    actionColOptions: {
      offset: 8,
      span: 23,
    },
    showResetButton: false,
    showSubmitButton: false,
  });

  const [annualRegister, { setFieldsValue: annualSetFieldsValue }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 15,
    },
    schemas: annualSchemas,
    actionColOptions: {
      offset: 8,
      span: 23,
    },
    showResetButton: false,
    showSubmitButton: false,
  });

  const careerArr = ref<any>([]);
  const workArr = ref<any>([]);
  const borrowArr = ref<any>([]);
  const rewardsArr = ref<any>([]);
  const professionalArr = ref<any>([]);

  const avatar = props.userInfo.avatar || headerImg;
  const { recordProps } = props;
  const { department, position, echartOptions, corrFunc, finishTime, spendTime } = recordProps;
  const careerFieldObj = recordProps.careerFieldObj;
  const careerAdvantagesObj = sortPdf(recordProps.careerAdvantagesObj);
  const competencyObj = sortPdf(recordProps.competencyObj);
  const supportCompetencyObj = sortPdf(recordProps.competencyObj);

  onMounted(async () => {
    const res = await getPersonMsgApi({ userId: props.userInfo.userId });
    const { personMsg, career, work, borrow, rewards, professional, annual } = res;
    msgSetFieldsValue(personMsg);
    careerArr.value = career;
    workArr.value = work;
    borrowArr.value = borrow;
    rewardsArr.value = rewards;
    professionalArr.value = professional;
    annualSetFieldsValue(annual);
    for (let i = 0; i < 6; i++) {
      obvious.value.push({
        competency: advantageMap[competencyObj[i][0]][0],
        describe: competencyDefinition[competencyObj[i][0]],
      });
      if (i !== 5) {
        postDataSource.value.push({
          competency: advantageMap[competencyObj[i][0]][0],
          definition: competencyDefinition[competencyObj[i][0]],
          degreeTendency: competencyObj[i][1],
        });
      }
    }
    for (let i = competencyObj.length - 1; i > competencyObj.length - 7; i--) {
      notObvious.value.push({
        competency: advantageMap[competencyObj[i][0]][0],
        describe: competencyDefinition[competencyObj[i][0]],
      });
    }
    for (let i = 0; i < 6; i++) {
      managementAdvice.value.push(competencyObj[i][0]);
    }
    await nextTick();
    await htmlPdf.getPdf(
      '测试',
      cover.value,
      secondPage.value,
      thirdPage.value,
      fourthPage.value,
      page.value,
      otherPage.value,
    );
    setTimeout(() => emits('close'), 0);
    spinning.value = false;
  });

  function getTopTwo() {
    const topTwo = careerAdvantagesObj.slice(0, 2).map((score) => score[0]);
    return topTwo;
  }

  function getEndTwo() {
    const endTwo = careerAdvantagesObj.slice(-2).map((score) => score[0]);
    return endTwo;
  }

  function getEndThree() {
    const endThree = careerAdvantagesObj.slice(-3).map((score) => score[0]);
    return endThree;
  }

  function getTopThreeScores() {
    // @ts-ignore
    const topThree = careerAdvantagesObj.slice(0, 3).map((score) => parseFloat(score[1]));
    const topThreeKeys = careerAdvantagesObj
      .slice(0, 3)
      .map((score) => careerAdvantagesMap[score[0]]);
    const shuoming = careerAdvantagesObj.slice(0, 3).map((score) => careerAdvantageMap[score[0]]);
    return { topThree, topThreeKeys, shuoming };
  }

  function getMaxField() {
    const { pioneering, transaction, service, research } = careerFieldObj;
    const values = [Number(pioneering), Number(transaction), Number(service), Number(research)];
    const maxIndex = values.indexOf(Math.max(...values));
    const fields = ['pioneering', 'transaction', 'service', 'research'];
    return fields[maxIndex];
  }
</script>

<style lang="less" scoped>
  .result {
    &__top {
      padding: 24px;
      background-color: @component-background;
      text-align: center;

      &-col {
        &:not(:last-child) {
          border-right: 1px dashed @border-color-base;
        }

        div {
          margin-bottom: 12px;
          color: @text-color-base;
          font-size: 14px;
          line-height: 22px;
        }

        p {
          margin: 0;
          color: @text-color-base;
          font-size: 24px;
          line-height: 32px;
        }
      }
    }

    &__content {
      margin-top: 12px;
      padding: 24px;
      background-color: @component-background;

      .list {
        position: relative;
      }

      .icon {
        font-size: 40px !important;
      }

      .extra {
        position: absolute;
        top: 20px;
        right: 15px;
        color: @primary-color;
        font-weight: normal;
        cursor: pointer;
      }

      .description {
        display: inline-block;
        width: 40%;
      }

      .info {
        display: inline-block;
        width: 30%;
        text-align: center;

        div {
          display: inline-block;
          padding: 0 20px;

          span {
            display: block;
          }
        }
      }

      .progress {
        display: inline-block;
        width: 15%;
        vertical-align: top;
      }
    }
  }

  .polygon {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -219px;
      width: 0;
      height: 0;
      border: 110px solid transparent;
      border-left: 110px solid #4773ca;
    }
  }

  .transform {
    transform: rotate(45deg);
  }

  .transformTop {
    position: relative;
    top: -80px;
    left: 50px;
  }

  .transformBottom {
    position: relative;
    top: 20px;
    left: 50px;
  }

  .transformRight {
    position: relative;
    top: 30px;
    left: 30px;
  }

  .form {
    display: flex;
    flex: 1;
    margin-left: 100px;
  }
</style>
