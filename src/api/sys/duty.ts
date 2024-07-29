import { defHttp } from '@/utils/http/axios';
import { addQuestionnaireResultModel } from './model/questionModel';

import { ErrorMessageMode } from '#/axios';

const baseUrl = '/duty';

enum Api {
  addDuty = baseUrl + '/addDuty',
  getAllDuty = baseUrl + '/getDuty',
  deleteDuty = baseUrl + '/deleteDuty',
  updateDuty = baseUrl + '/updateDuty',
  getAllDepartmentAndPosition = baseUrl + '/getAllDepartmentAndPosition',
}

export function addDutyApi(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<addQuestionnaireResultModel>(
    {
      url: Api.addDuty,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getDutyApi(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.getAllDuty,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deleteDutyApi(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.deleteDuty,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function upbateDutyApi(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.updateDuty,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getAllDepartmentAndPositionApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.getAllDepartmentAndPosition,
    },
    {
      errorMessageMode: mode,
    },
  );
}
