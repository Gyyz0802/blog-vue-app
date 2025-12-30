<template>
  <aside class="sidebar">
    <section class="sidebar-section">
      <div class="sidebar-title">我的标签</div>
      <div class="tag-cloud">
        <span v-for="tag in tags" :key="tag">#{{ tag }}</span>
      </div>
    </section>

    <section class="sidebar-section">
      <div class="sidebar-title">热门文章</div>
      <ul class="sidebar-list">
        <li v-for="article in hotArticles" :key="article.id">
          <router-link :to="`/post/${article.id}`">{{ article.title }}</router-link>
        </li>
      </ul>
    </section>

    <section class="sidebar-section">
      <div class="sidebar-title">社交链接</div>
      <ul class="sidebar-list">
        <li><a href="https://github.com/huangyiyang" target="_blank">GitHub</a></li>
        <li><a href="https://twitter.com/gyyz0802" target="_blank">Twitter</a></li>
        <li><a href="#" @click.prevent="showWechat">微信 · 二维码占位</a></li>
      </ul>
    </section>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const tags = ref(['前端', 'Vue', 'TypeScript', 'AI', '效率', '生活'])

const hotArticles = ref([
  { id: 1, title: '一年独立开发复盘：从 0 到 1 的心路' },
  { id: 2, title: '写给前端的 Git 使用心法' },
  { id: 3, title: '如何搭建一套自己的知识管理系统' }
])

const showWechat = () => {
  alert('微信二维码功能暂未实现')
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-section {
  padding: 16px 16px 18px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: radial-gradient(circle at top, rgba(15, 23, 42, 0.9), var(--bg-card));
  transition: all 0.3s ease;
}

[data-theme="light"] .sidebar-section {
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.9), var(--bg-card));
}

.sidebar-title {
  font-size: 13px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 10px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-cloud span {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  cursor: pointer;
}

.tag-cloud span:hover {
  background: var(--primary-soft);
  border-color: var(--primary);
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-list li + li {
  margin-top: 6px;
}

.sidebar-list a {
  font-size: 13px;
  color: var(--text-main);
  text-decoration: none;
  transition: color 0.3s ease;
}

.sidebar-list a:hover {
  color: var(--primary);
}
</style>