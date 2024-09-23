<template>
  <div class="flex w-full">
    <Card title="测量中心" v-bind="$attrs" class="w-60%">
      <CardGrid
        v-for="item in groupItems"
        :key="item.title"
        class="cursor-pointer !w-50%"
        @click="routerGo('/questionnaire/writequestionnaire')"
      >
        <div class="flex gap-40px">
          <Icon :icon="item.icon" :color="item.color" size="30" />
          <div>
            <div>{{ item.title }}</div>
            <div>
              已完成
              <CountTo :startVal="1" :endVal="length" class="text-2xl" />
              人
            </div>
          </div>
        </div>
      </CardGrid>
    </Card>
    <Card title="评估中心" v-bind="$attrs" class="flex-1">
      <CardGrid
        v-for="item in groupItems1"
        :key="item.title"
        class="cursor-pointer !w-100%"
        @click="routerGo('/questionnaire/writequestionnaire')"
      >
        <div class="flex gap-40px">
          <Icon :icon="item.icon" :color="item.color" size="30" />
          <div>
            <div>{{ item.title }}</div>
            <div>
              已设置
              <CountTo :startVal="1" :endVal="dutyLength" class="text-2xl" />
              个
            </div>
          </div>
        </div>
      </CardGrid>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { getEvaluateHistoryLengthApi } from '@/api/sys/evaluateHistory';
  import { getDutyApi } from '@/api/sys/duty';
  import { CountTo } from '@/components/CountTo';
  import { Card, CardGrid } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useRouter } from 'vue-router';

  interface GroupItem {
    title: string;
    icon: string;
    color: string;
  }

  const groupItems: GroupItem[] = [
    {
      title: '测评分析',
      icon: 'mdi:microsoft-word',
      color: '#3fb27f',
    },
    {
      title: '测评报告',
      icon: 'fa6-solid:file-word',
      color: '#3fb27f',
    },
  ];

  const groupItems1: GroupItem[] = [
    {
      title: '岗位胜任力模型',
      icon: 'icon-park-solid:database-position',
      color: '#3fb27f',
    },
  ];

  const length = ref(0);
  const dutyLength = ref(0);

  const router = useRouter();
  function routerGo(route: string) {
    router.push(route);
  }

  onMounted(async () => {
    const res: any = await getEvaluateHistoryLengthApi();
    length.value = res.length;
    const res1 = await getDutyApi({});
    dutyLength.value = res1.length;
  });
</script>
