<template>
  <div class="nav-search">
    <span style="font-size: 12px; color: var(--text-subtle)">🔍</span>
    <input 
      v-model="searchQuery"
      @input="handleSearch"
      @keydown.enter="performSearch"
      placeholder="搜索文章..."
      aria-label="搜索文章"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
  // 可以在这里添加搜索建议逻辑
  console.log('搜索输入:', searchQuery.value)
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/archive',
      query: { q: searchQuery.value }
    })
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.nav-search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.nav-search:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.nav-search input {
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-main);
  font-size: 13px;
  min-width: 120px;
}

.nav-search input::placeholder {
  color: var(--text-subtle);
}

@media (max-width: 768px) {
  .nav-search input {
    min-width: 80px;
    max-width: 120px;
  }
}
</style>