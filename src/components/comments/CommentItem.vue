<!-- CommentItem.vue -->
<template>
  <article class="comment-item" :class="{ 'has-reply': hasReplies }">
    <div class="comment-header">
      <div class="comment-author">
        <div class="author-avatar">
          {{ authorInitial }}
        </div>
        <div class="author-info">
          <span class="author-name">{{ comment.authorName }}</span>
          <span v-if="comment.isAuthenticated" class="author-badge">作者</span>
          <span class="comment-time">{{ formattedTime }}</span>
        </div>
      </div>
      
      <div class="comment-actions">
        <button
          class="btn-action"
          @click="toggleLike"
          :class="{ liked: isLiked }"
          :title="isLiked ? '取消点赞' : '点赞'"
        >
          {{ isLiked ? '❤️' : '🤍' }} {{ likeCount }}
        </button>
      </div>
    </div>
    
    <div class="comment-content">
      <p>{{ comment.content }}</p>
    </div>
    
    <!-- 使用 CommentReply 组件 -->
    <CommentReply
      :post-id="postId"
      :parent-id="comment.id"
      :reply-to-name="comment.authorName"
      @reply-submitted="handleReplySubmit"
    />
    
    <!-- 子评论（回复） -->
    <div v-if="hasReplies" class="comment-replies">
      <div class="replies-indicator"></div>
      <div class="replies-list">
        <CommentItem
          v-for="reply in childComments"
          :key="reply.id"
          :comment="reply"
          :post-id="postId"
          @reply-submitted="handleChildReply"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CommentReply from './CommentReply.vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  postId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['reply-submitted'])

// 响应式状态
const isLiked = ref(false)
const likeCount = ref(props.comment.likes || 0)
const childComments = ref([])

// 计算属性
const authorInitial = computed(() => {
  return props.comment.authorName.charAt(0).toUpperCase()
})

const formattedTime = computed(() => {
  const date = new Date(props.comment.timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  
  if (diffInMinutes < 1) return '刚刚'
  if (diffInMinutes < 60) return `${diffInMinutes}分钟前`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}小时前`
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}天前`
  
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const hasReplies = computed(() => {
  return childComments.value.length > 0
})

// 检查点赞状态
const checkLikeStatus = () => {
  const likedComments = JSON.parse(localStorage.getItem('liked_comments')) || []
  isLiked.value = likedComments.includes(props.comment.id)
}

// 加载子评论
const loadReplies = () => {
  try {
    const allComments = JSON.parse(localStorage.getItem(`comments_${props.postId}`)) || []
    childComments.value = allComments.filter(
      comment => comment.parentId === props.comment.id
    )
  } catch (error) {
    console.error('加载回复失败:', error)
  }
}

// 切换点赞
const toggleLike = () => {
  try {
    const likedComments = JSON.parse(localStorage.getItem('liked_comments')) || []
    
    if (isLiked.value) {
      // 取消点赞
      likeCount.value--
      const index = likedComments.indexOf(props.comment.id)
      if (index > -1) {
        likedComments.splice(index, 1)
      }
    } else {
      // 点赞
      likeCount.value++
      likedComments.push(props.comment.id)
    }
    
    // 保存到 localStorage
    localStorage.setItem('liked_comments', JSON.stringify(likedComments))
    
    // 更新当前评论的点赞数
    const allComments = JSON.parse(localStorage.getItem(`comments_${props.postId}`)) || []
    const commentIndex = allComments.findIndex(c => c.id === props.comment.id)
    if (commentIndex > -1) {
      allComments[commentIndex].likes = likeCount.value
      localStorage.setItem(`comments_${props.postId}`, JSON.stringify(allComments))
    }
    
    // 更新状态
    isLiked.value = !isLiked.value
  } catch (error) {
    console.error('更新点赞失败:', error)
  }
}

// 处理回复提交
const handleReplySubmit = () => {
  loadReplies() // 重新加载回复
  emit('reply-submitted')
}

// 处理子评论的回复提交
const handleChildReply = () => {
  loadReplies() // 重新加载回复
  emit('reply-submitted')
}

// 初始化
onMounted(() => {
  loadReplies() // 加载初始回复
  checkLikeStatus()
})
</script>

<style scoped>
/* 保持原有的样式不变 */
.comment-item {
  padding: 16px;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.comment-item:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.comment-item.has-reply {
  margin-bottom: 0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.comment-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), #4f46e5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-weight: 600;
  color: var(--text-main);
  font-size: 14px;
}

.author-badge {
  display: inline-block;
  padding: 2px 6px;
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 6px;
  font-weight: 500;
}

.comment-time {
  font-size: 12px;
  color: var(--text-subtle);
}

.comment-actions {
  display: flex;
  gap: 8px;
}

.btn-action {
  padding: 4px 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.btn-action:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(37, 99, 235, 0.1);
}

.btn-action.liked {
  color: #e74c3c;
  border-color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
}

.comment-content {
  margin: 12px 0;
  color: var(--text-main);
  line-height: 1.6;
  font-size: 14px;
}

.comment-content p {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.comment-replies {
  margin-top: 16px;
  padding-left: 20px;
  position: relative;
}

.replies-indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
  border-radius: 1px;
}

.replies-list {
  margin-left: 8px;
}

@media (max-width: 640px) {
  .comment-header {
    flex-direction: column;
    gap: 8px;
  }
  
  .comment-actions {
    align-self: flex-end;
  }
  
  .comment-replies {
    padding-left: 12px;
  }
}
</style>