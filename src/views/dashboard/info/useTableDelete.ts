import { useMessage } from '@/hooks/web/useMessage';

const { createMessage } = useMessage();
export function useTableDelete(arr: any[], record: any) {
  const index = arr.findIndex((item) => item.startTime === record.startTime);
  if (index !== -1) {
    arr.splice(index, 1);
    createMessage.success('删除成功！');
  } else {
    createMessage.error('未找到匹配的记录！');
  }
}
