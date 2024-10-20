<template>
  <div>
    <div class="font-bold text-center text-30px mt-20px">找回密码</div>
    <div class="p-20px bg-#fff mt-20px mx-40px">
      <BasicForm @register="registerForm" />
      <div class="flex justify-center">
        <a-button type="primary" class="mr-40px" @click="updatePassword">确定</a-button>
        <a-button @click="resetFields">重置</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { schemas } from './data';
  import { updatePasswordApi } from '@/api/sys/user';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const [registerForm, { validate, resetFields }] = useForm({
    showActionButtonGroup: false,
    schemas,
  });

  async function updatePassword() {
    const form = await validate();
    await updatePasswordApi(form);
    createMessage.success('修改密码成功！');
  }
</script>

<style lang="less" scoped></style>
