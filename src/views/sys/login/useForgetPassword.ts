import { ref } from 'vue';

const phone = ref('');
const newPassword = ref('');

export function usePassword() {
  // 设置 phone
  function setPhone(newPhone: string) {
    phone.value = newPhone;
  }

  // 读取 phone
  function getPhone() {
    return phone.value;
  }

  // 设置 newPassword
  function setNewPassword(newPass: string) {
    newPassword.value = newPass;
  }

  // 读取 newPassword
  function getNewPassword() {
    return newPassword.value;
  }

  // 返回所有方法
  return {
    setPhone,
    getPhone,
    setNewPassword,
    getNewPassword,
  };
}
