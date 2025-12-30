<template>
  <button 
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