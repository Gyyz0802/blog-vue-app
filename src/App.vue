<template>
  <div class="site-shell">
    <Header />
    <router-view />
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
@import './assets/css/styles.css';
@import './assets/css/animations.css';
</style>