<template>
  <div class="bg-white px-2">
    <BasicForm @register="register" @submit="search" class="pt-10" />
    <Table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="{ defaultPageSize: 5 }"
      :scroll="{ x: 15, y: 400 }"
      :row-key="(record) => record.name"
      @change="handleTableChange"
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
        <template v-if="column.key === 'spendTime'">
          <div class="flex justify-center">
            {{ handleReportTruth(text) }}
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <div class="flex justify-center">
            <a-button type="primary" class="mr-4" @click="download(record)">下载</a-button>
            <a-button type="primary" class="mr-4" @click="detail(record)">详情</a-button>
            <Popconfirm @confirm="reinviteForEvaluation(record)" title="确定重新邀评吗">
              <a-button type="primary">重新邀评</a-button>
            </Popconfirm>
          </div>
        </template>
      </template>
    </Table>
    <ResultPdf
      v-if="showResultPdf"
      @close="close"
      :user-info="userInfo"
      :recordProps="recordProps"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { Table, message, Popconfirm } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { columns, handleReportTruth, getSchema } from './data';
  import { getAllEvaluateListApi } from '@/api/sys/evaluateHistory';
  import { getUserInfoById, setCanTextApi } from '@/api/sys/user';
  import { getAllDepartmentAndPositionApi } from '@/api/sys/duty';
  import ResultPdf from '@/views/dashboard/result/resultPdf.vue';
  import { useResultStore } from '@/store/modules/result';
  import type { TableProps } from 'ant-design-vue';

  const resultStore = useResultStore();
  const router = useRouter();
  const sortOrder = ref('');
  const showResultPdf = ref(false);
  const dataSource = ref([]);
  const userInfo = ref<any>({});
  const recordProps = ref({});
  const departmentOptions = ref([]);
  const positionOptions = ref([]);
  const subDepartmentOptions = ref([]);

  const [register, { setProps }] = useForm({});

  onMounted(async () => {
    GetAllEvaluateListApi({});
    const { allDepartment, allPosition, allSubDepartment } = await getAllDepartmentAndPositionApi();
    const schemas = getSchema(allDepartment, allPosition, allSubDepartment);
    departmentOptions.value = allDepartment;
    subDepartmentOptions.value = allSubDepartment;
    positionOptions.value = allPosition;
    setProps({
      labelWidth: 120,
      schemas,
      actionColOptions: { span: 24, style: { textAlign: 'center' } },
      resetFunc: reset,
    });
  });

  function search(values: any) {
    console.log('🚀 ~ search ~ values:', values);
    const filter = {
      sortOrder: sortOrder.value,
      ...values,
    };
    GetAllEvaluateListApi(filter);
  }

  async function reset() {
    sortOrder.value = '';
    const filter = {
      department: '',
      selectedSubDepartment: '',
      selectedPosition: '',
      sortOrder: '',
    };
    await GetAllEvaluateListApi(filter);
  }

  // @ts-ignore
  const handleTableChange: TableProps['onChange'] = (
    filters: any,
    sorter: any,
    pag: {
      pageSize: number;
      current: number;
      order: string;
    },
  ) => {
    const { order } = pag;
    if (order === 'ascend') {
      dataSource.value = dataSource.value.sort((a: any, b: any) => {
        return new Date(a.finishTime).getTime() - new Date(b.finishTime).getTime();
      });
    } else {
      dataSource.value = dataSource.value.sort((a: any, b: any) => {
        return new Date(b.finishTime).getTime() - new Date(a.finishTime).getTime();
      });
    }
  };

  async function GetAllEvaluateListApi(filter: any) {
    const res = await getAllEvaluateListApi(filter);
    dataSource.value = res.map((item, index) => {
      item.index = index + 1;
      return item;
    });
  }

  async function download(record: any) {
    const { user_id } = record;
    const user = await getUserInfoById({ user_id });
    userInfo.value = { name: user.name, avatar: user.avatar, phone: user.phone };
    recordProps.value = record;
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
      avatar: userInfo.value.avatar,
      careerAdvantagesObj: record.careerAdvantagesObj,
      careerFieldObj: record.careerFieldObj,
      competencyObj: record.competencyObj,
      echartOptions: record.echartOptions,
      corrFunc: record.corrFunc,
    });
    router.push({ name: 'resultRoute' });
  }

  async function reinviteForEvaluation(record: any) {
    const { user_id } = record;
    const res = await setCanTextApi({ user_id, canTest: true });
    const { success } = res;
    if (success) {
      message.success('邀请评测成功!');
    } else {
      message.error('邀请评测失败!');
    }
  }
</script>

<style scoped></style>
