import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 导入样式
import './assets/css/styles.css'

const app = createApp(App)

// 使用路由
app.use(router)

app.mount('#app')

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue 错误:', err)
  console.error('组件:', vm)
  console.error('信息:', info)
}

// 全局警告处理
const originalWarn = console.warn
console.warn = function(...args) {
  // 过滤掉 Vue Router 的特定警告
  const msg = args[0]?.toString() || ''
  if (
    msg.includes('Failed to resolve component') ||
    msg.includes('Component is missing template or render function') ||
    msg.includes('router-view') ||
    msg.includes('router-link')
  ) {
    // 静默处理这些警告
    return
  }
  originalWarn.apply(console, args)
}