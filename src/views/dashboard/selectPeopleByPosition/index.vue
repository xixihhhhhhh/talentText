<template>
  <PageWrapper>
    <BasicForm @register="register" @submit="handleSubmit" class="-enter-x mt-10" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';
  import { getEvaluteFormDataApi } from '@/api/sys/duty';
  import { getSchemas } from '../evaluation/components/evaluteFormData';

  const [register, { setProps }] = useForm({});

  onMounted(async () => {
    const { departmentObj, subDepartmentObj, departmentObjArr, subPosition } =
      await getEvaluteFormDataApi();
    const schemas = getSchemas(departmentObjArr, departmentObj, subDepartmentObj, subPosition);
    const schemasOption = {
      labelWidth: 120,
      schemas,
      actionColOptions: { span: 24, style: { textAlign: 'center' } },
      submitButtonOptions: { text: '以岗选人' },
    };
    setProps(schemasOption);
  });

  function handleSubmit() {}
</script>

<style scoped></style>
