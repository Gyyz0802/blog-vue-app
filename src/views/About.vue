<template>
  <div class="site-main">
    <div class="site-container">
      <div class="section-title-row">
        <div>
          <h2>关于我</h2>
          <p class="section-subtitle">一点背景介绍与写作动机</p>
        </div>
      </div>

      <section class="about-grid">
        <div class="about-left">
          <div class="about-header">
            <div class="hero-avatar"></div>
            <div class="about-header-info">
              <h1 class="about-name">黄羿阳</h1>
              <p class="about-role">前端工程师 · 独立开发者</p>
              <p class="about-location">常驻城市：上海 · 目前就读于上海农林职业技术学院</p>
            </div>
          </div>
          
          <div class="about-content">
            <h3>个人简介</h3>
            <p>
              我是一名长期关注 Web 技术、工程效率与个人产品的前端工程师，平时喜欢折腾新工具和新工作流。这个博客记录我在工作与业余项目中的所思所想。
            </p>
            <p>
              内容会围绕前端技术、工程实践、AI 辅助开发和独立开发过程中的真实经验，偶尔也会写一些生活随笔。
            </p>
            
            <div class="about-skills">
              <h3>技能标签</h3>
              <div class="tag-cloud">
                <span v-for="skill in skills" :key="skill">#{{ skill }}</span>
              </div>
            </div>
            
            <div class="about-projects">
              <h3>近期项目</h3>
              <ul class="project-list">
                <li v-for="project in projects" :key="project.id">
                  <strong>{{ project.name }}</strong>: {{ project.description }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="about-right">
          <div class="about-timeline">
            <h3>时间线</h3>
            <ul class="timeline-list">
              <li v-for="event in timeline" :key="event.id" class="timeline-item">
                <div class="timeline-date">{{ event.date }}</div>
                <div class="timeline-content">
                  <h4>{{ event.title }}</h4>
                  <p>{{ event.description }}</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div class="about-contact">
            <h3>联系我</h3>
            <ul class="contact-list">
              <li>
                <span class="contact-icon">📮</span>
                <span class="contact-info">
                  <strong>邮箱：</strong>
                  <a href="mailto:a65437870@163.com">a65437870@163.com</a>
                </span>
              </li>
              <li>
                <span class="contact-icon">🐙</span>
                <span class="contact-info">
                  <strong>GitHub：</strong>
                  <a href="https://github.com/huangyiyang" target="_blank">github.com/huangyiyang</a>
                </span>
              </li>
              <li>
                <span class="contact-icon">🐦</span>
                <span class="contact-info">
                  <strong>Twitter：</strong>
                  <a href="https://twitter.com/gyyz0802" target="_blank">@gyyz0802</a>
                </span>
              </li>
              <li>
                <span class="contact-icon">💕</span>
                <span class="contact-info">
                  <strong>微信：</strong>
                  <span>gyyz0802</span>
                </span>
              </li>
            </ul>
          </div>
          
          <div class="about-interests">
            <h3>兴趣爱好</h3>
            <div class="interests-list">
              <span v-for="interest in interests" :key="interest" class="interest-tag">
                {{ interest }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const skills = ref(['Vue 3', 'TypeScript', 'Node.js', '工程化', '设计系统', 'AI 工具', 'React', 'Next.js'])

const projects = ref([
  { id: 1, name: '个人博客系统', description: '使用 Vue 3 + TypeScript 搭建的全栈博客系统' },
  { id: 2, name: 'AI 代码助手', description: '基于 GPT 的代码生成和优化工具' },
  { id: 3, name: '组件库', description: '面向中后台的企业级组件库' },
  { id: 4, name: '效率工具集', description: '日常开发中使用的各种效率工具集合' }
])

const timeline = ref([
  {
    id: 1,
    date: '2025.10 - 至今',
    title: '上海市中域工业互联网研究院',
    description: '前端开发学徒，负责企业级前端项目开发'
  },
  {
    id: 2,
    date: '2025.9 - 至今',
    title: '上海市农林职业技术学院',
    description: '物联网应用技术专业，系统学习物联网技术'
  },
  {
    id: 3,
    date: '2022.9 - 2025.6',
    title: '上海市第二轻工业学校',
    description: '物联网应用技术专业，打下扎实的技术基础'
  },
  {
    id: 4,
    date: '2024.7 - 2024.9',
    title: '前端开发实习',
    description: '参与多个商业项目开发，积累实战经验'
  }
])

const interests = ref([
  '编程', '电子技术', '摄影', '阅读', '音乐', '旅行', '篮球', '咖啡', '数码产品', '效率工具'
])
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.3fr);
  gap: 24px;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}

.about-left,
.about-right {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--bg-card);
}

.about-header {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 24px;
}

.hero-avatar {
  width: 88px;
  height: 88px;
  border-radius: 28px;
  background: radial-gradient(circle at 30% 20%, #f97316, #ea580c 40%, #4b5563 90%);
  flex-shrink: 0;
}

.about-header-info {
  flex: 1;
}

.about-name {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text-main);
}

.about-role {
  font-size: 16px;
  color: var(--text-muted);
  margin: 0 0 8px 0;
}

.about-location {
  font-size: 14px;
  color: var(--text-subtle);
  margin: 0;
}

.about-content h3,
.about-timeline h3,
.about-contact h3,
.about-interests h3 {
  font-size: 18px;
  margin: 24px 0 16px 0;
  color: var(--text-main);
  font-weight: 600;
}

.about-content p {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-main);
  margin-bottom: 16px;
}

.about-skills {
  margin-top: 24px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.tag-cloud span {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-main);
  transition: all 0.3s ease;
}

.tag-cloud span:hover {
  background: var(--primary-soft);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.project-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-list li {
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.project-list li:last-child {
  border-bottom: none;
}

.timeline-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.timeline-list::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.timeline-item {
  position: relative;
  padding-left: 20px;
  margin-bottom: 24px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.timeline-date {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 4px;
}

.timeline-content h4 {
  font-size: 16px;
  margin: 0 0 4px 0;
  color: var(--text-main);
}

.timeline-content p {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.6;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.contact-list li:last-child {
  border-bottom: none;
}

.contact-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.contact-info {
  flex: 1;
}

.contact-info strong {
  color: var(--text-main);
  display: block;
  margin-bottom: 2px;
}

.contact-info a,
.contact-info span {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
}

.contact-info a:hover {
  color: var(--primary);
}

.interests-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.interest-tag {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.interest-tag:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
  transform: translateY(-2px);
}
</style>