<template>
  <PageWrapper :class="prefixCls">
    <result />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import result from './result.vue';

  const prefixCls = 'result';
</script>
