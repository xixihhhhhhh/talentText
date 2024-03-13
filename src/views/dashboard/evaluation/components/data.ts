import { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'positionType',
    component: 'Select',
    label: '岗位类型 :',
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: '烟草', value: 'tobacco', key: 'tobacco' },
        { label: '电子', value: 'electron', key: 'electron' },
      ],
    },
    rules: [{ required: true, type: 'string' }],
  },
];

export interface Option {
  option: string;
  value: string;
}

export interface answer {
  score: number;
  value: string;
}

export interface OptionsData {
  ratioA?: number;
  ratioB?: number;
  ratioC?: number;
  ratioD?: number;
  ratioE?: number;

  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
}

export function convertToOptionArray(data: OptionsData): Option[] {
  const keys = ['A', 'B', 'C', 'D', 'E'] as const;

  return keys.reduce((arr: Option[], key: (typeof keys)[number]) => {
    if (data[`ratio${key}`]) {
      arr.push({
        option: key + ': ' + data[`option${key}`]!,
        value: key + data[`ratio${key}`]!,
      });
    }
    return arr;
  }, []);
}
