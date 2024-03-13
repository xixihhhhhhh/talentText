import { defHttp } from '@/utils/http/axios';
import {
  addEvaluateListParams,
  addEvaluateListModel,
  getEvaluateListModel,
} from './model/evaluateListModel';
import { ErrorMessageMode } from '#/axios';

const baseUrl = '/evaluateList';

enum Api {
  addEvaluateList = baseUrl + '/add',
  getEvaluateList = baseUrl + '/get',
}

export function addEvaluateListApi(
  params: addEvaluateListParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<addEvaluateListModel>(
    {
      url: Api.addEvaluateList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getEvaluateListApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<getEvaluateListModel>(
    {
      url: Api.getEvaluateList,
    },
    {
      errorMessageMode: mode,
    },
  );
}
