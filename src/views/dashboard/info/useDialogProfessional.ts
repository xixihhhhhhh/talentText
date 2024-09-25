import { Ref } from 'vue';
import { useMessage } from '@/hooks/web/useMessage';

const { createMessage } = useMessage();

function validateTime(timeStr) {
  const regex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;
  return regex.test(timeStr);
}

function transformValues(values: any) {
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
  for (const key in values) {
    if (validateTime(values[key])) {
      values[key] = values[key].slice(0, 7);
    }
  }
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
