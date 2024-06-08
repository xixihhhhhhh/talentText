<template>
  <div class="progress-bar mb-2">
    <div class="progress h-4 font-500" :style="{ width: percent + '%' }"> {{ percent }}% </div>
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
    height: 1.5rem;
    overflow: hidden;
    border-radius: 0.75rem;
    background-color: #fff;
  }

  .progress {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding-right: 0.4rem;
    border-radius: 0.75rem;
    background: linear-gradient(to right, #a7d3f0, #1199f2);
    color: #fff;
  }
</style>
