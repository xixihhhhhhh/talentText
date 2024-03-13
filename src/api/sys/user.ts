import { defHttp } from '@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  getUsersNumberModel,
} from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Register = '/user/register',
  Login = '/user/login',
  ResetPassword = '/user/resetPassword',
  Logout = '/logout',
  GetUserInfo = '/user/getUserInfo',
  GetUserNumber = '/user/getAllUsers',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
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

/**
 * @description: user register api
 */
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

/**
 * @description: user reset password api
 */
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

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getUsersNumber() {
  return defHttp.post<getUsersNumberModel>(
    { url: Api.GetUserNumber },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
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
