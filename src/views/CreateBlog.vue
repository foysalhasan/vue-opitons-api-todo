<template>
  <div class="bg-white shadow-sm rounded-sm border-gray-400 p-10 w-1/2 mx-auto">
    <h3 class="text-pink-600 font-semibold text-xl mb-4 border-b-2 border-pink-600 border-dashed pb-1">WRITE A AWESOME BLOG POST !</h3>
    <form @submit.prevent="handleSubmit" ref="addForm">
      <div class="mb-4">
        <label class="block text-gray-900 text-sm font-semibold mb-1" for="title">TITLE</label>
        <input v-model="title" id="title" type="text" class="bg-transparent block w-full outline-none border-b-2 border-pink-600" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-900 text-sm font-semibold mb-1" for="desc">DESCRIPTION</label>
        <textarea v-model="desc" id="desc" rows="1" type="text" class="bg-transparent block w-full outline-none border-b-2 border-pink-600" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-900 text-sm font-semibold mb-1" for="cat">CATEGORY</label>
        <select
          id="cat"
          v-model="cat"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 outline-none"
        >
          <option value="education">EDUCATION</option>
          <option value="culture">CULTURE</option>
          <option value="science">SCIENCE</option>
          <option value="food">FOOD</option>
          <option value="nature">NATURE</option>
        </select>
      </div>
      <div class="mb-5">
        <label class="block text-gray-900 text-sm font-semibold mb-1" for="tag">TAGS</label>
        <input
          v-model="tag"
          @keyup="handleTag"
          id="tag"
          type="text"
          class="bg-transparent block w-full outline-none border-b-2 border-pink-600 placeholder:text-xs"
          placeholder="PRESS ENTER TO ADD NEW TAG"
        />
        <p class="flex gap-1 mt-3">
          <span class="rounded-3xl bg-indigo-100 text-indigo-400 text-sm font-semibold px-3 py-1" v-for="tag in tags" :key="tag">{{ tag }}</span>
        </p>
      </div>

      <button type="submit" class="px-5 py-1 text-white bg-pink-600">ADD POST</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { addBlogPost } from '../func/getBlog'
export default {
  setup() {
    const addForm = ref()
    const title = ref('')
    const desc = ref('')
    const cat = ref('education')
    const tag = ref('')
    const tags = ref([])
    const handleTag = (e) => {
      if (e.key !== ',') return
      const val = tag.value.substring(0, tag.value.length - 1)
      console.log(val)
      if (val && !tags.value.includes(val)) {
        tags.value.push(val)
      }
      tag.value = ''
    }
    const handleSubmit = (e) => {
      if (!title.value || !desc.value || !cat.value || tags.value.length === 0) return
      const data = {
        title: title.value,
        description: desc.value,
        category: cat.value,
        tag: tags.value,
      }
      const post = JSON.stringify(data)
      addBlogPost(post)
    }
    return { handleTag, handleSubmit, title, desc, cat, tag, tags, addForm }
  },
}
</script>

<style></style>
