import { FormSchema } from '@/components/Form';
import { useQuestionStore } from '@/store/modules/question';
import type { EChartsOption } from 'echarts';

const questionStore = useQuestionStore();

export const schemas: FormSchema[] = [];

export interface Option {
  option: string;
  value: string;
}

export interface questions {
  careerField: string;
  careerAdvantages: string;
  competency: string;
  quesData: object;
}

export interface answer {
  careerField: string;
  careerAdvantages: string;
  competency: string;
  score: number;
  value: string;
}

export interface question {
  careerField: string;
  careerAdvantages: string;
  competency: string;
  score: number;
  value: string;
}

export interface OptionsData {
  ratioA?: number;
  ratioB?: number;
  ratioC?: number;
  ratioD?: number;
  ratioE?: number;

  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface competencyObj {
  aggressive: string;
  approachable: string;
  confidentiality: string;
  coordination: string;
  create: string;
  dataAnalysis: string;
  dedication: string;
  employPeople: string;
  find: string;
  firm: string;
  flexible: string;
  hard: string;
  holistic: string;
  implementation: string;
  intimidate: string;
  law: string;
  leadingOthers: string;
  logicalAnalysis: string;
  message: string;
  norms: string;
  organizational: string;
  patience: string;
  plan: string;
  policy: string;
  political: string;
  rallying: string;
  risk: string;
  safe: string;
  selfControl: string;
  serviceMinded: string;
  study: string;
  teamwork: string;
  time: string;
  underPressure: string;
  unimpressed: string;
  writing: string;
}

export function convertToOptionArray(data: OptionsData): Option[] {
  const keys = ['A', 'B', 'C', 'D', 'E'] as const;

  return keys.reduce((arr: Option[], key: (typeof keys)[number]) => {
    if (data[`ratio${key}`]) {
      arr.push({
        option: key + ': ' + data[`option${key}`]!,
        value: key + data[`ratio${key}`]!,
      });
    }
    return arr;
  }, []);
}

export function splitString(str) {
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

const careerAdvantagesMap = {
  skill: ['flexible', 'message'],
  hatched: ['policy', 'writing', 'holistic', 'risk'],
  invent: ['study', 'find', 'create'],
  operable: [
    'dedication',
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

export function getScore(answerArr: answer[]) {
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

export function convertToTwoDimensionalArray(arr, chunkSize) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    // @ts-ignore
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}
