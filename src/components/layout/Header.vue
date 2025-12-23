<template>
  <header class="site-header">
    <div class="nav-inner">
      <div class="nav-brand">
        <div class="nav-logo"></div>
        <div class="nav-title">个人博客 · 黄羿阳</div>
      </div>
      
      <nav class="nav-menu">
        <router-link 
          to="/" 
          :class="{ 'nav-active': $route.path === '/' }"
          exact
        >
          首页
        </router-link>
        <router-link 
          to="/archive" 
          :class="{ 'nav-active': $route.path === '/archive' }"
        >
          归档
        </router-link>
        <router-link 
          to="/categories" 
          :class="{ 'nav-active': $route.path === '/categories' }"
        >
          分类
        </router-link>
        <router-link 
          to="/tags" 
          :class="{ 'nav-active': $route.path === '/tags' }"
        >
          标签
        </router-link>
      </nav>
      
      <div class="nav-spacer"></div>
      
      <div class="nav-actions">
        <SearchBar />
        <ThemeToggle />
        <AvatarDropdown />
      </div>
    </div>
  </header>
</template>

<script setup>
import SearchBar from '../common/SearchBar.vue'
import ThemeToggle from '../common/ThemeToggle.vue'
import AvatarDropdown from '../common/AvatarDropdown.vue'
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(14px);
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.94), rgba(15, 23, 42, 0.7));
  border-bottom: 1px solid var(--border);
  transition: all 0.3s ease;
}

[data-theme="light"] .site-header {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.7));
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-logo {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: radial-gradient(circle at 20% 20%, #60a5fa, #4f46e5 40%, var(--bg-card) 80%);
  box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.2);
  transition: all 0.3s ease;
}

.nav-title {
  font-weight: 600;
  letter-spacing: 0.04em;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: 30px;
  font-size: 14px;
  color: var(--text-muted);
}

.nav-menu a {
  padding: 6px 10px;
  border-radius: 999px;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
}

.nav-menu a:hover {
  background: rgba(31, 41, 55, 0.9);
  color: var(--text-main);
  transform: translateY(-1px);
}

.nav-menu a.nav-active {
  background: rgba(37, 99, 235, 0.18);
  color: #e5ecff;
}

[data-theme="light"] .nav-menu a.nav-active {
  background: rgba(59, 130, 246, 0.15);
  color: #1e40af;
}

.nav-spacer {
  flex: 1;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>