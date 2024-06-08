<template>
  <div class="flex w-full">
    <div class="progress-bar flex-1">
      <div class="progress" :style="{ width: percent + '%' }"></div>
    </div>
    <span class="ml-4 w-12">{{ percent }}%</span>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  defineProps({
    percent: {
      type: Number,
      required: true,
    },
  });
</script>

<style scoped lang="less">
  .progress-bar {
    overflow: hidden;
    border-radius: 10px;
    background-color: #f0f0f0;
  }

  .progress {
    height: 100%;
    background-color: #0960bd;
  }
</style>
