<template>
  <button 
    ref="toggleButton"
    class="core-values-toggle" 
    @click="handleToggleClick"
    :class="{ disabled: !isEnabled }"
    :title="`${isEnabled ? '关闭' : '开启'}核心价值观特效`"
    @mousedown.stop
    @touchstart.stop
  >
    <span class="toggle-icon">{{ isEnabled ? '🔴' : '🟢' }}</span>
    <span class="toggle-text">{{ isEnabled ? '关闭特效' : '开启特效' }}</span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { useCoreValues } from '../../composables/useCoreValues'

const { isEnabled, toggle } = useCoreValues()
const toggleButton = ref(null)

const handleToggleClick = (event) => {
  event.stopPropagation() // 阻止事件冒泡
  event.preventDefault() // 阻止默认行为
  toggle()
  console.log('点击了特效切换按钮')
}
</script>

<style scoped>
.core-values-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  z-index: 10000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.core-values-toggle:hover {
  background: linear-gradient(135deg, #2980b9, #1f639c);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.core-values-toggle:active {
  transform: translateY(0);
}

.core-values-toggle.disabled {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
}

.core-values-toggle.disabled:hover {
  background: linear-gradient(135deg, #7f8c8d, #6c7a7d);
}

.toggle-icon {
  font-size: 16px;
}

.toggle-text {
  white-space: nowrap;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .core-values-toggle {
    bottom: 16px;
    right: 16px;
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .toggle-text {
    display: none;
  }
  
  .toggle-icon {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .core-values-toggle {
    bottom: 12px;
    right: 12px;
    padding: 6px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>