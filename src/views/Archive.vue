<template>
  <div class="site-main">
    <div class="site-container">
      <div class="section-title-row">
        <div>
          <h2>文章归档</h2>
          <p class="section-subtitle">按年份查看所有文章</p>
        </div>
        <div class="section-subtitle">时间线视图</div>
      </div>

      <section class="card" style="padding: 18px 20px 20px">
        <div class="filter-section">
          <div class="filter-item">
            <span>搜索</span>
            <input
              v-model="searchQuery"
              class="auth-input"
              placeholder="搜索标题 / 内容"
              @input="handleSearch"
            />
          </div>
          <div class="filter-item">
            <span class="filter-label">分类</span>
            <select v-model="selectedCategory" class="auth-input" @change="filterArticles">
              <option value="">全部分类</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>

        <div class="archive-list">
          <div v-for="year in groupedArticles" :key="year.year" class="archive-year">
            <div class="archive-year-title">{{ year.year }}</div>
            <div class="archive-items">
              <article v-for="article in year.articles" :key="article.id" class="archive-item">
                <div class="archive-meta">{{ formatDate(article.date) }} · {{ article.category }}</div>
                <div class="archive-title">
                  <router-link :to="`/post/${article.id}`">{{ article.title }}</router-link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('')

const articles = ref([
  {
    id: 1,
    title: '用 Vue 3 + TypeScript 搭建你的第一个个人博客',
    date: '2025-11-16',
    category: '前端技术',
    content: '从项目初始化到部署上线...'
  },
  {
    id: 2,
    title: '我如何用 AI 提升开发效率 3 倍',
    date: '2025-10-01',
    category: 'AI 与工具',
    content: '整理我在实际工作中使用 AI 辅助编程的方式...'
  },
  {
    id: 3,
    title: '从 0 到 1 做一个小产品的完整过程',
    date: '2025-09-12',
    category: '独立开发',
    content: '分享一次真实的小产品尝试...'
  },
  {
    id: 4,
    title: '现代前端项目的目录结构实践',
    date: '2024-08-20',
    category: '前端技术',
    content: '分享前端项目目录结构的最佳实践...'
  }
])

const categories = computed(() => {
  const uniqueCategories = new Set()
  articles.value.forEach(article => uniqueCategories.add(article.category))
  return Array.from(uniqueCategories)
})

const filteredArticles = computed(() => {
  let filtered = articles.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query)
    )
  }
  
  if (selectedCategory.value) {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }
  
  return filtered
})

const groupedArticles = computed(() => {
  const groups = {}
  
  filteredArticles.value.forEach(article => {
    const year = article.date.split('-')[0]
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(article)
  })
  
  // 按年份降序排序
  return Object.keys(groups)
    .sort((a, b) => b - a)
    .map(year => ({
      year,
      articles: groups[year].sort((a, b) => new Date(b.date) - new Date(a.date))
    }))
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}-${date.getDate()}`
}

const handleSearch = () => {
  // 可以添加防抖
  console.log('搜索:', searchQuery.value)
}

const filterArticles = () => {
  console.log('筛选分类:', selectedCategory.value)
}

onMounted(() => {
  // 可以在这里加载文章数据
})
</script>

<style scoped>
.filter-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 13px;
  color: var(--text-muted);
  white-space: nowrap;
}

.auth-input {
  width: 200px;
}

.archive-list {
  margin-top: 16px;
}

.archive-year {
  margin-bottom: 18px;
}

.archive-year-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-main);
}

.archive-items {
  border-left: 1px solid var(--border);
  margin-left: 6px;
  padding-left: 14px;
}

.archive-item {
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--border);
  transition: all 0.3s ease;
}

.archive-item::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 4px;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: radial-gradient(circle, #60a5fa, var(--primary));
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
  transition: all 0.3s ease;
}

.archive-meta {
  font-size: 11px;
  color: var(--text-subtle);
  margin-bottom: 4px;
}

.archive-title {
  font-size: 14px;
  font-weight: 500;
}

.archive-title a {
  color: var(--text-main);
  text-decoration: none;
  transition: color 0.3s ease;
}

.archive-title a:hover {
  color: var(--primary);
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
  }
  
  .auth-input {
    width: 100%;
  }
}
</style>