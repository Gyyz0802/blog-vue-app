<template>
  <div class="site-main">
    <div class="site-container">
      <div class="section-title-row">
        <div>
          <h2>标签云</h2>
          <p class="section-subtitle">用标签描述你的知识地图</p>
        </div>
      </div>

      <section class="card" style="padding: 20px 20px 24px">
        <div class="tag-cloud">
          <span 
            v-for="tag in tags" 
            :key="tag.id"
            :style="getTagStyle(tag)"
            @click="filterByTag(tag.name)"
            class="tag-item"
            :title="`${tag.name} (${tag.count}篇文章)`"
          >
            #{{ tag.name }}
          </span>
        </div>
        
        <div v-if="selectedTag" class="selected-tag-info">
          <h3>标签: {{ selectedTag }}</h3>
          <div class="tag-posts">
            <div v-for="post in filteredPosts" :key="post.id" class="tag-post-item">
              <router-link :to="`/post/${post.id}`" class="tag-post-title">
                {{ post.title }}
              </router-link>
              <div class="tag-post-meta">
                <span>{{ formatDate(post.date) }}</span>
                <span>·</span>
                <span>{{ post.readTime }}</span>
              </div>
            </div>
          </div>
          <button @click="clearFilter" class="btn btn-ghost btn-sm" style="margin-top: 12px">
            清除筛选
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tags = ref([
  { id: 1, name: '前端', count: 25, level: 5 },
  { id: 2, name: 'Vue', count: 18, level: 4 },
  { id: 3, name: 'TypeScript', count: 15, level: 5 },
  { id: 4, name: 'Node.js', count: 12, level: 3 },
  { id: 5, name: 'AI', count: 10, level: 4 },
  { id: 6, name: '效率', count: 8, level: 3 },
  { id: 7, name: '生活', count: 6, level: 2 },
  { id: 8, name: '独立开发', count: 5, level: 3 },
  { id: 9, name: 'React', count: 7, level: 3 },
  { id: 10, name: '工程化', count: 9, level: 4 },
  { id: 11, name: '设计', count: 4, level: 2 },
  { id: 12, name: '思考', count: 6, level: 3 }
])

const selectedTag = ref('')

const posts = ref([
  { id: 1, title: '用 Vue 3 + TypeScript 搭建你的第一个个人博客', date: '2025-11-16', readTime: '8分钟', tags: ['前端', 'Vue', 'TypeScript'] },
  { id: 2, title: '我如何用 AI 提升开发效率 3 倍', date: '2025-10-01', readTime: '6分钟', tags: ['AI', '效率'] },
  { id: 3, title: '从 0 到 1 做一个小产品的完整过程', date: '2025-09-12', readTime: '10分钟', tags: ['独立开发', '思考'] },
  { id: 4, title: '现代前端项目的目录结构实践', date: '2024-08-20', readTime: '7分钟', tags: ['前端', '工程化'] }
])

const getTagStyle = (tag) => {
  const sizes = ['13px', '14px', '16px', '18px', '20px']
  const opacities = ['0.7', '0.8', '0.9', '1.0']
  
  return {
    fontSize: sizes[tag.level - 1] || '14px',
    opacity: opacities[Math.min(tag.level - 1, opacities.length - 1)],
    fontWeight: tag.level > 3 ? '600' : '400'
  }
}

const filterByTag = (tagName) => {
  selectedTag.value = tagName
}

const clearFilter = () => {
  selectedTag.value = ''
}

const filteredPosts = computed(() => {
  if (!selectedTag.value) return []
  return posts.value.filter(post => post.tags.includes(selectedTag.value))
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
}

.tag-item {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-block;
}

.tag-item:hover {
  background: var(--primary-soft);
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
}

.selected-tag-info {
  margin-top: 24px;
  padding: 20px;
  border-radius: 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
}

.selected-tag-info h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: var(--text-main);
}

.tag-posts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tag-post-item {
  padding: 12px;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.tag-post-item:hover {
  border-color: var(--primary);
  transform: translateX(4px);
}

.tag-post-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-main);
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
}

.tag-post-title:hover {
  color: var(--primary);
}

.tag-post-meta {
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  gap: 6px;
}

@media (max-width: 768px) {
  .tag-cloud {
    gap: 8px;
  }
  
  .tag-item {
    padding: 4px 10px;
    font-size: 12px;
  }
}
</style>