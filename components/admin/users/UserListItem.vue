<script setup lang="ts">
import type { User } from "~/interfaces/account/user.interface";

defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="grid grid-cols-12 gap-2 items-center py-3">
    <div class="flex gap-2 items-center col-span-4">
      <div
        class="bg-blue w-8 h-8 rounded-full flex items-center justify-center"
      >
        <p class="text-white">U</p>
      </div>
      <div class="flex-1">
        <p class="text-white">{{ user.email }}</p>
        <p class="text-gray-light text-sm">{{ user.username }}</p>
      </div>
    </div>
    <p class="text-white col-span-3">12 апреля 2024 г.</p>
    <p class="text-red col-span-2">Нет</p>
    <UserDropDown />
  </div>
</template>
