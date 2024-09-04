<template>
  <Card class="w-full mt-2" :class="textSize">
    <div class="font-bold text-lg border-b-grey border-b-2"
      >职业推荐
      <span class="text-3 color-gray"
        >只为辅助您理解优势职业方向，并非作为判定胜任岗位与否的唯一标准</span
      >
    </div>
    <div class="w-full border-t-#67759d border-t-2">
      <div class="flex border-b-#e6e6e6 border-b-2 items-center">
        <div class="w-40% bg-#f7f7f7 border-r-#e6e6e6 border-r-2 flex-shrink-0">
          <div class="flex flex-col py-3 px-1">
            <div
              class="chat-bubble relative px-2 rounded-md flex justify-center items-center color-white"
              :style="{ backgroundColor: activeColor }"
              >优势明显</div
            >
            <div class="text-center">的职业方向</div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="font-bold whitespace-nowrap">{{ gongzuofangmian[topTwo[0]] }}方面</div>
          <div class="indent-2">例如:{{ gongzuogangwei[topTwo[0]][corrFunc] }}等</div>
          <div class="font-bold whitespace-nowrap">{{ gongzuofangmian[topTwo[1]] }}方面</div>
          <div class="indent-2">例如:{{ gongzuogangwei[topTwo[1]][corrFunc] }}等</div>
        </div>
      </div>
    </div>
    <div class="w-full border-t-#67759d border-t-2">
      <div class="flex border-b-#e6e6e6 border-b-2 items-center">
        <div class="w-40% bg-#f7f7f7 border-r-#e6e6e6 border-r-2 flex-shrink-0">
          <div class="flex flex-col py-3 px-1">
            <div
              class="chat-bubble relative px-2 bg-gray rounded-md flex justify-center items-center color-white"
            >
              优势不明显
            </div>
            <div class="text-center">的职业方向</div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="font-bold whitespace-nowrap">{{ gongzuofangmian[endTwo[0]] }}方面</div>
          <div class="indent-2">例如:{{ gongzuogangwei[endTwo[1]][corrFunc] }}等</div>
          <div class="font-bold whitespace-nowrap">{{ gongzuofangmian[endTwo[1]] }}方面</div>
          <div class="indent-2">例如:{{ gongzuogangwei[endTwo[1]][corrFunc] }}等</div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { gongzuofangmian, gongzuogangwei } from '../data';

  defineProps({
    topTwo: {
      type: Array as PropType<any>,
      required: true,
    },
    endTwo: {
      type: Array as PropType<any>,
      required: true,
    },
    corrFunc: {
      type: String as PropType<any>,
      required: true,
    },
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const textSize = isMobile ? 'text-3' : 'text-5';
  const activeColor = '#28B8C5';
</script>
