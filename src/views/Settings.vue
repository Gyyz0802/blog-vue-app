<template>
  <div class="site-main">
    <div class="site-container settings-container">
      <div class="section-title-row">
        <div>
          <h2>账户设置</h2>
          <p class="section-subtitle">管理你的个人资料和偏好设置</p>
        </div>
      </div>

      <div class="settings-grid">
        <div class="settings-sidebar">
          <div class="card" style="padding: 16px">
            <div class="settings-nav">
              <div 
                v-for="item in navItems" 
                :key="item.id"
                class="settings-nav-item"
                :class="{ active: activeSection === item.id }"
                @click="switchSection(item.id)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>

        <div class="settings-content">
          <!-- 个人资料 -->
          <div v-if="activeSection === 'profile'" class="settings-section">
            <h3 class="settings-section-title">个人资料</h3>
            
            <div class="settings-field">
              <div class="avatar-upload">
                <div class="avatar-preview">{{ userInitial }}</div>
                <div class="avatar-actions">
                  <button class="btn btn-primary btn-sm" @click="uploadAvatar">上传新头像</button>
                  <button class="btn btn-ghost btn-sm" @click="removeAvatar">移除头像</button>
                </div>
              </div>
            </div>
            
            <div class="settings-field">
              <label class="settings-label" for="displayName">显示名称</label>
              <input 
                v-model="profile.displayName"
                type="text" 
                id="displayName" 
                class="settings-input" 
                placeholder="输入你的显示名称"
              >
              <div class="settings-hint">这将是其他用户看到的名称</div>
            </div>
            
            <div class="settings-field">
              <label class="settings-label" for="username">用户名</label>
              <input 
                v-model="profile.username"
                type="text" 
                id="username" 
                class="settings-input" 
                placeholder="输入用户名"
              >
              <div class="settings-hint">用于登录和URL的唯一标识</div>
            </div>
            
            <div class="settings-field">
              <label class="settings-label" for="bio">个人简介</label>
              <textarea 
                v-model="profile.bio"
                id="bio" 
                class="settings-input" 
                rows="4" 
                placeholder="介绍一下你自己..."
              ></textarea>
              <div class="settings-hint">简短介绍你自己，最多200字</div>
            </div>
            
            <div class="settings-field">
              <label class="settings-label" for="location">位置</label>
              <input 
                v-model="profile.location"
                type="text" 
                id="location" 
                class="settings-input" 
                placeholder="输入你的位置"
              >
            </div>
            
            <div class="settings-field">
              <label class="settings-label" for="website">个人网站</label>
              <input 
                v-model="profile.website"
                type="url" 
                id="website" 
                class="settings-input" 
                placeholder="https://example.com"
              >
            </div>
          </div>
          
          <!-- 账户安全 -->
          <div v-if="activeSection === 'account'" class="settings-section">
            <h3 class="settings-section-title">账户安全</h3>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">更改密码</div>
                <div class="settings-row-desc">定期更改密码以提高账户安全性</div>
              </div>
              <button class="btn btn-primary" @click="changePassword">更改密码</button>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">双重验证</div>
                <div class="settings-row-desc">为你的账户添加额外的安全层</div>
              </div>
              <label class="toggle-switch">
                <input v-model="security.twoFactorAuth" type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">登录会话</div>
                <div class="settings-row-desc">查看和管理你的活跃登录会话</div>
              </div>
              <button class="btn btn-ghost" @click="viewSessions">查看会话</button>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">连接的应用程序</div>
                <div class="settings-row-desc">管理有权访问你账户的第三方应用</div>
              </div>
              <button class="btn btn-ghost" @click="manageApps">管理应用</button>
            </div>
          </div>
          
          <!-- 偏好设置 -->
          <div v-if="activeSection === 'preferences'" class="settings-section">
            <h3 class="settings-section-title">偏好设置</h3>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">语言</div>
                <div class="settings-row-desc">选择界面显示语言</div>
              </div>
              <select v-model="preferences.language" class="settings-input" style="width: auto;">
                <option value="zh-CN">简体中文</option>
                <option value="en">English</option>
              </select>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">时区</div>
                <div class="settings-row-desc">设置你的本地时区</div>
              </div>
              <select v-model="preferences.timezone" class="settings-input" style="width: auto;">
                <option value="Asia/Shanghai">(UTC+08:00) 北京，重庆，香港，乌鲁木齐</option>
                <option value="America/New_York">(UTC-05:00) 东部时间（美国和加拿大）</option>
              </select>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">日期格式</div>
                <div class="settings-row-desc">选择日期显示格式</div>
              </div>
              <select v-model="preferences.dateFormat" class="settings-input" style="width: auto;">
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              </select>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">每页文章数</div>
                <div class="settings-row-desc">设置每页显示的文章数量</div>
              </div>
              <select v-model="preferences.postsPerPage" class="settings-input" style="width: auto;">
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
            </div>
          </div>
          
          <!-- 通知 -->
          <div v-if="activeSection === 'notifications'" class="settings-section">
            <h3 class="settings-section-title">通知设置</h3>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">邮件通知</div>
                <div class="settings-row-desc">接收重要更新的邮件通知</div>
              </div>
              <label class="toggle-switch">
                <input v-model="notifications.email" type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">新评论通知</div>
                <div class="settings-row-desc">当有人评论你的文章时通知你</div>
              </div>
              <label class="toggle-switch">
                <input v-model="notifications.newComments" type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">回复通知</div>
                <div class="settings-row-desc">当有人回复你的评论时通知你</div>
              </div>
              <label class="toggle-switch">
                <input v-model="notifications.replies" type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">新关注者通知</div>
                <div class="settings-row-desc">当有人关注你时通知你</div>
              </div>
              <label class="toggle-switch">
                <input v-model="notifications.newFollowers" type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">产品更新</div>
                <div class="settings-row-desc">接收关于新功能和改进的通知</div>
              </div>
              <label class="toggle-switch">
                <input v-model="notifications.productUpdates" type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <!-- 隐私 -->
          <div v-if="activeSection === 'privacy'" class="settings-section">
            <h3 class="settings-section-title">隐私设置</h3>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">公开个人资料</div>
                <div class="settings-row-desc">允许其他用户查看你的个人资料</div>
              </div>
              <label class="toggle-switch">
                <input v-model="privacy.publicProfile" type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">显示电子邮件</div>
                <div class="settings-row-desc">在你的个人资料中显示电子邮件地址</div>
              </div>
              <label class="toggle-switch">
                <input v-model="privacy.showEmail" type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">允许索引</div>
                <div class="settings-row-desc">允许搜索引擎索引你的个人资料</div>
              </div>
              <label class="toggle-switch">
                <input v-model="privacy.allowIndexing" type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="settings-row">
              <div>
                <div class="settings-row-label">数据收集</div>
                <div class="settings-row-desc">允许我们收集匿名使用数据以改进服务</div>
              </div>
              <label class="toggle-switch">
                <input v-model="privacy.dataCollection" type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <!-- 危险区域 -->
          <div v-if="activeSection === 'danger'" class="settings-section">
            <h3 class="settings-section-title">危险区域</h3>
            
            <div class="danger-zone">
              <div class="danger-title">停用账户</div>
              <div class="danger-desc">
                停用你的账户将使其暂时不可用。你可以在任何时候重新激活它。
              </div>
              <button class="btn btn-ghost" @click="deactivateAccount">停用账户</button>
            </div>
            
            <div class="danger-zone" style="margin-top: 16px;">
              <div class="danger-title">删除账户</div>
              <div class="danger-desc">
                永久删除你的账户和所有相关数据。此操作无法撤销，请谨慎操作。
              </div>
              <button class="btn btn-danger" @click="deleteAccount">删除账户</button>
            </div>
          </div>
          
          <div class="settings-actions">
            <button class="btn btn-ghost" @click="resetSettings">取消</button>
            <button class="btn btn-primary" @click="saveSettings">保存更改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeSection = ref('profile')

// 从 localStorage 加载用户信息
const user = ref(JSON.parse(localStorage.getItem('user')) || { username: 'huangyiyang' })
const userInitial = computed(() => {
  if (user.value && user.value.username) {
    return user.value.username.charAt(0).toUpperCase()
  }
  return '黄'
})

const navItems = [
  { id: 'profile', name: '个人资料' },
  { id: 'account', name: '账户安全' },
  { id: 'preferences', name: '偏好设置' },
  { id: 'notifications', name: '通知' },
  { id: 'privacy', name: '隐私' },
  { id: 'danger', name: '危险区域' }
]

// 初始化设置数据
const profile = reactive({
  displayName: '黄羿阳',
  username: 'huangyiyang',
  bio: '我是一名长期关注 Web 技术、工程效率与个人产品的前端工程师，平时喜欢折腾不同的电脑硬件与各类电子产品',
  location: '上海',
  website: ''
})

const security = reactive({
  twoFactorAuth: false
})

const preferences = reactive({
  language: 'zh-CN',
  timezone: 'Asia/Shanghai',
  dateFormat: 'YYYY-MM-DD',
  postsPerPage: 15
})

const notifications = reactive({
  email: true,
  newComments: true,
  replies: true,
  newFollowers: false,
  productUpdates: true
})

const privacy = reactive({
  publicProfile: true,
  showEmail: false,
  allowIndexing: true,
  dataCollection: true
})

// 加载保存的设置
const loadSettings = () => {
  const savedSettings = localStorage.getItem('userSettings')
  if (savedSettings) {
    try {
      const settings = JSON.parse(savedSettings)
      Object.assign(profile, settings.profile || {})
      Object.assign(security, settings.security || {})
      Object.assign(preferences, settings.preferences || {})
      Object.assign(notifications, settings.notifications || {})
      Object.assign(privacy, settings.privacy || {})
    } catch (e) {
      console.error('加载设置失败:', e)
    }
  }
}

// 保存设置
const saveSettings = () => {
  const settings = {
    profile,
    security,
    preferences,
    notifications,
    privacy
  }
  localStorage.setItem('userSettings', JSON.stringify(settings))
  
  // 更新用户信息
  if (user.value) {
    user.value = {
      ...user.value,
      displayName: profile.displayName,
      username: profile.username,
      bio: profile.bio,
      location: profile.location,
      website: profile.website
    }
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  
  alert('设置已保存')
}

const resetSettings = () => {
  loadSettings()
  activeSection.value = 'profile'
}

const switchSection = (sectionId) => {
  activeSection.value = sectionId
}

const uploadAvatar = () => {
  alert('上传头像功能暂未实现')
}

const removeAvatar = () => {
  if (confirm('确定要移除头像吗？')) {
    alert('头像已移除')
  }
}

const changePassword = () => {
  const newPassword = prompt('请输入新密码：')
  if (newPassword) {
    alert('密码已更改')
  }
}

const viewSessions = () => {
  alert('查看会话功能暂未实现')
}

const manageApps = () => {
  alert('管理应用功能暂未实现')
}

const deactivateAccount = () => {
  if (confirm('确定要停用账户吗？停用后可以随时恢复。')) {
    alert('账户已停用')
  }
}

const deleteAccount = () => {
  if (confirm('警告：此操作将永久删除你的账户和所有数据，无法恢复。确定要继续吗？')) {
    if (prompt('请输入"删除账户"以确认删除：') === '删除账户') {
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userSettings')
      router.push('/')
      alert('账户已删除')
    }
  }
}

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.settings-container {
  max-width: 1000px;
}

.settings-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}

.settings-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.settings-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.settings-nav-item {
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.settings-nav-item:hover {
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
}

.settings-nav-item.active {
  background: rgba(37, 99, 235, 0.15);
  color: var(--primary);
  font-weight: 500;
}

.settings-content {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border);
  padding: 24px;
  box-shadow: var(--shadow-soft);
}

.settings-section {
  margin-bottom: 32px;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.settings-section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-main);
}

.settings-field {
  margin-bottom: 18px;
}

.settings-label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: var(--text-main);
}

.settings-input {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text-main);
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.settings-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.settings-hint {
  font-size: 12px;
  color: var(--text-subtle);
  margin-top: 6px;
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.settings-row:last-child {
  border-bottom: none;
}

.settings-row-label {
  font-size: 14px;
  color: var(--text-main);
}

.settings-row-desc {
  font-size: 12px;
  color: var(--text-subtle);
  margin-top: 4px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border);
  transition: .3s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--primary);
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: radial-gradient(circle at 30% 20%, #f97316, #ea580c 40%, #4b5563 90%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.danger-zone {
  border: 1px solid var(--danger);
  border-radius: 10px;
  padding: 16px;
  background: rgba(239, 68, 68, 0.05);
}

.danger-title {
  color: var(--danger);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.danger-desc {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.btn-danger {
  background: var(--danger);
  color: white;
  border: none;
}

.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
</style>