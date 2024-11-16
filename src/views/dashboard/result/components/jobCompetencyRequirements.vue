<template>
  <Card class="w-full mt-2" :class="textSize">
    <div class="font-bold text-lg border-b-2"
      >岗位胜任力需求
      <span class="text-3 color-gray"
        >提供所在岗位所需的关键胜任力，提升个人岗位上的表现和职业发展</span
      >
    </div>
    <div class="indent-4 font-bold my-10px">
      通过对 {{ name }}
      所在的岗位进行了胜任力分析，总结出岗位所需的前五项关键胜任力及TA的匹配度，分别为：
    </div>
    <postCompetencyRequirements :data-source="postDataSource" />
    <div class="indent-4 font-bold">
      通过了解这些关键胜任力，TA可以更清晰地认识到岗位对TA的要求，有针对性地提升自身的能力和表现进一步推动TA的职业发展。
    </div>
  </Card>
</template>

<script setup lang="ts">
  import { Card } from 'ant-design-vue';
  import postCompetencyRequirements from './postCompetencyRequirements.vue';

  defineProps({
    name: {
      type: String as PropType<any>,
      required: true,
    },
    postDataSource: {
      type: Array as PropType<any>,
      required: true,
    },
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const textSize = isMobile ? 'text-3' : 'text-5';
</script>
