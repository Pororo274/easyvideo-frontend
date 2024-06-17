<script setup lang="ts">
import type { Project } from "~/interfaces/project/project.interface";

const { $api } = useNuxtApp();
const route = useRoute();

const { data: projects } = await useAsyncData<Project[]>(() =>
  $api(`/users/${route.params.userId}/projects`)
);
</script>

<template>
  <TableLayout :data="projects">
    <template #name> Проекты </template>
    <template #header>
      <TableHeaderCell class="col-span-4">#</TableHeaderCell>
      <TableHeaderCell class="col-span-3">Название</TableHeaderCell>
    </template>
    <template #default="{ data }">
      <TableRow v-for="project in data">
        <p class="text-white col-span-4">{{ project.id }}</p>
        <p class="text-white col-span-4">{{ project.name }}</p>
      </TableRow>
    </template>
  </TableLayout>
</template>
