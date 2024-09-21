import { Ref } from 'vue';
import { useMessage } from '@/hooks/web/useMessage';

const { createMessage } = useMessage();
export async function useDialog(arr: Ref, validate: any, open: Ref, careerResetFields: any) {
  try {
    const values = await validate();
    console.log('🚀 ~ useDialog ~ values:', values);

    arr.value.push(values);

    careerResetFields();
    open.value = false;

    createMessage.success('新增成功！');
  } catch (error) {
    console.error(error);
  }
}
