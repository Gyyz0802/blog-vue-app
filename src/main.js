// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 导入样式
import './assets/css/styles.css'
import './assets/css/animations.css'

// 自动清理测试评论功能
const setupCommentCleaner = () => {
  // 只在开发模式下启用
  if (import.meta.env.DEV) {
    console.log('🛠️ 开发模式：评论清理系统已启用')
    
    // 清理函数
    const clearAllComments = () => {
      let clearedCount = 0
      const keysToRemove = []
      
      // 查找所有评论相关的 localStorage 键
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('comments_') || key === 'liked_comments') {
          keysToRemove.push(key)
          clearedCount++
        }
      })
      
      // 删除找到的键
      keysToRemove.forEach(key => {
        localStorage.removeItem(key)
      })
      
      return clearedCount
    }
    
    // 方法1：每次刷新时自动清理（可选）
    const cleared = clearAllComments()
    if (cleared > 0) {
      console.log(`🗑️ 自动清理了 ${cleared} 个评论相关的 localStorage 项`)
    }
  }
}

// 执行清理设置
setupCommentCleaner()

// 创建应用实例
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')

// 应用挂载后的回调
app.config.globalProperties.$onAppMounted = () => {
  console.log('Vue应用已挂载，特效系统准备就绪')
}