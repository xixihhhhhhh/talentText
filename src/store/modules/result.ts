import { defineStore } from 'pinia';

interface Result {
  name: string;
  avatar: string;
  echartOptions: any;
  competencyObj: any;
  careerAdvantagesObj: any;
  careerFieldObj: any;
  corrFunc: string;
}

export const useResultStore = defineStore({
  id: 'result',
  state: (): Result => ({
    name: '',
    avatar: '',
    echartOptions: {},
    competencyObj: {},
    careerAdvantagesObj: {},
    careerFieldObj: {},
    corrFunc: '',
  }),
  actions: {
    setState(state: any) {
      const {
        name,
        avatar,
        echartOptions,
        competencyObj,
        careerAdvantagesObj,
        careerFieldObj,
        corrFunc,
      } = state;
      this.name = name;
      this.avatar = avatar;
      this.echartOptions = echartOptions;
      this.competencyObj = competencyObj;
      this.careerAdvantagesObj = careerAdvantagesObj;
      this.careerFieldObj = careerFieldObj;
      this.corrFunc = corrFunc;
    },
  },
});
