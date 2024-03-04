import { createRouter, createWebHistory } from 'vue-router'
import Blog from '../views/Blog.vue'
import CreateBlog from '../views/CreateBlog.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Blog,
    },
    {
      name: 'create-blog',
      path: '/create-blog',
      component: CreateBlog,
    },
  ],
})
export default router
