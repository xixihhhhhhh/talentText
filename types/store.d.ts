import { ErrorTypeEnum } from '@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum';

interface answer {
  careerField: string;
  careerAdvantages: string;
  competency: string;
  score: number;
  value: string;
}

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

export interface ApiAddress {
  key: string;
  val: string;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
  id: number;
  secondWenJuanQuestion: object[];
  firstWenJuanAnswer: answer[];
  halfWenJuan: any;
  hasUnFinish: boolean;
  userId: string | number;
  username: string;
  name: string;
  realName: string;
  avatar: string;
  phone: string;
  desc?: string;
  homePath?: string;
  roles: [];
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}

export interface TableSetting {
  size: Nullable<SizeType>;
  showIndexColumn: Nullable<boolean>;
  columns: Recordable<Nullable<Array<ColumnOptionsType>>>;
  showRowSelection: Nullable<boolean>;
}

export interface Question {
  id: number;
  question: string;
  answer: string;
  score: number;
}
