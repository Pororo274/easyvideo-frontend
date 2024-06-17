<script setup lang="ts">
import type { User } from "~/interfaces/account/user.interface";

const { $api } = useNuxtApp();

const { data: users } = await useAsyncData<User[]>(() => $api("/admin/users"));
</script>

<template>
  <TableLayout :data="users">
    <template #header>
      <TableHeaderCell class="col-span-4">#</TableHeaderCell>
      <TableHeaderCell class="col-span-3">Дата регистрациии</TableHeaderCell>
      <TableHeaderCell class="col-span-2">Подписка</TableHeaderCell>
    </template>
    <template #default="{ data }">
      <UserListItem v-for="user in data" :user="user" />
    </template>
  </TableLayout>
</template>
