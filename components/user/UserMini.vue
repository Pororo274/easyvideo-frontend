<script setup lang="ts">
import type { User } from "~/interfaces/account/user.interface";

defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="flex gap-2 items-center">
    <div class="w-6 h-6 rounded-full bg-blue flex items-center justify-center">
      <p class="text-white font-medium text-sm">
        {{ user.username[0].toUpperCase() }}
      </p>
    </div>
    <h3 class="text-white text-base">{{ user.username }}</h3>
  </div>
</template>
