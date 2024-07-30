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
        <Select
          allowClear
          v-model:value="selectedPosition"
          :options="positionOptions"
          class="flex-1"
        />
      </div>
      <div class="my-2 flex items-center">
        <span class="">报告完成时间排序：</span>
        <Select allowClear v-model:value="sortOrder" :options="sortOptions" class="flex-1" />
      </div>
      <a-button type="primary" :icon="h(SearchOutlined)" class="my-2" @click="search"
        >搜索</a-button
      >
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
      <Select
        v-model:value="selectedPosition"
        :options="positionOptions"
        class="w-20% mr-2"
        allowClear
      />
      <span class="">报告完成时间排序：</span>
      <Select allowClear v-model:value="sortOrder" :options="sortOptions" class="w-20% mr-2" />
      <a-button type="primary" :icon="h(SearchOutlined)" class="my-2" @click="search"
        >搜索</a-button
      >
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
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div class="flex justify-center">
            <a-button type="primary" @click="download(record)">下载</a-button>
          </div>
        </template>
      </template>
    </Table>
    <ResultPdf
      v-if="showResultPdf"
      @close="close"
      :user-info="userInfo"
      :career-advantages-obj="careerAdvantagesObj"
      :career-field-obj="careerFieldObj"
      :competency-obj="competencyObj"
      :corr-func="corrFunc"
      :echart-options="echartOptions"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, h, onMounted, toRaw } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { Table, Select } from 'ant-design-vue';
  import { sortOptions, columns } from '../reportManagementAdmin/data';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { getPersonalEvaluateListApi } from '@/api/sys/evaluateHistory';
  import { getAllDepartmentAndPositionApi } from '@/api/sys/duty';
  import ResultPdf from '@/views/dashboard/result/resultPdf.vue';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const userStore = useUserStore();
  const userInfo = toRaw(userStore.getUserInfo);

  const selectedDepartment = ref('');
  const selectedPosition = ref('');
  const sortOrder = ref('');
  const showResultPdf = ref(false);
  const dataSource = ref([]);
  const careerAdvantagesObj = ref({});
  const careerFieldObj = ref({});
  const competencyObj = ref({});
  const echartOptions = ref({});
  const corrFunc = ref('');
  const departmentOptions = ref([]);
  const positionOptions = ref([]);

  onMounted(async () => {
    GetAllEvaluateListApi({});
    const { allDepartment, allPosition } = await getAllDepartmentAndPositionApi();
    departmentOptions.value = allDepartment;
    positionOptions.value = allPosition;
  });

  function search() {
    const filter = {
      department: selectedDepartment.value,
      position: selectedPosition.value,
      sortOrder: sortOrder.value,
    };
    GetAllEvaluateListApi(filter);
  }

  async function GetAllEvaluateListApi(filter: any) {
    filter.userId = userInfo.userId;
    const res = await getPersonalEvaluateListApi(filter);
    dataSource.value = res;
  }

  async function download(record: any) {
    // 先根据userId拿到userInfo
    careerAdvantagesObj.value = record.careerAdvantagesObj;
    careerFieldObj.value = record.careerFieldObj;
    competencyObj.value = record.competencyObj;
    echartOptions.value = record.echartOptions;
    corrFunc.value = record.corrFunc;
    showResultPdf.value = true;
  }

  function close() {
    showResultPdf.value = false;
  }
</script>

<style scoped></style>
