import { FormSchema } from '@/components/Form';

export const departmentOptions = [
  {
    value: '营销管理中心',
  },
  {
    value: '城区管理中心',
  },
  {
    value: '区局（分公司）',
  },
  {
    value: '财务管理中心',
  },
  {
    value: '物流配送中心',
  },
  {
    value: '人事科（职工培训中心、督察考评中心）',
  },
  {
    value: '信息中心',
  },
  {
    value: '专卖监督管理办公室（专卖稽查支队）',
  },
  {
    value: '办公室（企业管理科）',
  },
  {
    value: '内管派驻办',
  },
  {
    value: '纪检监察科（与党组纪检组合署办公）',
  },
  {
    value: '政策法规与体制改革科',
  },
  {
    value: '安全管理科',
  },
  {
    value: '党建工作科（机关党委办公室、工会办公室）',
  },
];

export const positionOptions = [
  {
    value: '20支网络管理员',
  },
  {
    value: '品牌经理',
  },
  {
    value: '货源管理员',
  },
  {
    value: '订单管理员',
  },
  {
    value: '订货员',
  },
  {
    value: '终端专员',
  },
  {
    value: '客户专员',
  },
  {
    value: '市场经理',
  },
  {
    value: '投放管理员',
  },
  {
    value: '会计',
  },
  {
    value: '出纳',
  },
  {
    value: '资产管理员',
  },
  {
    value: '税务管理员',
  },
  {
    value: '预算管理员',
  },
  {
    value: '财务报告及分析员',
  },
  {
    value: '成本核算员',
  },
  {
    value: '报账员',
  },
  {
    value: '信息专员',
  },
  {
    value: '督察考评员',
  },
  {
    value: '人事管理员',
  },
  {
    value: '劳资管理员',
  },
  {
    value: '培训管理员',
  },
  {
    value: '绩效管理员',
  },
  {
    value: '鉴定管理员',
  },
  {
    value: '人事劳资员',
  },
  {
    value: '督察管理员',
  },
  {
    value: '信息管理员',
  },
  {
    value: '信息维护员',
  },
  {
    value: '网络安全管理员',
  },
  {
    value: '系统管理员',
  },
  {
    value: '数据库管理员',
  },
  {
    value: '程序管理员',
  },
  {
    value: '信息统计员',
  },
  {
    value: '项目管理员',
  },
  {
    value: '卷烟产品鉴别检验员',
  },
  {
    value: '企业管理员',
  },
  {
    value: '卷烟经营企业监管员',
  },
  {
    value: '纪检监察员',
  },
  {
    value: '规范管理员',
  },
  {
    value: '打假打私管理员',
  },
  {
    value: '专卖稽查员',
  },
  {
    value: '证件管理员',
  },
  {
    value: '市场监管员',
  },
  {
    value: '执法监督员',
  },
  {
    value: '案件管理员',
  },
  {
    value: '专卖稽查中队长',
  },
  {
    value: '案件审理员',
  },
  {
    value: '烟叶企业监管员',
  },
  {
    value: '法制监督员',
  },
  {
    value: '法律事务员',
  },
  {
    value: '法规管理员',
  },
  {
    value: '审计员',
  },
  {
    value: '文秘',
  },
  {
    value: '档案管理员',
  },
  {
    value: '宣传舆情管理员',
  },
  {
    value: '科技管理员',
  },
  {
    value: '综合管理员',
  },
  {
    value: '内部专卖监督员',
  },
  {
    value: '基建物业管理员',
  },
  {
    value: '车辆管理员',
  },
  {
    value: '文书管理员',
  },
  {
    value: '投资采购管理员',
  },
  {
    value: '法人治理管理员',
  },
  {
    value: '安全管理员',
  },
  {
    value: '后勤物业管理员',
  },
  {
    value: '司机',
  },
  {
    value: '设备管理员',
  },
  {
    value: '安全员',
  },
  {
    value: '党务管理员',
  },
  {
    value: '群团管理员',
  },
  {
    value: '企业文化管理员',
  },
  {
    value: '工会管理员',
  },
  {
    value: '党群管理员',
  },
  {
    value: '仓库管理员',
  },
  {
    value: '储备班组长',
  },
  {
    value: '配货管理员',
  },
  {
    value: '理货员',
  },
  {
    value: '叉车司机',
  },
  {
    value: '分拣员',
  },
  {
    value: '送货班组长',
  },
  {
    value: '送货管理员',
  },
  {
    value: '送货员',
  },
  {
    value: '送货司机',
  },
];

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
    width: 70,
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
    width: 200,
  },
  {
    title: '资格证书级别',
    dataIndex: 'professional',
    key: 'professional',
    width: 200,
  },
  {
    title: '近三年考核情况',
    dataIndex: 'annual',
    key: 'annual',
    width: 200,
  },
  {
    title: '任职层级',
    dataIndex: 'positionLevel',
    key: 'positionLevel',
    width: 100,
  },
  {
    title: '在该层级任职时长',
    dataIndex: 'tenure',
    key: 'tenure',
    width: 200,
  },
  {
    title: '学历',
    dataIndex: 'educationalBackground',
    key: 'educationalBackground',
    width: 200,
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
    width: 140,
  },
  {
    title: '报告完成时间',
    key: 'finishTime',
    dataIndex: 'finishTime',
    width: 130,
    sorter: true,
  },
  {
    title: '报告可信度',
    key: 'spendTime',
    dataIndex: 'spendTime',
    width: 120,
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    width: 200,
  },
];

const colProps = {
  span: 8,
};

const options = [
  {
    label: '0次',
    value: 0,
    key: '0次',
  },
  {
    label: '1次',
    value: 1,
    key: '1次',
  },
  {
    label: '2次',
    value: 2,
    key: '2次',
  },
  {
    label: '3次',
    value: 3,
    key: '3次',
  },
];

const schemas: FormSchema[] = [
  {
    field: 'positionLevel',
    component: 'InputNumber',
    label: '任职层级',
    colProps,
    componentProps: {
      placeholder: '请输入你的任职层级',
      min: 1,
      max: 19,
    },
  },
  {
    field: 'tenure',
    component: 'InputNumber',
    label: '在该层级任职时长',
    itemProps: {
      labelCol: {
        span: 8,
      },
      labelAlign: 'right',
    },
    colProps,
    componentProps: {
      placeholder: '请输入你的任职时长',
      min: 1,
      max: 100,
    },
  },
  {
    field: 'educationalBackground',
    component: 'Select',
    label: '学历',
    colProps,
    componentProps: {
      placeholder: '请选择学历',
      options: [
        {
          label: '研究生',
          value: '研究生',
          key: '研究生',
        },
        {
          label: '大学本科',
          value: '大学本科',
          key: '大学本科',
        },
        {
          label: '大专',
          value: '大专',
          key: '大专',
        },
        {
          label: '大专以下',
          value: '大专以下',
          key: '大专以下',
        },
      ],
    },
  },
  {
    field: 'professional',
    component: 'Select',
    label: '资格证书级别',
    colProps,
    componentProps: {
      placeholder: '请选择资格证书级别',
      options: [
        {
          label: '一级',
          value: '一级',
          key: '一级',
        },
        {
          label: '二级',
          value: '二级',
          key: '二级',
        },
        {
          label: '三级',
          value: '三级',
          key: '三级',
        },
        {
          label: '四级',
          value: '四级',
          key: '四级',
        },
        {
          label: '五级',
          value: '五级',
          key: '五级',
        },
      ],
    },
  },
  {
    field: 'excellentTimes',
    component: 'Select',
    label: '近三年考核优秀次数',
    colProps,
    itemProps: {
      labelCol: {
        span: 8,
      },
      labelAlign: 'right',
    },
    componentProps: {
      placeholder: '请选择近三年考核优秀次数',
      options,
    },
  },
  {
    field: 'beingCompetentTimes',
    component: 'Select',
    label: '近三年考核称职次数',
    colProps,
    itemProps: {
      labelCol: {
        span: 8,
      },
      labelAlign: 'right',
    },
    componentProps: {
      placeholder: '请选择近三年考核称职次数',
      options,
    },
  },
  {
    field: 'basicBeingCompetentTimes',
    component: 'Select',
    label: '近三年考核基本称职次数',
    colProps,
    itemProps: {
      labelCol: {
        span: 10,
      },
      labelAlign: 'right',
    },
    componentProps: {
      placeholder: '请选择近三年考核基本称职次数',
      options,
    },
  },
  {
    field: 'incompetentTimes',
    component: 'Select',
    label: '近三年考核不称职次数',
    colProps,
    itemProps: {
      labelCol: {
        span: 8,
      },
      labelAlign: 'right',
    },
    componentProps: {
      placeholder: '请选择近三年考核不称职次数',
      options,
    },
  },
];

export function getSchema(department: any, position: any, subDepartment: any) {
  const selectSchema: FormSchema[] = [
    {
      field: 'department',
      component: 'Select',
      label: '部门',
      colProps,
      componentProps: {
        placeholder: '请选择部门',
        options: department,
      },
    },
    {
      field: 'subDepartment',
      component: 'Select',
      label: '细分部门',
      colProps,
      componentProps: {
        placeholder: '请选择细分部门',
        options: subDepartment,
      },
    },
    {
      field: 'position',
      component: 'Select',
      label: '岗位',
      colProps,
      componentProps: {
        placeholder: '请选择细分岗位',
        options: position,
      },
    },
  ];

  return selectSchema.concat(schemas);
}

export function handleReportTruth(spendTime: number) {
  // 将秒转换为分钟
  const spendTimeMinutes = spendTime / 60;

  // 根据时间区间返回可信度
  if (spendTimeMinutes >= 20 && spendTimeMinutes <= 30) {
    return '高';
  } else if (
    (spendTimeMinutes >= 7.5 && spendTimeMinutes < 20) ||
    (spendTimeMinutes > 30 && spendTimeMinutes <= 42.5)
  ) {
    return '正常';
  } else {
    return '低';
  }
}
