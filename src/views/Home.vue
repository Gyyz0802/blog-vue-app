<template>
  <div class="site-main">
    <div class="site-container">
      <!-- Hero Section -->
      <section class="card hero-grid">
        <div class="hero-left">
          <span class="badge badge-primary">独立博客 · 记录成长</span>
          <h1 class="hero-title">你好，我是 黄羿阳</h1>
          <p class="hero-subtitle">一名专注于 Web / AI / 独立开发的工程师。</p>
          <p class="hero-description">
            这里记录我的技术文章、设计实践和生活笔记。希望这些内容能为你带来一些灵感和帮助。
          </p>
          <div class="hero-actions">
            <a href="#latest" class="btn btn-primary">开始阅读</a>
            <router-link to="/about" class="btn btn-ghost">关于我</router-link>
          </div>
          <p class="hero-meta">
            最近在折腾：前端工程化、AI 辅助开发、个人产品的从 0 到 1。
          </p>
        </div>
        <div class="hero-right">
          <div class="hero-avatar"></div>
          <div class="hero-name">黄羿阳</div>
          <div class="hero-role">前端工程师 · 独立开发者</div>
          <div class="hero-tags">
            <span class="chip">Vue 3</span>
            <span class="chip">TypeScript</span>
            <span class="chip">Node.js</span>
            <span class="chip">AI 工具</span>
          </div>
        </div>
      </section>

      <!-- Latest Posts -->
      <section id="latest" class="post-list-grid" style="margin-top: 24px">
        <div>
          <div class="section-title-row">
            <div>
              <h2>最新文章</h2>
              <p class="section-subtitle">最近发布的几篇文章</p>
            </div>
            <router-link to="/archive" class="section-subtitle">查看全部 →</router-link>
          </div>
          <div class="post-cards">
            <div v-for="post in latestPosts" :key="post.id">
              <PostCard :post="post" />
            </div>
          </div>
        </div>
        
        <Sidebar />
      </section>

      <!-- Subscribe Section -->
      <section class="subscribe-section">
        <div class="subscribe-text">
          <h3>订阅更新</h3>
          <p>不定期分享技术文章与独立开发笔记，不打扰，只推送高质量内容。</p>
        </div>
        <form class="subscribe-form" @submit.prevent="handleSubscribe">
          <input type="email" placeholder="请输入你的邮箱" v-model="email" />
          <button class="btn btn-primary" type="submit">订阅</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PostCard from '../components/common/PostCard.vue'
import Sidebar from '../components/layout/Sidebar.vue'

const email = ref('')

const latestPosts = [
  {
    id: 1,
    title: '用 Vue 3 + TypeScript 搭建你的第一个个人博客',
    date: '2025-11-16',
    readTime: '8 分钟阅读',
    category: '前端技术',
    excerpt: '从项目初始化到部署上线，一篇文章带你完整走完一个现代前端博客的搭建流程。'
  },
  {
    id: 2,
    title: '我如何用 AI 提升开发效率 3 倍',
    date: '2025-10-01',
    readTime: '6 分钟阅读',
    category: 'AI 与工具',
    excerpt: '整理我在实际工作中使用 AI 辅助编程的方式、踩过的坑和值得推荐的工作流。'
  },
  {
    id: 3,
    title: '从 0 到 1 做一个小产品的完整过程',
    date: '2025-09-12',
    readTime: '10 分钟阅读',
    category: '独立开发',
    excerpt: '分享一次真实的小产品尝试：从灵感、设计、开发，到上线和复盘。'
  }
]

const handleSubscribe = () => {
  if (email.value) {
    console.log('订阅邮箱:', email.value)
    email.value = ''
    alert('订阅成功！')
  }
}
</script>

<style scoped>
.site-main {
  flex: 1;
  padding: 40px 20px 60px;
}

.site-container {
  max-width: 1120px;
  margin: 0 auto;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 32px;
  margin-bottom: 32px;
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}

.hero-left {
  padding: 28px;
}

.hero-right {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid var(--border);
}

[data-theme="light"] .hero-right {
  border-left: 1px solid var(--border);
}

.hero-title {
  margin: 0 0 14px;
  font-size: 32px;
  color: var(--text-main);
}

.hero-subtitle {
  margin: 0 0 16px;
  font-size: 15px;
  color: var(--text-muted);
}

.hero-description {
  margin: 0 0 22px;
  font-size: 14px;
  color: var(--text-subtle);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 22px;
}

.hero-meta {
  font-size: 12px;
  color: var(--text-subtle);
  margin: 0;
}

.hero-avatar {
  width: 88px;
  height: 88px;
  border-radius: 28px;
  background: radial-gradient(circle at 30% 20%, #f97316, #ea580c 40%, #4b5563 90%);
  margin-bottom: 16px;
}

.hero-name {
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-main);
  font-size: 18px;
}

.hero-role {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  font-size: 11px;
  padding: 2px 8px;
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.badge-primary {
  border-color: rgba(37, 99, 235, 0.7);
  background: rgba(37, 99, 235, 0.15);
  color: #bfdbfe;
}

[data-theme="light"] .badge-primary {
  border-color: rgba(59, 130, 246, 0.7);
  background: rgba(59, 130, 246, 0.15);
  color: #1e40af;
}

.chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 3px 9px;
  font-size: 11px;
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.15s ease, background 0.15s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: #f9fafb;
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.4), 0 14px 30px rgba(30, 64, 175, 0.7);
}

.btn-ghost {
  background: rgba(15, 23, 42, 0.9);
  color: var(--text-main);
  border: 1px solid var(--border);
}

[data-theme="light"] .btn-ghost {
  background: rgba(255, 255, 255, 0.9);
}

.section-title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-title-row h2 {
  margin: 0;
  font-size: 18px;
  color: var(--text-main);
}

.section-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
}

.post-list-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.1fr);
  gap: 24px;
}

@media (max-width: 900px) {
  .post-list-grid {
    grid-template-columns: 1fr;
  }
}

.post-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
}

.subscribe-section {
  margin-top: 28px;
  padding: 18px 18px 20px;
  border-radius: 16px;
  background: radial-gradient(circle at 0 0, rgba(37, 99, 235, 0.45), var(--bg-card));
  border: 1px solid rgba(37, 99, 235, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.subscribe-text h3 {
  margin: 0 0 4px;
  color: var(--text-main);
  font-size: 18px;
}

.subscribe-text p {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
}

.subscribe-form {
  display: flex;
  gap: 8px;
}

.subscribe-form input {
  min-width: 220px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text-main);
  font-size: 13px;
}

.subscribe-form input:focus {
  outline: none;
  border-color: var(--primary);
}

@media (max-width: 768px) {
  .site-main {
    padding: 24px 16px 40px;
  }
  
  .subscribe-form {
    flex-direction: column;
    align-items: stretch;
  }
  
  .subscribe-form input {
    min-width: 0;
    width: 100%;
  }
}
</style>