<template>
  <PageWrapper :class="prefixCls" title="结果分析">
    <div class="w-full enter-y mt-4 flex justify-center">
      <SaleRadar :loading="loading" :options="questionStore.leidatu" class="w-full enter-y" />
    </div>
    <Card class="w-full mt-5">
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
      <template #tabBarExtraContent></template>
    </Card>
    <Card class="w-full mt-2">
      <div class="font-bold text-lg border-b-grey border-b-2">优势领域说明</div>
      <div class="mt-4"
        ><Avatar :src="userinfo.avatar" /> {{ userinfo.name }} 在
        <span class="font-bold" style="color: #7c68d1">{{ fieldMap[getMaxField()] }}</span>
        <span class="text-3"
          >领域能够更好地发挥其优势，TA比较具备协调和关系维护的能力，与人建立良好的关系，在与人交流时能够将自己,
          的意愿传达到位，也乐干接受他人的意见，希望大家能够达成一定共识，在关系维护、客户服务相关的工作方面较有天赋。</span
        ></div
      >
    </Card>
    <Card class="w-full mt-2">
      <div class="font-bold text-lg border-b-grey border-b-2">职业优势前三</div>
      <div class="flex items-center mt-1">
        <Icon icon="openmoji:1st-place-medal" :size="40" />
        <span class="font-bold text-lg"
          >{{ getTopThreeScores().topThreeKeys[0] }}:
          {{ getTopThreeScores().topThree[0].toFixed(2) }}</span
        >
      </div>
      <p class="text-3 indent">
        换位思考能力强，协调矛盾、避免冲突、促进人与人之间的和谐共处，有意识地为他人服务
      </p>
      <div class="flex items-center mt-1">
        <Icon icon="openmoji:2nd-place-medal" :size="40" />
        <span class="font-bold text-lg"
          >{{ getTopThreeScores().topThreeKeys[1] }}:
          {{ getTopThreeScores().topThree[1].toFixed(2) }}</span
        >
      </div>
      <p class="text-3 indent">
        换位思考能力强，协调矛盾、避免冲突、促进人与人之间的和谐共处，有意识地为他人服务
      </p>
      <div class="flex items-center mt-1">
        <Icon icon="openmoji:3rd-place-medal" :size="40" />
        <span class="font-bold text-lg"
          >{{ getTopThreeScores().topThreeKeys[2] }}:
          {{ getTopThreeScores().topThree[2].toFixed(2) }}</span
        >
      </div>
      <p class="text-3 indent">
        换位思考能力强，协调矛盾、避免冲突、促进人与人之间的和谐共处，有意识地为他人服务
      </p>
    </Card>
    <Card class="w-full mt-2">
      <div class="font-bold text-lg border-b-grey border-b-2">胜任力分析</div>
      <Table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="{
          defaultPageSize: 5,
        }"
        :scroll="{ x: 15, y: 300 }"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            {{ index + 1 }}
          </template>
          <template v-if="column.key === 'ability'">
            <div class="font-bold">{{ advantageMap[record.ability][0] }}</div>
            <div>( {{ advantageMap[record.ability][1] }} )</div>
          </template>
          <template v-if="column.key === 'pronounced'">
            <Progress :percent="record.pronounced" size="small" />
          </template>
        </template>
      </Table>
    </Card>
    <Card class="w-full mt-2">
      <div class="font-bold text-lg border-b-grey border-b-2"
        >管理建议
        <span class="text-2 color-gray"
          >通过以下建议可以发挥受测者的优势，有助于大大地提升其工作成效</span
        >
      </div>
      <div v-for="i in 6" :key="i">
        <Icon
          icon="material-symbols-light:circle"
          :size="20"
          color="#7C68D1"
          class="relative top-1"
        />
        <span class="text-2.5"
          >当工作需要给予他人服务与支持时，他能够主动提供真诚的服务，努力提高他人的满意度和幸福感;但需注意他可能
          不懂回绝要求而负担过重。</span
        >
      </div>
    </Card>
    <Card class="w-full mt-2">
      <div class="font-bold text-lg border-b-grey border-b-2"
        >职业推荐
        <span class="text-2 color-gray"
          >只为辅助您理解优势职业方向，并非作为判定胜任岗位与否的唯一标准</span
        >
      </div>
      <div class="w-full border-t-#67759d border-t-2">
        <div class="flex border-b-#e6e6e6 border-b-2 items-center">
          <div class="w-40% bg-#f7f7f7 border-r-#e6e6e6 border-r-2 flex-shrink-0">
            <div class="flex flex-col py-3 px-1">
              <div
                class="chat-bubble relative px-2 bg-#7c68d1 rounded-md flex justify-center items-center color-white"
                >优势明显</div
              >
              <div class="text-center text-3">的职业方向</div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="font-bold">关系维护与服务支持方面</div>
            <div class="text-2.5 indent-2"
              >例如:健康护理、客户服务、后勤服务、情感咨询、儿童教育等</div
            >
            <div class="font-bold">关系维护与服务支持方面</div>
            <div class="text-2.5 indent-2"
              >例如:健康护理、客户服务、后勤服务、情感咨询、儿童教育等</div
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
                >优势不明显</div
              >
              <div class="text-center text-3">的职业方向</div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="font-bold">关系维护与服务支持方面</div>
            <div class="text-2.5 indent-2"
              >例如:健康护理、客户服务、后勤服务、情感咨询、儿童教育等</div
            >
            <div class="font-bold">关系维护与服务支持方面</div>
            <div class="text-2.5 indent-2"
              >例如:健康护理、客户服务、后勤服务、情感咨询、儿童教育等</div
            >
          </div>
        </div>
      </div>
    </Card>
    <Card class="w-full mt-2">
      <div class="font-bold text-lg border-b-grey border-b-2"
        >搭配建议
        <span class="text-2 color-gray"
          >通过以下搭配建议可以管控受测者的劣势，有助于搭建合作互补的完美团队</span
        >
      </div>
      <div class="indent-4">
        TA 的弱势在于 <span class="text-red">影响、发明、开拓</span>
        方面，如果TA的工作职责范围涉及到这些方面相关的内容，就需要和这些方面比较强的工作搭档进行优势互补，以便相应提高工作成效。
      </div>
    </Card>
    <!-- <div class="lg:w-6/10 w-full enter-y mt-2">
      <Card title="吐槽模块" :loading="loading">
        <a-textarea v-model:value="content" />
        <div class="text-right mt-4">
          <a-button type="primary" @click="onSubmit">提交</a-button>
        </div>
      </Card>
    </div> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { Card, Avatar, Table, Progress } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import SaleRadar from './components/SaleRadar.vue';
  import { addCommentApi } from '@/api/sys/comment';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';
  import { addCommentParams } from '@/api/sys/model/commentModel';
  import { useQuestionStore } from '@/store/modules/question';
  import Icon from '@/components/Icon/Icon.vue';
  import { careerAdvantagesMap, columns, advantageMap } from './data';

  const questionStore = useQuestionStore();
  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
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
  onMounted(() => {
    competencyObj.value.forEach((item, index) => {
      console.log(parseFloat(item[1] as string), 'parseFloat(item[1] as string)');
      dataSource.value.push({
        key: item[0],
        index,
        ability: item[0],
        pronounced: parseFloat(item[1] as string),
        define: '能够细心留意他人的需求，乐于为他人提供真诚的帮助和鼓励',
      });
    });
  });
  function getTopThreeScores() {
    // @ts-ignore
    const topThree = careerAdvantagesObj.value.slice(0, 3).map((score) => parseFloat(score[1]));
    const topThreeKeys = careerAdvantagesObj.value
      .slice(0, 3)
      .map((score) => careerAdvantagesMap[score[0]]);
    return { topThree, topThreeKeys };
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
    data.avatar = userinfo.value.avatar;
    data.name = userinfo.value.name;
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
