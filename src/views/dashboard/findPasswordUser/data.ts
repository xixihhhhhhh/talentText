import { FormSchema, RenderCallbackParams } from '@/components/Form';

import type {
  RuleObject,
  Rule as ValidationRule,
  // RuleType,
} from 'ant-design-vue/lib/form/interface';
import { useI18n } from '@/hooks/web/useI18n';

const colProps = {
  span: 24,
};

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();

  const validateConfirmPassword = (password: string) => {
    return async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.reject(t('sys.login.checkPasswordPlaceholder'));
      }
      if (value !== password) {
        return Promise.reject(t('sys.login.diffPwd'));
      }
      return Promise.resolve();
    };
  };

  const validateConfirmLoginPassword = () => {
    return async (_: RuleObject, value: string) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
      const result = regex.test(value);
      if (!result) {
        return Promise.reject('密码格式不正确,至少8位，包含英文字母大小写!');
      }
      return Promise.resolve();
    };
  };

  const getFormRules = (): { [k: string]: ValidationRule | ValidationRule[] } => {
    // login form rules
    return {
      password: [
        {
          required: true,
          message: '密码格式不正确,长度为8到20位，包含英文字母大小写!',
          trigger: ['change', 'blur'],
          validator: validateConfirmLoginPassword(),
        },
      ],
      checkPassword: [
        { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
      ],
    };
  };
  return { getFormRules };
}

const passwordRecoveryQuestions = [
  { value: '您母亲的娘家姓是什么？', label: '您母亲的娘家姓是什么？' },
  { value: '您父亲的名字是什么？', label: '您父亲的名字是什么？' },
  { value: '您小学的校名是什么？', label: '您小学的校名是什么？' },
  { value: '您第一个宠物的名字是什么？', label: '您第一个宠物的名字是什么？' },
  { value: '您最喜欢的书籍是什么？', label: '您最喜欢的书籍是什么？' },
  { value: '您童年时最喜欢的玩具是什么？', label: '您童年时最喜欢的玩具是什么？' },
  { value: '您第一次工作的公司名称是什么？', label: '您第一次工作的公司名称是什么？' },
  { value: '您高中毕业的年份是什么？', label: '您高中毕业的年份是什么？' },
  { value: '您配偶/伴侣的名字是什么？', label: '您配偶/伴侣的名字是什么？' },
  { value: '您最喜欢的电影是什么？', label: '您最喜欢的电影是什么？' },
  { value: '您儿时居住的街道名称是什么？', label: '您儿时居住的街道名称是什么？' },
  { value: '您最喜欢的颜色是什么？', label: '您最喜欢的颜色是什么？' },
  { value: '您最喜欢的运动是什么？', label: '您最喜欢的运动是什么？' },
  { value: '您最喜欢的乐队或歌手是谁？', label: '您最喜欢的乐队或歌手是谁？' },
  { value: '您曾经旅行过的最远的地方是哪里？', label: '您曾经旅行过的最远的地方是哪里？' },
  { value: 'custom', label: '自定义问题内容' },
];

export const questionSchemas: FormSchema[] = [
  {
    field: 'question1',
    component: 'Select',
    label: '问题 1',
    colProps,
    required: true,
    componentProps: {
      options: passwordRecoveryQuestions,
    },
    rules: [
      {
        required: true,
        message: '请选择或输入问题 1',
        trigger: ['change', 'blur'],
      },
    ],
  },
  {
    field: 'customQuestion1',
    component: 'Input',
    label: '问题1内容',
    colProps: {
      span: 24,
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    ifShow: (renderCallbackParams: RenderCallbackParams) => {
      // 更新第二个下拉框的选项
      if (renderCallbackParams.model.question1 === 'custom') {
        return true;
      }
      return false;
    },
    required: true,
  },
  {
    field: 'answer1',
    component: 'Input',
    label: '答案 1',
    colProps,
    required: true,
    rules: [
      {
        required: true,
        message: '请输入答案 1',
        trigger: ['change', 'blur'],
      },
    ],
  },
  {
    field: 'question2',
    component: 'Select',
    label: '问题 2',
    colProps,
    required: true,
    componentProps: {
      options: passwordRecoveryQuestions,
    },
    rules: [
      {
        required: true,
        message: '请选择或输入问题 2',
        trigger: ['change', 'blur'],
      },
    ],
  },
  {
    field: 'customQuestion2',
    component: 'Input',
    label: '问题2内容',
    colProps: {
      span: 24,
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    ifShow: (renderCallbackParams: RenderCallbackParams) => {
      // 更新第二个下拉框的选项
      if (renderCallbackParams.model.question2 === 'custom') {
        return true;
      }
      return false;
    },
    required: true,
  },
  {
    field: 'answer2',
    component: 'Input',
    label: '答案 2',
    colProps,
    required: true,
    rules: [
      {
        required: true,
        message: '请输入答案 2',
        trigger: ['change', 'blur'],
      },
    ],
  },
  {
    field: 'question3',
    component: 'Select',
    label: '问题 3',
    colProps,
    required: true,
    componentProps: {
      options: passwordRecoveryQuestions,
    },
    rules: [
      {
        required: true,
        message: '请选择或输入问题 3',
        trigger: ['change', 'blur'],
      },
    ],
  },
  {
    field: 'customQuestion3',
    component: 'Input',
    label: '问题3内容',
    colProps: {
      span: 24,
    },
    componentProps: {
      style: {
        width: '100%',
      },
    },
    ifShow: (renderCallbackParams: RenderCallbackParams) => {
      // 更新第二个下拉框的选项
      if (renderCallbackParams.model.question3 === 'custom') {
        return true;
      }
      return false;
    },
    required: true,
  },
  {
    field: 'answer3',
    component: 'Input',
    label: '答案 3',
    colProps,
    required: true,
    rules: [
      {
        required: true,
        message: '请输入答案 3',
        trigger: ['change', 'blur'],
      },
    ],
  },
];
