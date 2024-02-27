<template>
  <div :class="{ 'border-b-2 border-dashed border-gray-400 pb-3': filteredTodo.length === 0 }" class="flex justify-center gap-10 my-6">
    <button @click="handleFilter('all')" :class="setActiveFilter('all')" class="text-sm uppercase font-semibold">ALL</button>
    <button @click="handleFilter('running')" :class="setActiveFilter('running')" class="text-sm uppercase font-semibold">IN PROGRESS</button>
    <button @click="handleFilter('done')" :class="setActiveFilter('done')" class="text-sm uppercase font-semibold">COMPLETED</button>
  </div>
  <TodoCardVue v-for="todo in filteredTodo" :key="todo.id" :todo="todo" :uri="uri" @delete="handleDelete" @check="handleCheck" />
  <p class="text-center font-bold text-lg uppercase text-pink-600" v-if="filteredTodo.length === 0">
    {{ filter === 'done' ? 'no to do is completed !' : filter === 'running' ? 'no to do is in progress !' : 'your todo list is empty !' }}
  </p>
</template>

<script>
import axios from 'axios'
import TodoCardVue from '@/components/TodoCard.vue'

export default {
  components: { TodoCardVue },
  data() {
    return {
      todos: [],
      uri: 'http://localhost:3000/todo/',
      filter: 'all',
    }
  },
  methods: {
    handleFilter(value) {
      this.filter = value
    },
    setActiveFilter(val) {
      if (this.filter === val) {
        if (val === 'all') return 'text-amber-600'
        if (val === 'running') return 'text-rose-600'
        if (val === 'done') return 'text-emerald-600'
      } else {
        return 'text-gray-400'
      }
    },
    async fetchTodo(url) {
      try {
        const { data } = await axios.get(url)
        this.todos = data
      } catch (err) {
        console.log(err)
      }
    },
    handleDelete(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },
    handleCheck(id) {
      this.todos = this.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    },
  },
  mounted() {
    this.fetchTodo(this.uri)
  },
  computed: {
    filteredTodo() {
      if (this.filter === 'running') {
        return this.todos.filter((todo) => todo.completed === false)
      }
      if (this.filter === 'done') {
        return this.todos.filter((todo) => todo.completed === true)
      }
      return this.todos.sort((a, b) => a.completed - b.completed)
    },
  },
}
</script>

<style></style>
