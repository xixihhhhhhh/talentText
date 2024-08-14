import { ref } from 'vue';

export function useWarning() {
  const timer = ref();
  const openModal = ref(false);

  function startTimeKeeping() {
    timer.value = setTimeout(() => {
      openModal.value = true;
    }, 1000 * 120);
  }

  function clearTimeKeeping() {
    timer.value && clearTimeout(timer.value);
  }

  function continueTimeKeeping() {
    openModal.value = false;
    clearTimeKeeping();
    startTimeKeeping();
  }

  return { openModal, startTimeKeeping, clearTimeKeeping, continueTimeKeeping };
}
