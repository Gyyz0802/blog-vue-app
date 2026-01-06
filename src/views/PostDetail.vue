<template>
  <div class="site-main">
    <div class="site-container">
      <article class="card post-detail">
        <header class="post-header">
          <span class="badge badge-primary">{{ post.category }}</span>
          <h1 class="post-title">{{ post.title }}</h1>
          <div class="post-meta">
            <span>{{ post.date }}</span>
            <span>更新于 {{ post.updated }}</span>
            <span>{{ post.readTime }}</span>
          </div>
          <div class="post-cover" :style="{ background: post.coverGradient }"></div>
        </header>

        <div class="post-content-grid">
          <div class="post-content">
            <div v-html="post.content"></div>
            
            <div class="post-tags">
              <span 
                v-for="tag in post.tags" 
                :key="tag"
                class="chip"
                @click="filterByTag(tag)"
              >
                #{{ tag }}
              </span>
            </div>

            <div class="post-navigation">
              <router-link 
                v-if="previousPost" 
                :to="`/post/${previousPost.id}`" 
                class="nav-link prev"
              >
                ← {{ previousPost.title }}
              </router-link>
              <router-link 
                v-if="nextPost" 
                :to="`/post/${nextPost.id}`" 
                class="nav-link next"
              >
                {{ nextPost.title }} →
              </router-link>
            </div>
            
            <!-- 添加评论系统 -->
            <section class="post-comments">
              <CommentList :post-id="postId" />
            </section>
          </div>

          <aside class="post-sidebar">
            <div class="sidebar-section">
              <h3 class="sidebar-title">文章目录</h3>
              <ul class="toc-list">
                <li 
                  v-for="item in post.toc" 
                  :key="item.id"
                  :class="`toc-level-${item.level}`"
                >
                  <a :href="`#${item.id}`" @click.prevent="scrollToAnchor(item.id)">
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </div>

            <div class="sidebar-section">
              <h3 class="sidebar-title">文章信息</h3>
              <div class="post-stats">
                <div class="stat-item">
                  <span class="stat-label">字数统计</span>
                  <span class="stat-value">{{ post.wordCount }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">阅读时间</span>
                  <span class="stat-value">{{ post.readTime }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">阅读次数</span>
                  <span class="stat-value">{{ post.readCount }}</span>
                </div>
              </div>
            </div>

            <div class="sidebar-section">
              <h3 class="sidebar-title">分享文章</h3>
              <div class="share-buttons">
                <button class="share-btn" @click="shareWechat">
                  <span>💬</span> 微信
                </button>
                <button class="share-btn" @click="shareWeibo">
                  <span>🐦</span> 微博
                </button>
                <button class="share-btn" @click="shareTwitter">
                  <span>🐦</span> Twitter
                </button>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section class="related-posts">
        <div class="section-title-row">
          <h2>相关文章</h2>
        </div>
        <div class="post-cards">
          <PostCard
            v-for="relatedPost in relatedPosts"
            :key="relatedPost.id"
            :post="relatedPost"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '../components/common/PostCard.vue'
import CommentList from '../components/comments/CommentList.vue'

const route = useRoute()
const postId = parseInt(route.params.id)

const post = ref({
  id: 1,
  title: '用 Vue 3 + TypeScript 搭建你的第一个个人博客',
  category: '前端技术',
  date: '2025-11-16',
  updated: '2025-11-20',
  readTime: '8 分钟阅读',
  coverGradient: 'radial-gradient(circle at 20% 15%, #4f46e5, #22d3ee, var(--bg-card))',
  tags: ['前端', 'Vue3', 'TypeScript', '博客'],
  wordCount: '2.5k',
  readCount: '1.2k',
  content: `
    <h2 id="section1">1. 写在前面</h2>
    <p>这是正文内容占位。这里将展示完整的技术文章，包括标题、代码块、图片和各种 Markdown 元素的渲染效果。</p>
    
    <pre><code>// 代码块示例
const app = createApp(App)
app.mount('#app')</code></pre>
    
    <h2 id="section2">2. 项目初始化</h2>
    <p>你可以在这里写下实践经验、踩坑记录和思考过程，让读者在阅读时有更顺畅的体验。</p>
    
    <h3 id="section2-1">2.1 环境准备</h3>
    <p>确保你已经安装了 Node.js 和 npm。</p>
    
    <h2 id="section3">3. 目录结构设计</h2>
    <p>良好的目录结构是项目成功的一半。</p>
    
    <h2 id="section4">4. 部署与上线</h2>
    <p>将你的博客部署到服务器上。</p>
  `,
  toc: [
    { id: 'section1', text: '1. 写在前面', level: 2 },
    { id: 'section2', text: '2. 项目初始化', level: 2 },
    { id: 'section2-1', text: '2.1 环境准备', level: 3 },
    { id: 'section3', text: '3. 目录结构设计', level: 2 },
    { id: 'section4', text: '4. 部署与上线', level: 2 }
  ]
})

const allPosts = ref([
  {
    id: 1,
    title: '用 Vue 3 + TypeScript 搭建你的第一个个人博客',
    date: '2025-11-16',
    category: '前端技术',
    tags: ['前端', 'Vue3', 'TypeScript']
  },
  {
    id: 2,
    title: '我如何用 AI 提升开发效率 3 倍',
    date: '2025-10-01',
    category: 'AI 与工具',
    tags: ['AI', '效率']
  },
  {
    id: 3,
    title: '从 0 到 1 做一个小产品的完整过程',
    date: '2025-09-12',
    category: '独立开发',
    tags: ['独立开发', '产品']
  },
  {
    id: 4,
    title: '现代前端项目的目录结构实践',
    date: '2024-08-20',
    category: '前端技术',
    tags: ['前端', '工程化']
  }
])

const currentIndex = computed(() => {
  return allPosts.value.findIndex(p => p.id === postId)
})

const previousPost = computed(() => {
  if (currentIndex.value > 0) {
    return allPosts.value[currentIndex.value - 1]
  }
  return null
})

const nextPost = computed(() => {
  if (currentIndex.value < allPosts.value.length - 1) {
    return allPosts.value[currentIndex.value + 1]
  }
  return null
})

const relatedPosts = computed(() => {
  const currentPost = allPosts.value.find(p => p.id === postId)
  return allPosts.value
    .filter(p => p.id !== postId && p.category === currentPost.category)
    .slice(0, 2)
})

const filterByTag = (tag) => {
  console.log('Filter by tag:', tag)
}

const scrollToAnchor = (anchorId) => {
  const element = document.getElementById(anchorId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const shareWechat = () => {
  alert('微信分享功能暂未实现')
}

const shareWeibo = () => {
  const url = window.location.href
  const text = post.value.title
  window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, '_blank')
}

const shareTwitter = () => {
  const url = window.location.href
  const text = post.value.title
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

onMounted(() => {
  // 可以在这里根据 postId 加载文章数据
})
</script>

<style scoped>
.post-detail {
  padding: 32px;
}

.post-header {
  margin-bottom: 32px;
}

.post-title {
  font-size: 32px;
  font-weight: 600;
  margin: 16px 0 12px 0;
  color: var(--text-main);
  line-height: 1.3;
}

.post-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.post-cover {
  height: 240px;
  border-radius: 16px;
  margin-top: 20px;
}

.post-content-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) 280px;
  gap: 32px;
}

@media (max-width: 1024px) {
  .post-content-grid {
    grid-template-columns: 1fr;
  }
}

.post-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-main);
}

.post-content :deep(h2) {
  font-size: 24px;
  font-weight: 600;
  margin: 32px 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--border);
}

.post-content :deep(h3) {
  font-size: 20px;
  font-weight: 600;
  margin: 24px 0 12px 0;
}

.post-content :deep(p) {
  margin: 16px 0;
}

.post-content :deep(pre) {
  background: var(--bg-elevated);
  border-radius: 12px;
  padding: 16px;
  margin: 20px 0;
  overflow-x: auto;
  border: 1px solid var(--border);
}

.post-content :deep(code) {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 14px;
  color: var(--text-main);
}

.post-tags {
  margin: 32px 0;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.chip {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 8px;
  margin-bottom: 8px;
}

.chip:hover {
  background: var(--primary-soft);
  border-color: var(--primary);
  color: var(--primary);
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.nav-link {
  font-size: 15px;
  color: var(--text-main);
  text-decoration: none;
  max-width: 45%;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link.prev {
  text-align: left;
}

.nav-link.next {
  text-align: right;
  margin-left: auto;
}

/* 评论区域样式 */
.post-comments {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid var(--border);
}

.post-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-section {
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text-main);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list li {
  margin-bottom: 8px;
}

.toc-list a {
  font-size: 14px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  padding: 4px 0;
}

.toc-list a:hover {
  color: var(--primary);
}

.toc-level-3 {
  padding-left: 16px;
  font-size: 13px;
}

.post-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 14px;
  color: var(--text-muted);
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main);
}

.share-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.share-btn {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-main);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 80px;
}

.share-btn:hover {
  background: var(--primary-soft);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.related-posts {
  margin-top: 48px;
}

.post-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .post-detail {
    padding: 20px;
  }
  
  .post-title {
    font-size: 24px;
  }
  
  .post-meta {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .post-content-grid {
    gap: 24px;
  }
  
  .post-comments {
    margin-top: 40px;
    padding-top: 30px;
  }
}
</style>