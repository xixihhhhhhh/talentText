import { Ref } from 'vue';
import { useMessage } from '@/hooks/web/useMessage';

const { createMessage } = useMessage();

function transformValues(values: any) {
  console.log('🚀 ~ transformValues ~ values:', values);
  let name = values.positionType.map((item) => {
    if (item.includes(';')) {
      values.level = item.split(';')[1];
      item = item.split(';')[0];
    }
    return item;
  });
  name = name.join(' ');
  if (values.specificName) {
    values.level = values.specificName;
    name += ' ' + values.specificName;
  }
  values.name = name;
  Reflect.deleteProperty(values, 'specificName');
  Reflect.deleteProperty(values, 'positionType');
  return values;
}

export async function useDialogProfessional(
  arr: Ref,
  validate: any,
  open: Ref,
  careerResetFields: any,
) {
  try {
    const values = await validate();

    arr.value.push(transformValues(values));

    careerResetFields();
    open.value = false;

    createMessage.success('新增成功！');
  } catch (error) {
    console.error(error);
  }
}
