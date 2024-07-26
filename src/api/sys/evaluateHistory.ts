import { defHttp } from '@/utils/http/axios';
import { addEvaluateListModel } from './model/evaluateListModel';
import { ErrorMessageMode } from '#/axios';

const baseUrl = '/evaluateHistory';

enum Api {
  addEvaluateList = baseUrl + '/add',
  getAllEvaluateList = baseUrl + '/getAllEvaluateHistory',
}

export function addEvaluateListApi(params: any, mode: ErrorMessageMode = 'modal') {
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

export function getAllEvaluateListApi(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.getAllEvaluateList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getEvaluateListByIdApi(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.getAllEvaluateList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
