<template>
  <header class="bg-gray-900 flex justify-between items-center p-4">
    <div class="font-bold text-amber-500 text-xl">FOYSAL'S BLOG</div>
    <nav class="flex justify-end items-center gap-4">
      <router-link class="font-semibold text-white" :to="{ name: 'home' }">HOME</router-link>
      <router-link class="font-semibold text-white" :to="{ name: 'create-blog' }">WRITE</router-link>
    </nav>
  </header>
  <main class="px-4 py-8 bg-gray-100 min-h-screen">
    <router-view></router-view>
  </main>
</template>
