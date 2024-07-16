<template>
  <Card class="w-full">
    <div class="font-bold text-lg">职业领域</div>
    <div class="flex justify-around flex-wrap w-full" v-for="index in 4" :key="index">
      <Icon
        icon="wi-thermometer"
        :size="100"
        :color="getMaxField() === index ? activeColor : '#999'"
      />
      <div>
        <div class="font-bold"
          >{{ careerFieldName[index - 1] }} {{ careerFieldObj[fields[index - 1]] }}</div
        >
        <div class="font-bold"
          >领域占比 {{ percentageFormatter(careerFieldObj[fields[index - 1]] / allScore) }}</div
        >
        <div>{{ explnation[index - 1][0] }}</div>
        <div>{{ explnation[index - 1][1] }}</div>
      </div>
    </div>
    <template #tabBarExtraContent></template>
  </Card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Card } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useQuestionStore } from '@/store/modules/question';

  const questionStore = useQuestionStore();

  const activeColor = '#28B8C5';
  const fields = ['pioneering', 'transaction', 'service', 'research'];
  const careerFieldName = ['开拓影响', '事务执行', '服务关系', '研发策划'];
  const explnation = [
    ['沟通说明，开拓冒险', '快速行动，影响大众'],
    ['明确目标，贯彻落实', '注重现实，遵循指示'],
    ['建立关系，和谐融洽', '协调维护，团队凝聚'],
    ['创新思维，出谋划策', '关注可能，分析信息'],
  ];

  const careerFieldObj = computed(() => {
    return questionStore.careerFieldObj;
  });

  function percentageFormatter(num) {
    return new Intl.NumberFormat('default', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  const allScore = Object.values(careerFieldObj.value).reduce(
    (sum: number, value) => sum + Number(value),
    0,
  );

  function getMaxField() {
    const { pioneering, transaction, service, research } = careerFieldObj.value;
    const values = [Number(pioneering), Number(transaction), Number(service), Number(research)];
    const maxIndex = values.indexOf(Math.max(...values));
    return maxIndex + 1;
  }
</script>
