<template>
  <Table
    :dataSource="dataSource"
    :columns="columns"
    :scroll="{ x: 15, y: 530 }"
    :pagination="false"
    v-if="isMobile"
  >
    <template #headerCell="{ column, title }">
      <template v-if="column.key === 'competency'">
        <div class="flex justify-center">{{ title }}</div>
      </template>
      <template v-if="column.key === 'definition'">
        <div class="flex justify-center">{{ title }}</div>
      </template>
      <template v-if="column.key === 'degreeTendency'">
        <div class="flex justify-center">{{ title }}</div>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'competency'">
        <div class="text-#28B8C5 text-20px flex justify-center">
          {{ record.competency }}
        </div>
      </template>
      <template v-if="column.key === 'definition'">
        <div class="text-20px flex justify-center">
          {{ record.definition }}
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
  <template v-else>
    <div class="flex h-40px">
      <div class="w-15% flex justify-center font-bold text-20px">胜任力</div>
      <div class="flex-1 flex justify-center font-bold text-20px">定义</div>
      <div class="w-20% font-bold text-20px">匹配度 </div>
    </div>
    <div
      class="flex h-80px py-10px border-b-1px border-b-#f0f0f0"
      v-for="item in dataSource"
      :key="item.competency"
    >
      <div class="text-#28B8C5 text-20px flex justify-center w-15% text-20px">{{
        item.competency
      }}</div>
      <div class="flex-1 text-20px">{{ item.definition }}</div>
      <div class="w-40% flex justify-center font-bold text-20px"
        ><div class="flex justify-center">
          <Rate :value="item.degreeTendency / 20" disabled allow-half>
            <template #character>
              <Icon icon="mdi:bottle-soda-classic" :size="70" />
            </template>
          </Rate>
        </div>
      </div>
    </div>
  </template>
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
  :deep .ant-rate {
    color: #28b8c5;
  }
</style>
