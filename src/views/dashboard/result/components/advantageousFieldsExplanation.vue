<template>
  <Card class="w-full mt-2" :class="textSize">
    <div class="font-bold text-lg border-b-grey border-b-2">优势领域说明</div>
    <div class="mt-4">
      <Avatar :src="avatar" /> {{ name }} 在
      <span class="font-bold" :style="{ color: activeColor }">{{ fieldMap[maxFieldIndex] }} </span>
      <span>&nbsp;{{ coreAreas[maxFieldIndex] }}</span>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { coreAreas, fieldMap } from '../data';
  import { Card, Avatar } from 'ant-design-vue';

  defineProps({
    avatar: {
      type: String as PropType<string>,
      required: true,
    },
    name: {
      type: String as PropType<string>,
      required: true,
    },
    maxFieldIndex: {
      type: String as PropType<string>,
      required: true,
    },
  });
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const textSize = isMobile ? 'text-3' : 'text-5';
  const activeColor = '#28B8C5';
</script>
