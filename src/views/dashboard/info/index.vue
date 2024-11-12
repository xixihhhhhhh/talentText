<template>
  <PageWrapper title="个人信息" contentBackground contentClass="p-4">
    <template #headerContent>
      <div class="h-32px"
        >红 <span class="xing">*</span> 为必填项，个人信息填写提交后，才可进行测评分析
      </div>
    </template>
    <CollapseContainer>
      <template #title>
        <div ref="personMsgRef" class="font-bold text-20px">个人信息</div>
      </template>
      <BasicForm @register="personMsgRegister" class="m-16px" />
    </CollapseContainer>
    <CollapseContainer>
      <template #title>
        <div ref="careerRef" class="font-bold text-20px mr-10px">学习培训履历</div>
        <a-button size="small" type="primary" @click="careerOpen = true">新增</a-button>
      </template>
      <div class="text-18px">教育（培训）经历（学历为大专以下的可填写高中/中专教育经历） :</div>
      <Table :dataSource="careerArr" :columns="careerColumns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <Popconfirm @confirm="useTableDelete(careerArr, record)" title="确定删除吗">
              <a-button type="primary">删除</a-button>
            </Popconfirm>
          </template>
        </template>
      </Table>
    </CollapseContainer>
    <CollapseContainer>
      <template #title>
        <div ref="workRef" class="font-bold text-20px mr-10px">工作经历</div>
        <a-button size="small" type="primary" @click="workOpen = true">新增</a-button>
      </template>
      <Table :dataSource="workArr" :columns="workColumns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <Popconfirm @confirm="useTableDelete(workArr, record)" title="确定删除吗">
              <a-button type="primary">删除</a-button>
            </Popconfirm>
          </template>
        </template>
      </Table>
    </CollapseContainer>
    <CollapseContainer>
      <template #title>
        <div class="font-bold text-20px mr-10px">借用、交流锻炼经历</div>
        <a-button size="small" type="primary" @click="borrowOpen = true">新增</a-button>
      </template>
      <Table :dataSource="borrowArr" :columns="borrowColumns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <Popconfirm @confirm="useTableDelete(borrowArr, record)" title="确定删除吗">
              <a-button type="primary">删除</a-button>
            </Popconfirm>
          </template>
        </template>
      </Table>
    </CollapseContainer>
    <CollapseContainer>
      <template #title>
        <div class="font-bold text-20px mr-10px">奖惩情况</div>
        <a-button size="small" type="primary" @click="rewardsOpen = true">新增</a-button>
      </template>
      <Table :dataSource="rewardsArr" :columns="rewardsColumns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <Popconfirm @confirm="useTableDelete(rewardsArr, record)" title="确定删除吗">
              <a-button type="primary">删除</a-button>
            </Popconfirm>
          </template>
        </template>
      </Table>
    </CollapseContainer>
    <CollapseContainer>
      <template #title>
        <div class="font-bold text-20px mr-10px">专业技术（技能）资格</div>
        <a-button size="small" type="primary" @click="professionalOpen = true">新增</a-button>
      </template>
      <Table :dataSource="professionalArr" :columns="professionalColumns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <Popconfirm @confirm="useTableDelete(professionalArr, record)" title="确定删除吗">
              <a-button type="primary">删除</a-button>
            </Popconfirm>
          </template>
        </template>
      </Table>
    </CollapseContainer>
    <CollapseContainer>
      <template #title>
        <div class="font-bold text-20px mr-10px">年度考核情况</div>
      </template>
      <div class="text-18px">近三年年度考核情况 (年度考核情况所有次数加起来需要等于三) :</div>
      <BasicForm @register="annualRegister" class="m-16px" />
    </CollapseContainer>
    <div class="flex justify-center">
      <a-button type="primary" @click="submit" :loading="loading">提交</a-button>
    </div>
    <Modal centered title="学习培训履历新增" v-model:open="careerOpen" :footer="null">
      <div class="px-20px">
        <BasicForm @register="careerRegister" />
      </div>
    </Modal>
    <Modal centered title="工作经历新增" v-model:open="workOpen" :footer="null">
      <div class="px-20px">
        <BasicForm @register="workRegister" />
      </div>
    </Modal>
    <Modal centered title="借用、交流锻炼经历新增" v-model:open="borrowOpen" :footer="null">
      <div class="px-20px">
        <BasicForm @register="borrowRegister" />
      </div>
    </Modal>
    <Modal centered title="奖惩情况新增" v-model:open="rewardsOpen" :footer="null">
      <div class="px-20px">
        <BasicForm @register="rewardsRegister" />
      </div>
    </Modal>
    <Modal centered title="专业技术（技能）资格新增" v-model:open="professionalOpen" :footer="null">
      <div class="px-20px">
        <BasicForm @register="professionalRegister" />
      </div>
    </Modal>
    <Modal
      centered
      title="专业技术（技能）资格新增"
      v-model:open="annualOpen"
      @ok="annualOpen = false"
    >
      <div class="px-20px"> {{ modelText }} </div>
    </Modal>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { CollapseContainer } from '@/components/Container';
  import { BasicForm, useForm } from '@/components/Form';
  import { useRouter } from 'vue-router';
  import { setPersonMsgApi, getPersonMsgApi } from '@/api/sys/personMsg';
  import {
    schemas,
    careerSchemas,
    workSchemas,
    borrowSchemas,
    rewardsSchemas,
    professionalSchemas,
    annualSchemas,
    careerColumns,
    workColumns,
    borrowColumns,
    rewardsColumns,
    professionalColumns,
  } from './data';
  import { Modal, Table, Popconfirm } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { useDialog } from './useDialog';
  import { useDialogProfessional } from './useDialogProfessional';
  import { useTableDelete } from './useTableDelete';
  import { useUserStore } from '@/store/modules/user';

  defineOptions({ name: 'PersonMsgInfo' });

  const userStore = useUserStore();
  const router = useRouter();

  const userId = userStore.getUserInfo.userId;

  const careerArr = ref<any>([]);
  const workArr = ref<any>([]);
  const borrowArr = ref<any>([]);
  const rewardsArr = ref<any>([]);
  const professionalArr = ref<any>([]);

  const careerOpen = ref(false);
  const workOpen = ref(false);
  const borrowOpen = ref(false);
  const rewardsOpen = ref(false);
  const professionalOpen = ref(false);
  const annualOpen = ref(false);

  const loading = ref(false);

  const modelText = ref('');

  const personMsgRef = ref();
  const careerRef = ref();
  const workRef = ref();

  const personInfo = ref<any>({});

  onMounted(async () => {
    const res = await getPersonMsgApi({ userId });
    if (!res) {
      return;
    }
    const { personMsg, career, work, borrow, rewards, professional, annual } = res;
    msgSetFieldsValue(personMsg);
    careerArr.value = career;
    workArr.value = work;
    borrowArr.value = borrow;
    rewardsArr.value = rewards;
    professionalArr.value = professional;
    annualSetFieldsValue(annual);
  });

  const [personMsgRegister, { validate: personMsgValidate, setFieldsValue: msgSetFieldsValue }] =
    useForm({
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 15,
      },
      schemas: schemas,
      actionColOptions: {
        offset: 8,
        span: 23,
      },
      showResetButton: false,
      showSubmitButton: false,
    });

  const [careerRegister, { validate: careerValidate, resetFields: careerResetFields }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 15,
    },
    schemas: careerSchemas,
    actionColOptions: {
      offset: 8,
      span: 23,
    },
    submitButtonOptions: {
      text: '提交',
    },
    submitFunc: careerSubmit,
  });

  const [workRegister, { validate: workValidate, resetFields: workResetFields }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 15,
    },
    schemas: workSchemas,
    actionColOptions: {
      offset: 8,
      span: 23,
    },
    submitButtonOptions: {
      text: '提交',
    },
    submitFunc: workSubmit,
  });

  const [borrowRegister, { validate: borrowValidate, resetFields: borrowResetFields }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 15,
    },
    schemas: borrowSchemas,
    actionColOptions: {
      offset: 8,
      span: 23,
    },
    submitButtonOptions: {
      text: '提交',
    },
    submitFunc: borrowSubmit,
  });

  const [rewardsRegister, { validate: rewardsValidate, resetFields: rewardsResetFields }] = useForm(
    {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 15,
      },
      schemas: rewardsSchemas,
      actionColOptions: {
        offset: 8,
        span: 23,
      },
      submitButtonOptions: {
        text: '提交',
      },
      submitFunc: rewardsSubmit,
    },
  );

  const [annualRegister, { validate: annualResetFields, setFieldsValue: annualSetFieldsValue }] =
    useForm({
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 15,
      },
      schemas: annualSchemas,
      actionColOptions: {
        offset: 8,
        span: 23,
      },
      showResetButton: false,
      showSubmitButton: false,
    });

  const [
    professionalRegister,
    { validate: professionalValidate, resetFields: professionalFields },
  ] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 15,
    },
    schemas: professionalSchemas,
    actionColOptions: {
      offset: 8,
      span: 23,
    },
    submitButtonOptions: {
      text: '提交',
    },
    submitFunc: professionalSubmit,
  });

  async function careerSubmit() {
    useDialog(careerArr, careerValidate, careerOpen, careerResetFields);
  }

  async function workSubmit() {
    useDialog(workArr, workValidate, workOpen, workResetFields);
  }

  async function borrowSubmit() {
    useDialog(borrowArr, borrowValidate, borrowOpen, borrowResetFields);
  }

  async function rewardsSubmit() {
    useDialog(rewardsArr, rewardsValidate, rewardsOpen, rewardsResetFields);
  }

  async function professionalSubmit() {
    useDialogProfessional(
      professionalArr,
      professionalValidate,
      professionalOpen,
      professionalFields,
    );
  }

  async function submit() {
    loading.value = true;
    try {
      const personMsgValues = await personMsgValidate();
      personInfo.value.personMsg = personMsgValues;
    } catch (error) {
      personMsgRef.value.scrollIntoView({ behavior: 'smooth' });
      loading.value = false;
      console.error(error);
      return;
    }
    try {
      const annualValues = await annualResetFields();
      const annualTimes = Object.values(annualValues)
        .map(Number)
        .reduce((acc, cur) => acc + cur, 0);
      if (annualTimes !== 3) {
        modelText.value = '您好，年度考核情况所有次数加起来需要等于三。';
        annualOpen.value = true;
        loading.value = false;
        return;
      }
      personInfo.value.annual = annualValues;
    } catch (error) {
      loading.value = false;
      console.error(error);
      return;
    }
    // if (!workArr.value.length) {
    //   modelText.value = '请您填写工作经历';
    //   workRef.value.scrollIntoView({ behavior: 'smooth' });
    //   annualOpen.value = true;
    //   loading.value = false;
    //   return;
    // }
    personInfo.value.userId = userId;
    personInfo.value.career = careerArr.value;
    personInfo.value.work = workArr.value;
    personInfo.value.borrow = borrowArr.value;
    personInfo.value.rewards = rewardsArr.value;
    personInfo.value.professional = professionalArr.value;
    const { success } = await setPersonMsgApi(personInfo.value);
    if (success) {
      router.push({ name: 'evaluation' });
    }
    loading.value = false;
  }
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 24px;
    background-color: @component-background;
  }

  .xing {
    content: '*';
    display: inline-block;
    margin-inline-end: 4px;
    color: #ed6f6f;
    font-family: SimSun, sans-serif;
    font-size: 14px;
    line-height: 1;
  }
</style>
