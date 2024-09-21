<template>
  <div class="pr-20 pt-2" v-if="!isMobile">
    <div class="font-bold text-22px">职业领域</div>
    <div class="flex flex-wrap" v-for="index in 4" :key="index">
      <Icon
        icon="wi-thermometer"
        :size="100"
        :color="getMaxField() === index ? activeColor : '#999'"
      />
      <div class="relative top-2 text-18px">
        <div class="font-bold"
          >{{ careerFieldName[index - 1] }} {{ careerFieldObj[fields[index - 1]] }}</div
        >
        <div>{{ explanation[index - 1][0] }}</div>
        <div>{{ explanation[index - 1][1] }}</div>
      </div>
    </div>
  </div>
  <Card class="pr-10" v-else>
    <div class="font-bold text-lg">职业领域</div>
    <div class="flex flex-wrap" v-for="index in 4" :key="index">
      <Icon
        icon="wi-thermometer"
        :size="100"
        :color="getMaxField() === index ? activeColor : '#999'"
      />
      <div class="pt-2">
        <div class="font-bold"
          >{{ careerFieldName[index - 1] }} {{ careerFieldObj[fields[index - 1]] }}</div
        >
        <div>{{ explanation[index - 1][0] }}</div>
        <div>{{ explanation[index - 1][1] }}</div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Card } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useQuestionStore } from '@/store/modules/question';

  const questionStore = useQuestionStore();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const activeColor = '#28B8C5';
  const fields = ['pioneering', 'transaction', 'service', 'research'];
  const careerFieldName = ['开拓影响', '事务执行', '服务关系', '研发策划'];
  const explanation = [
    ['沟通说明，开拓冒险', '快速行动，影响大众'],
    ['明确目标，贯彻落实', '注重现实，遵循指示'],
    ['建立关系，和谐融洽', '协调维护，团队凝聚'],
    ['创新思维，出谋划策', '关注可能，分析信息'],
  ];

  const careerFieldObj = computed(() => {
    return questionStore.careerFieldObj;
  });

  function getMaxField() {
    const { pioneering, transaction, service, research } = careerFieldObj.value;
    const values = [Number(pioneering), Number(transaction), Number(service), Number(research)];
    const maxIndex = values.indexOf(Math.max(...values));
    return maxIndex + 1;
  }
</script>
