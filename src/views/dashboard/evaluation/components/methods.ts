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
  subDeaprtment?: string;
} {
  obj = filterUndefinedObj(obj);
  obj = processObject(obj);
  const positionObj = JSON.parse(obj.position);
  const result: DepartmentInfos = {
    department: obj.department,
    position: positionObj.岗位名称,
    corrFunc: positionObj.对应职能,
  };
  if (obj.subDeaprtment) {
    result.subDeaprtment = obj.subDeaprtment;
  }
  return result;
}
