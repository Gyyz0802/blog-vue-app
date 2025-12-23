<template>
  <div class="site-main">
    <div class="site-container">
      <div class="not-found">
        <h1>404</h1>
        <p>页面未找到</p>
        <router-link to="/" class="btn btn-primary">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 20px;
}

.not-found h1 {
  font-size: 120px;
  margin: 0;
  color: var(--primary);
  font-weight: 700;
}

.not-found p {
  font-size: 24px;
  margin: 20px 0 40px;
  color: var(--text-muted);
}
</style>