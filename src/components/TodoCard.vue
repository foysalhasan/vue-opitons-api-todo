<template>
  <div class="bg-white p-4 shadow-sm border-l-4 rounded-md mb-5" :class="checkTodoCompleted()">
    <div class="flex justify-between items-center">
      <h4 @click="showDesc = !showDesc" class="text-gray-800 text-sm lg:text-lg uppercase font-bold cursor-pointer hover:text-amber-600">{{ todo.title }}</h4>
      <div class="flex gap-1">
        <router-link :to="{ name: 'updateTodo', params: { id: todo.id } }">
          <span
            class="cursor-pointer text-amber-400 hover:text-amber-600 material-symbols-outlined flex items-center text-[16px] justify-center bg-amber-100/50 w-8 h-8 rounded-full"
          >
            edit
          </span>
        </router-link>

        <span
          @click="deleteTodo(todo.id)"
          class="cursor-pointer text-[16px] text-rose-400 hover:text-rose-600 material-symbols-outlined flex items-center justify-center bg-rose-100/50 w-8 h-8 rounded-full"
        >
          delete
        </span>
        <span
          @click="checkTodo(todo.id)"
          class="cursor-pointer text-[16px] hover:text-gray-800 material-symbols-outlined flex items-center justify-center w-8 h-8 rounded-full font-semibold"
          :class="{ 'text-emerald-700 bg-emerald-200/40': todo.completed === true, 'text-gray-400 bg-gray-100/50': todo.completed === false }"
        >
          check
        </span>
      </div>
    </div>
    <p v-if="showDesc" class="text-gray-600 text-sm font-semibold first-letter:uppercase">{{ todo.desc }}</p>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: ['todo', 'uri'],
  data() {
    return {
      showDesc: false,
    }
  },
  methods: {
    checkTodoCompleted() {
      return this.todo.completed ? 'border-emerald-600' : 'border-rose-600'
    },
    async deleteTodo(id) {
      try {
        const res = await axios.delete(this.uri + id)
        if (res.status === 200) {
          this.$emit('delete', id)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async checkTodo(id) {
      try {
        const res = await axios.patch(this.uri + id, JSON.stringify({ completed: !this.todo.completed }))
        if (res.status === 200) {
          this.$emit('check', id)
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
