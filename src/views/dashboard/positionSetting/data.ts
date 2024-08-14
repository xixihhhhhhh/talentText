import { FormSchema } from '@/components/Form';

export const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 60,
  },
  {
    title: '部门名称',
    dataIndex: 'department',
    key: 'department',
    width: 100,
  },
  {
    title: '细分部门',
    dataIndex: 'subDepartment',
    key: 'subDepartment',
    width: 60,
  },
  {
    title: '岗位名称',
    dataIndex: 'position',
    key: 'position',
    width: 100,
  },
  {
    title: '岗位职能',
    key: 'corrFunc',
    dataIndex: 'corrFunc',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    width: 150,
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'department',
    component: 'Input',
    label: '部门名称：',
    colProps: { span: 20 },
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'subDepartment',
    component: 'Input',
    label: '细分部门：',
    colProps: { span: 20 },
    rules: [{ type: 'string' }],
  },
  {
    field: 'position',
    component: 'Input',
    label: '岗位名称：',
    colProps: { span: 20 },
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'corrFunc',
    component: 'Input',
    label: '岗位职能：',
    colProps: { span: 20 },
    rules: [{ required: true, type: 'string' }],
  },
];
