<template>
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
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Card } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useQuestionStore } from '@/store/modules/question';

  const questionStore = useQuestionStore();

  const activeColor = '#28B8C5';

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

  const allScore =
    Number(careerFieldObj.value.pioneering) +
    Number(careerFieldObj.value.transaction) +
    Number(careerFieldObj.value.service) +
    Number(careerFieldObj.value.research);

  function getMaxField() {
    const { pioneering, transaction, service, research } = careerFieldObj.value;
    const values = [Number(pioneering), Number(transaction), Number(service), Number(research)];
    const maxIndex = values.indexOf(Math.max(...values));
    const fields = ['pioneering', 'transaction', 'service', 'research'];
    return fields[maxIndex];
  }
</script>
