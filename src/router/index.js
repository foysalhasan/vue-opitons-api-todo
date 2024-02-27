import { createRouter, createWebHistory } from 'vue-router'
import Todo from '../views/Todo.vue'
import CreateTodo from '../views/CreateTodo.vue'
import UpdateTodo from '../views/UpdateTodo.vue'
const routes = [
  {
    path: '/',
    name: 'todo',
    component: Todo,
  },
  {
    path: '/create',
    name: 'createTodo',
    component: CreateTodo,
  },
  {
    path: '/update/:id',
    name: 'updateTodo',
    component: UpdateTodo,
    props: true,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
