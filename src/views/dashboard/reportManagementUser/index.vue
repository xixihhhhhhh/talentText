<template>
  <div class="bg-white px-2">
    <div class="pt-5" v-if="isMobile">
      <div class="my-2 flex items-center">
        <span class="mr-2">部门：</span>
        <Select
          v-model:value="selectedDepartment"
          :options="departmentOptions"
          class="flex-1"
          allowClear
        />
      </div>
      <div class="my-2 flex items-center">
        <span class="mr-2">岗位：</span>
        <Select v-model="selectedPosition" :options="positionOptions" class="flex-1" />
      </div>
      <div class="my-2 flex items-center">
        <span class="">报告完成时间排序：</span>
        <Select v-model="sortOrder" class="flex-1">
          <Select.Option value="升序">升序</Select.Option>
          <Select.Option value="降序">降序</Select.Option>
        </Select>
      </div>
      <a-button type="primary" :icon="h(SearchOutlined)" class="my-2">搜索</a-button>
    </div>
    <div class="pt-5 flex items-center" v-else>
      <span class="mr-2">部门：</span>
      <Select
        v-model:value="selectedDepartment"
        :options="departmentOptions"
        class="w-20% mr-2"
        allowClear
      />
      <span class="mr-2">岗位：</span>
      <Select v-model="selectedPosition" :options="positionOptions" class="w-20% mr-2" />
      <span class="">报告完成时间排序：</span>
      <Select v-model="sortOrder" class="w-20% mr-2">
        <Select.Option value="升序">升序</Select.Option>
        <Select.Option value="降序">降序</Select.Option>
      </Select>
      <a-button type="primary" :icon="h(SearchOutlined)" class="my-2">搜索</a-button>
    </div>
    <Table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="{
        defaultPageSize: 5,
      }"
      :scroll="{ x: 15, y: 400 }"
    >
      <template #headerCell="{ column, title }">
        <template v-if="column.key === 'action'">
          <div class="flex justify-center">{{ title }}</div>
        </template>
      </template>
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <div class="flex justify-center">
            <a-button type="primary">下载</a-button>
          </div>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
  import { ref, h } from 'vue';
  import { Table, Select } from 'ant-design-vue';
  import { departmentOptions, positionOptions, columns } from './data';
  import { SearchOutlined } from '@ant-design/icons-vue';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const dataSource = [
    {
      key: '1',
      name: '张三',
      department: '研发部',
      position: '前端工程师',
      reportDate: '2023-03-15',
    },
    {
      key: '2',
      name: '李四',
      department: '设计部',
      position: 'UI设计师',
      reportDate: '2023-03-10',
    },
    {
      key: '3',
      name: '王五',
      department: '测试部',
      position: '测试工程师',
      reportDate: '2023-03-20',
    },
    {
      key: '4',
      name: '赵六',
      department: '市场部',
      position: '市场专员',
      reportDate: '2023-03-18',
    },
    {
      key: '5',
      name: '孙七',
      department: '运营部',
      position: '运营经理',
      reportDate: '2023-03-12',
    },
  ];

  const selectedDepartment = ref('');
  const selectedPosition = ref('');
  const sortOrder = ref('');
</script>

<style scoped></style>
