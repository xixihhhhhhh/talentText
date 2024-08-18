<template>
  <Table
    :dataSource="dataSource"
    :columns="columns"
    :scroll="{ x: 15, y: 530 }"
    :pagination="false"
  >
    <template #headerCell="{ column, title }">
      <template v-if="column.key === 'competency'">
        <div class="flex justify-center" :class="isMobile ? '' : 'text-20px'">{{ title }}</div>
      </template>
      <template v-if="column.key === 'definition'">
        <div class="flex justify-center" :class="isMobile ? '' : 'text-20px'">{{ title }}</div>
      </template>
      <template v-if="column.key === 'degreeTendency'">
        <div class="flex justify-center" :class="isMobile ? '' : 'text-20px'">{{ title }}</div>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'competency'">
        <div class="text-#28B8C5">
          {{ record.competency }}
        </div>
      </template>
      <template v-if="column.key === 'degreeTendency'">
        <div class="flex justify-center">
          <Rate :value="record.degreeTendency / 20" disabled allow-half>
            <template #character>
              <Icon icon="mdi:bottle-soda-classic" :size="35" />
            </template>
          </Rate>
        </div>
      </template>
    </template>
  </Table>
</template>

<script lang="ts" setup>
  import { Table, Rate } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const columns = [
    {
      title: '胜任力',
      dataIndex: 'competency',
      key: 'competency',
      width: 100,
    },
    {
      title: '定义',
      dataIndex: 'definition',
      key: 'definition',
      width: 200,
    },
    {
      title: '倾向程度',
      dataIndex: 'degreeTendency',
      key: 'degreeTendency',
      width: 250,
    },
  ];
  defineProps<{
    dataSource: { competency: string; definition: string; degreeTendency: number }[];
  }>();
</script>

<style scoped>
  ::v-deep .ant-rate {
    color: #28b8c5;
  }
</style>
