import { ref, watchEffect } from 'vue'

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light')
  
  const applyTheme = (newTheme) => {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }
  
  const toggleTheme = () => {
    const newTheme = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(newTheme)
  }
  
  // 初始化主题
  watchEffect(() => {
    applyTheme(theme.value)
  })
  
  return {
    theme,
    toggleTheme
  }
}