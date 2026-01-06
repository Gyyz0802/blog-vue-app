<template>
  <div class="nav-avatar-dropdown" @mouseenter="showDropdown" @mouseleave="hideDropdown">
    <div class="nav-avatar" @click="toggleDropdown">
      <div class="avatar-initial">{{ userInitial }}</div>
    </div>
    
    <transition name="dropdown">
      <div v-show="isDropdownVisible" class="dropdown-menu" @mouseenter="showDropdown">
        <router-link to="/register" class="dropdown-item">
          <span class="dropdown-icon">👤</span>
          访客注册
        </router-link>
        <router-link to="/settings" class="dropdown-item">
          <span class="dropdown-icon">⚙️</span>
          账户设置
        </router-link>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item" @click.prevent="handleLogout">
          <span class="dropdown-icon">🚪</span>
          退出登录
        </a>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isDropdownVisible = ref(false)
const user = ref(null) // 本地用户状态
let hideTimeout = null

// 从 localStorage 加载用户信息
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser)
    } catch (e) {
      console.error('加载用户信息失败:', e)
    }
  }
})

const userInitial = computed(() => {
  if (user.value && user.value.username) {
    return user.value.username.charAt(0).toUpperCase()
  }
  return '访'
})

const showDropdown = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
  isDropdownVisible.value = true
}

const hideDropdown = () => {
  hideTimeout = setTimeout(() => {
    isDropdownVisible.value = false
  }, 300)
}

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

const handleLogout = () => {
  user.value = null
  localStorage.removeItem('user')
  localStorage.removeItem('isAuthenticated')
  router.push('/')
}

const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.nav-avatar-dropdown')
  if (dropdown && !dropdown.contains(event.target)) {
    isDropdownVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
})
</script>

<style scoped>
.nav-avatar-dropdown {
  position: relative;
  display: inline-block;
}

.nav-avatar {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #f97316, #ea580c 50%, var(--bg-card) 90%);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.nav-avatar:hover {
  transform: scale(1.1);
  border-color: rgba(148, 163, 184, 0.3);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  min-width: 160px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-soft);
  z-index: 1000;
  backdrop-filter: blur(10px);
  padding: 8px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 13px;
  color: var(--text-main);
  text-decoration: none;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
}

.dropdown-item:first-child:hover {
  border-radius: 12px 12px 0 0;
}

.dropdown-item:last-child:hover {
  border-radius: 0 0 12px 12px;
}

.dropdown-icon {
  font-size: 14px;
  width: 16px;
  text-align: center;
}

.dropdown-divider {
  height: 1px;
  background: var(--border);
  margin: 6px 0;
}

@media (max-width: 768px) {
  .dropdown-menu {
    right: -50%;
    min-width: 140px;
  }
}
</style>