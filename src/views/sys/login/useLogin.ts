import type { FormInstance } from 'ant-design-vue/lib/form/Form';
import type {
  RuleObject,
  NamePath,
  Rule as ValidationRule,
  // RuleType,
} from 'ant-design-vue/lib/form/interface';
import { ref, computed, unref, Ref } from 'vue';
import { useI18n } from '@/hooks/web/useI18n';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

// 这里也可以优化
// import { createGlobalState } from '@vueuse/core'

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormValid<T extends Object = any>(formRef: Ref<FormInstance>) {
  const validate = computed(() => {
    const form = unref(formRef);
    return form?.validate ?? ((_nameList?: NamePath) => Promise.resolve());
  });

  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validate, validForm };
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();

  const getSmsFormRule = computed(() => createRule(t('sys.login.smsPlaceholder')));
  const getMobileFormRule = computed(() => createRule(t('sys.login.mobilePlaceholder')));

  const validatePolicy = async (_: RuleObject, value: boolean) => {
    return !value ? Promise.reject(t('sys.login.policyPlaceholder')) : Promise.resolve();
  };

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

  const validateConfirmPhone = () => {
    return async (_: RuleObject, value: string) => {
      const regex = /^1[3-9]\d{9}$/;
      const result = regex.test(value);
      if (!result) {
        return Promise.reject('手机格式不正确!');
      }
      return Promise.resolve();
    };
  };

  const validateConfirmLoginPassword = () => {
    return async (_: RuleObject, value: string) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      const result = regex.test(value);
      if (!result) {
        return Promise.reject('密码格式不正确,至少8位，包含英文字母大小写!');
      }
      return Promise.resolve();
    };
  };

  const validateName = () => {
    return async (_: RuleObject, value: string) => {
      const nameRegex = /^[\u4e00-\u9fa5]{2,6}$/;
      const result = nameRegex.test(value);
      if (!result) {
        return Promise.reject('请输入真实姓名');
      }
      return Promise.resolve();
    };
  };

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    const smsFormRule = unref(getSmsFormRule);
    const mobileFormRule = unref(getMobileFormRule);

    const mobileRule = {
      sms: smsFormRule,
      mobile: mobileFormRule,
    };
    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          name: [
            {
              required: true,
              message: '请输入真实姓名!',
              trigger: ['blur', 'change'],
              validator: validateName(),
            },
          ],
          phone: mobileFormRule,
          password: [
            {
              required: true,
              message: '密码格式不正确,至少8位，包含英文字母大小写!',
              trigger: ['blur', 'change'],
              validator: validateConfirmLoginPassword(),
            },
          ],
          checkPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
          ],
          policy: [{ validator: validatePolicy, trigger: 'change' }],
          ...mobileRule,
        };

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          phone: [
            {
              required: true,
              message: '请输入手机号码',
              trigger: ['change', 'blur'],
              validator: validateConfirmPhone(),
            },
          ],
          password: [
            {
              required: true,
              message: '密码格式不正确,至少8位，包含英文字母大小写!',
              trigger: 'blur',
              validator: validateConfirmLoginPassword(),
            },
            {
              required: true,
              message: '密码格式不正确,至少8位，包含英文字母大小写!',
              trigger: 'change',
              validator: validateConfirmLoginPassword(),
            },
          ],
          checkPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
          ],
          sms: smsFormRule,
        };

      // mobile form rules
      case LoginStateEnum.MOBILE:
        return mobileRule;

      // login form rules
      default:
        return {
          phone: [
            {
              required: true,
              message: '请输入手机号码',
              trigger: ['change', 'blur'],
              validator: validateConfirmPhone(),
            },
          ],
          password: [
            {
              required: true,
              message: '密码格式不正确,至少8位，包含英文字母大小写!',
              trigger: 'change',
              validator: validateConfirmLoginPassword(),
            },
          ],
        };
    }
  });
  return { getFormRules };
}

function createRule(message: string): ValidationRule[] {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
}

// function createTypeRule(message: string, type: RuleType): ValidationRule[] {
//   return [
//     {
//       required: true,
//       message,
//       type,
//       trigger: 'change',
//     },
//   ];
// }
