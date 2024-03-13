<template>
  <PageWrapper>
    <template #headerContent v-if="!isMobile"> <WorkbenchHeader msg="进行评价测试" /> </template>
    <Answerquestion />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import WorkbenchHeader from '../writequestionnaire/components/WorkbenchHeader.vue';
  import Answerquestion from './components/Answerquestion.vue';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
</script>
