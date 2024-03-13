<template>
  <PageWrapper>
    <template #headerContent v-if="!isMobile">
      <WorkbenchHeader msg="填报调查问卷" />
    </template>
    <Collectquestion />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import Collectquestion from './components/Collectquestion.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
</script>
