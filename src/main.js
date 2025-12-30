import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 导入样式
import './assets/css/styles.css'
import './assets/css/animations.css'

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