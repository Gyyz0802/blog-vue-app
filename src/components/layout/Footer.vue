<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div>
        <nav class="footer-menu">
          <router-link to="/about">关于我</router-link>
          <span>·</span>
          <router-link to="/friends">友链</router-link>
        </nav>
      </div>
      <div>© 2025 黄羿阳 · 个人博客</div>
      <div>{{ footerText }}</div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const footerText = computed(() => {
  const texts = {
    '/': '首页 · Home',
    '/about': '关于我 · About',
    '/archive': '归档 · Archive',
    '/categories': '分类 · Categories',
    '/tags': '标签 · Tags',
    '/friends': '友链 · Friends',
    '/login': '登录 · Login',
    '/register': '注册 · Register',
    '/settings': '设置 · Settings'
  }
  return texts[route.path] || '个人博客'
})
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  padding: 18px 20px;
  font-size: 12px;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.footer-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.footer-menu {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14px;
}

.footer-menu a {
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.footer-menu a:hover {
  color: var(--text-main);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}
</style>