import { ref, watchEffect, onMounted } from 'vue'

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
    
    // 添加按钮动画效果
    const themeToggleBtn = document.getElementById('themeToggle')
    if (themeToggleBtn) {
      themeToggleBtn.style.transform = 'scale(0.9)'
      setTimeout(() => {
        themeToggleBtn.style.transform = 'scale(1)'
      }, 150)
    }
  }
  
  // 初始化主题
  onMounted(() => {
    applyTheme(theme.value)
  })
  
  // 监听主题变化
  watchEffect(() => {
    applyTheme(theme.value)
  })
  
  return {
    theme,
    toggleTheme
  }
}