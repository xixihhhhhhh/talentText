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
      true,
    );
    const schemasOption = {
      labelWidth: 120,
      schemas,
      actionColOptions: { span: 24, style: { textAlign: 'center' } },
      submitButtonOptions: { text: '以岗选人' },
    };
    setProps(schemasOption);
  });

  async function handleSubmit(values: any) {
    console.log('🚀 ~ handleSubmit ~ values:', values);
    values = processDepartmentObj(values);
    const { corrFunc, sortOption } = values;
    const res = await getMatchedUsersApi({ corrFunc, sortOption });
    console.log('🚀 ~ handleSubmit ~ res:', res);
    dataSource.value = res.map((item, index) => {
      item.index = index + 1;
      return item;
    });
    console.log('🚀 ~ onMounted ~ res:', res);
  }
</script>

<style scoped></style>
