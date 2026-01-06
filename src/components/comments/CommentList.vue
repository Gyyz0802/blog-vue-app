<template>
  <div class="comment-list-container">
    <div class="comment-list-header">
      <h3 class="comment-list-title">
        💬 评论 {{ totalComments }}
        <span v-if="totalComments > 0" class="comment-count-badge">{{ totalComments }}</span>
      </h3>
      
      <div class="comment-sort">
        <select v-model="sortBy" class="sort-select" @change="sortComments">
          <option value="newest">最新</option>
          <option value="oldest">最早</option>
          <option value="mostLiked">最多点赞</option>
        </select>
      </div>
    </div>
    
    <!-- 评论表单 -->
    <div class="comment-main-form">
      <CommentForm
        :post-id="postId"
        @submit="handleNewComment"
      />
    </div>
    
    <!-- 评论列表 -->
    <div v-if="comments.length > 0" class="comments-section">
      <div class="comment-stats">
        <span class="stat-item">📝 {{ totalComments }} 条评论</span>
        <span class="stat-item">💬 {{ totalReplies }} 条回复</span>
        <span class="stat-item">❤️ {{ totalLikes }} 次点赞</span>
      </div>
      
      <div class="comments-list">
        <CommentItem
          v-for="comment in sortedComments"
          :key="comment.id"
          :comment="comment"
          :post-id="postId"
          @reply-submitted="loadComments"
        />
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-else class="empty-comments">
      <div class="empty-icon">💬</div>
      <h4 class="empty-title">还没有评论</h4>
      <p class="empty-desc">成为第一个评论的人吧！</p>
    </div>
    
    <!-- 加载更多 -->
    <div v-if="hasMoreComments && comments.length > 0" class="load-more">
      <button
        class="btn btn-ghost"
        @click="loadMore"
        :disabled="isLoading"
      >
        {{ isLoading ? '加载中...' : '加载更多评论' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import CommentForm from './CommentForm.vue'
import CommentItem from './CommentItem.vue'

const props = defineProps({
  postId: {
    type: [String, Number],
    required: true
  }
})

// 响应式状态
const comments = ref([])
const isLoading = ref(false)
const sortBy = ref('newest')
const page = ref(1)
const pageSize = 10

// 计算属性
const totalComments = computed(() => {
  return comments.value.length
})

const totalReplies = computed(() => {
  return comments.value.reduce((total, comment) => {
    const allComments = JSON.parse(localStorage.getItem(`comments_${props.postId}`)) || []
    const replies = allComments.filter(c => c.parentId === comment.id)
    return total + replies.length
  }, 0)
})

const totalLikes = computed(() => {
  return comments.value.reduce((total, comment) => {
    return total + (comment.likes || 0)
  }, 0)
})

const sortedComments = computed(() => {
  const sorted = [...comments.value]
  
  switch (sortBy.value) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    case 'mostLiked':
      return sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0))
    default:
      return sorted
  }
})

const hasMoreComments = computed(() => {
  const allComments = JSON.parse(localStorage.getItem(`comments_${props.postId}`)) || []
  const topLevelComments = allComments.filter(comment => !comment.parentId)
  return page.value * pageSize < topLevelComments.length
})

// 加载评论
const loadComments = () => {
  try {
    isLoading.value = true
    const allComments = JSON.parse(localStorage.getItem(`comments_${props.postId}`)) || []
    
    // 只获取顶级评论（非回复）
    const topLevelComments = allComments.filter(comment => !comment.parentId)
    
    // 分页
    const startIndex = (page.value - 1) * pageSize
    const endIndex = page.value * pageSize
    comments.value = topLevelComments.slice(0, endIndex)
    
    console.log(`加载了 ${comments.value.length} 条评论`)
  } catch (error) {
    console.error('加载评论失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 加载更多评论
const loadMore = () => {
  page.value++
  loadComments()
}

// 处理新评论提交
const handleNewComment = () => {
  // 重置到第一页并重新加载
  page.value = 1
  loadComments()
}

// 排序评论
const sortComments = () => {
  // 排序由 computed 属性自动处理
  console.log('按', sortBy.value, '排序')
}

// 监听 postId 变化
watch(() => props.postId, () => {
  page.value = 1
  loadComments()
})

// 初始化
onMounted(() => {
  loadComments()
})
</script>

<style scoped>
.comment-list-container {
  margin: 40px 0;
  padding: 24px;
  border-radius: 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-soft);
}

.comment-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.comment-list-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 8px;
}

.comment-count-badge {
  display: inline-block;
  padding: 2px 8px;
  background: linear-gradient(135deg, var(--primary), #4f46e5);
  color: white;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}

.comment-sort {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-select {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-main);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.comment-main-form {
  margin-bottom: 32px;
}

.comments-section {
  margin-top: 24px;
}

.comment-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.stat-item {
  font-size: 13px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-comments {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text-main);
}

.empty-desc {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

.load-more {
  margin-top: 24px;
  text-align: center;
}

.btn {
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-ghost {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-main);
}

.btn-ghost:hover:not(:disabled) {
  background: rgba(37, 99, 235, 0.1);
  border-color: var(--primary);
}

.btn-ghost:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .comment-list-container {
    padding: 16px;
  }
  
  .comment-list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .comment-stats {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .stat-item {
    font-size: 12px;
  }
}
</style>