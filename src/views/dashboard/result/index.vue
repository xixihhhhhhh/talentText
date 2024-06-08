<template>
  <PageWrapper :class="prefixCls">
    <phoneResult v-if="isMobile" />
    <pcResult v-else />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import pcResult from './pcResult.vue';
  import phoneResult from './phoneResult.vue';

  const prefixCls = 'result';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
</script>
