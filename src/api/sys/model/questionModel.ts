/**
 * @description: Questionnaire interface parameters
 */
export interface addQuestionnaireParams {
  positionType: string;
  questionNum: number;
  quesData: Array<any>;
}

/**
 * @description: 添加调查问卷返回值 interface return value
 */
export interface addQuestionnaireResultModel {
  success: boolean;
}

export interface getQuestionnaireResultModel {
  questionTypeOne: Array<object>;
  questionTypeTwo: Array<object>;
  questionTypeThree: Array<object>;
}

export interface getQuestionnaireParams {
  positionType: string;
}
