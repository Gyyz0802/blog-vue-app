<template>
  <button 
    class="core-values-toggle" 
    @click="toggleCoreValues"
    :class="{ disabled: !isEnabled }"
    :title="`${isEnabled ? '关闭' : '开启'}核心价值观特效`"
  >
    {{ isEnabled ? '🔴 关闭特效' : '🟢 开启特效' }}
  </button>
</template>

<script setup>
import { useCoreValues } from '../../composables/useCoreValues'

const { isEnabled, toggle } = useCoreValues()

const toggleCoreValues = () => {
  toggle()
}
</script>

<style>
.core-values-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  z-index: 10000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.core-values-toggle:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.core-values-toggle.disabled {
  background: #95a5a6;
}

.core-values-toggle.disabled:hover {
  background: #7f8c8d;
}

.core-value-text {
  position: fixed;
  font-size: 24px;
  font-weight: bold;
  color: #e74c3c;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  white-space: nowrap;
  z-index: 9999;
  animation: coreValueFloat 3s ease-out forwards;
  font-family: 'Microsoft YaHei', sans-serif;
}

@keyframes coreValueFloat {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-50px) scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100px) scale(1.2);
    opacity: 0;
  }
}
</style>