<template>
  <div class="bg-white px-2">
    <div class="pt-5" v-if="isMobile">
      <div class="my-2 ml-4 flex items-center justify-center w-80%">
        <span class="mr-2">部门：</span>
        <Select
          v-model:value="selectedDepartment"
          :options="departmentOptions"
          class="flex-1"
          allowClear
        />
      </div>
      <div class="my-2 ml-4 flex items-center justify-center w-80%">
        <span class="mr-2">细分部门：</span>
        <Select
          allowClear
          v-model:value="selectedSubDepartment"
          :options="subDepartmentOptions"
          class="flex-1"
        />
      </div>
      <div class="my-2 ml-4 flex items-center justify-center w-80%">
        <span class="mr-2">岗位：</span>
        <Select
          allowClear
          v-model:value="selectedPosition"
          :options="positionOptions"
          class="flex-1"
        />
      </div>
      <div class="flex justify-center">
        <a-button type="primary" :icon="h(SearchOutlined)" class="my-2" @click="search"
          >搜索</a-button
        >
      </div>
    </div>
    <div class="pt-5 flex items-center" v-else>
      <span class="mr-2">部门：</span>
      <Select
        v-model:value="selectedDepartment"
        :options="departmentOptions"
        class="w-18% mr-2"
        allowClear
      />
      <span class="mr-2">细分部门：</span>
      <Select
        v-model:value="selectedSubDepartment"
        :options="subDepartmentOptions"
        class="w-18% mr-2"
        allowClear
      />
      <span class="mr-2">岗位：</span>
      <Select
        v-model:value="selectedPosition"
        :options="positionOptions"
        class="w-18% mr-2"
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
        <template v-if="column.key === 'index'">
          <div class="flex justify-center">{{ title }}</div>
        </template>
        <template v-if="column.key === 'action'">
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
            <Popconfirm @confirm="deleteDuty(record)" title="确定删除吗">
              <a-button type="primary" class="mr-4" danger>删除</a-button>
            </Popconfirm>
            <a-button type="primary" @click="openUpdateDuty(record)">修改</a-button>
          </div>
        </template>
      </template>
    </Table>
    <Modal v-model:open="openAdd" title="添加职能" :footer="null">
      <BasicForm @register="registerAdd" @submit="addDuty" class="-enter-x h-110%" />
    </Modal>
    <Modal v-model:open="openUpdate" title="添加职能" :footer="null">
      <BasicForm @register="registerUpdate" @submit="updateDuty" class="-enter-x h-110%" />
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
    updateDutyApi,
    getAllDepartmentAndPositionApi,
  } from '@/api/sys/duty';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const selectedDepartment = ref('');
  const selectedPosition = ref('');
  const selectedSubDepartment = ref('');
  const dataSource = ref([]);
  const openAdd = ref(false);
  const openUpdate = ref(false);
  const updateDutyId = ref(0);
  const departmentOptions = ref([]);
  const positionOptions = ref([]);
  const subDepartmentOptions = ref([]);

  const [registerAdd] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: { span: 24 },
    submitButtonOptions: { text: '添加' },
  });

  const [registerUpdate, { setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: { span: 24 },
    submitButtonOptions: { text: '修改' },
  });

  onMounted(async () => {
    GetDutyApi({});
    const { allDepartment, allPosition, allSubDepartment } = await getAllDepartmentAndPositionApi();
    departmentOptions.value = allDepartment;
    subDepartmentOptions.value = allSubDepartment;
    positionOptions.value = allPosition;
  });

  function search() {
    const filter = {
      department: selectedDepartment.value,
      subDepartment: selectedSubDepartment.value,
      position: selectedPosition.value,
    };
    GetDutyApi(filter);
  }

  async function GetDutyApi(filter: any) {
    const res = await getDutyApi(filter);
    dataSource.value = res.map((item, index) => {
      item.index = index + 1;
      return item;
    });
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

  async function openUpdateDuty(record: any) {
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
    await updateDutyApi({ ...values, id: updateDutyId.value });
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
