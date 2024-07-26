export interface addEvaluateListParams {
  user_id: number;
  name: string;
  department: string;
  position: string;
  finishTime: string;
  echartOptions: Object;
  subDepartment?: string;
}

export interface addEvaluateListModel {
  success: boolean;
}
