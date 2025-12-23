<template>
  <div class="site-main">
    <div class="site-container">
      <div class="section-title-row">
        <div>
          <h2>所有分类</h2>
          <p class="section-subtitle">按主题浏览你的文章</p>
        </div>
      </div>

      <section class="card" style="padding: 18px 20px 20px">
        <div class="categories-grid">
          <article 
            v-for="category in categories" 
            :key="category.id"
            class="category-card"
            @click="viewCategory(category.id)"
          >
            <div class="category-icon" :style="{ background: category.gradient }"></div>
            <div class="category-info">
              <h3 class="category-name">{{ category.name }}</h3>
              <p class="category-description">{{ category.description }}</p>
              <div class="category-meta">
                <span>{{ category.count }} 篇文章</span>
                <span class="category-tag">{{ category.tag }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = ref([
  {
    id: 1,
    name: '前端技术',
    description: 'Vue / React / 工程化 / 性能优化',
    count: 12,
    tag: '技术',
    gradient: 'radial-gradient(circle at 20% 30%, #4f46e5, #3b82f6)'
  },
  {
    id: 2,
    name: 'AI 与工具',
    description: 'AI 辅助开发、自动化与效率',
    count: 8,
    tag: '效率',
    gradient: 'radial-gradient(circle at 20% 30%, #10b981, #059669)'
  },
  {
    id: 3,
    name: '独立开发',
    description: '从想法到产品的实践记录',
    count: 5,
    tag: '创业',
    gradient: 'radial-gradient(circle at 20% 30%, #f97316, #ea580c)'
  },
  {
    id: 4,
    name: '生活随笔',
    description: '读书、旅行和日常感想',
    count: 6,
    tag: '生活',
    gradient: 'radial-gradient(circle at 20% 30%, #8b5cf6, #7c3aed)'
  },
  {
    id: 5,
    name: '技术思考',
    description: '对技术的深度思考与见解',
    count: 7,
    tag: '思考',
    gradient: 'radial-gradient(circle at 20% 30%, #06b6d4, #0891b2)'
  },
  {
    id: 6,
    name: '产品设计',
    description: '产品思维与用户体验设计',
    count: 4,
    tag: '设计',
    gradient: 'radial-gradient(circle at 20% 30%, #ec4899, #db2777)'
  }
])

const viewCategory = (categoryId) => {
  router.push({
    path: '/archive',
    query: { category: categoryId }
  })
}
</script>

<style scoped>
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.category-card {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
  border-color: var(--primary);
}

.category-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
}

.category-info {
  flex: 1;
}

.category-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text-main);
}

.category-description {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.category-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-subtle);
}

.category-tag {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 11px;
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .category-card {
    padding: 14px;
  }
}
</style>