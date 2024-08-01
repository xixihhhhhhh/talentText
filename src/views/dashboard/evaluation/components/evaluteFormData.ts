import { FormSchema, RenderCallbackParams } from '@/components/Form';

export function getSchemas(
  departmentObjArr: any,
  evaluteFormDataObject: any,
  evaluteFormDataSubDepartment: any,
  subPosition: any,
  expressionArr?: string[],
  sortOption?: boolean,
) {
  if (!expressionArr) {
    expressionArr = ['您的部门是：', '您的细分部门是：', '您的岗位是：'];
  }
  const schemas: FormSchema[] = [
    {
      field: 'department',
      component: 'Select',
      label: expressionArr[0],
      colProps: { span: 18 },
      labelWidth: 250,
      componentProps: {
        options: departmentObjArr,
      },
      rules: [{ required: true, type: 'string' }],
    },
  ];

  Object.keys(evaluteFormDataSubDepartment).forEach((key: string) => {
    const schemaItem: FormSchema = {
      field: 'subDeaprtment',
      component: 'Select',
      label: expressionArr[1],
      colProps: { span: 18 },
      labelWidth: 250,
      componentProps: {
        options: evaluteFormDataSubDepartment[key],
      },
      rules: [{ required: true, type: 'string' }],
      show: (renderCallbackParams: RenderCallbackParams) => {
        // 更新第二个下拉框的选项
        if (renderCallbackParams.model.department === key) {
          return true;
        }
        return false;
      },
    };
    schemas.push(schemaItem);
  });

  Object.keys(evaluteFormDataObject).forEach((key: string) => {
    const schemaItem: FormSchema = {
      field: 'position' + '/' + key,
      component: 'Select',
      label: expressionArr[2],
      colProps: { span: 18 },
      labelWidth: 250,
      componentProps: {
        options: evaluteFormDataObject[key],
      },
      rules: [{ required: true, type: 'string' }],
      ifShow: (renderCallbackParams: RenderCallbackParams) => {
        // 更新第二个下拉框的选项
        if (renderCallbackParams.model.department === key) {
          return true;
        }
        return false;
      },
    };
    schemas.push(schemaItem);
  });

  Object.keys(subPosition).forEach((key: string) => {
    const schemaItem: FormSchema = {
      field: 'position' + '/' + key,
      component: 'Select',
      label: expressionArr[2],
      colProps: { span: 18 },
      labelWidth: 250,
      componentProps: {
        options: subPosition[key],
      },
      rules: [{ required: true, type: 'string' }],
      ifShow: (renderCallbackParams: RenderCallbackParams) => {
        // 更新第二个下拉框的选项
        if (
          renderCallbackParams.model.department + renderCallbackParams.model.subDeaprtment ===
          key
        ) {
          return true;
        }
        return false;
      },
    };
    schemas.push(schemaItem);
  });

  if (sortOption) {
    const schemaItem: FormSchema = {
      field: 'sortOption',
      component: 'Select',
      label: '报告完成时间排序：',
      colProps: { span: 18 },
      labelWidth: 250,
      componentProps: {
        options: [
          {
            value: '升序',
          },
          {
            value: '降序',
          },
        ],
      },
      rules: [{ type: 'string' }],
    };
    schemas.push(schemaItem);
  }

  return schemas;
}
