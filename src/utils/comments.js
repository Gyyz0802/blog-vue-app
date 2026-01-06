// 评论数据管理工具
export const commentUtils = {
  // 获取文章的所有评论
  getCommentsByPostId(postId) {
    try {
      const comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || []
      return comments
    } catch (error) {
      console.error('获取评论失败:', error)
      return []
    }
  },
  
  // 添加新评论
  addComment(postId, commentData) {
    try {
      const comments = this.getCommentsByPostId(postId)
      const newComment = {
        ...commentData,
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        timestamp: new Date().toISOString(),
        likes: 0
      }
      
      comments.push(newComment)
      localStorage.setItem(`comments_${postId}`, JSON.stringify(comments))
      
      return newComment
    } catch (error) {
      console.error('添加评论失败:', error)
      throw error
    }
  },
  
  // 删除评论
  deleteComment(postId, commentId) {
    try {
      const comments = this.getCommentsByPostId(postId)
      const filteredComments = comments.filter(comment => comment.id !== commentId)
      localStorage.setItem(`comments_${postId}`, JSON.stringify(filteredComments))
      return true
    } catch (error) {
      console.error('删除评论失败:', error)
      return false
    }
  },
  
  // 更新评论
  updateComment(postId, commentId, updates) {
    try {
      const comments = this.getCommentsByPostId(postId)
      const index = comments.findIndex(comment => comment.id === commentId)
      
      if (index !== -1) {
        comments[index] = { ...comments[index], ...updates }
        localStorage.setItem(`comments_${postId}`, JSON.stringify(comments))
        return comments[index]
      }
      
      return null
    } catch (error) {
      console.error('更新评论失败:', error)
      throw error
    }
  },
  
  // 点赞/取消点赞评论
  toggleLike(postId, commentId) {
    try {
      const comments = this.getCommentsByPostId(postId)
      const index = comments.findIndex(comment => comment.id === commentId)
      
      if (index !== -1) {
        const currentLikes = comments[index].likes || 0
        const likedComments = JSON.parse(localStorage.getItem('liked_comments')) || []
        const isLiked = likedComments.includes(commentId)
        
        if (isLiked) {
          // 取消点赞
          comments[index].likes = currentLikes - 1
          const likeIndex = likedComments.indexOf(commentId)
          likedComments.splice(likeIndex, 1)
        } else {
          // 点赞
          comments[index].likes = currentLikes + 1
          likedComments.push(commentId)
        }
        
        localStorage.setItem(`comments_${postId}`, JSON.stringify(comments))
        localStorage.setItem('liked_comments', JSON.stringify(likedComments))
        
        return comments[index].likes
      }
      
      return 0
    } catch (error) {
      console.error('切换点赞状态失败:', error)
      throw error
    }
  },
  
  // 获取评论统计
  getCommentStats(postId) {
    try {
      const comments = this.getCommentsByPostId(postId)
      const topLevelComments = comments.filter(comment => !comment.parentId)
      const replies = comments.filter(comment => comment.parentId)
      const totalLikes = comments.reduce((sum, comment) => sum + (comment.likes || 0), 0)
      
      return {
        totalComments: topLevelComments.length,
        totalReplies: replies.length,
        totalLikes,
        comments
      }
    } catch (error) {
      console.error('获取评论统计失败:', error)
      return {
        totalComments: 0,
        totalReplies: 0,
        totalLikes: 0,
        comments: []
      }
    }
  },
  
  // 清空文章的所有评论
  clearComments(postId) {
    try {
      localStorage.removeItem(`comments_${postId}`)
      return true
    } catch (error) {
      console.error('清空评论失败:', error)
      return false
    }
  },
  
  // 导出评论数据
  exportComments(postId) {
    try {
      const comments = this.getCommentsByPostId(postId)
      const dataStr = JSON.stringify(comments, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
      
      return dataUri
    } catch (error) {
      console.error('导出评论失败:', error)
      return null
    }
  },
  
  // 导入评论数据
  importComments(postId, jsonData) {
    try {
      const comments = JSON.parse(jsonData)
      localStorage.setItem(`comments_${postId}`, JSON.stringify(comments))
      return true
    } catch (error) {
      console.error('导入评论失败:', error)
      return false
    }
  }
}