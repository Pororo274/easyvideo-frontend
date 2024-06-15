<script setup lang="ts">
import type {
  Brief,
  StorageBrief,
  UsersBrief,
} from "~/interfaces/admin/brief.interface";

const { $api } = useNuxtApp();

const { data: brief } = await useAsyncData<Brief>(() => $api("/admin/brief"));

if (!brief.value) {
  throw createError({
    statusCode: 404,
  });
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <StorageBrief :brief="brief?.disk as StorageBrief" />
    <UsersBrief :brief="brief?.users as UsersBrief" />
  </div>
</template>
