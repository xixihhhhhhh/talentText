import { defHttp } from '@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  getUsersNumberModel,
} from './model/userModel';

import { ErrorMessageMode } from '#/axios';

const baseUrl = '/user';
enum Api {
  Register = baseUrl + '/register',
  Login = baseUrl + '/login',
  ResetPassword = baseUrl + '/resetPassword',
  Logout = baseUrl + '/logout',
  GetUserInfo = baseUrl + '/getUserInfo',
  GetUserInfoById = baseUrl + '/getUserInfoById',
  RelaxAssessment = baseUrl + '/relaxAssessment',
  GetSecondWenjuan = baseUrl + '/getSecondWenjuan',
  ContinueAnswer = baseUrl + '/continueAnswer',
  ClearSecondWenjuan = baseUrl + '/clearSecondWenjuan',
  getIsProfileCompleted = baseUrl + '/getIsProfileCompleted',
  GetUserNumber = baseUrl + '/getAllUsers',
  getCanText = baseUrl + '/getCanText',
  setCanText = baseUrl + '/setCanText',
  getAnswer = baseUrl + '/getSecurityQuestions',
  setSecurityQuestions = baseUrl + '/setSecurityQuestions',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  updatePassword = baseUrl + '/updatePassword',
}

export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function registerApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Register,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function resetPasswordApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.ResetPassword,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getUserInfoById(params: any) {
  return defHttp.post<GetUserInfoModel>(
    { url: Api.GetUserInfoById, params },
    { errorMessageMode: 'none' },
  );
}

export function setRelaxAssessment(params: any) {
  return defHttp.post({ url: Api.RelaxAssessment, params }, { errorMessageMode: 'none' });
}

export function getSecondWenjuan(params: any) {
  return defHttp.post({ url: Api.GetSecondWenjuan, params }, { errorMessageMode: 'none' });
}

export function clearSecondWenjuan(params: any) {
  return defHttp.post({ url: Api.ClearSecondWenjuan, params }, { errorMessageMode: 'none' });
}

export function continueAnswer(params: any) {
  return defHttp.post({ url: Api.ContinueAnswer, params }, { errorMessageMode: 'none' });
}

export function getUsersNumber() {
  return defHttp.post<getUsersNumberModel>(
    { url: Api.GetUserNumber },
    { errorMessageMode: 'none' },
  );
}

export function getSecurityQuestionsApi(params: any) {
  return defHttp.post<any>({ url: Api.getAnswer, params }, { errorMessageMode: 'none' });
}

export function setSecurityQuestionsApi(params: any) {
  return defHttp.post<any>({ url: Api.setSecurityQuestions, params }, { errorMessageMode: 'none' });
}

export function getCanTextApi(params: any) {
  return defHttp.post<any>({ url: Api.getCanText, params }, { errorMessageMode: 'none' });
}

export function setCanTextApi(params: any) {
  return defHttp.post<any>({ url: Api.setCanText, params }, { errorMessageMode: 'none' });
}

export function getIsProfileCompletedApi(params: any) {
  return defHttp.post<any>(
    { url: Api.getIsProfileCompleted, params },
    { errorMessageMode: 'none' },
  );
}
export function updatePasswordApi(params: any) {
  return defHttp.post<any>({ url: Api.updatePassword, params }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
