<template>
  <PageWrapper :class="prefixCls">
    <Result />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import Result from './result.vue';

  const prefixCls = 'result';
</script>
