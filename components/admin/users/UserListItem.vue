<script setup lang="ts">
import type { User as BaseUser } from "~/interfaces/account/user.interface";
import dateFormat from "dateformat";

interface User extends BaseUser {
  subscription: string;
}

defineProps<{
  user: User;
}>();
</script>

<template>
  <TableRow>
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
    <p class="text-white col-span-3">
      {{ dateFormat(user.createdAt, "dd.mm.yyyy") }}
    </p>
    <p v-if="user.subscription" class="text-green col-span-2">Есть</p>
    <p v-else class="text-red col-span-2">Нет</p>
    <UserDropDown :user="user" />
  </TableRow>
</template>
