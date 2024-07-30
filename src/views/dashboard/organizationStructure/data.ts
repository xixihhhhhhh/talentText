import { FormSchema } from '@/components/Form';

export const columns = [
  {
    title: '部门名称',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: '细分部门',
    dataIndex: 'subDepartment',
    key: 'subDepartment',
  },
  {
    title: '岗位名称',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: '对应职能',
    key: 'corrFunc',
    dataIndex: 'corrFunc',
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
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
    label: '对应职能：',
    colProps: { span: 20 },
    rules: [{ required: true, type: 'string' }],
  },
];
