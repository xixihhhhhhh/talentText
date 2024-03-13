<template>
  <Card title="岗位" v-bind="$attrs">
    <template #extra>
      <a-button type="link" size="small" @click="routerGo('/questionaire/quesList')">更多</a-button>
    </template>

    <CardGrid
      v-for="item in groupItems"
      :key="item.title"
      class="!md:w-1/3 !w-full cursor-pointer"
      @click="routerGo('/questionaire/writequestionnaire')"
    >
      <span class="flex">
        <Icon :icon="item.icon" :color="item.color" size="30" />
        <span class="text-lg ml-4">{{ item.title }}</span>
      </span>
      <div class="flex mt-2 h-10 text-secondary">{{ item.desc }}</div>
      <div class="flex justify-between text-secondary">
        <span>{{ item.group }}</span>
        <span>{{ item.date }}</span>
      </div>
    </CardGrid>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, CardGrid } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { groupItems } from './data';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  function routerGo(route: string) {
    router.push(route);
  }
</script>
