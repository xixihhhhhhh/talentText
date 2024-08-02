<template>
  <PageWrapper :class="prefixCls" title="结果分析">
    <div ref="resultPdf">
      <template v-if="isMobile">
        <div class="w-full">
          <Leidatu :options="resultStore.echartOptions" class="w-full" />
        </div>
        <CareerFieldPdf :careerFieldObj="careerFieldObj" />
      </template>
      <div class="flex" v-else>
        <leidatu :options="resultStore.echartOptions" />
        <CareerFieldPdf :careerFieldObj="careerFieldObj" />
      </div>
      <Card class="w-full mt-2" :class="textSize">
        <div class="font-bold text-lg border-b-grey border-b-2">优势领域说明</div>
        <div class="mt-4 text-4">
          <Avatar :src="avatar" /> {{ resultStore.name }} 在
          <span class="font-bold" :style="{ color: activeColor }"
            >{{ fieldMap[getMaxField()] }}
          </span>
          <span>&nbsp;{{ coreAreas[getMaxField()] }}</span>
        </div>
      </Card>
      <Card class="w-full mt-2" :class="textSize">
        <div class="font-bold text-lg border-b-2">职业优势前三</div>
        <div v-for="index in 3" :key="index">
          <div class="flex items-center mt-1">
            <Icon :icon="crreerAdvantagesIcons[index - 1]" :size="30" />
            <span class="font-bold"
              >{{ getTopThreeScores().topThreeKeys[index - 1] }}:
              {{ getTopThreeScores().topThree[index - 1].toFixed(2) }}</span
            >
          </div>
          <p class="indent">
            {{ getTopThreeScores().shuoming[index - 1] }}
          </p>
        </div>
      </Card>
      <Card class="w-full mt-2">
        <div class="font-bold text-lg border-b-2">胜任力分析</div>
        <Table
          :dataSource="dataSource"
          :columns="columns"
          :pagination="{
            defaultPageSize: 5,
          }"
          :scroll="{ x: 15, y: 800 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'index'"> {{ record.index + 1 }} </template>
            <template v-if="column.key === 'ability'">
              <div class="font-bold">{{ advantageMap[record.ability][0] }}</div>
              <div>( {{ advantageMap[record.ability][1] }} )</div>
            </template>
            <template v-if="column.key === 'pronounced'">
              <div class="flex items-center w-full">
                <progressBar :percent="record.pronounced" class="w-10" />
              </div>
            </template>
            <template v-if="column.key === 'define'">
              {{ competencyDefinition[record.key] }}
            </template>
          </template>
        </Table>
      </Card>
      <Card class="w-full mt-2" :class="textSize">
        <div class="font-bold text-lg border-b-grey border-b-2"
          >管理建议
          <span class="text-3 color-gray"
            >通过以下建议可以发挥受测者的优势，有助于大大地提升其工作成效</span
          >
        </div>
        <div v-for="i in 6" :key="i" class="pt-1rem">
          <Icon
            icon="material-symbols-light:circle"
            :size="20"
            :color="activeColor"
            class="relative top-0.5"
          />
          <span class="line-height-loose">{{ guanlijianyi[managementAdvice[i - 1]] }}</span>
        </div>
      </Card>
      <Card class="w-full mt-2" :class="textSize">
        <div class="font-bold text-lg border-b-grey border-b-2"
          >职业推荐
          <span class="text-3 color-gray"
            >只为辅助您理解优势职业方向，并非作为判定胜任岗位与否的唯一标准</span
          >
        </div>
        <div class="w-full border-t-#67759d border-t-2">
          <div class="flex border-b-#e6e6e6 border-b-2 items-center">
            <div class="w-40% bg-#f7f7f7 border-r-#e6e6e6 border-r-2 flex-shrink-0">
              <div class="flex flex-col py-3 px-1">
                <div
                  class="chat-bubble relative px-2 rounded-md flex justify-center items-center color-white"
                  :style="{ backgroundColor: activeColor }"
                  >优势明显</div
                >
                <div class="text-center">的职业方向</div>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="font-bold whitespace-nowrap"
                >{{ gongzuofangmian[getTopTwo()[0]] }}方面</div
              >
              <div class="indent-2"
                >例如:{{ gongzuogangwei[getTopTwo()[0]][resultStore.corrFunc] }}等</div
              >
              <div class="font-bold whitespace-nowrap"
                >{{ gongzuofangmian[getTopTwo()[1]] }}方面</div
              >
              <div class="indent-2"
                >例如:{{ gongzuogangwei[getTopTwo()[1]][resultStore.corrFunc] }}等</div
              >
            </div>
          </div>
        </div>
        <div class="w-full border-t-#67759d border-t-2">
          <div class="flex border-b-#e6e6e6 border-b-2 items-center">
            <div class="w-40% bg-#f7f7f7 border-r-#e6e6e6 border-r-2 flex-shrink-0">
              <div class="flex flex-col py-3 px-1">
                <div
                  class="chat-bubble relative px-2 bg-gray rounded-md flex justify-center items-center color-white"
                >
                  优势不明显
                </div>
                <div class="text-center">的职业方向</div>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="font-bold whitespace-nowrap"
                >{{ gongzuofangmian[getEndTwo()[0]] }}方面</div
              >
              <div class="indent-2"
                >例如:{{ gongzuogangwei[getEndTwo()[1]][resultStore.corrFunc] }}等</div
              >
              <div class="font-bold whitespace-nowrap"
                >{{ gongzuofangmian[getEndTwo()[1]] }}方面</div
              >
              <div class="indent-2"
                >例如:{{ gongzuogangwei[getEndTwo()[1]][resultStore.corrFunc] }}等</div
              >
            </div>
          </div>
        </div>
        <template #title></template>
      </Card>
      <Card class="w-full mt-2" :class="textSize">
        <div class="font-bold text-lg border-b-grey border-b-2"
          >搭配建议
          <span class="text-3 color-gray"
            >通过以下搭配建议可以管控受测者的劣势，有助于搭建合作互补的完美团队</span
          >
        </div>
        <div class="indent-4 text-4">
          <Avatar :src="avatar" /> {{ resultStore.name }}
          的弱势在于
          <span :style="{ color: activeColor }">{{
            dapeijianyi[getEndThree()[0]] +
            '、' +
            dapeijianyi[getEndThree()[1]] +
            '、' +
            dapeijianyi[getEndThree()[2]]
          }}</span>
          方面，如果TA的工作职责范围涉及到这些方面相关的内容，就需要和这些方面比较强的工作搭档进行优势互补，以便相应提高工作成效。
        </div>
      </Card>
      <Card class="w-full mt-2" :class="textSize">
        <div class="font-bold text-lg border-b-2"
          >岗位胜任力需求
          <span class="text-3 color-gray"
            >提供所在岗位所需的关键胜任力，提升个人岗位上的表现和职业发展</span
          >
        </div>
        <div class="indent-4 font-bold">
          通过对 <Avatar :src="avatar" /> {{ resultStore.name }}
          所在的岗位进行了胜任力分析，总结出岗位所需的前五项关键胜任力，分别为：
        </div>
        <div v-for="i in 5" :key="i" class="indent-4 line-height-loose">
          <Icon
            icon="material-symbols-light:circle"
            :size="20"
            :color="activeColor"
            class="relative top-0.5"
          />
          <span class="flex-shrink-0 mr-4" :style="{ color: activeColor }">{{
            advantageMap[competencyObj[i][0]][0]
          }}</span>
          <span>{{ competencyDefinition[competencyObj[i][0]] }}</span>
        </div>
        <div class="indent-4 font-bold">
          通过了解这些关键胜任力，TA可以更清晰地认识到岗位对TA的要求，有针对性地提升自身的能力和表现进一步推动TA的职业发展。
        </div>
      </Card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useResultStore } from '@/store/modules/result';
  import { Card, Avatar, Table } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import Leidatu from './components/leidatu.vue';
  import Icon from '@/components/Icon/Icon.vue';
  import progressBar from './progress.vue';
  import CareerFieldPdf from './careerFieldPdf.vue';
  import headerImg from '@/assets/images/header.jpg';
  import {
    careerAdvantagesMap,
    columns,
    advantageMap,
    coreAreas,
    competencyDefinition,
    careerAdvantageMap,
    gongzuofangmian,
    gongzuogangwei,
    dapeijianyi,
    guanlijianyi,
    fieldMap,
  } from './data';
  import { sort } from './methods';

  const resultStore = useResultStore();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const textSize = isMobile ? 'text-3' : 'text-5';
  const prefixCls = 'result';
  const activeColor = '#28B8C5';
  const crreerAdvantagesIcons = [
    'twemoji:1st-place-medal',
    'twemoji:2nd-place-medal',
    'twemoji:3rd-place-medal',
  ];

  const resultPdf = ref(null);
  const dataSource = ref<any[]>([]);
  const managementAdvice = ref<any[]>([]);

  const avatar = resultStore.avatar || headerImg;
  const careerFieldObj = resultStore.careerFieldObj;
  const careerAdvantagesObj = sort(resultStore.careerAdvantagesObj);
  const competencyObj = sort(resultStore.competencyObj);

  onMounted(async () => {
    competencyObj.forEach((item, index) => {
      dataSource.value.push({
        key: item[0],
        index,
        ability: item[0],
        pronounced: parseFloat(item[1] as string),
      });
    });
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
