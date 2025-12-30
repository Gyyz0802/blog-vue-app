import { ref } from 'vue'

export function useCoreValues() {
  const coreValues = [
    "富强", "民主", "文明", "和谐",
    "自由", "平等", "公正", "法治",
    "爱国", "敬业", "诚信", "友善"
  ]
  
  const currentIndex = ref(0)
  const isEnabled = ref(true)
  
  const createFloatingText = (x, y) => {
    if (!isEnabled.value) return
    
    const floatingText = document.createElement('div')
    floatingText.className = 'core-value-text'
    floatingText.textContent = coreValues[currentIndex.value]
    
    // 设置样式和位置
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c']
    floatingText.style.color = colors[Math.floor(Math.random() * colors.length)]
    floatingText.style.left = `${x}px`
    floatingText.style.top = `${y}px`
    
    document.body.appendChild(floatingText)
    
    // 更新索引
    currentIndex.value = (currentIndex.value + 1) % coreValues.length
    
    // 3秒后移除
    setTimeout(() => {
      if (floatingText.parentNode) {
        floatingText.parentNode.removeChild(floatingText)
      }
    }, 3000)
  }
  
  const toggle = () => {
    isEnabled.value = !isEnabled.value
  }
  
  return {
    isEnabled,
    createFloatingText,
    toggle
  }
}