export interface addCommentParams {
  content: string;
  avatar: string;
  name: string;
}

export interface addCommenttModel {
  success: boolean;
}

export interface getCommenttModel {
  avatar: string;
  name: string;
  date: string;
  content: string;
}
