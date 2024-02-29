<template>
  <div class="bg-gray-100 min-h-screen py-20 px-4 lg:px-0">
    <div class="w-full lg:w-1/2 mx-auto">
      <nav class="flex gap-8 justify-center">
        <router-link class="uppercase pb-[1px] font-semibold text-gray-700" to="/">all todo</router-link>
        <router-link class="uppercase pb-[1px] font-semibold text-gray-700" to="/create">new todo</router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
a.router-link-active {
  @apply text-emerald-600 border-b-2 border-emerald-600;
}
</style>
