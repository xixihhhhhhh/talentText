import { defHttp } from '@/utils/http/axios';
import { addCommentParams, addCommenttModel, getCommenttModel } from './model/commentModel';
import { ErrorMessageMode } from '#/axios';

const baseUrl = '/comment';

enum Api {
  addComment = baseUrl + '/add',
  getComment = baseUrl + '/get',
}

export function addCommentApi(params: addCommentParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<addCommenttModel>(
    {
      url: Api.addComment,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getCommentApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<getCommenttModel[]>(
    {
      url: Api.getComment,
    },
    {
      errorMessageMode: mode,
    },
  );
}
