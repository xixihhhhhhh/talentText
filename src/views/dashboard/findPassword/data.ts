import { FormSchema } from '@/components/Form';

const colProps = {
  span: 24,
};

export const schemas: FormSchema[] = [
  {
    field: 'phone',
    component: 'Input',
    label: '手机号',
    colProps,
    required: true,
  },
  {
    field: 'newPassword',
    component: 'Input',
    label: '新密码',
    colProps,
    required: true,
    rules: [
      {
        required: true,
        message: '请输入新密码',
        trigger: ['change', 'blur'],
      },
      {
        min: 8,
        message: '密码长度至少为8位',
        trigger: ['change', 'blur'],
      },
      {
        max: 20,
        message: '密码长度最多为20位',
        trigger: ['change', 'blur'],
      },
      {
        pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        message: '密码格式不正确,至少8位，包含英文字母大小写!',
        trigger: ['change', 'blur'],
      },
      // 可选：密码强度提示
      {
        validator: (rule, value, callback) => {
          const score = calculatePasswordStrength(value);
          if (score < 3) {
            callback('密码强度过低，请重新设置');
          } else {
            callback();
          }
        },
        trigger: ['change', 'blur'],
      },
    ],
  },
];

// 密码强度计算函数 (示例，可根据实际需求调整)
function calculatePasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()]/.test(password)) score++;
  return score;
}
