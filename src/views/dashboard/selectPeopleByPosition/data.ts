export const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 60,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
    width: 100,
  },
  {
    title: '细分部门',
    dataIndex: 'subDepartment',
    key: 'subDepartment',
    width: 100,
  },
  {
    title: '岗位',
    dataIndex: 'position',
    key: 'position',
    width: 100,
  },
  {
    title: '报告完成时间',
    key: 'finishTime',
    dataIndex: 'finishTime',
    sorter: true,
    width: 100,
  },
  {
    title: '报告可信度',
    key: 'spendTime',
    dataIndex: 'spendTime',
    width: 80,
  },
  {
    title: '匹配度',
    key: 'match',
    dataIndex: 'match',
    sorter: true,
    width: 100,
  },
];
