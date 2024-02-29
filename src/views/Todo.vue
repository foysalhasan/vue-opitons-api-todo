<template>
  <div :class="{ 'border-b-2 border-dashed border-gray-400 pb-3': filteredTodo.length === 0 }" class="flex justify-center gap-10 my-6">
    <button @click="handleFilter('all')" :class="setActiveFilter('all')" class="text-sm uppercase font-semibold">ALL</button>
    <button @click="handleFilter('running')" :class="setActiveFilter('running')" class="text-sm uppercase font-semibold">IN PROGRESS</button>
    <button @click="handleFilter('done')" :class="setActiveFilter('done')" class="text-sm uppercase font-semibold">COMPLETED</button>
  </div>
  <div v-if="isLoading" class="mx-auto flex justify-center">
    <FadeLoader />
  </div>
  <div v-else>
    <TodoCardVue v-for="todo in filteredTodo" :key="todo.id" :todo="todo" @delete="handleDelete" @check="handleCheck" />
    <p class="text-center font-bold text-lg uppercase text-pink-600" v-if="filteredTodo.length === 0">
      {{ filter === 'done' ? 'no to do is completed !' : filter === 'running' ? 'no to do is in progress !' : 'your todo list is empty !' }}
    </p>
  </div>
</template>

<script>
import { supabase } from '../lib/supabaseClient'
import TodoCardVue from '@/components/TodoCard.vue'
import FadeLoader from '../components/FadeLoader.vue'

export default {
  components: { TodoCardVue, FadeLoader },
  data() {
    return {
      todos: [],
      filter: 'all',
      isLoading: false,
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
    handleDelete(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },
    handleCheck(id) {
      this.todos = this.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    },

    // SUPABASE TODO
    async fetchTodo() {
      this.isLoading = true
      const { data } = await supabase.from('todos').select()
      if (data) {
        this.isLoading = false
        this.todos = data
      }
    },
  },
  mounted() {
    this.fetchTodo()
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
