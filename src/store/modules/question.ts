import { defineStore } from 'pinia';
import type { EChartsOption } from 'echarts';

interface Question {
  leidatu: any;
  questionAns: Array<any>;
  competencyObj: any;
  careerAdvantagesObj: any;
  careerFieldObj: any;
}
function sort(obj) {
  const sortedScores = Object.entries(obj).sort(
    // @ts-ignore
    (a, b) => parseFloat(b[1]) - parseFloat(a[1]),
  );

  // @ts-ignore
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
  }),
  getters: {
    getLeidatu(state): EChartsOption {
      return state.leidatu || {};
    },
  },
  actions: {
    setLeidatu(leidatu: object) {
      this.leidatu = leidatu; // for null or undefined value
    },
    setQuestionAns(questionAns: Array<any>) {
      this.questionAns = questionAns; // for null or undefined value
    },
    setScores({ competencyObj, careerAdvantagesObj, careerFieldObj }) {
      this.competencyObj = sort(competencyObj);
      this.careerAdvantagesObj = sort(careerAdvantagesObj);
      this.careerFieldObj = careerFieldObj;
    },
  },
});
