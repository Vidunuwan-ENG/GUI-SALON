import { ref, watch, type Ref } from 'vue'

/**
 * useDebounce composable for delaying execution of search and input changes
 */
export function useDebounce<T>(value: Ref<T>, delay: number = 300): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  watch(value, (newVal) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      debouncedValue.value = newVal
    }, delay)
  })

  return debouncedValue
}

/**
 * Simple debounce function wrapper
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number = 300
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: Args): void => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
