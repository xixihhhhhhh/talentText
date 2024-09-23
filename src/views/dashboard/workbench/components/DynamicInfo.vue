<template>
  <Card title="最新报告" v-bind="$attrs">
    <template #extra>
      <a-button type="link" size="small" @click="routerGo">更多</a-button>
    </template>
    <Table :dataSource="dataSource" :columns="columns" :scroll="{ x: 0, y: 400 }">
      <template #bodyCell="{ text, column }">
        <template v-if="column.key === 'spendTime'">
          {{ handleReportTruth(text) }}
        </template>
      </template>
    </Table>
  </Card>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { columns } from './data';
  import { Card, Table } from 'ant-design-vue';
  import { getAllEvaluateListApi } from '@/api/sys/evaluateHistory';

  const router = useRouter();

  const dataSource = ref([]);

  onMounted(async () => {
    const res = await getAllEvaluateListApi({});
    dataSource.value = res.slice(0, 5);
  });

  function routerGo() {
    router.push({ name: 'reportAdmin' });
  }

  function handleReportTruth(spendTime: number) {
    // 将秒转换为分钟
    const spendTimeMinutes = spendTime / 60;

    // 根据时间区间返回可信度
    if (spendTimeMinutes >= 20 && spendTimeMinutes <= 30) {
      return '高';
    } else if (
      (spendTimeMinutes >= 7.5 && spendTimeMinutes < 20) ||
      (spendTimeMinutes > 30 && spendTimeMinutes <= 42.5)
    ) {
      return '正常';
    } else {
      return '低';
    }
  }
</script>
