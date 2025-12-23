import { createRouter, createWebHistory } from 'vue-router'

// 使用懒加载导入组件
const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const Archive = () => import('../views/Archive.vue')
const Categories = () => import('../views/Categories.vue')
const Tags = () => import('../views/Tags.vue')
const Friends = () => import('../views/Friends.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Settings = () => import('../views/Settings.vue')
const PostDetail = () => import('../views/PostDetail.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return savedPosition || { top: 0 }
  }
})

export default router