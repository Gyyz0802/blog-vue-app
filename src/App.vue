<template>
  <div class="site-shell">
    <Header />
    <main class="site-main" id="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <CoreValuesToggle />
  </div>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import CoreValuesToggle from './components/common/CoreValuesToggle.vue'
</script>




<style>
/* 页面切换动画 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 确保特效文本在顶层 */
.core-value-text {
  pointer-events: none !important;
  user-select: none !important;
}

/* 确保导航链接正常工作 */
.site-shell a,
.site-shell button {
  cursor: pointer;
  position: relative;
  z-index: 1;
}
</style>