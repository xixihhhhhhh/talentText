<template>
  <div class="bg-white px-2">
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
            <a-button type="primary" @click="detail(record)">详情</a-button>
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
  import { ref, onMounted, toRaw } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { Table } from 'ant-design-vue';
  import { columns } from '../reportManagementAdmin/data';
  import { getPersonalEvaluateListApi } from '@/api/sys/evaluateHistory';
  import ResultPdf from '@/views/dashboard/result/resultPdf.vue';
  import { useResultStore } from '@/store/modules/result';

  const resultStore = useResultStore();
  const userStore = useUserStore();
  const userInfo = toRaw(userStore.getUserInfo);
  const router = useRouter();

  const showResultPdf = ref(false);
  const dataSource = ref([]);
  const careerAdvantagesObj = ref({});
  const careerFieldObj = ref({});
  const competencyObj = ref({});
  const echartOptions = ref({});
  const corrFunc = ref('');

  onMounted(async () => {
    GetAllEvaluateListApi({});
  });

  async function GetAllEvaluateListApi(filter: any) {
    filter.userId = userInfo.userId;
    const res = await getPersonalEvaluateListApi(filter);
    dataSource.value = res.map((item, index) => {
      item.index = index + 1;
      return item;
    });
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

  async function detail(record: any) {
    resultStore.setState({
      name: userInfo.name,
      avatart: userInfo.avatar,
      careerAdvantagesObj: record.careerAdvantagesObj,
      careerFieldObj: record.careerFieldObj,
      competencyObj: record.competencyObj,
      echartOptions: record.echartOptions,
      corrFunc: record.corrFunc,
    });
    router.push({ name: 'resultRoute' });
  }

  function close() {
    showResultPdf.value = false;
  }
</script>

<style scoped></style>
