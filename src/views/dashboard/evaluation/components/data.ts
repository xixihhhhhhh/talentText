import { FormSchema, RenderCallbackParams } from '@/components/Form';
import { useQuestionStore } from '@/store/modules/question';
import { evaluteFormDataObject, evaluteFormDataSubDepartment } from './evaluteFormData';
import type { EChartsOption } from 'echarts';
import type { Answer, Question, OptionsData, Option } from './type';

const questionStore = useQuestionStore();

export function convertToOptionArray(data: OptionsData): Option[] {
  const keys = ['A', 'B', 'C', 'D', 'E'] as const;

  const res = keys.reduce((arr: Option[], key: (typeof keys)[number]) => {
    if (data[`ratio${key}`]) {
      arr.push({
        option: key + ': ' + data[`option${key}`]!,
        value: key + data[`ratio${key}`]!,
      });
    }
    return arr;
  }, []);
  return res;
}

const careerAdvantagesMap = {
  skill: ['flexible', 'theory', 'message'],
  hatched: ['policy', 'writing', 'holistic', 'risk'],
  invent: ['study', 'find', 'create'],
  operable: [
    'dedication',
    'operationalSkills',
    'confidentiality',
    'unimpressed',
    'norms',
    'law',
    'dataAnalysis',
    'logicalAnalysis',
  ],
  affairs: ['implementation', 'patience', 'hard', 'time'],
  controlled: ['plan', 'firm', 'safe', 'intimidate'],
  impact: ['leadingOthers', 'political', 'organizational'],
  communicative: ['coordination', 'rallying'],
  pioneer: ['aggressive', 'underPressure'],
  serve: ['serviceMinded', 'selfControl', 'approachable'],
  humanistic: ['teamwork', 'employPeople'],
};

const careerFieldMap = {
  research: ['skill', 'hatched', 'invent'],
  transaction: ['operable', 'affairs', 'controlled'],
  pioneering: ['impact', 'communicative', 'pioneer'],
  service: ['serve', 'humanistic'],
};

export function getScore(answerArr: Answer[]) {
  console.log('🚀 ~ getScore ~ answerArr:', answerArr);
  const competencyArr = answerArr.reduce((acc, obj) => {
    const key = obj.competency;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
  const competencyObj = {};
  for (const key in competencyArr) {
    const scores = competencyArr[key].map((item) => item.score);
    const averageScore = scores.reduce((acc, score) => acc + score, 0) / scores.length;
    competencyObj[key] = (averageScore * 20).toFixed(2);
  }
  const careerAdvantagesObj = {};
  for (const key in careerAdvantagesMap) {
    const advantages = careerAdvantagesMap[key];
    const scores = advantages.map((advantage) => Number(competencyObj[advantage]));
    const averageScore = scores.reduce((acc, score) => acc + score, 0) / scores.length;
    careerAdvantagesObj[key] = averageScore.toFixed(2);
  }
  const careerFieldObj = {};
  for (const key in careerFieldMap) {
    const careerField = careerFieldMap[key];
    const scores = careerField.map((advantage) => Number(careerAdvantagesObj[advantage]));
    const averageScore = scores.reduce((acc, score) => acc + score, 0) / scores.length;
    careerFieldObj[key] = averageScore.toFixed(2);
  }
  questionStore.setScores({ competencyObj, careerAdvantagesObj, careerFieldObj });
  const options: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    series: [
      {
        name: '职业优势',
        type: 'pie',
        radius: [0, '80%'],
        center: ['50%', '50%'],
        roseType: 'area',
        label: {
          position: 'inner',
          fontSize: 12,
        },
      },
      {
        name: '职业领域',
        type: 'pie',
        radius: ['80%', '100%'],
        labelLine: {
          length: 1,
        },
        label: {
          position: 'inner',
          fontSize: 14,
        },
      },
    ],
  };
  let echartsData = [
    {
      value: 30,
      name: '管控',
      itemStyle: { color: '#F4D7AE' },
      englishName: 'controlled',
    },
    { value: 28, name: '事务', itemStyle: { color: '#F4D7AE' }, englishName: 'affairs' },
    { value: 26, name: '操作', itemStyle: { color: '#F4D7AE' }, englishName: 'operable' },
    { value: 24, name: '技能', itemStyle: { color: '#9dc3eb' }, englishName: 'skill' },
    { value: 22, name: '规划', itemStyle: { color: '#9dc3eb' }, englishName: 'affairs' },
    { value: 20, name: '发明', itemStyle: { color: '#9dc3eb' }, englishName: 'invent' },
    {
      value: 18,
      name: '人文',
      itemStyle: { color: '#9be3d4' },
      englishName: 'humanistic',
    },
    { value: 16, name: '服务', itemStyle: { color: '#9be3d4' }, englishName: 'serve' },
    {
      value: 16,
      name: '交际',
      itemStyle: { color: '#f09ba2' },
      englishName: 'communicative',
    },
    { value: 16, name: '影响', itemStyle: { color: '#f09ba2' }, englishName: 'impact' },
    { value: 16, name: '开拓', itemStyle: { color: '#f09ba2' }, englishName: 'pioneer' },
  ];
  echartsData = echartsData.map((item: any) => {
    const { englishName } = item;
    const advantagesScore = careerAdvantagesObj[englishName];
    item.value = advantagesScore;
    delete item.englishName;
    return item;
  });
  let careerData = [
    { value: 1, name: '事务执行', englishName: 'transaction' },
    { value: 1, name: '研发策划', englishName: 'research' },
    { value: 1, name: '服务关系', englishName: 'service' },
    { value: 1, name: '开拓影响', englishName: 'pioneering' },
  ];
  careerData = careerData.map((item: any) => {
    const { englishName } = item;
    const advantagesScore = careerFieldObj[englishName];
    item.value = advantagesScore;
    delete item.englishName;
    return item;
  });

  // @ts-ignore
  options.series[0].data = echartsData;
  // @ts-ignore
  options.series[1].data = careerData;
  questionStore.setLeidatu(options);
}

export function convertToTwoDimensionalArray(arr, chunkSize: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    // @ts-ignore
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

export function handleFenHang(text) {
  if (!text) {
    return;
  }
  const index = text.indexOf('\\');
  if (index !== -1) {
    return text.substring(0, index);
  }
  return text;
}

export function extractAndConvertToLowercase(str) {
  // 使用正则表达式匹配大写字母后面的单词（包括数字）
  const match = str.match(/[A-Z][a-zA-Z0-9]+/);

  // 如果找到匹配的单词
  if (match) {
    // 将单词转换为小写
    const lowercaseWord = match[0].toLowerCase();
    return lowercaseWord;
  }
}

// 定义重复的数据结构
export const competencyData = {
  teamwork: {
    careerField: 'service',
    careerAdvantages: 'humanistic',
    competency: 'teamwork',
  },
  plan: {
    careerField: 'transaction',
    careerAdvantages: 'controlled',
    competency: 'plan',
  },
  norms: {
    careerField: 'transaction',
    careerAdvantages: 'operable',
    competency: 'norms',
  },
};

function splitString(str: string) {
  let result: string[] = [];
  const indexA = str.indexOf('A');
  const indexB = str.indexOf('B');

  if (indexA !== -1 && indexB !== -1) {
    result.push(str.substring(0, indexA));
    result.push('A' + str.substring(indexA + 1, indexB));
    result.push('B' + str.substring(indexB + 1));
  }

  result = result.filter((item) => Boolean(item));

  if (result.length === 3) {
    return { title: result[0], option: result.slice(1) };
  } else {
    return { title: '', option: result };
  }
}

export function questionTitleThree(item: Question) {
  return splitString(item.quesData.questionName);
}

export const schemas: FormSchema[] = [
  {
    field: 'department',
    component: 'Select',
    label: '您的部门是：',
    colProps: { span: 14 },
    componentProps: {
      options: [
        { value: '办公室（企业管理科）', label: '办公室（企业管理科）' },
        {
          value: '专卖监督管理办公室（专卖稽查支队）',
          label: '专卖监督管理办公室（专卖稽查支队）',
        },
        { value: '内管派驻办', label: '内管派驻办' },
        { value: '政策法规与体制改革科', label: '政策法规与体制改革科' },
        { value: '财务管理中心', label: '财务管理中心' },
        { value: '审计派驻办', label: '审计派驻办' },
        {
          value: '人事科（职工培训中心、督察考评中心）',
          label: '人事科（职工培训中心、督察考评中心）',
        },
        {
          value: '党建工作科（机关党委办公室、工会办公室）',
          label: '党建工作科（机关党委办公室、工会办公室）',
        },
        {
          value: '纪检监察科（与党组纪检组合署办公）',
          label: '纪检监察科（与党组纪检组合署办公）',
        },
        { value: '安全管理科', label: '安全管理科' },
        { value: '营销管理中心', label: '营销管理中心' },
        { value: '物流配送中心', label: '物流配送中心' },
        { value: '信息中心', label: '信息中心' },
        { value: '城区管理中心', label: '城区管理中心' },
        { value: '区局（分公司）', label: '区局（分公司）' },
      ],
    },
    rules: [{ required: true, type: 'string' }],
  },
];

Object.keys(evaluteFormDataSubDepartment).forEach((key: string) => {
  const schemaItem: FormSchema = {
    field: 'subDeaprtment' + '/' + key,
    component: 'Select',
    label: '您的细分部门是：',
    colProps: { span: 20 },
    componentProps: {
      options: evaluteFormDataSubDepartment[key],
    },
    rules: [{ required: true, type: 'string' }],
    show: (renderCallbackParams: RenderCallbackParams) => {
      // 更新第二个下拉框的选项
      if (renderCallbackParams.model.department === key) {
        return true;
      }
      return false;
    },
  };
  schemas.push(schemaItem);
});

Object.keys(evaluteFormDataObject).forEach((key: string) => {
  const schemaItem: FormSchema = {
    field: 'position' + '/' + key,
    component: 'Select',
    label: '您的岗位是：',
    colProps: { span: 14 },
    componentProps: {
      options: evaluteFormDataObject[key],
    },
    rules: [{ required: true, type: 'string' }],
    ifShow: (renderCallbackParams: RenderCallbackParams) => {
      // 更新第二个下拉框的选项
      if (renderCallbackParams.model.department === key) {
        return true;
      }
      return false;
    },
  };
  schemas.push(schemaItem);
});
