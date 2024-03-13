<template>
  <Card title="最新动态" v-bind="$attrs">
    <template #extra>
      <a-button type="link" size="small">更多</a-button>
    </template>
    <List item-layout="horizontal" :data-source="dynamicInfoItems">
      <template #renderItem="{ item }">
        <ListItem>
          <ListItemMeta>
            <template #description>
              {{ item.date }}
            </template>
            <!-- eslint-disable-next-line -->
            <template #title>
              {{ item.name }} <span>{{ item.content }} </span>
            </template>
            <template #avatar>
              <!-- <Icon :icon="item.avatar" :size="30" /> -->
              <Avatar :src="item.avatar || headerImg" :size="50" />
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </Card>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Card, List, Avatar } from 'ant-design-vue';
  import { DynamicInfoItem } from './data';
  // import Icon from '@/components/Icon/Icon.vue';
  import { getCommentApi } from '@/api/sys/comment';
  import headerImg from '@/assets/images/header.jpg';

  const dynamicInfoItems = ref<DynamicInfoItem[]>([]);
  onMounted(async () => {
    const res = await getCommentApi();
    dynamicInfoItems.value = res;
  });
  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;
</script>
