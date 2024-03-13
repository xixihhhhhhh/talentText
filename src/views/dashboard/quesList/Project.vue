<template>
  <List :class="prefixCls">
    <Row :gutter="16">
      <template v-for="(item, index) in projectList" :key="item.title">
        <Col :span="6">
          <ListItem>
            <Card :hoverable="true" :class="`${prefixCls}__card`">
              <img :src="imgs[index] || demoImg" />
              <div :class="`${prefixCls}__card-title`">
                {{ item.title }}
              </div>
              <div :class="`${prefixCls}__card-content`">
                {{ item.content }}
              </div>
            </Card>
          </ListItem>
        </Col>
      </template>
    </Row>
  </List>
</template>
<script lang="ts" setup>
  import { List, Card, Row, Col } from 'ant-design-vue';
  import demoImg from '@/assets/images/demo.png';
  import demoImg1 from '@/assets/images/1.jpg';
  import demoImg2 from '@/assets/images/2.jpg';
  import demoImg3 from '@/assets/images/3.jpg';
  import demoImg4 from '@/assets/images/4.jpg';
  import demoImg5 from '@/assets/images/5.jpg';
  import demoImg6 from '@/assets/images/6.jpg';
  import demoImg7 from '@/assets/images/7.jpg';
  import demoImg8 from '@/assets/images/8.jpg';
  import { projectList } from './data';

  const imgs = [demoImg1, demoImg2, demoImg3, demoImg4, demoImg5, demoImg6, demoImg7, demoImg8];

  const ListItem = List.Item;

  const prefixCls = 'account-center-project';
</script>
<style lang="less">
  .account-center-project {
    &__card {
      width: 100%;

      .ant-card-body {
        padding: 0 0 24px;
      }

      img {
        width: 100%;
        height: 130px;
      }

      &-title {
        margin: 5px 10px;
        color: rgb(0 0 0 / 85%);
        font-size: 16px;
        font-weight: 500;
      }

      &-content {
        margin: 5px 10px;
      }
    }
  }
</style>
