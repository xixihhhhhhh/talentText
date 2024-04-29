<template>
  <Card title="六维结果雷达图" :loading="loading" class="w-full">
    <div ref="chartRef" :style="{ width, height }" class="w-full"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import type { EChartsOption } from 'echarts';

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '400px',
    },
    options: {
      type: Object as PropType<EChartsOption>,
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      props.options && setOptions(props.options);
    },
    { immediate: true },
  );
</script>
