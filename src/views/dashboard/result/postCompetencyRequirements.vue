<template>
  <div class="flex h-40px">
    <div class="w-20% flex justify-center font-bold" :class="isMobile ? '' : 'text-20px'"
      >胜任力</div
    >
    <div class="flex-1 flex justify-center font-bold" :class="isMobile ? '' : 'text-20px'"
      >定义</div
    >
    <div class="w-20% font-bold" :class="isMobile ? '' : 'text-20px'">匹配度 </div>
  </div>
  <div
    class="flex h-80px py-10px border-b-1px border-b-#f0f0f0"
    v-for="item in dataSource"
    :key="item.competency"
  >
    <div
      class="text-#28B8C5 text-20px flex justify-center w-20%"
      :class="isMobile ? '' : 'text-20px'"
      >{{ item.competency }}</div
    >
    <div class="flex-1" :class="isMobile ? '' : 'text-20px'">{{ item.definition }}</div>
    <div class="w-40% flex justify-center font-bold" :class="isMobile ? '' : 'text-20px'"
      ><div class="flex justify-center">
        <Rate :value="item.degreeTendency / 20" disabled allow-half>
          <template #character>
            <Icon icon="mdi:bottle-soda-classic" :size="55" />
          </template>
        </Rate>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Rate } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  defineProps<{
    dataSource: { competency: string; definition: string; degreeTendency: number }[];
  }>();
</script>

<style scoped>
  :deep .ant-rate {
    color: #28b8c5;
  }
</style>
