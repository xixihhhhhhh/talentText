<template>
  <Card title="最新报告" v-bind="$attrs">
    <template #extra>
      <a-button type="link" size="small" @click="routerGo">更多</a-button>
    </template>
    <Table :dataSource="dataSource" :columns="columns" :scroll="{ x: 0, y: 400 }" />
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
</script>
