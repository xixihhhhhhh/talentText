<template>
  <div class="bg-white px-2">
    <div class="pt-5 flex items-center">
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
      <a-button type="primary" :icon="h(SearchOutlined)" class="my-2 mr-3" @click="search"
        >搜索</a-button
      >
      <a-button type="primary" :icon="h(PlusOutlined)" class="my-2" @click="openAdd = true"
        >新增</a-button
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
            <Popconfirm @confirm="deleteDuty(record)" title="确定删除吗">
              <a-button type="primary" class="mr-4" danger>删除</a-button>
            </Popconfirm>
            <a-button type="primary" @click="openUpbateDuty(record)">修改</a-button>
          </div>
        </template>
      </template>
    </Table>
    <Modal v-model:open="openAdd" title="添加职能" :footer="null">
      <BasicForm @register="registerAdd" @submit="addDuty" class="-enter-x h-110%" />
    </Modal>
    <Modal v-model:open="openUpdate" title="添加职能" :footer="null">
      <BasicForm @register="registerUpbate" @submit="updateDuty" class="-enter-x h-110%" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, h, onMounted, nextTick } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { Table, Select, Popconfirm, Modal, notification } from 'ant-design-vue';
  import { columns, schemas } from './data';
  import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import {
    getDutyApi,
    deleteDutyApi,
    addDutyApi,
    upbateDutyApi,
    getAllDepartmentAndPositionApi,
  } from '@/api/sys/duty';

  const selectedDepartment = ref('');
  const selectedPosition = ref('');
  const dataSource = ref([]);
  const openAdd = ref(false);
  const openUpdate = ref(false);
  const updateDutyId = ref(0);
  const departmentOptions = ref([]);
  const positionOptions = ref([]);

  const [registerAdd] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: { span: 24 },
    submitButtonOptions: { text: '添加' },
  });

  const [registerUpbate, { setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: { span: 24 },
    submitButtonOptions: { text: '修改' },
  });

  onMounted(async () => {
    GetDutyApi({});
    const { allDepartment, allPosition } = await getAllDepartmentAndPositionApi();
    departmentOptions.value = allDepartment;
    positionOptions.value = allPosition;
    console.log('🚀 ~ onMounted ~ allDepartment:', allDepartment, allPosition);
  });

  function search() {
    const filter = {
      department: selectedDepartment.value,
      position: selectedPosition.value,
    };
    GetDutyApi(filter);
  }

  async function GetDutyApi(filter: any) {
    const res = await getDutyApi(filter);
    dataSource.value = res;
  }

  async function deleteDuty(record: any) {
    await deleteDutyApi({ duty_id: record.id });
    search();
    notification.open({
      message: `删除成功`,
      placement: 'top',
      type: 'success',
    });
  }

  async function openUpbateDuty(record: any) {
    openUpdate.value = true;
    await nextTick();
    const { department, subDepartment, position, corrFunc } = record;
    updateDutyId.value = record.id;
    setFieldsValue({
      department,
      subDepartment,
      position,
      corrFunc,
    });
  }

  async function updateDuty(values: any) {
    await upbateDutyApi({ ...values, id: updateDutyId.value });
    search();
    notification.open({
      message: `修改成功`,
      placement: 'top',
      type: 'success',
    });
    openUpdate.value = false;
  }

  async function addDuty(values: any) {
    await addDutyApi(values);
    openAdd.value = false;
    search();
    notification.open({
      message: `新增成功`,
      placement: 'top',
      type: 'success',
    });
  }
</script>

<style scoped></style>
