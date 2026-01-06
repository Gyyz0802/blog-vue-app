<template>
  <div class="comment-form-container">
    <h3 class="comment-form-title">{{ isReply ? '回复评论' : '发表评论' }}</h3>
    
    <form @submit.prevent="handleSubmit" class="comment-form">
      <!-- 如果是游客，显示姓名和邮箱 -->
      <div v-if="!isAuthenticated" class="guest-info">
        <div class="form-row">
          <div class="form-group">
            <label for="authorName" class="form-label">姓名 *</label>
            <input
              v-model="form.authorName"
              type="text"
              id="authorName"
              class="form-input"
              placeholder="请输入您的姓名"
              required
              :disabled="isSubmitting"
            />
          </div>
          
          <div class="form-group">
            <label for="authorEmail" class="form-label">邮箱 *</label>
            <input
              v-model="form.authorEmail"
              type="email"
              id="authorEmail"
              class="form-input"
              placeholder="请输入您的邮箱"
              required
              :disabled="isSubmitting"
            />
          </div>
        </div>
      </div>
      
      <!-- 评论内容 -->
      <div class="form-group">
        <label for="content" class="form-label">评论内容 *</label>
        <textarea
          v-model="form.content"
          id="content"
          class="form-textarea"
          :rows="isReply ? 3 : 5"
          :placeholder="isReply ? '写下您的回复...' : '写下您的评论...'"
          required
          :disabled="isSubmitting"
        ></textarea>
        <div class="char-count">{{ form.content.length }}/500</div>
      </div>
      
      <!-- 表情选择（可选） -->
      <div class="emoji-picker" v-if="showEmojiPicker">
        <div class="emoji-grid">
          <span
            v-for="emoji in commonEmojis"
            :key="emoji"
            class="emoji-item"
            @click="addEmoji(emoji)"
          >
            {{ emoji }}
          </span>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="form-actions">
        <button
          type="button"
          class="btn btn-ghost btn-sm"
          @click="toggleEmojiPicker"
          :disabled="isSubmitting"
        >
          {{ showEmojiPicker ? '收起表情' : '😊 表情' }}
        </button>
        
        <div class="action-buttons">
          <button
            type="button"
            class="btn btn-ghost"
            @click="handleCancel"
            :disabled="isSubmitting"
          >
            取消
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isSubmitting || !canSubmit"
          >
            {{ isSubmitting ? '提交中...' : isReply ? '回复' : '发表评论' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const props = defineProps({
  postId: {
    type: [String, Number],
    required: true
  },
  parentId: {
    type: [String, Number],
    default: null
  },
  isReply: {
    type: Boolean,
    default: false
  },
  replyTo: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['submit', 'cancel'])

// 表单数据
const form = reactive({
  authorName: '',
  authorEmail: '',
  content: ''
})

const isSubmitting = ref(false)
const showEmojiPicker = ref(false)

// 从 localStorage 获取已登录用户信息
const user = ref(JSON.parse(localStorage.getItem('user')) || null)
const isAuthenticated = computed(() => !!localStorage.getItem('isAuthenticated'))

// 常用表情
const commonEmojis = ref([
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
  '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
  '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
  '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
  '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖',
  '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡',
  '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰',
  '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶',
  '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮',
  '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴',
  '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠',
  '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀',
  '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹',
  '😻', '😼', '😽', '🙀', '😿', '😾'
])

// 计算属性：是否可以提交
const canSubmit = computed(() => {
  if (!isAuthenticated.value) {
    return form.authorName.trim() && 
           form.authorEmail.trim() && 
           form.content.trim() &&
           form.content.length <= 500
  }
  return form.content.trim() && form.content.length <= 500
})

// 填充已登录用户信息
onMounted(() => {
  if (isAuthenticated.value && user.value) {
    form.authorName = user.value.username || user.value.displayName || '用户'
    form.authorEmail = user.value.email || ''
  }
})

// 处理表情选择
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

const addEmoji = (emoji) => {
  form.content += emoji
  showEmojiPicker.value = false
}

// 处理表单提交
const handleSubmit = async () => {
  if (!canSubmit.value) return
  
  isSubmitting.value = true
  
  try {
    const commentData = {
      postId: props.postId,
      parentId: props.parentId,
      authorName: form.authorName.trim(),
      authorEmail: form.authorEmail.trim(),
      content: form.content.trim(),
      timestamp: new Date().toISOString(),
      isAuthenticated: isAuthenticated.value,
      userId: user.value?.id || null
    }
    
    // 保存评论到 localStorage
    saveComment(commentData)
    
    // 清空表单
    resetForm()
    
    // 通知父组件
    emit('submit', commentData)
    
  } catch (error) {
    console.error('提交评论失败:', error)
    alert('提交失败，请稍后重试')
  } finally {
    isSubmitting.value = false
  }
}

// 保存评论到 localStorage
const saveComment = (commentData) => {
  try {
    // 生成唯一ID
    const commentId = Date.now().toString(36) + Math.random().toString(36).substr(2)
    commentData.id = commentId
    
    // 获取现有评论
    const existingComments = JSON.parse(localStorage.getItem(`comments_${props.postId}`)) || []
    
    // 添加新评论
    existingComments.push(commentData)
    
    // 保存回 localStorage
    localStorage.setItem(`comments_${props.postId}`, JSON.stringify(existingComments))
    
    console.log('评论已保存:', commentData)
  } catch (error) {
    console.error('保存评论失败:', error)
    throw error
  }
}

// 重置表单
const resetForm = () => {
  form.content = ''
  if (!isAuthenticated.value) {
    form.authorName = ''
    form.authorEmail = ''
  }
  showEmojiPicker.value = false
}

// 处理取消
const handleCancel = () => {
  resetForm()
  emit('cancel')
}
</script>

<style scoped>
.comment-form-container {
  margin: 24px 0;
  padding: 20px;
  border-radius: 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-soft);
}

.comment-form-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text-main);
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.guest-info {
  margin-bottom: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-main);
}

.form-input,
.form-textarea {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-main);
  font-size: 14px;
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.form-input:disabled,
.form-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.char-count {
  font-size: 12px;
  color: var(--text-subtle);
  text-align: right;
  margin-top: 4px;
}

.emoji-picker {
  margin-top: 8px;
  padding: 12px;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  max-height: 200px;
  overflow-y: auto;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
}

@media (max-width: 640px) {
  .emoji-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

.emoji-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;
  user-select: none;
}

.emoji-item:hover {
  transform: scale(1.2);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.action-buttons {
  display: flex;
  gap: 8px;
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

.btn-primary {
  background: linear-gradient(135deg, var(--primary), #4f46e5);
  color: white;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-ghost {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-main);
}

.btn-ghost:hover:not(:disabled) {
  background: rgba(37, 99, 235, 0.1);
}

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
}
</style>