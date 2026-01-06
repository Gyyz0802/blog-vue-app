import { ref, onMounted, onUnmounted } from 'vue'

export function useCoreValues() {
  const coreValues = [
    "富强", "民主", "文明", "和谐",
    "自由", "平等", "公正", "法治",
    "爱国", "敬业", "诚信", "友善"
  ]
  
  const currentIndex = ref(0)
  const isEnabled = ref(true)
  const floatingTexts = ref([])
  let nextTextId = 1

  const injectStyles = () => {
    // 防止重复注入
    if (document.getElementById('core-values-styles')) return

    const style = document.createElement('style')
    style.id = 'core-values-styles'
    style.textContent = `
      .core-value-text {
        position: fixed;
        font-size: 24px;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        pointer-events: none;
        white-space: nowrap;
        z-index: 9999;
        animation: coreValueFloat 3s ease-out forwards;
        font-family: 'Microsoft YaHei', sans-serif;
        user-select: none;
      }
      
      @keyframes coreValueFloat {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        50% {
          transform: translateY(-50px) scale(1.1);
          opacity: 0.8;
        }
        100% {
          transform: translateY(-100px) scale(1.2);
          opacity: 0;
        }
      }
      
      .core-values-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 12px;
        z-index: 10000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        font-family: system-ui, sans-serif;
      }
      
      .core-values-toggle:hover {
        background: #2980b9;
        transform: translateY(-2px);
      }
      
      .core-values-toggle.disabled {
        background: #95a5a6;
      }
    `
    document.head.appendChild(style)
  }
  
  const createFloatingText = (x, y) => {
    if (!isEnabled.value) return

    const id = nextTextId++
    const floatingText = document.createElement('div')
    floatingText.id = `core-value-text-${id}`
    floatingText.className = 'core-value-text'
    floatingText.textContent = coreValues[currentIndex.value]
    
    // 随机颜色
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    floatingText.style.color = randomColor
    
    // 设置位置
    floatingText.style.left = `${x - 30}px`
    floatingText.style.top = `${y - 30}px`
    
    document.body.appendChild(floatingText)
    floatingTexts.value.push({ id, element: floatingText })
    
    // 更新索引
    currentIndex.value = (currentIndex.value + 1) % coreValues.length
    
    // 动画结束后移除元素
    setTimeout(() => {
      const textElement = document.getElementById(`core-value-text-${id}`)
      if (textElement && textElement.parentNode) {
        textElement.parentNode.removeChild(textElement)
        floatingTexts.value = floatingTexts.value.filter(t => t.id !== id)
      }
    }, 3000)
  }
  
  const handleClick = (event) => {
    // 如果特效已关闭，不执行任何操作
    if (!isEnabled.value) return
    
    // 检查点击的是否是特效按钮本身
    if (event.target.closest('.core-values-toggle')) {
      return
    }
    
    // 检查点击的是否是导航链接
    const clickedElement = event.target
    const isLink = clickedElement.tagName === 'A' || 
                   clickedElement.closest('a') || 
                   clickedElement.tagName === 'BUTTON' ||
                   clickedElement.closest('button')
    
    // 如果是链接或按钮，不创建特效，让导航正常工作
    if (isLink) {
      return
    }
    
    // 检查点击的是否是路由链接
    const isRouterLink = clickedElement.closest('[href]') || 
                        clickedElement.closest('[to]') ||
                        clickedElement.closest('router-link')
    
    if (isRouterLink) {
      return
    }
    
    // 只有点击页面空白区域才创建特效
    createFloatingText(event.clientX, event.clientY)
  }
  
  const handleKeyDown = (event) => {
    if (event.code === 'Space' && isEnabled.value) {
      // 检查是否在输入框中
      const activeElement = document.activeElement
      const isInput = activeElement.tagName === 'INPUT' || 
                      activeElement.tagName === 'TEXTAREA'
      
      if (!isInput) {
        createFloatingText(window.innerWidth / 2, window.innerHeight / 2)
        event.preventDefault()
      }
    }
  }
  
  const handleTouchStart = (event) => {
    if (!isEnabled.value || event.touches.length === 0) return
    
    const touch = event.touches[0]
    const target = document.elementFromPoint(touch.clientX, touch.clientY)
    
    // 检查触摸的是否是链接或按钮
    const isLink = target.tagName === 'A' || 
                   target.closest('a') || 
                   target.tagName === 'BUTTON' ||
                   target.closest('button') ||
                   target.closest('[href]') ||
                   target.closest('[to]') ||
                   target.closest('router-link')
    
    if (!isLink) {
      createFloatingText(touch.clientX, touch.clientY)
      event.preventDefault()
    }
  }
  
  const toggle = () => {
    isEnabled.value = !isEnabled.value
    console.log('特效状态:', isEnabled.value ? '开启' : '关闭')
  }
  
  const enable = () => {
    isEnabled.value = true
  }
  
  const disable = () => {
    isEnabled.value = false
  }
  
  const cleanup = () => {
    // 移除所有浮动文字
    floatingTexts.value.forEach(text => {
      if (text.element && text.element.parentNode) {
        text.element.parentNode.removeChild(text.element)
      }
    })
    floatingTexts.value = []
  }
  
  onMounted(() => {
    injectStyles()
    
    // 使用捕获阶段，确保在其他事件之前处理
    document.addEventListener('click', handleClick, { capture: true })
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    
    console.log('特效系统已初始化，状态:', isEnabled.value ? '开启' : '关闭')
  })
  
  onUnmounted(() => {
    // 清理事件监听器
    document.removeEventListener('click', handleClick, { capture: true })
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('touchstart', handleTouchStart)
    cleanup()
    
    // 移除样式
    const styleElement = document.getElementById('core-values-styles')
    if (styleElement) {
      styleElement.parentNode.removeChild(styleElement)
    }
  })
  
  return {
    isEnabled,
    toggle,
    enable,
    disable
  }
}