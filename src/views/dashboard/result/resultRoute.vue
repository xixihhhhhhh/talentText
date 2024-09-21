<template>
  <PageWrapper :class="prefixCls" title="结果分析">
    <div ref="resultPdf">
      <template v-if="isMobile">
        <div class="w-full">
          <Leidatu :options="resultStore.echartOptions" class="w-full" />
        </div>
        <CareerFieldPdf :careerFieldObj="careerFieldObj" />
      </template>
      <div class="flex justify-center bg-white" v-else>
        <leidatu :options="resultStore.echartOptions" />
        <CareerFieldPdf :careerFieldObj="careerFieldObj" />
      </div>
      <advantageousFieldsExplanation
        :avatar="avatar"
        :name="resultStore.name"
        :max-field-index="getMaxField()"
      />
      <topThreeAdvantages :options="getTopThreeScores()" />
      <competencyAnalysis :obvious="obvious" :notObvious="notObvious" />
      <managementSuggestions :management-advice="managementAdvice" />
      <occupationalRecommendation
        :top-two="getTopTwo()"
        :end-two="getEndTwo()"
        :corr-func="resultStore.corrFunc"
      />
      <matchingSuggestions :avatar="avatar" :name="resultStore.name" :end-three="getEndThree()" />
      <jobCompetencyRequirements
        :name="resultStore.name"
        :avatar="avatar"
        :post-data-source="postDataSource"
      />
      <trainingSupport :competency-obj="supportCompetencyObj" :corr-func="resultStore.corrFunc" />
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useResultStore } from '@/store/modules/result';
  import { PageWrapper } from '@/components/Page';
  import Leidatu from './components/leidatu.vue';
  import advantageousFieldsExplanation from './components/advantageousFieldsExplanation.vue';
  import topThreeAdvantages from './components/topThreeAdvantages.vue';
  import occupationalRecommendation from './components/occupationalRecommendation.vue';
  import managementSuggestions from './components/managementSuggestions.vue';
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
  import { sort } from './methods';

  const resultStore = useResultStore();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const prefixCls = 'result';

  const resultPdf = ref(null);
  const managementAdvice = ref<any[]>([]);
  const obvious = ref<any[]>([]);
  const notObvious = ref<any[]>([]);
  const postDataSource = ref<any[]>([]);

  const avatar = resultStore.avatar || headerImg;
  const careerFieldObj = resultStore.careerFieldObj;
  const careerAdvantagesObj = sort(resultStore.careerAdvantagesObj);
  const competencyObj = sort(resultStore.competencyObj);
  const supportCompetencyObj = sort(resultStore.competencyObj);

  onMounted(async () => {
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
    console.log(postDataSource.value);
    for (let i = competencyObj.length - 1; i > competencyObj.length - 7; i--) {
      notObvious.value.push({
        competency: advantageMap[competencyObj[i][0]][0],
        describe: competencyDefinition[competencyObj[i][0]],
      });
    }
    for (let i = 0; i < 6; i++) {
      managementAdvice.value.push(competencyObj[i][0]);
    }
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
</style>
