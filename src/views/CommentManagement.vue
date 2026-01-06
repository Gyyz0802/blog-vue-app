<template>
  <div class="site-main">
    <div class="site-container">
      <div class="section-title-row">
        <div>
          <h2>评论管理</h2>
          <p class="section-subtitle">管理所有文章的评论</p>
        </div>
      </div>

      <div class="comment-management">
        <!-- 文章筛选 -->
        <div class="filter-section card">
          <div class="filter-row">
            <div class="filter-group">
              <label for="postFilter" class="filter-label">文章筛选</label>
              <select v-model="selectedPostId" id="postFilter" class="filter-select">
                <option value="all">所有文章</option>
                <option v-for="post in posts" :key="post.id" :value="post.id">
                  {{ post.title }}
                </option>
              </select>
            </div>
            
            <div class="filter-group">
              <label for="statusFilter" class="filter-label">状态筛选</label>
              <select v-model="statusFilter" id="statusFilter" class="filter-select">
                <option value="all">全部</option>
                <option value="pending">待审核</option>
                <option value="approved">已通过</option>
                <option value="spam">垃圾评论</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label for="searchFilter" class="filter-label">关键词搜索</label>
              <input
                v-model="searchKeyword"
                type="text"
                id="searchFilter"
                class="filter-input"
                placeholder="搜索评论内容或作者..."
              />
            </div>
          </div>
        </div>

        <!-- 评论列表 -->
        <div class="comments-list card">
          <div class="list-header">
            <h3>评论列表</h3>
            <div class="list-stats">
              <span class="stat-item">总计: {{ filteredComments.length }}</span>
              <span class="stat-item">待审核: {{ pendingCount }}</span>
              <span class="stat-item">垃圾评论: {{ spamCount }}</span>
            </div>
          </div>

          <div v-if="filteredComments.length > 0" class="comments-container">
            <div
              v-for="comment in paginatedComments"
              :key="comment.id"
              class="comment-row"
              :class="{
                'is-pending': comment.status === 'pending',
                'is-spam': comment.status === 'spam',
                'is-reply': comment.parentId
              }"
            >
              <div class="comment-info">
                <div class="comment-author">
                  <div class="author-avatar">
                    {{ comment.authorName.charAt(0).toUpperCase() }}
                  </div>
                  <div class="author-details">
                    <span class="author-name">{{ comment.authorName }}</span>
                    <span class="author-email">{{ comment.authorEmail }}</span>
                  </div>
                </div>
                
                <div class="comment-meta">
                  <span class="meta-item">
                    <strong>文章:</strong> {{ getPostTitle(comment.postId) }}
                  </span>
                  <span class="meta-item">
                    <strong>时间:</strong> {{ formatDate(comment.timestamp) }}
                  </span>
                  <span class="meta-item">
                    <strong>点赞:</strong> {{ comment.likes || 0 }}
                  </span>
                  <span v-if="comment.parentId" class="meta-item">
                    <strong>类型:</strong> 回复
                  </span>
                </div>
                
                <div class="comment-content">
                  {{ comment.content }}
                </div>
              </div>

              <div class="comment-actions">
                <select
                  v-model="comment.status"
                  class="status-select"
                  @change="updateCommentStatus(comment)"
                >
                  <option value="pending">待审核</option>
                  <option value="approved">通过</option>
                  <option value="spam">垃圾</option>
                </select>
                
                <button
                  class="btn-action view-post"
                  @click="viewPost(comment.postId)"
                  title="查看文章"
                >
                  📄
                </button>
                
                <button
                  class="btn-action delete-comment"
                  @click="deleteComment(comment)"
                  title="删除评论"
                >
                  🗑️
                </button>
                
                <button
                  v-if="comment.status === 'spam'"
                  class="btn-action restore-comment"
                  @click="restoreComment(comment)"
                  title="恢复评论"
                >
                  ↩️
                </button>
              </div>
            </div>
          </div>

          <div v-else class="empty-state">
            <div class="empty-icon">💬</div>
            <h4>暂无评论</h4>
            <p>还没有任何评论或没有匹配的筛选结果</p>
          </div>

          <!-- 分页 -->
          <div v-if="filteredComments.length > pageSize" class="pagination">
            <button
              class="pagination-btn"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              上一页
            </button>
            
            <span class="page-info">
              第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
            </span>
            
            <button
              class="pagination-btn"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              下一页
            </button>
          </div>
        </div>

        <!-- 批量操作 -->
        <div class="bulk-actions card">
          <div class="bulk-header">
            <h4>批量操作</h4>
          </div>
          
          <div class="bulk-buttons">
            <button
              class="btn btn-primary btn-sm"
              @click="bulkApprove"
              :disabled="selectedComments.length === 0"
            >
              批量通过 ({{ selectedComments.length }})
            </button>
            
            <button
              class="btn btn-danger btn-sm"
              @click="bulkMarkAsSpam"
              :disabled="selectedComments.length === 0"
            >
              批量标记为垃圾 ({{ selectedComments.length }})
            </button>
            
            <button
              class="btn btn-ghost btn-sm"
              @click="bulkDelete"
              :disabled="selectedComments.length === 0"
            >
              批量删除 ({{ selectedComments.length }})
            </button>
            
            <button
              class="btn btn-ghost btn-sm"
              @click="selectAllComments"
            >
              全选
            </button>
            
            <button
              class="btn btn-ghost btn-sm"
              @click="clearSelection"
            >
              清空选择
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { commentUtils } from '../utils/comments'

const router = useRouter()

// 响应式状态
const selectedPostId = ref('all')
const statusFilter = ref('all')
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = 10
const selectedComments = ref([])
const allComments = ref([])

// 模拟文章数据
const posts = ref([
  { id: 1, title: '用 Vue 3 + TypeScript 搭建你的第一个个人博客' },
  { id: 2, title: '我如何用 AI 提升开发效率 3 倍' },
  { id: 3, title: '从 0 到 1 做一个小产品的完整过程' },
  { id: 4, title: '现代前端项目的目录结构实践' }
])

// 计算属性
const filteredComments = computed(() => {
  let filtered = allComments.value
  
  // 按文章筛选
  if (selectedPostId.value !== 'all') {
    filtered = filtered.filter(comment => comment.postId.toString() === selectedPostId.value.toString())
  }
  
  // 按状态筛选
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(comment => comment.status === statusFilter.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(comment =>
      comment.content.toLowerCase().includes(keyword) ||
      comment.authorName.toLowerCase().includes(keyword) ||
      comment.authorEmail.toLowerCase().includes(keyword)
    )
  }
  
  return filtered
})

const paginatedComments = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return filteredComments.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(filteredComments.value.length / pageSize)
})

const pendingCount = computed(() => {
  return allComments.value.filter(comment => comment.status === 'pending').length
})

const spamCount = computed(() => {
  return allComments.value.filter(comment => comment.status === 'spam').length
})

// 方法
const loadAllComments = () => {
  try {
    allComments.value = []
    
    // 遍历所有文章获取评论
    posts.value.forEach(post => {
      const postComments = commentUtils.getCommentsByPostId(post.id)
      postComments.forEach(comment => {
        allComments.value.push({
          ...comment,
          postId: post.id,
          status: comment.status || 'approved' // 默认为已通过
        })
      })
    })
    
    console.log(`加载了 ${allComments.value.length} 条评论`)
  } catch (error) {
    console.error('加载评论失败:', error)
  }
}

const getPostTitle = (postId) => {
  const post = posts.value.find(p => p.id.toString() === postId.toString())
  return post ? post.title : '未知文章'
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const updateCommentStatus = (comment) => {
  try {
    commentUtils.updateComment(comment.postId, comment.id, { status: comment.status })
    console.log(`更新评论 ${comment.id} 状态为 ${comment.status}`)
  } catch (error) {
    console.error('更新评论状态失败:', error)
  }
}

const deleteComment = (comment) => {
  if (confirm(`确定要删除这条评论吗？\n作者: ${comment.authorName}\n内容: ${comment.content.substring(0, 50)}...`)) {
    try {
      commentUtils.deleteComment(comment.postId, comment.id)
      loadAllComments()
      console.log(`已删除评论 ${comment.id}`)
    } catch (error) {
      console.error('删除评论失败:', error)
    }
  }
}

const restoreComment = (comment) => {
  try {
    commentUtils.updateComment(comment.postId, comment.id, { status: 'approved' })
    comment.status = 'approved'
    console.log(`已恢复评论 ${comment.id}`)
  } catch (error) {
    console.error('恢复评论失败:', error)
  }
}

const viewPost = (postId) => {
  router.push(`/post/${postId}`)
}

const bulkApprove = () => {
  if (selectedComments.value.length === 0) return
  
  if (confirm(`确定要通过选中的 ${selectedComments.value.length} 条评论吗？`)) {
    selectedComments.value.forEach(comment => {
      updateCommentStatus({ ...comment, status: 'approved' })
    })
    clearSelection()
    loadAllComments()
  }
}

const bulkMarkAsSpam = () => {
  if (selectedComments.value.length === 0) return
  
  if (confirm(`确定要将选中的 ${selectedComments.value.length} 条评论标记为垃圾吗？`)) {
    selectedComments.value.forEach(comment => {
      updateCommentStatus({ ...comment, status: 'spam' })
    })
    clearSelection()
    loadAllComments()
  }
}

const bulkDelete = () => {
  if (selectedComments.value.length === 0) return
  
  if (confirm(`确定要删除选中的 ${selectedComments.value.length} 条评论吗？此操作不可恢复。`)) {
    selectedComments.value.forEach(comment => {
      commentUtils.deleteComment(comment.postId, comment.id)
    })
    clearSelection()
    loadAllComments()
  }
}

const selectAllComments = () => {
  selectedComments.value = [...filteredComments.value]
}

const clearSelection = () => {
  selectedComments.value = []
}

// 初始化
onMounted(() => {
  loadAllComments()
})
</script>

<style scoped>
.comment-management {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.filter-section {
  padding: 20px;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-main);
}

.filter-select,
.filter-input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-main);
  font-size: 14px;
}

.filter-select:focus,
.filter-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.comments-list {
  padding: 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.list-header h3 {
  margin: 0;
  font-size: 18px;
  color: var(--text-main);
}

.list-stats {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--text-muted);
}

.comments-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  transition: all 0.3s ease;
}

.comment-row:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.comment-row.is-pending {
  border-left: 4px solid #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.comment-row.is-spam {
  border-left: 4px solid #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.comment-row.is-reply {
  margin-left: 24px;
  position: relative;
}

.comment-row.is-reply::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  width: 12px;
  height: 2px;
  background: var(--border);
}

.comment-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comment-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), #4f46e5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
  flex-shrink: 0;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-weight: 600;
  color: var(--text-main);
  font-size: 14px;
}

.author-email {
  font-size: 12px;
  color: var(--text-subtle);
}

.comment-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: var(--text-muted);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.comment-content {
  font-size: 14px;
  color: var(--text-main);
  line-height: 1.5;
  margin-top: 4px;
}

.comment-actions {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.status-select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-main);
  font-size: 12px;
  cursor: pointer;
}

.btn-action {
  padding: 6px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.btn-action:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(37, 99, 235, 0.1);
}

.btn-action.delete-comment:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h4 {
  margin: 0 0 8px 0;
  color: var(--text-main);
}

.empty-state p {
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-main);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(37, 99, 235, 0.1);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: var(--text-muted);
}

.bulk-actions {
  padding: 20px;
}

.bulk-header {
  margin-bottom: 16px;
}

.bulk-header h4 {
  margin: 0;
  color: var(--text-main);
  font-size: 16px;
}

.bulk-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
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

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
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

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
}

@media (max-width: 768px) {
  .filter-row {
    grid-template-columns: 1fr;
  }
  
  .comment-row {
    flex-direction: column;
    gap: 12px;
  }
  
  .comment-actions {
    align-self: flex-end;
  }
  
  .bulk-buttons {
    flex-direction: column;
  }
  
  .bulk-buttons .btn {
    width: 100%;
  }
}
</style>