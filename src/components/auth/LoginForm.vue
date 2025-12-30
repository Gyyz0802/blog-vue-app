<template>
  <div class="auth-page">
    <div class="auth-card">
      <p class="badge badge-primary">欢迎回来</p>
      <h1 class="auth-title">登录到个人博客</h1>
      <p class="auth-subtitle">使用你的邮箱或用户名登录，继续阅读与创作。</p>

      <form @submit.prevent="handleSubmit">
        <div class="auth-field">
          <label for="username" class="auth-label">邮箱 / 用户名</label>
          <input
            id="username"
            v-model="form.username"
            class="auth-input"
            :class="{ error: errors.username }"
            placeholder="请输入邮箱或用户名"
            autocomplete="username"
            @blur="validateField('username')"
          />
          <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
        </div>

        <div class="auth-field">
          <label for="password" class="auth-label">密码</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="auth-input"
            :class="{ error: errors.password }"
            placeholder="请输入密码"
            autocomplete="current-password"
            @blur="validateField('password')"
            @keydown.enter="handleSubmit"
          />
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>

        <div class="auth-meta-row">
          <label class="auth-checkbox-label">
            <input v-model="form.rememberMe" type="checkbox" />
            <span>记住我</span>
          </label>
          <a href="#" @click.prevent="handleForgotPassword" tabindex="0">忘记密码？</a>
        </div>

        <div class="auth-actions">
          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="isSubmitting"
            style="width: 100%"
          >
            {{ isSubmitting ? '登录中...' : '登录' }}
          </button>
          <div class="auth-secondary-link">
            还没有账号？
            <router-link to="/register">立即注册</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()

const form = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  username: '',
  password: ''
})

const isSubmitting = ref(false)

const validateField = (field) => {
  switch (field) {
    case 'username':
      if (!form.username.trim()) {
        errors.username = '请输入用户名或邮箱'
      } else {
        errors.username = ''
      }
      break
    case 'password':
      if (!form.password) {
        errors.password = '请输入密码'
      } else if (form.password.length < 6) {
        errors.password = '密码长度不能少于6位'
      } else {
        errors.password = ''
      }
      break
  }
}

const validateForm = () => {
  validateField('username')
  validateField('password')
  return !errors.username && !errors.password
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData = {
      username: form.username,
      email: form.username.includes('@') ? form.username : `${form.username}@example.com`
    }
    
    // 直接保存到 localStorage
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
    
    // 跳转到首页
    router.push('/')
  } catch (error) {
    console.error('登录失败:', error)
    errors.password = '用户名或密码错误'
  } finally {
    isSubmitting.value = false
  }
}

const handleForgotPassword = () => {
  alert('忘记密码功能暂未实现')
}
</script>


<style scoped>
@import '../../assets/css/styles.css';

.auth-page {
  max-width: 420px;
  margin: 60px auto 40px;
}

.auth-card {
  padding: 24px 26px 26px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: radial-gradient(circle at top, var(--bg-elevated), var(--bg-card));
  box-shadow: var(--shadow-soft);
}

.auth-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--text-main);
}

.auth-subtitle {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--text-muted);
}

.auth-field {
  margin-bottom: 14px;
}

.auth-label {
  font-size: 13px;
  margin-bottom: 6px;
  color: var(--text-muted);
  display: block;
}

.auth-input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text-main);
  font-size: 13px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.auth-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.auth-input.error {
  border-color: var(--danger);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.error-message {
  color: var(--danger);
  font-size: 12px;
  margin-top: 4px;
  padding-left: 12px;
}

.auth-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-subtle);
  margin-bottom: 18px;
}

.auth-checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: var(--text-muted);
}

.auth-checkbox-label input {
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.auth-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.auth-secondary-link {
  font-size: 13px;
  color: var(--text-muted);
  text-align: center;
}

.auth-secondary-link a {
  color: var(--primary);
  text-decoration: none;
}

.auth-secondary-link a:hover {
  text-decoration: underline;
}
</style>