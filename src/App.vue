<template>
  <div class="main p-10">
    <div class="bg-slate-100 max-w-[400px] mx-auto p-4 w-full">
      <input v-model="search" type="text" class="bg-none pl-2 py-3 mb-3 w-full block shadow border-b outline-none border-rose-500" placeholder="Search" />
      <p class="text-rose-600 mb-4 border-b border-gray-400">
        YOU SEARCHED FOR -- <span class="font-bold text-violet-600">{{ search }}</span>
      </p>
      <ul>
        <li v-for="list in filteredSearch" :key="list" class="uppercase font-semibold mb-1">{{ list }}</li>
        <h1 v-if="filteredSearch.length === 0">NO RESULT</h1>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, watchEffect } from 'vue'
export default {
  setup() {
    const lists = ref(['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry', 'Pineapple', 'Mango', 'Watermelon', 'Kiwi', 'Peach'])
    const search = ref('')

    const filteredSearch = computed(() => {
      return lists.value.map((el) => el.toLowerCase()).filter((el) => el.includes(search.value))
    })

    watchEffect(() => {
      if (search.value === 'foysal') {
        alert('you got that')
      }
    })

    return { search, filteredSearch }
  },
}
</script>
