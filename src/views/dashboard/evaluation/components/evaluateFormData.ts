import { FormSchema, RenderCallbackParams } from '@/components/Form';

export function getSchemas(
  departmentObjArr: any,
  evaluateFormDataObject: any,
  evaluateFormDataSubDepartment: any,
  subPosition: any,
  expressionArr?: string[],
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

  Object.keys(evaluateFormDataSubDepartment).forEach((key: string) => {
    const schemaItem: FormSchema = {
      field: 'subDepartment',
      component: 'Select',
      label: expressionArr[1],
      colProps: { span: 18 },
      labelWidth: 250,
      componentProps: {
        options: evaluateFormDataSubDepartment[key],
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

  Object.keys(evaluateFormDataObject).forEach((key: string) => {
    const schemaItem: FormSchema = {
      field: 'position' + '/' + key,
      component: 'Select',
      label: expressionArr[2],
      colProps: { span: 18 },
      labelWidth: 250,
      componentProps: {
        options: evaluateFormDataObject[key],
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
          renderCallbackParams.model.department + renderCallbackParams.model.subDepartment ===
          key
        ) {
          return true;
        }
        return false;
      },
    };
    schemas.push(schemaItem);
  });

  return schemas;
}
