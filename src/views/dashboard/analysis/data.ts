export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '用户数',
    icon: 'visit-count|svg',
    value: 2000,
    total: 120000,
    color: 'green',
    action: '月',
  },
  {
    title: '问卷数',
    icon: 'total-sales|svg',
    value: 8,
    total: 8,
    color: 'blue',
    action: '月',
  },
  {
    title: '下载数',
    icon: 'download-count|svg',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: '周',
  },
  {
    title: '成交数',
    icon: 'transaction|svg',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: '年',
  },
];

export const growCardList1: GrowCardItem[] = [
  {
    title: '下载数',
    icon: 'download-count|svg',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: '周',
  },
  {
    title: '成交数',
    icon: 'transaction|svg',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: '年',
  },
];
