import { ref } from 'vue';

export function useTime() {
  const startTime = ref(0);
  const endTime = ref(0);

  function start() {
    startTime.value = Date.now();
  }

  function getSpendTime() {
    endTime.value = Date.now();
    const spendTime = Math.round((endTime.value - startTime.value) / 1000);
    return spendTime;
  }

  return { start, getSpendTime };
}
