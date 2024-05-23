<script setup lang="ts">
import {
  getCorrectMinutsName,
  getCorrectDaysName,
} from "~/helpers/pluralization.helper";

interface Project {
  id: number;
  name: string;
  createdAt: string;
}

const props = defineProps<{
  project: Project;
}>();

const editedAgo = computed(() => {
  const minute = 1000 * 60;
  const day = minute * 60 * 24;

  const interval = Date.now() - new Date(props.project.createdAt).getTime();

  if (interval < day) {
    if (interval > minute) {
      const minuts = Math.floor(interval / minute);
      return `Редактирован ${minuts} ${getCorrectMinutsName(minuts)} назад`;
    }
    return "Редактирован только что";
  }

  return `Редактирован ${Math.floor(interval / day)} ${getCorrectDaysName(
    Math.floor(interval / day)
  )} назад`;
});
</script>

<template>
  <NuxtLink
    class="block p-5 cursor-pointer hover:bg-gray-dark rounded-lg"
    :to="`/account/${project.id}`"
  >
    <div class="flex flex-col gap-3">
      <div class="aspect-video bg-red-500 w-full rounded-md"></div>
      <div>
        <h3 class="text-white text-medum text-base">{{ project.name }}</h3>
        <p class="text-gray-light text-sm">{{ editedAgo }}</p>
      </div>
    </div>
  </NuxtLink>
</template>
