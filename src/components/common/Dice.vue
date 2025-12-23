<template>
  <div class="daily-fortune">
    <div class="fortune-title">每日运势</div>
    <div class="dice-container">
      <div class="dice" :class="{ rolling: isRolling }" :style="diceStyle">
        <div class="face front">
          <img :src="daji" alt="大吉">
        </div>
        <div class="face back">
          <img :src="pingji" alt="平吉">
        </div>
        <div class="face right">
          <img :src="xiaoji" alt="小吉">
        </div>
        <div class="face left">
          <img :src="daping" alt="大平">
        </div>
        <div class="face top">
          <img :src="xiaoxiong" alt="小凶">
        </div>
        <div class="face bottom">
          <img :src="pingxiong" alt="平凶">
        </div>
      </div>
    </div>
    
    <button 
      class="roll-btn" 
      @click="rollDice" 
      :disabled="isRolling"
    >
      投掷骰子
    </button>
    
    <div class="result" v-if="result">
      您的今日吉凶: {{ result }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import daji from '../../assets/imarge/daji.png'
import pingji from '../../assets/imarge/pingji.png'
import xiaoji from '../../assets/imarge/xiaoji.png'
import daping from '../../assets/imarge/daping.png'
import xiaoxiong from '../../assets/imarge/xiaoxiong.png'
import pingxiong from '../../assets/imarge/pingxiong.png'

const isRolling = ref(false)
const currentSide = ref(1)
const result = ref('')

const sides = {
  1: { x: 0, y: 0, name: "大吉" },
  2: { x: 0, y: -90, name: "平吉" },
  3: { x: -90, y: 0, name: "小吉" },
  4: { x: 90, y: 0, name: "大平" },
  5: { x: 0, y: 90, name: "小凶" },
  6: { x: 0, y: 180, name: "平凶" }
}

const diceStyle = computed(() => {
  const side = sides[currentSide.value]
  return `transform: rotateX(${side.x}deg) rotateY(${side.y}deg)`
})

const rollDice = () => {
  isRolling.value = true
  result.value = ''
  
  // 动画结束后显示结果
  setTimeout(() => {
    const randomSide = Math.floor(Math.random() * 6) + 1
    currentSide.value = randomSide
    result.value = sides[randomSide].name
    isRolling.value = false
  }, 1500)
}

// 初始随机旋转
currentSide.value = Math.floor(Math.random() * 6) + 1
</script>

<style scoped>
@import '../../assets/css/dice.css';
</style>