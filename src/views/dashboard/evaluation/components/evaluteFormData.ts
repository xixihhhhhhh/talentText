import { FormSchema, RenderCallbackParams } from '@/components/Form';

export function getSchemas(
  departmentObjArr: any,
  evaluteFormDataObject: any,
  evaluteFormDataSubDepartment: any,
) {
  const schemas: FormSchema[] = [
    {
      field: 'department',
      component: 'Select',
      label: '您的部门是：',
      colProps: { span: 14 },
      componentProps: {
        options: departmentObjArr,
      },
      rules: [{ required: true, type: 'string' }],
    },
  ];

  Object.keys(evaluteFormDataSubDepartment).forEach((key: string) => {
    const schemaItem: FormSchema = {
      field: 'subDeaprtment' + '/' + key,
      component: 'Select',
      label: '您的细分部门是：',
      colProps: { span: 20 },
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
      label: '您的岗位是：',
      colProps: { span: 14 },
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

  return schemas;
}
