<!-- CommentReply.vue -->
<template>
  <div class="comment-reply-container">
    <!-- 回复按钮 -->
    <button
      v-if="!isReplying"
      class="btn-reply"
      @click="startReply"
      :title="`回复 ${replyToName}`"
    >
      <span class="reply-icon">💬</span>
      <span class="reply-text">回复</span>
    </button>

    <!-- 回复表单 -->
    <div v-if="isReplying" class="reply-form-wrapper">
      <div class="reply-form-header">
        <span class="reply-to-info">
          回复给 <strong>{{ replyToName }}</strong>
        </span>
        <button class="btn-close" @click="cancelReply" title="关闭">
          ✕
        </button>
      </div>
      
      <CommentForm
        :post-id="postId"
        :parent-id="parentId"
        :is-reply="true"
        :reply-to="replyToName"
        @submit="handleSubmit"
        @cancel="cancelReply"
        ref="replyFormRef"
      />
    </div>

    <!-- 已有的回复列表 -->
    <div v-if="replies.length > 0" class="existing-replies">
      <div class="replies-title">
        <span class="title-icon">↪️</span>
        <span class="title-text">{{ replies.length }} 条回复</span>
      </div>
      <div class="replies-list">
        <CommentItem
          v-for="reply in replies"
          :key="reply.id"
          :comment="reply"
          :post-id="postId"
          @reply-submitted="onReplySubmitted"
        />
      </div>
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
  },
  parentId: {
    type: [String, Number],
    required: true
  },
  replyToName: {
    type: String,
    required: true
  },
  replyToId: {
    type: [String, Number],
    default: null
  },
  autoLoadReplies: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['reply-submitted', 'cancel'])

// 响应式状态
const isReplying = ref(false)
const replies = ref([])
const replyFormRef = ref(null)

// 计算属性
const hasReplies = computed(() => replies.value.length > 0)

// 加载回复
const loadReplies = () => {
  try {
    const allComments = JSON.parse(localStorage.getItem(`comments_${props.postId}`)) || []
    replies.value = allComments.filter(
      comment => comment.parentId === props.parentId
    )
  } catch (error) {
    console.error('加载回复失败:', error)
  }
}

// 开始回复
const startReply = () => {
  isReplying.value = true
  // 滚动到回复表单位置
  setTimeout(() => {
    if (replyFormRef.value?.$el) {
      replyFormRef.value.$el.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      })
    }
  }, 100)
}

// 取消回复
const cancelReply = () => {
  isReplying.value = false
  emit('cancel')
}

// 处理回复提交
const handleSubmit = (commentData) => {
  isReplying.value = false
  
  // 如果是回复当前评论的作者，重新加载回复列表
  if (commentData.parentId === props.parentId) {
    loadReplies()
  }
  
  emit('reply-submitted', commentData)
}

// 处理子回复提交
const onReplySubmitted = () => {
  loadReplies()
  emit('reply-submitted')
}

// 公开方法，供父组件调用
defineExpose({
  loadReplies,
  startReply,
  cancelReply
})

// 初始化
onMounted(() => {
  if (props.autoLoadReplies) {
    loadReplies()
  }
})

// 监听 parentId 变化
watch(() => props.parentId, () => {
  loadReplies()
})
</script>

<style scoped>
.comment-reply-container {
  margin-top: 12px;
}

.btn-reply {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-reply:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(37, 99, 235, 0.05);
}

.reply-icon {
  font-size: 14px;
}

.reply-text {
  font-weight: 500;
}

.reply-form-wrapper {
  margin-top: 12px;
  padding: 16px;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reply-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-light);
}

.reply-to-info {
  font-size: 14px;
  color: var(--text-muted);
}

.reply-to-info strong {
  color: var(--text-main);
  font-weight: 600;
}

.btn-close {
  padding: 4px 8px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
  line-height: 1;
  transition: all 0.2s ease;
}

.btn-close:hover {
  color: var(--text-main);
  background: rgba(0, 0, 0, 0.05);
}

.existing-replies {
  margin-top: 16px;
  padding-left: 20px;
  position: relative;
}

.existing-replies::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-light);
  border-radius: 1px;
}

.replies-title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-light);
}

.title-icon {
  font-size: 14px;
}

.title-text {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.replies-list {
  margin-left: 8px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .reply-form-wrapper {
    padding: 12px;
  }
  
  .existing-replies {
    padding-left: 16px;
  }
  
  .replies-title {
    font-size: 12px;
  }
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
  .reply-form-wrapper {
    background: var(--bg-elevated);
  }
  
  .btn-close:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}
</style>