<template>
  <article class="post-card" @click="goToDetail">
    <div class="post-card-cover" :style="coverStyle"></div>
    <div class="post-card-body">
      <h3 class="post-card-title">{{ post.title }}</h3>
      <div class="post-card-meta">
        <span>{{ post.date }} · {{ post.readTime }}</span>
        <span class="chip">{{ post.category }}</span>
      </div>
      <p class="post-card-excerpt">{{ post.excerpt }}</p>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const coverStyle = computed(() => {
  // 根据 post.id 生成不同的背景渐变
  const gradients = [
    'radial-gradient(circle at 10% 20%, #4f46e5, #0ea5e9 40%, var(--bg-card) 90%)',
    'radial-gradient(circle at 10% 20%, #6366f1, #0ea5e9 40%, var(--bg-card) 90%)',
    'radial-gradient(circle at 10% 20%, #8b5cf6, #3b82f6 40%, var(--bg-card) 90%)'
  ]
  const randomIndex = props.post.id % gradients.length
  return { background: gradients[randomIndex] }
})

const goToDetail = () => {
  router.push(`/post/${props.post.id}`)
}
</script>

<style scoped>
.post-card {
  border-radius: 10px;
  overflow: hidden;
  background: radial-gradient(circle at top left, rgba(37, 99, 235, 0.16), var(--bg-card));
  border: 1px solid var(--border);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

[data-theme="light"] .post-card {
  background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.1), var(--bg-card));
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-soft);
  border-color: rgba(129, 140, 248, 0.8);
}

.post-card-cover {
  height: 140px;
  transition: all 0.3s ease;
}

.post-card-body {
  padding: 14px 14px 16px;
}

.post-card-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-main);
  line-height: 1.4;
}

.post-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.post-card-excerpt {
  font-size: 13px;
  color: var(--text-subtle);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>