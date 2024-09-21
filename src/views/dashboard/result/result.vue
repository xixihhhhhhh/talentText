<template>
  <PageWrapper :class="prefixCls" title="结果分析">
    <template v-if="isMobile">
      <div class="w-full">
        <Leidatu :options="questionStore.leidatu" class="w-full enter-y" />
      </div>
      <CareerField />
    </template>
    <div class="flex justify-center" v-else>
      <leidatu :options="questionStore.leidatu" class="enter-y" />
      <CareerField class="enter-y" />
    </div>
    <advantageousFieldsExplanation
      :avatar="avatar"
      :name="userInfo.name"
      :max-field-index="getMaxField()"
    />
    <topThreeAdvantages :options="getTopThreeScores()" />
    <competencyAnalysis :obvious="obvious" :notObvious="notObvious" />
    <managementSuggestions :management-advice="managementAdvice" />
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
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import cloneDeep from 'lodash-es/cloneDeep';
  import Leidatu from './components/leidatu.vue';
  import advantageousFieldsExplanation from './components/advantageousFieldsExplanation.vue';
  import topThreeAdvantages from './components/topThreeAdvantages.vue';
  import managementSuggestions from './components/managementSuggestions.vue';
  import occupationalRecommendation from './components/occupationalRecommendation.vue';
  import matchingSuggestions from './components/matchingSuggestions.vue';
  import jobCompetencyRequirements from './components/jobCompetencyRequirements.vue';
  import trainingSupport from './components/trainingSupport.vue';
  import competencyAnalysis from './competencyAnalysis.vue';
  import CareerField from './careerField.vue';
  import { useUserStore } from '@/store/modules/user';
  import { useQuestionStore } from '@/store/modules/question';
  import headerImg from '@/assets/images/header.jpg';
  import {
    careerAdvantagesMap,
    advantageMap,
    competencyDefinition,
    careerAdvantageMap,
  } from './data';
  import { sort } from './methods';

  const questionStore = useQuestionStore();
  const corrFunc = questionStore.corrFunc;
  const userStore = useUserStore();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const prefixCls = 'result';

  const managementAdvice = ref<any[]>([]);
  const obvious = ref<any[]>([]);
  const notObvious = ref<any[]>([]);
  const postDataSource = ref<any[]>([]);

  const userInfo = computed(() => userStore.getUserInfo);

  const avatar = computed(() => userStore.getUserInfo.avatar || headerImg);
  const careerFieldObj = computed(() => {
    return questionStore.careerFieldObj;
  });

  const careerAdvantagesObj = computed(() => {
    return questionStore.careerAdvantagesObj;
  });

  const competencyObj = computed(() => {
    return questionStore.competencyObj;
  });
  const supportCompetencyObj = sort(cloneDeep(questionStore.competencyObj));

  onMounted(() => {
    for (let i = 0; i < 6; i++) {
      obvious.value.push({
        competency: advantageMap[competencyObj.value[i][0]][0],
        describe: competencyDefinition[competencyObj.value[i][0]],
      });
      if (i !== 5) {
        postDataSource.value.push({
          competency: advantageMap[competencyObj.value[i][0]][0],
          definition: competencyDefinition[competencyObj.value[i][0]],
          degreeTendency: competencyObj.value[i][1],
        });
      }
    }
    for (let i = competencyObj.value.length - 1; i > competencyObj.value.length - 7; i--) {
      notObvious.value.push({
        competency: advantageMap[competencyObj.value[i][0]][0],
        describe: competencyDefinition[competencyObj.value[i][0]],
      });
    }
    for (let i = 0; i < 6; i++) {
      managementAdvice.value.push(competencyObj.value[i][0]);
    }
  });

  function getTopTwo() {
    const topTwo = careerAdvantagesObj.value.slice(0, 2).map((score) => score[0]);
    return topTwo;
  }

  function getEndTwo() {
    const endTwo = careerAdvantagesObj.value.slice(-2).map((score) => score[0]);
    return endTwo;
  }

  function getEndThree() {
    const endThree = careerAdvantagesObj.value.slice(-3).map((score) => score[0]);
    return endThree;
  }

  function getTopThreeScores() {
    // @ts-ignore
    const topThree = careerAdvantagesObj.value.slice(0, 3).map((score) => parseFloat(score[1]));
    const topThreeKeys = careerAdvantagesObj.value
      .slice(0, 3)
      .map((score) => careerAdvantagesMap[score[0]]);
    const shuoming = careerAdvantagesObj.value
      .slice(0, 3)
      .map((score) => careerAdvantageMap[score[0]]);
    return { topThree, topThreeKeys, shuoming };
  }

  function getMaxField() {
    const { pioneering, transaction, service, research } = careerFieldObj.value;
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
</style>
