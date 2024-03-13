<template>
  <PageWrapper :class="prefixCls" title="结果分析">
    <div :class="`${prefixCls}__top`">
      <Row :gutter="12">
        <Col :span="12" :class="`${prefixCls}__top-col`">
          <div>我的得分</div>
          <p>8</p>
        </Col>
        <Col :span="12" :class="`${prefixCls}__top-col`">
          <div>最适合的岗位</div>
          <p>运输管理</p>
        </Col>
      </Row>
    </div>
    <div class="flex">
      <div class="lg:w-3/10 w-full enter-y mt-4 mr-10">
        <SaleRadar :loading="loading" class="enter-y" />
      </div>
      <div class="lg:w-6/10 w-full enter-y mt-4">
        <Card title="吐槽模块" :loading="loading">
          <a-textarea v-model:value="content" />
          <div class="text-right mt-4">
            <a-button type="primary" @click="onSubmit">提交</a-button>
          </div>
        </Card>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Row, Col, Card } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import SaleRadar from './components/SaleRadar.vue';
  import { addCommentApi } from '@/api/sys/comment';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';
  import { addCommentParams } from '@/api/sys/model/commentModel';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const prefixCls = 'result';
  const loading = ref(true);

  const router = useRouter();

  setTimeout(() => {
    loading.value = false;
  }, 1000);

  const { createMessage } = useMessage();
  const content = ref('');
  // @ts-ignore
  const data: addCommentParams = {};
  async function onSubmit() {
    console.log(content.value.length, 'resresres');
    if (content.value.length < 8) {
      createMessage.error({
        content: '请回答选择题',
        duration: 3,
      });
      return;
    }
    data.content = content.value;
    data.avatar = userinfo.value.avatar;
    data.name = userinfo.value.name;
    const { success } = await addCommentApi(data);
    if (success) {
      content.value = '';
      router.push('/dashboard/index');
    }
  }
</script>

<style lang="less" scoped>
  .result {
    &__top {
      padding: 24px;
      background-color: @component-background;
      text-align: center;

      &-col {
        &:not(:last-child) {
          border-right: 1px dashed @border-color-base;
        }

        div {
          margin-bottom: 12px;
          color: @text-color-base;
          font-size: 14px;
          line-height: 22px;
        }

        p {
          margin: 0;
          color: @text-color-base;
          font-size: 24px;
          line-height: 32px;
        }
      }
    }

    &__content {
      margin-top: 12px;
      padding: 24px;
      background-color: @component-background;

      .list {
        position: relative;
      }

      .icon {
        font-size: 40px !important;
      }

      .extra {
        position: absolute;
        top: 20px;
        right: 15px;
        color: @primary-color;
        font-weight: normal;
        cursor: pointer;
      }

      .description {
        display: inline-block;
        width: 40%;
      }

      .info {
        display: inline-block;
        width: 30%;
        text-align: center;

        div {
          display: inline-block;
          padding: 0 20px;

          span {
            display: block;
          }
        }
      }

      .progress {
        display: inline-block;
        width: 15%;
        vertical-align: top;
      }
    }
  }
</style>
