import { FormSchema } from '@/components/Form';
import { ref } from 'vue';

import axios from 'axios';

const str = ref('');
export function useGetANW() {
  const now = new Date();
  const hours = now.getHours();
  if (0 <= hours && hours <= 11) {
    str.value = '早安';
  } else if (11 <= hours && hours <= 17) {
    str.value = '午安';
  } else {
    str.value = '晚安';
  }
  return str;
}

setInterval(useGetANW, 1000);

export function useWeather() {
  const weather = ref('多云');
  const temperature = ref('20');
  const windPower = ref('<3');
  // 获取用户地理位置坐标
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude + 2;
    const longitude = position.coords.longitude + 2;
    // 发起逆地理编码请求
    axios
      .get('https://restapi.amap.com/v3/geocode/regeo', {
        params: {
          // location: '115.77, 23.93',
          location: longitude + ',' + latitude,
          key: 'a998cf1df674d169b2f64df005d330fe',
          radius: 10000,
          extensions: 'all',
        },
      })
      .then((response) => {
        // 从逆地理编码结果中获取城市信息
        const city = response.data.regeocode.addressComponent.adcode;
        if (Array.isArray(city)) {
          return;
        }
        // 发起 GET 请求
        axios
          .get('https://restapi.amap.com/v3/weather/weatherInfo', {
            params: {
              key: 'a998cf1df674d169b2f64df005d330fe',
              city,
            },
          })
          .then((response) => {
            // 请求成功，处理返回的天气信息
            const city = response.data.lives[0];
            weather.value = city.weather;
            temperature.value = city.temperature;
            windPower.value = city.windpower;
          })
          .catch((error) => {
            // 请求失败，处理错误
            console.error('获取天气信息失败:', error);
          });
      })
      .catch((error) => {
        console.error('获取用户所在城市失败:', error);
      });
  });
  return { weather, temperature, windPower };
}

const fenshu = [
  { label: '1', value: 1, key: '1' },
  { label: '2', value: 2, key: '2' },
  { label: '3', value: 3, key: '3' },
  { label: '4', value: 4, key: '4' },
  { label: '5', value: 5, key: '5' },
];

export const optionSchema: FormSchema[] = [
  {
    field: 'questionType',
    component: 'Select',
    label: '题目类型',
    colProps: { span: 12 },
    componentProps: {
      options: [
        { label: '类型一', value: 'typeOne', key: 'typeOne' },
        { label: '类型二', value: 'typeTwo', key: 'typeTwo' },
        { label: '类型三', value: 'typeThree', key: 'typeThree' },
      ],
    },
    defaultValue: 'typeThree',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'questionName',
    component: 'InputTextArea',
    label: '题目名称 :',
    colProps: { span: 18 },
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'optionA',
    component: 'Input',
    label: '选项A :',
    colProps: { span: 12 },
    defaultValue: 'A+',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'ratioA',
    component: 'Select',
    label: '选项A分值 :',
    colProps: { span: 6 },
    componentProps: {
      options: fenshu,
    },
    defaultValue: 1,
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'optionB',
    component: 'Input',
    label: '选项B :',
    colProps: { span: 12 },
    defaultValue: 'A',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'ratioB',
    component: 'Select',
    label: '选项B分值 :',
    colProps: { span: 6 },
    componentProps: {
      options: fenshu,
    },
    defaultValue: 2,
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'optionC',
    component: 'Input',
    label: '选项C :',
    colProps: { span: 12 },
    defaultValue: '中立',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'ratioC',
    component: 'Select',
    label: '选项C分值 :',
    colProps: { span: 6 },
    componentProps: {
      options: fenshu,
    },
    defaultValue: 3,
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'optionD',
    component: 'Input',
    label: '选项D :',
    colProps: { span: 12 },
    defaultValue: 'B',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'ratioD',
    component: 'Select',
    label: '选项D分值 :',
    colProps: { span: 6 },
    componentProps: {
      options: fenshu,
    },
    defaultValue: 4,
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'optionE',
    component: 'Input',
    label: '选项E :',
    defaultValue: 'B+',
    colProps: { span: 12 },
  },
  {
    field: 'ratioE',
    component: 'Select',
    label: '选项E分值 :',
    colProps: { span: 6 },
    defaultValue: 5,
    componentProps: {
      options: fenshu,
    },
  },
  {
    field: 'isRepeat',
    component: 'Select',
    label: '是否重复',
    colProps: { span: 12 },
    componentProps: {
      options: [
        { label: '是', value: 'yes', key: 'yes' },
        { label: '否', value: 'no', key: 'no' },
      ],
    },
  },
  {
    field: 'repeatField',
    component: 'Input',
    label: '重复字段',
    colProps: { span: 6 },
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'positionType',
    component: 'Cascader',
    label: '岗位类型',
    colProps: { span: 12 },
    componentProps: {
      options: [
        {
          value: 'research',
          label: '研发策划',
          children: [
            {
              value: 'skill',
              label: '技术型',
              children: [
                {
                  value: 'flexible',
                  label: '灵活应变',
                },
                {
                  value: 'theory',
                  label: '理论知识',
                },
                {
                  value: 'message',
                  label: '信息管理',
                },
              ],
            },
            {
              value: 'hatched',
              label: '规划型',
              children: [
                {
                  value: 'policy',
                  label: '政策解读',
                },
                {
                  value: 'writing',
                  label: '书面表达',
                },
                {
                  value: 'holistic',
                  label: '全局观念',
                },
                {
                  value: 'risk',
                  label: '风险意识',
                },
              ],
            },
            {
              value: 'invent',
              label: '发明型',
              children: [
                {
                  value: 'study',
                  label: '主动学习',
                },
                {
                  value: 'find',
                  label: '洞察发现',
                },
                {
                  value: 'create',
                  label: '创新创造',
                },
              ],
            },
          ],
        },
        {
          value: 'transaction',
          label: '事务执行',
          children: [
            {
              value: 'operable',
              label: '操作型',
              children: [
                {
                  value: 'dedication',
                  label: '敬业尽责',
                },
                {
                  value: 'operationalSkills',
                  label: '操作技能',
                },
                {
                  value: 'confidentiality',
                  label: '保密意识',
                },
                {
                  value: 'unimpressed',
                  label: '独立自主',
                },
                {
                  value: 'norms',
                  label: '遵守规范',
                },
                {
                  value: 'law',
                  label: '法律法规',
                },
                {
                  value: 'dataAnalysis',
                  label: '数据分析',
                },
                {
                  value: 'logicalAnalysis',
                  label: '逻辑分析',
                },
              ],
            },
            {
              value: 'affairs',
              label: '事务型',
              children: [
                {
                  value: 'implementation',
                  label: '执行落实',
                },
                {
                  value: 'patience',
                  label: '严谨耐心',
                },
                {
                  value: 'hard',
                  label: '吃苦耐劳',
                },
                {
                  value: 'time',
                  label: '时间管理',
                },
              ],
            },
            {
              value: 'controlled',
              label: '管控型',
              children: [
                {
                  value: 'plan',
                  label: '统筹规划',
                },
                {
                  value: 'firm',
                  label: '立场坚定',
                },
                {
                  value: 'safe',
                  label: '安全意识',
                },
                {
                  value: 'intimidate',
                  label: '威慑他人',
                },
              ],
            },
          ],
        },
        {
          value: 'pioneering',
          label: '开拓影响',
          children: [
            {
              value: 'impact',
              label: '影响型',
              children: [
                {
                  value: 'leadingOthers',
                  label: '领导他人',
                },
                {
                  value: 'political',
                  label: '政治素养',
                },
                {
                  value: 'organizational',
                  label: '组织认同',
                },
              ],
            },
            {
              value: 'communicative',
              label: '交际型',
              children: [
                {
                  value: 'coordination',
                  label: '沟通协调',
                },
                {
                  value: 'rallying',
                  label: '凝聚他人',
                },
              ],
            },
            {
              value: 'pioneer',
              label: '开拓型',
              children: [
                {
                  value: 'aggressive',
                  label: '积极进取',
                },
                {
                  value: 'underPressure',
                  label: '抗压能力',
                },
              ],
            },
          ],
        },
        {
          value: 'service',
          label: '服务关系',
          children: [
            {
              value: 'serve',
              label: '服务型',
              children: [
                {
                  value: 'serviceMinded',
                  label: '服务意识',
                },
                {
                  value: 'selfControl',
                  label: '情绪自控',
                },
                {
                  value: 'approachable',
                  label: '平易近人',
                },
              ],
            },
            {
              value: 'humanistic',
              label: '人文型',
              children: [
                {
                  value: 'teamwork',
                  label: '团队协作',
                },
                {
                  value: 'employPeople',
                  label: '识人用人',
                },
              ],
            },
          ],
        },
      ],
    },
    rules: [{ required: true, type: 'array' }],
  },
];
