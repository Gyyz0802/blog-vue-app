// 测试核心价值特效
export function testCoreValues() {
  console.log('测试核心价值特效...')
  
  // 检查是否已注入样式
  const styleElement = document.getElementById('core-values-styles')
  if (!styleElement) {
    console.error('错误：样式未正确注入')
    return false
  }
  
  // 检查是否已绑定事件
  const hasClick = document.__vueClickHandler ? true : false
  console.log('点击事件绑定:', hasClick)
  
  // 模拟点击测试
  const testButton = document.createElement('button')
  testButton.textContent = '测试点击特效'
  testButton.style.position = 'fixed'
  testButton.style.top = '50%'
  testButton.style.left = '50%'
  testButton.style.transform = 'translate(-50%, -50%)'
  testButton.style.zIndex = '99999'
  testButton.style.padding = '10px 20px'
  testButton.style.background = '#3498db'
  testButton.style.color = 'white'
  testButton.style.border = 'none'
  testButton.style.borderRadius = '5px'
  testButton.style.cursor = 'pointer'
  
  testButton.onclick = () => {
    console.log('测试：创建特效文字')
    const event = new MouseEvent('click', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2
    })
    document.dispatchEvent(event)
  }
  
  document.body.appendChild(testButton)
  
  // 10秒后移除测试按钮
  setTimeout(() => {
    if (testButton.parentNode) {
      testButton.parentNode.removeChild(testButton)
    }
  }, 10000)
  
  return true
}