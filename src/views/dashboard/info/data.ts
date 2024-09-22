import { FormSchema, RenderCallbackParams } from '@/components/Form';

const colProps = {
  span: 8,
};

export const schemas: FormSchema[] = [
  {
    field: 'sex',
    component: 'RadioGroup',
    label: '性别',
    colProps,
    componentProps: {
      options: [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ],
    },
    required: true,
  },
  {
    field: 'age',
    component: 'InputNumber',
    label: '年龄( 岁 )',
    colProps,
    componentProps: {
      placeholder: '请输入你的年龄',
      min: 18,
      max: 100,
    },
    required: true,
  },
  {
    field: 'serviceLength',
    component: 'InputNumber',
    label: '工龄( 年 )',
    colProps,
    componentProps: {
      placeholder: '请输入你的工龄',
      min: 0,
      max: 100,
    },
    required: true,
  },
  {
    field: 'unitServiceLength',
    component: 'InputNumber',
    label: '在本单位任职年限( 年 )',
    colProps,
    itemProps: {
      labelCol: {
        span: 10,
      },
    },
    componentProps: {
      placeholder: '请输入你在本单位任职年限',
      min: 0,
      max: 100,
    },
    required: true,
  },
  {
    field: 'positionLevel',
    component: 'InputNumber',
    label: '目前任职层级',
    colProps,
    componentProps: {
      placeholder: '请输入目前任职层级',
      min: 1,
      max: 19,
    },
    required: true,
  },
  {
    field: 'tenure',
    component: 'InputNumber',
    label: '在该层级任职时长( 年 )',
    itemProps: {
      labelCol: {
        span: 10,
      },
    },
    componentProps: {
      placeholder: '请输入在该层级任职时长( 年 )',
      min: 1,
      max: 100,
    },
    colProps,
    required: true,
  },
  {
    field: 'communistParty',
    component: 'RadioGroup',
    label: '中共党员',
    colProps,
    componentProps: {
      options: [
        {
          label: '是',
          value: '1',
        },
        {
          label: '否',
          value: '2',
        },
      ],
    },
    required: true,
  },
  {
    field: 'educationalBackground',
    component: 'Select',
    label: '学历',
    colProps: {
      span: 8,
    },
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
    required: true,
  },
  {
    field: 'universities985',
    component: 'RadioGroup',
    label: '985高校',
    colProps,
    componentProps: {
      options: [
        {
          label: '是',
          value: '1',
        },
        {
          label: '否',
          value: '2',
        },
      ],
    },
    required: true,
  },
  {
    field: 'universities211',
    component: 'RadioGroup',
    label: '211高校',
    colProps,
    componentProps: {
      options: [
        {
          label: '是',
          value: '1',
        },
        {
          label: '否',
          value: '2',
        },
      ],
    },
    required: true,
  },
];

export const careerSchemas: FormSchema[] = [
  {
    field: 'startTime',
    component: 'DatePicker',
    label: '开始时间',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 8,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      picker: 'month',
    },
    required: true,
  },
  {
    field: 'endTime',
    component: 'DatePicker',
    label: '结束时间',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 8,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      picker: 'month',
    },
    required: true,
  },
  {
    field: 'schoolName',
    component: 'Input',
    label: '学校（培训单位）名称',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 8,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    required: true,
  },
];

export const workSchemas: FormSchema[] = [
  {
    field: 'startTime',
    component: 'DatePicker',
    label: '开始时间',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      picker: 'month',
    },
    required: true,
  },
  {
    field: 'endTime',
    component: 'DatePicker',
    label: '结束时间',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      picker: 'month',
    },
    required: true,
  },
  {
    field: 'unitName',
    component: 'Input',
    label: '单位名称',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    required: true,
  },
  {
    field: 'positionHeld',
    component: 'Input',
    label: '担任岗位',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    required: true,
  },
];

export const borrowSchemas: FormSchema[] = [
  {
    field: 'startTime',
    component: 'DatePicker',
    label: '开始时间',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      picker: 'month',
    },
    required: true,
  },
  {
    field: 'endTime',
    component: 'DatePicker',
    label: '结束时间',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      picker: 'month',
    },
    required: true,
  },
  {
    field: 'unitName',
    component: 'Input',
    label: '单位名称',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    required: true,
  },
  {
    field: 'borrowingUnitLevel',
    component: 'Select',
    label: '借用单位级别',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      placeholder: '请选择借用单位级别',
      options: [
        {
          label: '行业外',
          value: '行业外',
          key: '行业外',
        },
        {
          label: '国家局、省局（公司）',
          value: '国家局、省局（公司）',
          key: '国家局、省局（公司）',
        },
        {
          label: '市局（公司）',
          value: '市局（公司）',
          key: '市局（公司）',
        },
        {
          label: '区局（公司）',
          value: '区局（公司）',
          key: '区局（公司）',
        },
      ],
    },
    required: true,
  },
  {
    field: 'briefDescription',
    component: 'Input',
    label: '工作内容简述',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    required: true,
  },
];

export const rewardsSchemas: FormSchema[] = [
  {
    field: 'time',
    component: 'DatePicker',
    label: '时间',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      picker: 'month',
    },
    required: true,
  },
  {
    field: 'type',
    component: 'Select',
    label: '类型',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      placeholder: '请选择类型',
      options: [
        {
          label: '奖励',
          value: '奖励',
          key: '奖励',
        },
        {
          label: '惩罚',
          value: '惩罚',
          key: '惩罚',
        },
      ],
    },
  },
  {
    field: 'level',
    component: 'Select',
    label: '级别',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      placeholder: '请选择类型',
      options: [
        {
          label: '国家级',
          value: '国家级',
          key: '国家级',
        },
        {
          label: '省部级（国家局）',
          value: '省部级（国家局）',
          key: '省部级（国家局）',
        },
        {
          label: '地厅级（省局）',
          value: '地厅级（省局）',
          key: '地厅级（省局）',
        },
        {
          label: '县处级（市局）',
          value: '县处级（市局）',
          key: '县处级（市局）',
        },
        {
          label: '其他',
          value: '其他',
          key: '其他',
        },
      ],
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    required: true,
  },
  {
    field: 'grantingInstitution',
    component: 'Input',
    label: '授予机构',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    required: true,
  },
];

const times = [
  {
    label: '0',
    value: '0',
    key: '0',
  },
  {
    label: '1',
    value: '1',
    key: '1',
  },
  {
    label: '2',
    value: '2',
    key: '2',
  },
  {
    label: '3',
    value: '3',
    key: '3',
  },
];

const levelOptions = [
  { label: '一级', value: '一级;一级' },
  { label: '二级', value: '二级;二级' },
  { label: '三级', value: '三级;三级' },
  { label: '四级', value: '四级;四级' },
  { label: '五级', value: '五级;五级' },
];

const levelOptionsArray = [
  { label: '初级', value: '初级;二级' },
  { label: '中级', value: '中级;三级' },
];

export const professionalSchemas: FormSchema[] = [
  {
    field: 'date',
    component: 'DatePicker',
    label: '日期',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 8,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
      picker: 'month',
    },
    required: true,
  },
  {
    field: 'positionType',
    component: 'Cascader',
    label: '资格证书名称、级别',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          value: '烟草专卖管理师',
          label: '烟草专卖管理师',
          children: levelOptions,
        },
        {
          value: '烟草制品购销员',
          label: '烟草制品购销员',
          children: levelOptions,
        },
        {
          value: '烟草物流师',
          label: '烟草物流师',
          children: levelOptions,
        },
        {
          value: '汽车驾驶员',
          label: '汽车驾驶员',
          children: levelOptions,
        },
        {
          value: '企业人力资源管理师',
          label: '企业人力资源管理师',
          children: levelOptions,
        },
        {
          value: '法律职业资格',
          label: '法律职业资格',
          children: levelOptions,
        },
        {
          value: '经济系列',
          label: '经济系列',
          children: [
            { label: '高级经济师', value: '高级经济师;一级' },
            { label: '经济师', value: '经济师;二级' },
            { label: '助理经济师', value: '助理经济师;三级' },
            { label: '经济员', value: '经济员;四级' },
          ],
        },
        {
          value: '政工系列',
          label: '政工系列',
          children: [
            { label: '高级政工师', value: '高级政工师;一级' },
            { label: '政工师', value: '政工师;二级' },
            { label: '助理政工师', value: '助理政工师;三级' },
            { label: '政工员', value: '政工员;四级' },
          ],
        },
        {
          value: '会计系列',
          label: '会计系列',
          children: [
            { label: '高级会计师', value: '高级会计师;一级' },
            { label: '会计师', value: '会计师;二级' },
            { label: '助理会计师', value: '助理会计师;三级' },
            { label: '会计员', value: '会计员;四级' },
          ],
        },
        {
          value: '审计系列',
          label: '审计系列',
          children: [
            { label: '高级审计师', value: '高级审计师;一级' },
            { label: '审计师', value: '审计师;二级' },
            { label: '助理审计师', value: '助理审计师;三级' },
            { label: '审计员', value: '审计员;四级' },
          ],
        },
        {
          value: '统计系列',
          label: '统计系列',
          children: [
            { label: '高级统计师', value: '高级统计师;一级' },
            { label: '统计师', value: '统计师;二级' },
            { label: '助理统计师', value: '助理统计师;三级' },
            { label: '统计员', value: '统计员;四级' },
          ],
        },
        {
          value: '工程系列',
          label: '工程系列',
          children: [
            { label: '高级工程师', value: '高级工程师;一级' },
            { label: '工程师', value: '工程师;二级' },
            { label: '助理工程师', value: '助理工程师;三级' },
            { label: '技术员', value: '技术员;四级' },
          ],
        },
        {
          value: '档案管理系列',
          label: '档案管理系列',
          children: [
            { label: '研究（副研究）馆员', value: '研究（副研究）馆员;一级' },
            { label: '馆员', value: '馆员;二级' },
            { label: '助理管员', value: '助理管员;三级' },
            { label: '管理员', value: '管理员;四级' },
          ],
        },
        {
          value: '其他',
          label: '其他',
          children: [
            {
              value: '信息系统项目管理师;一级',
              label: '信息系统项目管理师',
            },
            {
              value: '系统分析师;一级',
              label: '系统分析师',
            },
            {
              value: '系统架构设计师;一级',
              label: '系统架构设计师',
            },
            {
              value: '网络规划设计师;一级',
              label: '网络规划设计师',
            },
            {
              value: '系统规划与管理师;一级',
              label: '系统规划与管理师',
            },
            {
              value: '高级计算机硬件工程师;一级',
              label: '高级计算机硬件工程师',
            },
            {
              value: '注册安全工程师',
              label: '注册安全工程师',
              children: levelOptionsArray,
            },
            {
              value: '注册会计师',
              label: '注册会计师',
              children: levelOptionsArray,
            },
            {
              value: '软件测评师',
              label: '软件测评师',
              children: levelOptionsArray,
            },
            {
              value: '软件设计师',
              label: '软件设计师',
              children: levelOptionsArray,
            },
            {
              value: '网络工程师',
              label: '网络工程师',
              children: levelOptionsArray,
            },
            {
              value: '系统集成项目管理工程师',
              label: '系统集成项目管理工程师',
              children: levelOptionsArray,
            },
            {
              value: '电子商务设计师',
              label: '电子商务设计师',
              children: levelOptionsArray,
            },
            {
              value: '信息系统监理师',
              label: '信息系统监理师',
              children: levelOptionsArray,
            },
            {
              value: '信息安全工程师',
              label: '信息安全工程师',
              children: levelOptionsArray,
            },
            {
              value: '数据库系统工程师',
              label: '数据库系统工程师',
              children: levelOptionsArray,
            },
            {
              value: '信息系统管理工程师',
              label: '信息系统管理工程师',
              children: levelOptionsArray,
            },
            {
              value: '计算机硬件工程师',
              label: '计算机硬件工程师',
              children: levelOptionsArray,
            },
            {
              value: '法律职业资格;三级',
              label: '法律职业资格',
            },
            {
              value: '其他',
              label: '其他',
            },
          ],
        },
      ],
      style: {
        width: '100%',
      },
    },
    itemProps: {
      labelCol: {
        span: 8,
      },
      labelAlign: 'right',
    },
    rules: [{ required: true, type: 'array' }],
  },
  {
    field: 'specificName',
    component: 'Input',
    label: '具体名称',
    colProps: {
      span: 24,
    },
    itemProps: {
      labelCol: {
        span: 6,
      },
      labelAlign: 'right',
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    ifShow: (renderCallbackParams: RenderCallbackParams) => {
      const positionType = renderCallbackParams.model.positionType;
      // 更新第二个下拉框的选项
      if (Array.isArray(positionType) && positionType.every((type) => type === '其他')) {
        return true;
      }
      return false;
    },
    required: true,
  },
];

export const annualSchemas: FormSchema[] = [
  {
    field: 'excellentTimes',
    component: 'Select',
    label: '优秀(次)',
    colProps,
    componentProps: {
      placeholder: '请输入你的优秀次数',
      options: times,
    },
    required: true,
  },
  {
    field: 'beingCompetentTimes',
    component: 'Select',
    label: '称职(次)',
    colProps,
    componentProps: {
      placeholder: '请输入你的称职次数',
      options: times,
    },
    required: true,
  },
  {
    field: 'basicBeingCompetentTimes',
    component: 'Select',
    label: '基本称职(次)',
    colProps,
    componentProps: {
      placeholder: '请输入你的基本称职次数',
      options: times,
    },
    required: true,
  },
  {
    field: 'incompetentTimes',
    component: 'Select',
    label: '不称职(次)',
    colProps,
    componentProps: {
      placeholder: '请输入你的不称职次数',
      options: times,
    },
    required: true,
  },
];

function getColumns(
  ...columnConfigs: Array<{
    title: string;
    dataIndex: string;
    key?: string;
    width?: number;
  }>
) {
  return columnConfigs.map((config) => {
    const { title, dataIndex, key, width } = config;
    return {
      title,
      dataIndex,
      key: key || dataIndex,
      width,
    };
  });
}

export const careerColumns = getColumns(
  {
    title: '开始时间',
    dataIndex: 'startTime',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
  },
  {
    title: '学校（培训单位）名称',
    dataIndex: 'schoolName',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
  },
);

export const workColumns = getColumns(
  {
    title: '开始时间',
    dataIndex: 'startTime',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
  },
  {
    title: '单位名称',
    dataIndex: 'unitName',
  },
  {
    title: '担任岗位',
    dataIndex: 'positionHeld',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
  },
);

export const borrowColumns = getColumns(
  {
    title: '开始时间',
    dataIndex: 'startTime',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
  },
  {
    title: '单位名称',
    dataIndex: 'unitName',
  },
  {
    title: '借用单位级别',
    dataIndex: 'borrowingUnitLevel',
  },
  {
    title: '工作内容简述',
    dataIndex: 'briefDescription',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
  },
);

export const rewardsColumns = getColumns(
  {
    title: '时间',
    dataIndex: 'time',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '级别',
    dataIndex: 'level',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '授予机构',
    dataIndex: 'grantingInstitution',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
  },
);

export const professionalColumns = getColumns(
  {
    title: '日期',
    dataIndex: 'date',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '等级',
    dataIndex: 'level',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
  },
);
