<template>
  <PageWrapper :class="prefixCls" title="结果分析">
    <div class="flex">
      <Leidatu
        :loading="loading"
        :options="questionStore.leidatu.series[0].data"
        class="enter-y w-50%"
      />
      <Card class="flex-1 ml-5">
        <div>
          <div class="font-bold text-lg">职业领域</div>
          <div class="flex justify-around flex-wrap w-full">
            <Icon
              icon="wi-thermometer"
              :size="100"
              :color="getMaxField() === 'pioneering' ? activeColor : '#999'"
            />
            <div>
              <div class="font-bold">开拓影响 {{ careerFieldObj.pioneering }}</div>
              <div class="font-bold"
                >领域占比 {{ percentageFormatter(careerFieldObj.pioneering / allScore) }}</div
              >
              <div>沟通说明，开拓冒险</div>
              <div>快速行动，影响大众</div>
            </div>
          </div>
          <div class="flex justify-around flex-wrap w-full">
            <Icon
              icon="wi-thermometer"
              :size="100"
              :color="getMaxField() === 'transaction' ? activeColor : '#999'"
            />
            <div>
              <div class="font-bold">事务执行 {{ careerFieldObj.transaction }}</div>
              <div class="font-bold"
                >领域占比 {{ percentageFormatter(careerFieldObj.transaction / allScore) }}</div
              >
              <div>明确目标，贯彻落实</div>
              <div>注重现实，遵循指示</div>
            </div>
          </div>
          <div class="flex justify-around flex-wrap w-full">
            <Icon
              icon="wi-thermometer"
              :size="100"
              :color="getMaxField() === 'service' ? activeColor : '#999'"
            />
            <div>
              <div class="font-bold">服务关系 {{ careerFieldObj.service }}</div>
              <div class="font-bold"
                >领域占比 {{ percentageFormatter(careerFieldObj.service / allScore) }}</div
              >
              <div>建立关系，和谐融洽</div>
              <div>协调维护，团队凝聚</div>
            </div>
          </div>
          <div class="flex justify-around flex-wrap w-full">
            <Icon
              icon="wi-thermometer"
              :size="100"
              :color="getMaxField() === 'research' ? activeColor : '#999'"
            />
            <div>
              <div class="font-bold">研发策划 {{ careerFieldObj.research }}</div>
              <div class="font-bold"
                >领域占比 {{ percentageFormatter(careerFieldObj.research / allScore) }}</div
              >
              <div>创新思维，出谋划策</div>
              <div>关注可能，分析信息</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
    <Card class="w-full mt-2" :class="textSize">
      <div class="font-bold text-lg border-b-grey border-b-2">优势领域说明</div>
      <div class="mt-4">
        <Avatar :src="userInfo.avatar" /> {{ userInfo.name }} 在
        <span class="font-bold text-4" :style="{ color: activeColor }"
          >{{ fieldMap[getMaxField()] }}
        </span>
        <span>&nbsp;{{ coreAreas[getMaxField()] }}</span>
      </div>
    </Card>
    <Card class="w-full mt-2" :class="textSize">
      <div class="font-bold text-lg border-b-grey border-b-2">职业优势前三</div>
      <div class="flex items-center mt-1">
        <Icon icon="twemoji:1st-place-medal" :size="30" />
        <span class="font-bold"
          >{{ getTopThreeScores().topThreeKeys[0] }}:
          {{ getTopThreeScores().topThree[0].toFixed(2) }}</span
        >
      </div>
      <p class="indent">
        {{ getTopThreeScores().shuoming[0] }}
      </p>
      <div class="flex items-center mt-1">
        <Icon icon="twemoji:2nd-place-medal" :size="30" />
        <span class="font-bold"
          >{{ getTopThreeScores().topThreeKeys[1] }}:
          {{ getTopThreeScores().topThree[1].toFixed(2) }}</span
        >
      </div>
      <p class="indent">
        {{ getTopThreeScores().shuoming[1] }}
      </p>
      <div class="flex items-center mt-1">
        <Icon icon="twemoji:3rd-place-medal" :size="30" />
        <span class="font-bold"
          >{{ getTopThreeScores().topThreeKeys[2] }}:
          {{ getTopThreeScores().topThree[2].toFixed(2) }}</span
        >
      </div>
      <p class="indent">
        {{ getTopThreeScores().shuoming[2] }}
      </p>
    </Card>
    <Card class="w-full mt-2">
      <div class="font-bold border-b-grey border-b-2">胜任力分析</div>
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
      <div v-for="i in 6" :key="i" :style="{ padding: '1rem 0  0 0' }">
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
            <div class="font-bold">{{ gongzuofangmian[getTopTwo()[0]] }}方面</div>
            <div class="indent-2">例如:{{ gongzuogangwei[getTopTwo()[0]] }}</div>
            <div class="font-bold">{{ gongzuofangmian[getTopTwo()[1]] }}方面</div>
            <div class="indent-2">例如:{{ gongzuogangwei[getTopTwo()[1]] }}</div>
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
            <div class="font-bold">{{ gongzuofangmian[getEndTwo()[0]] }}方面</div>
            <div class="indent-2">例如:{{ gongzuogangwei[getEndTwo()[1]] }}</div>
            <div class="font-bold">{{ gongzuofangmian[getEndTwo()[1]] }}方面</div>
            <div class="indent-2">例如:{{ gongzuogangwei[getEndTwo()[1]] }}</div>
          </div>
        </div>
      </div>
    </Card>
    <Card class="w-full mt-2" :class="textSize">
      <div class="font-bold text-lg border-b-grey border-b-2"
        >搭配建议
        <span class="text-3 color-gray"
          >通过以下搭配建议可以管控受测者的劣势，有助于搭建合作互补的完美团队</span
        >
      </div>
      <div class="indent-4">
        TA 的弱势在于
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
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { Card, Avatar, Table } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  // import SaleRadar from './components/SaleRadar.vue';
  import Leidatu from './components/Leidatu.vue';
  import { addCommentApi } from '@/api/sys/comment';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';
  import { addCommentParams } from '@/api/sys/model/commentModel';
  import { useQuestionStore } from '@/store/modules/question';
  import progressBar from './progress.vue';
  import Icon from '@/components/Icon/Icon.vue';
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
  } from './data';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const textSize = isMobile ? 'text-3' : 'text-5';

  const questionStore = useQuestionStore();
  const userStore = useUserStore();
  const userInfo = computed(() => userStore.getUserInfo);
  const careerFieldObj = computed(() => {
    return questionStore.careerFieldObj;
  });

  const careerAdvantagesObj = computed(() => {
    return questionStore.careerAdvantagesObj;
  });

  const competencyObj = computed(() => {
    return questionStore.competencyObj;
  });

  const dataSource = ref<any[]>([]);

  const managementAdvice = ref<any[]>([]);

  onMounted(() => {
    competencyObj.value.forEach((item, index) => {
      dataSource.value.push({
        key: item[0],
        index,
        ability: item[0],
        pronounced: parseFloat(item[1] as string),
      });
    });
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

  const allScore =
    Number(careerFieldObj.value.pioneering) +
    Number(careerFieldObj.value.transaction) +
    Number(careerFieldObj.value.service) +
    Number(careerFieldObj.value.research);
  const prefixCls = 'result';
  const loading = ref(true);

  const router = useRouter();

  setTimeout(() => {
    loading.value = false;
  }, 1000);

  const { createMessage } = useMessage();
  const content = ref('');

  // @ts-ignore
  const data: addCommentParams = {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit() {
    if (content.value.length < 8) {
      createMessage.error({
        content: '请回答选择题',
        duration: 3,
      });
      return;
    }
    data.content = content.value;
    data.avatar = userInfo.value.avatar;
    data.name = userInfo.value.name;
    const { success } = await addCommentApi(data);
    if (success) {
      content.value = '';
      router.push('/dashboard/index');
    }
  }

  function percentageFormatter(num) {
    return new Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  function getMaxField() {
    const { pioneering, transaction, service, research } = careerFieldObj.value;
    const values = [Number(pioneering), Number(transaction), Number(service), Number(research)];
    const maxIndex = values.indexOf(Math.max(...values));
    const fields = ['pioneering', 'transaction', 'service', 'research'];
    return fields[maxIndex];
  }

  const fieldMap = {
    pioneering: '开拓影响',
    transaction: '事务执行',
    service: '服务关系',
    research: '研发策划',
  };
  const activeColor = '#28B8C5';
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
