<template>
  <Card title="六维结果雷达图" :loading="loading" class="w-full">
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      class="circle"
      :class="circleClass"
    >
      <circle cx="200" cy="200" r="150" stroke="#658EC6" stroke-width="15" />
      <circle cx="200" cy="200" r="170" stroke="#658EC6" stroke-width="15" />
      <path :d="jiaoji" fill="#F299A3" />
      <path :d="yingxiang" fill="#F299A3" />
      <path :d="kaituo" fill="#F299A3" />
      <path :d="guankong" fill="#F4D7AF" />
      <path :d="shiwu" fill="#F4D7AF" />
      <path :d="caozuo" fill="#F4D7AF" />
      <path :d="jineng" fill="#9CC2E9" />
      <path :d="guihua" fill="#9CC2E9" />
      <path :d="faming" fill="#9CC2E9" />
      <path :d="renwen" fill="#A3E1DC" />
      <path :d="fuwu" fill="#A3E1DC" />

      <circle cx="200" cy="200" r="100" fill="none" stroke="#658EC6" stroke-width="1" />

      <circle cx="200" cy="200" r="80" fill="none" stroke="#658EC6" stroke-width="1" />

      <circle cx="200" cy="200" r="60" fill="none" stroke="#658EC6" stroke-width="1" />

      <circle cx="200" cy="200" r="40" fill="none" stroke="#658EC6" stroke-width="1" />

      <circle cx="200" cy="200" r="20" fill="none" stroke="#658EC6" stroke-width="1" />

      <line x1="200" y1="345" x2="200" y2="55" />
      <line x1="55" y1="200" x2="345" y2="200" />
      <line x1="112" y1="134" x2="288" y2="266" />
      <line x1="150" y1="100" x2="250" y2="300" />
      <line x1="200" y1="200" x2="250" y2="100" />
      <line x1="200" y1="200" x2="300" y2="141" />
      <line x1="200" y1="200" x2="125" y2="275" />

      <path
        id="circlePath0"
        d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0"
        fill="none"
        stroke-width="10"
        stroke="#658EC6"
      />
      <text fill="white" class="text-18">
        <textPath href="#circlePath0" startOffset="25%">开拓影响</textPath>
      </text>

      <text fill="white" class="text-18">
        <textPath href="#circlePath0" startOffset="75%">事务执行</textPath>
      </text>

      <path
        id="circlePath1"
        d="M 200, 200 m -160, 0 a 160,160 0 1,0 320,0"
        fill="none"
        stroke-width="10"
        stroke="#658EC6"
      />
      <text fill="white" class="text-18">
        <textPath href="#circlePath1" startOffset="25%">研发策划</textPath>
      </text>

      <text fill="white" class="text-18">
        <textPath href="#circlePath1" startOffset="75%">服务关系</textPath>
      </text>

      <path
        id="circlePath2"
        d="M 200, 200 m -120, 0 a 120,120 0 1,1 240,0"
        fill="none"
        stroke-width="20"
      />

      <text>
        <textPath href="#circlePath2" startOffset="10%">交际</textPath>
      </text>
      <text>
        <textPath href="#circlePath2" startOffset="27.5%">影响</textPath>
      </text>
      <text>
        <textPath href="#circlePath2" startOffset="42.5%">开拓</textPath>
      </text>
      <text>
        <textPath href="#circlePath2" startOffset="57.5%">管控</textPath>
      </text>
      <text>
        <textPath href="#circlePath2" startOffset="75%">事务</textPath>
      </text>
      <text>
        <textPath href="#circlePath2" startOffset="92.5%">操作</textPath>
      </text>

      <path id="circlePath3" d="M 200, 200 m -120, 0 a 120,120 0 1,0 240,0" fill="none" />
      <text>
        <textPath href="#circlePath3" startOffset="12.5%">服务</textPath>
      </text>
      <text>
        <textPath href="#circlePath3" startOffset="37.5%">人文</textPath>
      </text>
      <text>
        <textPath href="#circlePath3" startOffset="57.5%">发明</textPath>
      </text>
      <text>
        <textPath href="#circlePath3" startOffset="72.5%">规划</textPath>
      </text>
      <text>
        <textPath href="#circlePath3" startOffset="90%">技能</textPath>
      </text>
    </svg>
  </Card>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { Card } from 'ant-design-vue';

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const circleClass = !isMobile ? 'circlePc' : 'circleYidong';
  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '400px',
    },
    options: {
      type: Object,
    },
  });
  const option = ref({});
  const jiaoji = ref('');
  const yingxiang = ref('');
  const kaituo = ref('');
  const guankong = ref('');
  const shiwu = ref('');
  const caozuo = ref('');
  const jineng = ref('');
  const guihua = ref('');
  const faming = ref('');
  const renwen = ref('');
  const fuwu = ref('');
  onMounted(() => {
    option.value = convertArrayToObject(props.options);
    console.log(option.value, 'option.value');
    jiaoji.value = generatePath(option.value['交际'], 0, 1);
    yingxiang.value = generatePath(option.value['影响'], 1, 2);
    kaituo.value = generatePath(option.value['开拓'], 2, 3);
    guankong.value = generatePath(option.value['管控'], 3, 4);
    shiwu.value = generatePath(option.value['事务'], 4, 5);
    caozuo.value = generatePath(option.value['操作'], 5, 6);
    jineng.value = generatePath(option.value['技能'], 6, 7);
    guihua.value = generatePath(option.value['规划'], 7, 8);
    faming.value = generatePath(option.value['发明'], 8, 9);
    renwen.value = generatePath(option.value['人文'], 9, 10);
    fuwu.value = generatePath(option.value['服务'], 10, 0);
  });
  // 线性插值函数
  function linearInterpolation(point2, percentage) {
    const point1 = [200, 200];
    percentage = percentage / 100;
    const x = point1[0] + (point2[0] - point1[0]) * percentage;
    const y = point1[1] + (point2[1] - point1[1]) * percentage;
    return [x, y];
  }
  // 生成路径函数
  function generatePath(value, a, b) {
    return `M200,200 L${linearInterpolation(points[a], value)[0]},${
      linearInterpolation(points[a], value)[1]
    } A${value},${value} 0 0,1 ${linearInterpolation(points[b], value)[0]},
  ${linearInterpolation(points[b], value)[1]} Z`;
  }
  const points = [
    [100, 200],
    [120, 140],
    [155, 110],
    [200, 100],
    [245, 110],
    [285, 150],
    [300, 200],
    [280, 260],
    [245, 290],
    [200, 300],
    [130, 270],
  ];

  function convertArrayToObject(dataArray) {
    const resultObject = {};
    dataArray.forEach((item) => {
      resultObject[item.name] = item.value;
    });
    return resultObject;
  }
</script>

<style>
  .circleYidong {
    width: 100%;
    height: 100%;
    transform: scale(1.3);
  }

  .circlePc {
    width: 400px;
    height: 400px;
  }

  .circle text {
    text-anchor: middle;
  }

  .circle circle {
    fill: none;
  }

  .circle line {
    stroke-width: 1;
    stroke: #aaa;
  }

  .text-18 {
    font-size: 18px;
  }
</style>
