<template>
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
</template>

<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { guanlijianyi } from '../data';

  defineProps({
    managementAdvice: {
      type: Array as PropType<any>,
      required: true,
    },
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const textSize = isMobile ? 'text-3' : 'text-5';
  const activeColor = '#28B8C5';
</script>
