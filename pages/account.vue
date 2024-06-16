<script setup lang="ts">
import type { UserBrief } from "~/interfaces/account/user-brief.interface";

const { $api } = useNuxtApp();
const { user } = useUser();

const { data: brief } = await useAsyncData<UserBrief>(() =>
  $api(`/users/${user.value.id}/brief`)
);

provide("accountProvider", {
  brief: readonly(brief),
});
</script>

<template>
  <NuxtPage />
</template>
