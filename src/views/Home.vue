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
            <router-link to="#latest" class="btn btn-primary">开始阅读</router-link>
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
      <section id="latest" class="post-list-grid">
        <div>
          <div class="section-title-row">
            <div>
              <h2>最新文章</h2>
              <p class="section-subtitle">最近发布的几篇文章</p>
            </div>
            <router-link to="/archive" class="section-subtitle">查看全部 →</router-link>
          </div>
          <div class="post-cards">
            <PostCard
              v-for="post in latestPosts"
              :key="post.id"
              :post="post"
            />
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
    excerpt: '从项目初始化到部署上线，一篇文章带你完整走完一个现代前端博客的搭建流程。',
    cover: 'vue-typescript-blog'
  },
  // ... 其他文章
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
@import '../assets/css/styles.css';
</style>