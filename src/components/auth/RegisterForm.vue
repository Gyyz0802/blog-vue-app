<template>
  <div class="auth-page">
    <div class="auth-card">
      <p class="badge badge-primary">创建新账号</p>
      <h1 class="auth-title">注册个人博客账号</h1>
      <p class="auth-subtitle">
        填写下面的信息，完成注册后即可开始收藏文章、管理评论和同步阅读记录。
      </p>

      <form @submit.prevent="handleSubmit">
        <div class="auth-field">
          <div class="auth-label">用户名</div>
          <input
            v-model="form.username"
            class="auth-input"
            :class="{ error: errors.username, valid: form.username && !errors.username }"
            placeholder="请输入用户名（支持中英文与数字）"
            @blur="validateField('username')"
            @input="validateField('username')"
          />
          <div v-if="errors.username" class="field-error">{{ errors.username }}</div>
        </div>

        <div class="auth-field">
          <div class="auth-label">邮箱</div>
          <input
            v-model="form.email"
            type="email"
            class="auth-input"
            :class="{ error: errors.email, valid: form.email && !errors.email }"
            placeholder="请输入常用邮箱"
            @blur="validateField('email')"
            @input="validateField('email')"
          />
          <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
        </div>

        <div class="auth-field">
          <div class="auth-label">密码</div>
          <input
            v-model="form.password"
            type="password"
            class="auth-input"
            :class="{ error: errors.password, valid: form.password && !errors.password }"
            placeholder="至少 8 位，建议包含字母和数字"
            @blur="validateField('password')"
            @input="validateField('password')"
          />
          <div v-if="errors.password" class="field-error">{{ errors.password }}</div>
        </div>

        <div class="auth-field">
          <div class="auth-label">确认密码</div>
          <input
            v-model="form.confirmPassword"
            type="password"
            class="auth-input"
            :class="{ error: errors.confirmPassword, valid: form.confirmPassword && !errors.confirmPassword }"
            placeholder="请再次输入密码"
            @blur="validateField('confirmPassword')"
            @input="validateField('confirmPassword')"
          />
          <div v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</div>
        </div>

        <div class="auth-agreement">
          注册即代表你已阅读并同意
          <a href="#" target="_blank">《使用协议》</a>
          和
          <a href="#" target="_blank">《隐私政策》</a>。
        </div>

        <div class="auth-actions">
          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="isSubmitting || !isFormValid"
            style="width: 100%"
          >
            {{ isSubmitting ? '注册中...' : '提交注册' }}
          </button>
          <div class="auth-secondary-link">
            已有账号？
            <router-link to="/login">直接登录</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
// 移除这行：import { useStore } from 'vuex'

const router = useRouter()
// 移除这行：const store = useStore() // 错误：没有 Vuex store

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const isSubmitting = ref(false)
const hasInteracted = reactive({
  username: false,
  email: false,
  password: false,
  confirmPassword: false
})

const isFormValid = computed(() => {
  return !errors.username && !errors.email && !errors.password && !errors.confirmPassword &&
    form.username && form.email && form.password && form.confirmPassword
})

const validateField = (field) => {
  hasInteracted[field] = true
  const value = form[field].trim()
  
  switch (field) {
    case 'username':
      if (!value) {
        errors.username = '用户名不能为空'
      } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
        errors.username = '用户名只能包含中文、英文和数字'
      } else if (value.length < 2) {
        errors.username = '用户名至少需要2个字符'
      } else {
        errors.username = ''
      }
      break
      
    case 'email':
      if (!value) {
        errors.email = '邮箱不能为空'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = '请输入有效的邮箱地址'
      } else {
        errors.email = ''
      }
      break
      
    case 'password':
      if (!value) {
        errors.password = '密码不能为空'
      } else if (value.length < 8) {
        errors.password = '密码至少需要8位'
      } else if (/[\u4e00-\u9fa5]/.test(value)) {
        errors.password = '密码不能包含中文'
      } else {
        errors.password = ''
      }
      
      // 如果确认密码已经输入，重新验证一致性
      if (hasInteracted.confirmPassword) {
        validateField('confirmPassword')
      }
      break
      
    case 'confirmPassword':
      if (!value) {
        errors.confirmPassword = '请确认密码'
      } else if (value !== form.password) {
        errors.confirmPassword = '两次输入的密码不一致'
      } else {
        errors.confirmPassword = ''
      }
      break
  }
}

const handleSubmit = async () => {
  // 标记所有字段为已交互
  Object.keys(hasInteracted).forEach(key => {
    hasInteracted[key] = true
    validateField(key)
  })
  
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  
  try {
    // 模拟注册请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const userData = {
      username: form.username,
      email: form.email
    }
    
    // 直接保存到 localStorage，不使用 Vuex
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
    
    alert('注册成功！即将跳转到首页...')
    
    // 跳转到首页
    router.push('/')
  } catch (error) {
    console.error('注册失败:', error)
    alert('注册失败，请稍后重试')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.auth-page {
  max-width: 440px;
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
  margin-bottom: 12px;
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

.auth-input.valid {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.field-error {
  color: var(--danger);
  font-size: 12px;
  margin-top: 4px;
  padding-left: 12px;
}

.auth-agreement {
  font-size: 12px;
  color: var(--text-subtle);
  margin-top: 6px;
  line-height: 1.6;
}

.auth-agreement a {
  color: var(--primary);
  text-decoration: none;
}

.auth-agreement a:hover {
  text-decoration: underline;
}

.auth-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
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

.btn:disabled {
  background: var(--text-subtle) !important;
  box-shadow: none !important;
  transform: none !important;
  cursor: not-allowed !important;
  opacity: 0.6 !important;
}

.btn:disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}
</style>