<template>
  <div class="bg-white mt-6 p-4 lg:p-10 shadow-md rounded-md">
    <form @submit.prevent="handleSubmit">
      <input
        type="text"
        class="text-sm font-semibold pb-1 bg-none border-b outline-none border-gray-300 block w-full mb-3 focus:border-emerald-500 placeholder:text-sm"
        placeholder="TODO TITLE"
        v-model="title"
      />
      <label for="txt" class="text-gray-400 text-sm font-semibold">DESCRIPTION</label>
      <textarea
        id="txt"
        class="px-1 outline-none mt-1 mb-3 text-sm font-semibold border pb-1 bg-none border-gray-300 block w-full focus:border-emerald-500 placeholder:text-sm"
        rows="5"
        v-model="desc"
      ></textarea>
      <button type="submit" class="bg-emerald-600 text-white px-8 py-2 uppercase font-semibold rounded-sm">submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  data() {
    return {
      title: '',
      desc: '',
      uri: 'http://localhost:3000/todo/',
    }
  },
  mounted() {
    this.fetchCurrentTodo()
  },
  methods: {
    async handleSubmit() {
      if (!this.title || !this.desc) return
      const data = JSON.stringify({ title: this.title, desc: this.desc })
      try {
        const res = await axios.patch(this.uri + this.id, data)
        if (res.status === 200) {
          this.$router.push('/')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async fetchCurrentTodo() {
      try {
        const { data } = await axios.get(this.uri + this.id)
        if (data) {
          this.title = data.title
          this.desc = data.desc
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style></style>
