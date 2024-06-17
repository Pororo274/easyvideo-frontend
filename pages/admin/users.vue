<script setup lang="ts">
import type { User } from "~/interfaces/account/user.interface";

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
        <UserListItem v-for="user in users" :user="user" />
      </div>
    </div>
  </div>
</template>
