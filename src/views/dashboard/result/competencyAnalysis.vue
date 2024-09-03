<template>
  <Card class="w-full mt-2">
    <div class="font-bold text-lg border-b-2">胜任力分析</div>
    <div v-if="isMobile">
      <div class="flex">
        <div class="flex-1 mr-4">
          <div class="title">优势明显的胜任力</div>
          <div v-for="(item, index) in obvious" :key="index" class="h-35">
            <div class="text-center mt-1">
              <span class="text-lg text-white font-bold bg-#28B8C5 px-2 border-rd-2">{{
                item.competency
              }}</span>
            </div>
            <div>{{ item.describe }}</div>
          </div>
        </div>
        <div class="flex-1">
          <div class="title-green">优势不明显的胜任力</div>
          <div v-for="(item, index) in notObvious" :key="index" class="h-35">
            <div class="text-center mt-1">
              <span class="text-lg text-white font-bold bg-#4874cb px-2 border-rd-2">{{
                item.competency
              }}</span>
            </div>
            <div>{{ item.describe }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="column">
        <div class="title font-bold">优势明显的胜任力</div>
        <div v-for="(item, index) in obvious" :key="index" class="h-27">
          <span class="text-20px text-white font-bold bg-#28B8C5 px-2 border-rd-2">{{
            item.competency
          }}</span>
          <div class="text-20px">{{ item.describe }}</div>
        </div>
      </div>
      <div class="column">
        <div class="title-green font-bold">优势不明显的胜任力</div>
        <div v-for="(item, index) in notObvious" :key="index" class="h-27">
          <span class="text-20px text-white font-bold bg-#4874cb px-2 border-rd-2">{{
            item.competency
          }}</span>
          <div class="text-20px">{{ item.describe }}</div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
  import { Card } from 'ant-design-vue';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  defineProps<{
    obvious: { competency: string; describe: string }[];
    notObvious: { competency: string; describe: string }[];
  }>();
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
    padding: 20px;
  }

  .column {
    width: 50%;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
  }

  .list {
    padding: 0;
    list-style: none;
  }

  .list li {
    margin-bottom: 10px;
    line-height: 1.5;
  }

  .list li::before {
    content: '• ';
    margin-right: 5px;
  }

  .hexagon {
    position: relative;
    width: 60px;
    height: 35px;
    margin: 10px auto;
    border-radius: 5px;
    background-color: #e0f2f7;
    color: #333;
    font-size: 18px;
    line-height: 35px;
    text-align: center;
  }

  .hexagon::before,
  .hexagon::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-right: 30px solid transparent;
    border-left: 30px solid transparent;
  }

  .hexagon::before {
    bottom: -17.5px;
    border-bottom: 17.5px solid #e0f2f7;
  }

  .hexagon::after {
    top: -17.5px;
    border-top: 17.5px solid #e0f2f7;
  }

  .title {
    margin-bottom: 10px;
    padding: 10px 20px;
    border-radius: 10px 10px 0 0;
    background-color: #28b8c5;
    color: #fff;
    font-size: 18px;
    text-align: center;
  }

  .title-green {
    margin-bottom: 10px;
    padding: 10px 20px;
    border-radius: 10px 10px 0 0;
    background-color: #4874cb;
    color: #fff;
    font-size: 18px;
    text-align: center;
  }
</style>
