<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <CountTo prefix="" :startVal="0" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo prefix="" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { CountTo } from '@/components/CountTo';
  import Icon from '@/components/Icon/Icon.vue';
  import { Tag, Card } from 'ant-design-vue';
  import { GrowCardItem, growCardList1 } from '../data';
  import { getUsersNumber } from '@/api/sys/user';

  const growCardList = ref<GrowCardItem[]>(growCardList1);
  onMounted(async () => {
    const res = await getUsersNumber();
    console.log(res, 'res');
    growCardList.value.unshift({
      title: '用户数',
      icon: 'visit-count|svg',
      value: res.curMonthNum,
      total: res.totalNum,
      color: 'green',
      action: '月',
    });
    growCardList.value.unshift({
      title: '问卷数',
      icon: 'total-sales|svg',
      value: 8,
      total: 8,
      color: 'blue',
      action: '月',
    });
  });

  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
