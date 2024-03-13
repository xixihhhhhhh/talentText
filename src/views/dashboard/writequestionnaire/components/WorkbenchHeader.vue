<template>
  <div class="lg:flex">
    <Avatar :src="userinfo.avatar || headerImg" :size="72" class="!mx-auto !block" />
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">{{ str }}, {{ userinfo.name }}, 欢迎您{{ props.msg }}！</h1>
      <span class="text-secondary">
        今日{{ weather }}，平均气温{{ temperature }}℃, 风力等级{{ windPower }}
      </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4"> </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import headerImg from '@/assets/images/header.jpg';

  import { useGetANW, useWeather } from './data';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const str = useGetANW();
  // eslint-disable-next-line vue/require-prop-types
  const props = defineProps(['msg']);

  const { weather, temperature, windPower } = useWeather();
</script>
