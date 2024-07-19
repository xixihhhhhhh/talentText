import { defineStore } from 'pinia';
import type { EChartsOption } from 'echarts';

interface Question {
  leidatu: any;
  questionAns: Array<any>;
  competencyObj: any;
  careerAdvantagesObj: any;
  careerFieldObj: any;
  corrFunc: string;
}

function sort(obj: { [key: string]: string }): [string, string][] {
  const sortedScores = Object.entries(obj).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
  return sortedScores;
}
export const useQuestionStore = defineStore({
  id: 'question',
  state: (): Question => ({
    leidatu: {},
    questionAns: [],
    competencyObj: {},
    careerAdvantagesObj: {},
    careerFieldObj: {},
    corrFunc: '',
  }),
  getters: {
    getLeidatu(state): EChartsOption {
      return state.leidatu || {};
    },
  },
  actions: {
    setLeidatu(leidatu: object) {
      this.leidatu = leidatu;
    },
    setQuestionAns(questionAns: Array<any>) {
      this.questionAns = questionAns;
    },
    setScores({ competencyObj, careerAdvantagesObj, careerFieldObj }) {
      this.competencyObj = sort(competencyObj);
      this.careerAdvantagesObj = sort(careerAdvantagesObj);
      this.careerFieldObj = careerFieldObj;
    },
    setCorrFunc(corrFunc: string) {
      this.corrFunc = corrFunc;
    },
  },
});
