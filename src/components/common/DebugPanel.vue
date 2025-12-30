<template>
  <div v-if="showDebug" class="debug-panel">
    <h3>调试信息</h3>
    <div class="debug-info">
      <p>特效状态: {{ isEnabled ? '开启' : '关闭' }}</p>
      <p>当前页面: {{ currentRoute }}</p>
      <p>特效次数: {{ clickCount }}</p>
    </div>
    <button @click="toggleDebug" class="btn btn-sm">隐藏调试</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCoreValues } from '../../composables/useCoreValues'

const showDebug = ref(true)
const clickCount = ref(0)
const route = useRoute()
const { isEnabled } = useCoreValues()

const currentRoute = computed(() => route.path)

const toggleDebug = () => {
  showDebug.value = !showDebug.value
}

// 监听点击事件来计数
document.addEventListener('click', () => {
  clickCount.value++
}, { capture: true })
</script>

<style scoped>
.debug-panel {
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  z-index: 99999;
  font-size: 12px;
  max-width: 200px;
}

.debug-info p {
  margin: 4px 0;
}

.debug-panel button {
  margin-top: 8px;
  padding: 4px 8px;
}
</style>