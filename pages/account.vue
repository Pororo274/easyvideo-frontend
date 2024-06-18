<script setup lang="ts">
import type { UserBrief } from "~/interfaces/account/user-brief.interface";
import type { Subscription } from "~/interfaces/account/subscription.interface";

const { $api } = useNuxtApp();
const { user, isAdmin } = useUser();

callOnce(() => {
  if (isAdmin.value) {
    navigateTo("/admin");
  }
});

const { data } = await useAsyncData<{
  brief: UserBrief;
  subscription: Subscription | null;
}>(async () => {
  const [brief, subscription] = await Promise.all([
    $api<UserBrief>(`/users/${user.value.id}/brief`),
    $api<Subscription>(`/users/${user.value.id}/subscriptions/last`),
  ]);

  return {
    brief,
    subscription: subscription.id ? subscription : null,
  };
});

if (!data.value) {
  throw createError({
    status: 404,
  });
}

provide("accountProvider", {
  account: readonly(data),
});
</script>

<template>
  <NuxtPage />
</template>
