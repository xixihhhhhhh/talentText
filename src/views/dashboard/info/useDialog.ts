import { Ref } from 'vue';
import { useMessage } from '@/hooks/web/useMessage';

const { createMessage } = useMessage();

function validateTime(timeStr) {
  const regex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;
  return regex.test(timeStr);
}

export async function useDialog(arr: Ref, validate: any, open: Ref, careerResetFields: any) {
  try {
    const values = await validate();

    for (const key in values) {
      if (validateTime(values[key])) {
        values[key] = values[key].slice(0, 7);
      }
    }

    arr.value.push(values);

    careerResetFields();
    open.value = false;

    createMessage.success('新增成功！');
  } catch (error) {
    console.error(error);
  }
}
