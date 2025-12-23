<template>
  <div class="site-main">
    <div class="site-container">
      <div class="section-title-row">
        <div>
          <h2>友链</h2>
          <p class="section-subtitle">一些欣赏的网站与朋友的博客</p>
        </div>
      </div>

      <section class="card" style="padding: 18px 20px 20px">
        <div class="friends-grid">
          <article 
            v-for="friend in friends" 
            :key="friend.id"
            class="friend-card"
          >
            <div class="friend-avatar" :style="{ background: friend.avatarGradient }">
              {{ friend.name.charAt(0) }}
            </div>
            <div class="friend-info">
              <h3 class="friend-name">{{ friend.name }}</h3>
              <p class="friend-description">{{ friend.description }}</p>
              <div class="friend-meta">
                <span class="friend-tag">{{ friend.tag }}</span>
                <span class="friend-updated">更新于 {{ friend.updated }}</span>
              </div>
            </div>
            <a 
              :href="friend.url" 
              target="_blank" 
              class="friend-link"
              :title="`访问 ${friend.name}`"
            >
              访问链接
            </a>
          </article>
        </div>

        <div class="friends-apply">
          <h3>申请友链方式</h3>
          <p>请通过邮箱与我联系，并提供以下信息：</p>
          <ul>
            <li>站点名称</li>
            <li>站点描述</li>
            <li>站点链接</li>
            <li>头像 / Logo 链接</li>
          </ul>
          <p>我会尽快回复，并在合适的时间统一更新。</p>
          
          <div class="contact-email">
            <strong>联系邮箱：</strong>
            <a href="mailto:a65437870@163.com">a65437870@163.com</a>
          </div>
        </div>
      </section>
      
      <Dice />
    </div>
  </div>
</template>

<script setup>
import Dice from '../components/common/Dice.vue'

const friends = ref([
  {
    id: 1,
    name: '尺宅杂记',
    description: '尺宅足自庇，寸田有余畦。',
    tag: '博客',
    url: 'http://www.qncd.com/',
    updated: '2025-10',
    avatarGradient: 'radial-gradient(circle at 30% 20%, #4f46e5, #3b82f6)'
  },
  {
    id: 2,
    name: '落园',
    description: '来者皆客',
    tag: '博客',
    url: 'https://www.loyhome.com/',
    updated: '2025-11',
    avatarGradient: 'radial-gradient(circle at 30% 20%, #10b981, #059669)'
  },
  {
    id: 3,
    name: '阮一峰的网络日志',
    description: '技术分享与生活随笔',
    tag: '技术博客',
    url: 'https://www.ruanyifeng.com/blog/',
    updated: '2025-11',
    avatarGradient: 'radial-gradient(circle at 30% 20%, #f97316, #ea580c)'
  },
  {
    id: 4,
    name: '王垠的博客',
    description: '编程语言与系统设计',
    tag: '技术博客',
    url: 'https://www.yinwang.org/',
    updated: '2025-09',
    avatarGradient: 'radial-gradient(circle at 30% 20%, #8b5cf6, #7c3aed)'
  }
])
</script>

<style scoped>
.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.friend-card {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.friend-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-soft);
  border-color: var(--primary);
}

.friend-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.friend-info {
  flex: 1;
  margin-bottom: 16px;
}

.friend-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text-main);
}

.friend-description {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.friend-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 12px;
}

.friend-tag {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--primary);
}

.friend-updated {
  color: var(--text-subtle);
}

.friend-link {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  background: var(--primary);
  color: white;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.friend-link:hover {
  background: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.friends-apply {
  padding: 24px;
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  margin-top: 32px;
}

.friends-apply h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text-main);
}

.friends-apply p {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-main);
  margin-bottom: 16px;
}

.friends-apply ul {
  padding-left: 20px;
  margin-bottom: 20px;
}

.friends-apply li {
  font-size: 15px;
  color: var(--text-main);
  margin-bottom: 8px;
}

.contact-email {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  font-size: 15px;
}

.contact-email strong {
  color: var(--text-main);
}

.contact-email a {
  color: var(--primary);
  text-decoration: none;
}

.contact-email a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .friends-grid {
    grid-template-columns: 1fr;
  }
  
  .friend-card {
    padding: 16px;
  }
}
</style>