<template>
  <Card class="w-full mt-2" :class="textSize">
    <div class="font-bold text-lg border-b-grey border-b-2"
      >搭配建议
      <span class="text-3 color-gray"
        >通过以下搭配建议可以管控受测者的劣势，有助于搭建合作互补的完美团队</span
      >
    </div>
    <div class="indent-4">
      {{ name }}
      的弱势在于
      <span :style="{ color: activeColor }">{{
        dapeijianyi[endThree[0]] + '、' + dapeijianyi[endThree[1]] + '、' + dapeijianyi[endThree[2]]
      }}</span>
      方面，如果TA的工作职责范围涉及到这些方面相关的内容，
      就需要和这些方面比较强的工作搭档进行优势互补，以便相应提高工作成效。
    </div>
  </Card>
</template>

<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { dapeijianyi } from '../data';

  defineProps({
    name: {
      type: String as PropType<any>,
      required: true,
    },
    endThree: {
      type: Array as PropType<any>,
      required: true,
    },
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const textSize = isMobile ? 'text-3' : 'text-5';
  const activeColor = '#28B8C5';
</script>
