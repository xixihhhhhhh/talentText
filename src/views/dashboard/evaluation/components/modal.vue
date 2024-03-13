<template>
  <BasicModal @register="register" title="评测结果" :helpMessage="helpMessage" :width="700">
    <Card title="六维结果雷达图" :loading="loading">
      <div ref="chartRef" :style="{ height, width }"></div>
    </Card>
    <template #footer>
      <a-button type="primary" @click="routerGo">进入详情页 </a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { PropType, ref, Ref, watch, nextTick } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { useRouter } from 'vue-router';
  import { Card } from 'ant-design-vue';
  import type { EChartsOption } from 'echarts';

  const router = useRouter();
  function routerGo() {
    closeModal();
    router.push('/questionaire/result');
  }

  const helpMessage = '六维雷达图结果';
  const [register, { getOpen, closeModal }] = useModalInner();

  defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: 'calc(100vh - 250px)',
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  const options: EChartsOption = {
    legend: {
      bottom: 0,
      data: ['Visits', 'Sales'],
    },
    tooltip: {},
    radar: {
      radius: '60%',
      splitNumber: 8,
      indicator: [
        {
          name: '2017',
        },
        {
          name: '2017',
        },
        {
          name: '2018',
        },
        {
          name: '2019',
        },
        {
          name: '2020',
        },
        {
          name: '2021',
        },
      ],
    },
    series: [
      {
        type: 'radar',
        symbolSize: 0,
        areaStyle: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1,
        },
        data: [
          {
            value: [90, 50, 86, 40, 50, 20],
            name: 'Visits',
            itemStyle: {
              color: '#b6a2de',
            },
          },
          {
            value: [70, 75, 70, 76, 20, 85],
            name: 'Sales',
            itemStyle: {
              color: '#67e0e3',
            },
          },
        ],
      },
    ],
  };

  const loading = ref(false);
  let flag = true;
  watch(
    () => getOpen,
    async (val) => {
      if (val && flag) {
        flag = false;
        await nextTick();
        setOptions(options);
      }
    },
  );
</script>
