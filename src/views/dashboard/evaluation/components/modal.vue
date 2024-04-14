<template>
  <BasicModal @register="register" title="评测结果" :helpMessage="helpMessage" :width="700">
    <Card title="多维结果雷达图" :loading="loading">
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
  import { useQuestionStore } from '@/store/modules/question';

  const questionStore = useQuestionStore();

  const router = useRouter();
  function routerGo() {
    closeModal();
    router.push('/questionnaire/result');
  }

  const helpMessage = '六维雷达图结果';
  const [register, { closeModal, getOpen }] = useModalInner();

  defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: 'calc(100vh - 500px)',
    },
    scores1: {
      type: Object as PropType<any>,
      default: () => {
        return {};
      },
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const loading = ref(false);
  let flag = true;

  if (getOpen !== undefined) {
    watch(
      () => getOpen.value,
      async (val) => {
        if (val && flag) {
          loading.value = true;
          flag = false;
          try {
            await nextTick();
            setOptions(questionStore.leidatu);
          } finally {
            loading.value = false;
          }
        }
      },
    );
  }
</script>
