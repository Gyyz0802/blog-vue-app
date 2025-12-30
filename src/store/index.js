import { createStore } from 'vuex'

export default createStore({
  state: {
    theme: localStorage.getItem('theme') || 'light',
    isAuthenticated: !!localStorage.getItem('isAuthenticated'),
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme
      localStorage.setItem('theme', theme)
    },
    SET_AUTH(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
      localStorage.setItem('isAuthenticated', isAuthenticated)
    },
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    LOGOUT(state) {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
    }
  },
  actions: {
    login({ commit }, userData) {
      // 模拟登录逻辑
      commit('SET_AUTH', true)
      commit('SET_USER', userData)
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark'
      commit('SET_THEME', newTheme)
    }
  }
})