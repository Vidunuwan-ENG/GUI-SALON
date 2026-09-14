import { ref, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'novacart_theme'
const currentTheme = ref<Theme>('light')

export function useTheme() {
  const initTheme = (): void => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      currentTheme.value = savedTheme
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme.value = 'dark'
    } else {
      currentTheme.value = 'light'
    }
    applyTheme(currentTheme.value)
  }

  const applyTheme = (theme: Theme): void => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }

  const toggleTheme = (): void => {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
    applyTheme(currentTheme.value)
  }

  onMounted(() => {
    initTheme()
  })

  return {
    theme: currentTheme,
    isDark: () => currentTheme.value === 'dark',
    toggleTheme,
    initTheme
  }
}
