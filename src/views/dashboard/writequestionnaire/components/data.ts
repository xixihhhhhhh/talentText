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

export const optionSchema: FormSchema[] = [
  {
    field: 'questionName',
    component: 'InputTextArea',
    label: '题目名称 :',
    colProps: { span: 14 },
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'optionA',
    component: 'Input',
    label: '选项A :',
    colProps: { span: 12 },
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'ratioA',
    component: 'Select',
    label: '选项A分值 :',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '1', value: 1, key: '1' },
        { label: '2', value: 2, key: '2' },
        { label: '3', value: 3, key: '3' },
        { label: '4', value: 4, key: '4' },
      ],
    },
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'optionB',
    component: 'Input',
    label: '选项B :',
    colProps: { span: 12 },
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'ratioB',
    component: 'Select',
    label: '选项B分值 :',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '1', value: 1, key: '1' },
        { label: '2', value: 2, key: '2' },
        { label: '3', value: 3, key: '3' },
        { label: '4', value: 4, key: '4' },
      ],
    },
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'optionC',
    component: 'Input',
    label: '选项C :',
    colProps: { span: 12 },
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'ratioC',
    component: 'Select',
    label: '选项C分值 :',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '1', value: 1, key: '1' },
        { label: '2', value: 2, key: '2' },
        { label: '3', value: 3, key: '3' },
        { label: '4', value: 4, key: '4' },
      ],
    },
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'optionD',
    component: 'Input',
    label: '选项D :',
    colProps: { span: 12 },
  },
  {
    field: 'ratioD',
    component: 'Select',
    label: '选项D分值 :',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '1', value: 1, key: '1' },
        { label: '2', value: 2, key: '2' },
        { label: '3', value: 3, key: '3' },
        { label: '4', value: 4, key: '4' },
      ],
    },
  },
  {
    field: 'optionE',
    component: 'Input',
    label: '选项E :',
    colProps: { span: 12 },
  },
  {
    field: 'ratioE',
    component: 'Select',
    label: '选项E分值 :',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '1', value: 1, key: '1' },
        { label: '2', value: 2, key: '2' },
        { label: '3', value: 3, key: '3' },
        { label: '4', value: 4, key: '4' },
      ],
    },
  },
  {
    field: 'optionF',
    component: 'Input',
    label: '选项F :',
    colProps: { span: 12 },
  },
  {
    field: 'ratioF',
    component: 'Select',
    label: '选项F分值 :',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '1', value: 1, key: '1' },
        { label: '2', value: 2, key: '2' },
        { label: '3', value: 3, key: '3' },
        { label: '4', value: 4, key: '4' },
      ],
    },
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'positionType',
    component: 'Select',
    label: '岗位类型 :',
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: '烟草', value: 'tobacco', key: 'tobacco' },
        { label: '电子', value: 'electron', key: 'electron' },
      ],
    },
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'questionNum',
    component: 'InputNumber',
    label: '题目数量 :',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入题目数量',
    },
    rules: [{ required: true, type: 'number' }],
  },
];

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
        console.log(city, 'city');
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
