<script setup lang="ts">
import type { User as BaseUser } from "~/interfaces/account/user.interface";

interface User extends BaseUser {
  email: string;
  created_at: string;
}

const { $api } = useNuxtApp();

const { data: users } = await useAsyncData<User[]>(() => $api("/admin/users"));
</script>

<template>
  <div class="grid grid-cols-[1fr_70ch_1fr]">
    <div class="col-start-2">
      <div class="grid grid-cols-12 gap-2 pb-2 border-b border-gray">
        <h3 class="text-white col-span-4">#</h3>
        <h3 class="text-white col-span-3">Дата регистрациии</h3>
        <h3 class="text-white col-span-2">Подписка</h3>
      </div>
      <div v-if="users">
        <div
          v-for="user in users"
          class="grid grid-cols-12 gap-2 items-center py-3"
        >
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
          <p
            class="text-white cursor-pointer col-span-3 text-right hover:underline"
          >
            Подробнее
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
