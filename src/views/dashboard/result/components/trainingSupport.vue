<template>
  <Card class="w-full mt-2" :class="textSize">
    <div class="font-bold text-lg border-b-grey border-b-2"
      >培训支持
      <span class="text-3 color-gray">建立能力培养课程地图，帮助制定个性化的职业提升计划 </span>
    </div>
    <div>
      通过将<Avatar :src="avatar" /> {{ name }}的测评结果与TA所在岗位胜任力需求进行对比分析，
      得出TA与现有岗位差距相对较大的六项胜任力，并针对性给出推荐课程或学习网站，如下所示：
    </div>
    <div class="flex h-40px bg-#eee">
      <div class="w-15% flex justify-center font-bold text-20px">胜任力</div>
      <div class="flex-1 flex justify-center font-bold text-20px">推荐课程/学习网站 </div>
    </div>
    <div
      class="flex py-10px border-b-1px border-b-#f0f0f0 items-center"
      v-for="item in dataSource"
      :key="item.competency"
    >
      <div class="text-#28B8C5 text-20px flex justify-center w-15% text-20px">{{
        item.competency
      }}</div>
      <div class="flex-1 text-20px">{{ item.definition }}</div>
    </div>
  </Card>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Card } from 'ant-design-vue';
  import { matchingDegreeMap, sortArray, competencyMap } from './data';
  import { advantageMap } from '../data';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const textSize = isMobile ? 'text-3' : 'text-5';

  const props = defineProps<{
    competencyObj: any;
    corrFunc: string;
    name: string;
    avatar: string;
  }>();

  const dataSource = ref<{ competency: string; definition: string }[]>([]);

  onMounted(() => {
    const scores = matchingDegreeMap[props.corrFunc];
    let sortCompetencyArr = sortArray(props.competencyObj);
    sortCompetencyArr = sortCompetencyArr.map((item, index) => {
      item[1] = Math.abs(parseFloat(item[1]) / 20 - scores[index]);
      return item;
    });
    sortCompetencyArr = sortCompetencyArr.sort((a: any, b: any) => b[1] - a[1]);
    const resultCompetencyArr = sortCompetencyArr.slice(0, 6);
    const chineseCompetencyArr = resultCompetencyArr.map((item1) => {
      return advantageMap[item1[0]][0];
    });
    for (let i = 0; i < 6; i++) {
      dataSource.value[i] = {
        competency: chineseCompetencyArr[i],
        definition: competencyMap[chineseCompetencyArr[i]],
      };
    }
  });
</script>
