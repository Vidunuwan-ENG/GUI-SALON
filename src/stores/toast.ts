import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Toast, ToastType } from '@/types/api'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  const remove = (id: string): void => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  const show = (message: string, type: ToastType = 'info', duration: number = 3500): string => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    const toast: Toast = { id, message, type, duration }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  const success = (message: string, duration?: number): string => show(message, 'success', duration)
  const error = (message: string, duration?: number): string => show(message, 'error', duration)
  const info = (message: string, duration?: number): string => show(message, 'info', duration)
  const warning = (message: string, duration?: number): string => show(message, 'warning', duration)

  return {
    toasts,
    show,
    success,
    error,
    info,
    warning,
    remove
  }
})
