import { DepartmentInfos } from './type';

export function filterUndefinedObj(obj: Record<string, any>): Record<string, any> {
  const filteredObj: Record<string, any> = Object.fromEntries(
    Object.entries(obj).filter(([_key, value]) => value !== undefined),
  );
  return filteredObj;
}

export function processObject(obj: any): any {
  const result = {};
  for (const key in obj) {
    if (key.includes('/')) {
      const newKey = key.split('/')[0]; // 获取键名前面的部分
      result[newKey] = obj[key].split('/')[0]; // 获取值中第一个部分，也就是去除 `/` 后面的部分
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

export function processDepartmentObj(obj: any): {
  department: string;
  position: string;
  corrFunc: string;
  subDepartment?: string;
} {
  obj = filterUndefinedObj(obj);
  obj = processObject(obj);
  const positionObj = JSON.parse(obj.position);
  const result: DepartmentInfos = {
    department: obj.department,
    position: positionObj.岗位名称,
    corrFunc: positionObj.岗位职能,
  };
  if (obj.subDepartment) {
    result.subDepartment = obj.subDepartment;
  }
  return result;
}

export function getTime() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = (now.getMonth() + 1).toString().padStart(2, '0'); // 月份从 0 开始，所以需要加 1
  const dd = now.getDate().toString().padStart(2, '0');
  const hh = now.getHours().toString().padStart(2, '0');
  const mi = now.getMinutes().toString().padStart(2, '0');

  const formattedDateTime = `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
  return formattedDateTime;
}
