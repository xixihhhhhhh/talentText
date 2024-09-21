import { defHttp } from '@/utils/http/axios';

const baseUrl = '/personInfo';

enum Api {
  setPersonMsg = baseUrl + '/setPersonMsg',
  getPersonMsg = baseUrl + '/getPersonMsg',
}

export const setPersonMsgApi = (params: any) => {
  return defHttp.post<any>({ url: Api.setPersonMsg, params });
};

export const getPersonMsgApi = (params: any) => {
  return defHttp.post<any>({ url: Api.getPersonMsg, params });
};
