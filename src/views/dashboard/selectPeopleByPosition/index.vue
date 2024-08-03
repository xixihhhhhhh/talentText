<template>
  <PageWrapper>
    <BasicForm @register="register" @submit="handleSubmit" class="-enter-x mt-10" />
    <Table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="{
        defaultPageSize: 5,
      }"
      :scroll="{ x: 15, y: 400 }"
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
      <template #bodyCell="{ text, column }">
        <template v-if="column.key === 'index'">
          <div class="flex justify-center">
            {{ text }}
          </div>
        </template>
      </template>
    </Table>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';
  import { getEvaluteFormDataApi } from '@/api/sys/duty';
  import { Table } from 'ant-design-vue';
  import { columns } from './data';
  import { getSchemas } from '../evaluation/components/evaluteFormData';
  import { getMatchedUsersApi } from '@/api/sys/evaluateHistory';
  import { processDepartmentObj } from '../evaluation/components/methods';

  const [register, { setProps }] = useForm({});

  const dataSource = ref([]);

  onMounted(async () => {
    const { departmentObj, subDepartmentObj, departmentObjArr, subPosition } =
      await getEvaluteFormDataApi();
    const expressionArr = [
      '您需要匹配的岗位所在的部门是：',
      '您需要匹配的岗位所在的细分部门是：',
      '您需要匹配的岗位是：',
    ];
    const schemas = getSchemas(
      departmentObjArr,
      departmentObj,
      subDepartmentObj,
      subPosition,
      expressionArr,
    );
    const schemasOption = {
      labelWidth: 120,
      schemas,
      actionColOptions: { span: 24, style: { textAlign: 'center' } },
      submitButtonOptions: { text: '以岗选人' },
    };
    setProps(schemasOption);
  });

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

  async function handleSubmit(values: any) {
    values = processDepartmentObj(values);
    const { corrFunc, sortOption } = values;
    const res = await getMatchedUsersApi({ corrFunc, sortOption });
    dataSource.value = res.map((item, index) => {
      item.index = index + 1;
      return item;
    });
  }
</script>

<style scoped></style>
