<template>
  <Card class="w-full mt-2" :class="textSize">
    <div class="font-bold text-lg border-b-2">职业优势前三</div>
    <div v-for="index in 3" :key="index">
      <div class="flex items-center mt-1">
        <Icon :icon="careerAdvantagesIcons[index - 1]" :size="30" />
        <span class="font-bold"
          >{{ options.topThreeKeys[index - 1] }}: {{ options.topThree[index - 1].toFixed(2) }}</span
        >
      </div>
      <div class="indent">
        {{ options.shuoming[index - 1] }}
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';

  defineProps({
    options: {
      type: Object as PropType<any>,
      required: true,
    },
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const textSize = isMobile ? 'text-3' : 'text-5';
  const careerAdvantagesIcons = [
    'twemoji:1st-place-medal',
    'twemoji:2nd-place-medal',
    'twemoji:3rd-place-medal',
  ];
</script>
