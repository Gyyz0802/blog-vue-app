<template>
  <button 
    id="themeToggle"
    class="nav-pill-btn"
    @click="toggleTheme"
    @keydown.enter="toggleTheme"
    @keydown.space.prevent="toggleTheme"
    :aria-label="`切换到${theme === 'dark' ? '浅色' : '深色'}模式`"
  >
    {{ theme === 'dark' ? '🌙 深色' : '☀️ 浅色' }}
  </button>
</template>

<script setup>
import { useTheme } from '../../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.nav-pill-btn {
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.nav-pill-btn:hover {
  border-color: rgba(148, 163, 184, 0.9);
  color: var(--text-main);
  transform: scale(1.05);
}
</style>