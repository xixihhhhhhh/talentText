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
        <template v-if="column.key === 'index'">
          <div class="flex justify-center">{{ title }}</div>
        </template>
      </template>
      <template #bodyCell="{ text, column, record }">
        <template v-if="column.key === 'index'">
          <div class="flex justify-center">
            {{ text }}
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <div class="flex justify-center">
            <a-button type="primary" class="mr-4" @click="download(record)">下载</a-button>
            <a-button type="primary" class="mr-4" @click="detail(record)">详情</a-button>
            <a-button type="primary" class="mr-4" @click="reinviteforevaluation(record)"
              >重新邀评</a-button
            >
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
  import { ref, h, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { Table, Select, message } from 'ant-design-vue';
  import { sortOptions, columns } from './data';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { getAllEvaluateListApi } from '@/api/sys/evaluateHistory';
  import { getUserInfoById, setCanTextApi } from '@/api/sys/user';
  import { getAllDepartmentAndPositionApi } from '@/api/sys/duty';
  import ResultPdf from '@/views/dashboard/result/resultPdf.vue';
  import { useResultStore } from '@/store/modules/result';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const resultStore = useResultStore();
  const router = useRouter();
  const selectedDepartment = ref('');
  const selectedPosition = ref('');
  const sortOrder = ref('');
  const showResultPdf = ref(false);
  const dataSource = ref([]);
  const userInfo = ref<any>({});
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
    const res = await getAllEvaluateListApi(filter);
    dataSource.value = res.map((item, index) => {
      item.index = index + 1;
      return item;
    });
  }

  async function download(record: any) {
    // 先根据userId拿到userInfo
    const { user_id } = record;
    const user = await getUserInfoById({ user_id });
    userInfo.value = { name: user.name, avatar: user.avatar };
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

  async function detail(record: any) {
    const { user_id } = record;
    const user = await getUserInfoById({ user_id });
    userInfo.value = { name: user.name, avatar: user.avatar };
    resultStore.setState({
      name: userInfo.value.name,
      avatart: userInfo.value.avatar,
      careerAdvantagesObj: record.careerAdvantagesObj,
      careerFieldObj: record.careerFieldObj,
      competencyObj: record.competencyObj,
      echartOptions: record.echartOptions,
      corrFunc: record.corrFunc,
    });
    router.push({ name: 'resultRoute' });
  }

  async function reinviteforevaluation(record: any) {
    const { user_id } = record;
    const res = await setCanTextApi({ user_id, canTest: true });
    const { success } = res;
    if (success) {
      message.success('邀请评测成功!');
    }
  }
</script>

<style scoped></style>
