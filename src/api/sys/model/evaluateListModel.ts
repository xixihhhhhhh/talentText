export interface addEvaluateListParams {
  userId: string;
  result: object;
}

export interface addEvaluateListModel {
  success: boolean;
}

export interface getEvaluateListModel {
  avatar: string;
  name: string;
  date: string;
  content: string;
}
