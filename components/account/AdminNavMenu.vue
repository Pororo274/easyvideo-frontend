<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="w-full shadow-lg z-30 flex gap-2">
    <NuxtLink
      :class="
        route.path === '/admin'
          ? 'text-blue border-blue'
          : 'text-white border-transparent'
      "
      to="/admin"
      class="py-3 px-5 border-t"
      >Сводка</NuxtLink
    >
    <NuxtLink
      :class="
        route.path === '/admin/users'
          ? 'text-blue border-blue'
          : 'text-white border-transparent'
      "
      to="/admin/users"
      class="py-3 px-5 border-t"
      >Пользователи</NuxtLink
    >
  </div>
</template>
