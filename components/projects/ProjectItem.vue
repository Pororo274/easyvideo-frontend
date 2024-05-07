<script setup lang="ts">
interface Project {
  id: number;
  name: string;
}

defineProps<{
  project: Project;
}>();
</script>

<template>
  <NuxtLink
    class="block p-5 cursor-pointer hover:bg-zinc-900 rounded-lg"
    :to="`/account/${project.id}`"
  >
    <div class="flex flex-col gap-3">
      <div class="aspect-video bg-red-500 w-full rounded-lg"></div>
      <div>
        <h3 class="text-white text-medum text-base">{{ project.name }}</h3>
        <p class="text-zinc-500 text-sm">Редактирован 1 день назад</p>
      </div>
    </div>
  </NuxtLink>
</template>
