import { defHttp } from '@/utils/http/axios';
import {
  addQuestionnaireParams,
  addQuestionnaireResultModel,
  getQuestionnaireResultModel,
} from './model/questionModel';

import { ErrorMessageMode } from '#/axios';

const baseUrl = '/question';

enum Api {
  addQuestionnaire = baseUrl + '/add',
  getQuestionnaire = baseUrl + '/get',
}

export function addQuesApi(params: addQuestionnaireParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<addQuestionnaireResultModel>(
    {
      url: Api.addQuestionnaire,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getQuesApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<getQuestionnaireResultModel>(
    {
      url: Api.getQuestionnaire,
    },
    {
      errorMessageMode: mode,
    },
  );
}
