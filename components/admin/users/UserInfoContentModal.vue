<script setup lang="ts">
import type { Subscription } from "~/interfaces/account/subscription.interface";
import type { UserBrief } from "~/interfaces/account/user-brief.interface";
import type { User } from "~/interfaces/account/user.interface";

const props = defineProps<{
  userId: number;
}>();

const { $api } = useNuxtApp();

const { data: user, pending } = await useLazyAsyncData(async () => {
  const [info, brief, subscription] = await Promise.all([
    $api<User>(`/users/${props.userId}/info`),
    $api<UserBrief>(`/users/${props.userId}/brief`),
    $api<Subscription>(`/users/${props.userId}/subscriptions/last`),
  ]);

  return {
    info,
    brief,
    subscription: subscription.id ? subscription : null,
  };
});

onBeforeUnmount(() => {
  user.value = null;
});
</script>

<template>
  <div class="p-5">
    <div class="flex items-center justify-between">
      <h2 class="text-white text-xl">О пользователе</h2>
      <MakeCloseModal v-slot="{ hide }">
        <p @click="hide" class="text-white cursor-pointer hover:underline">
          Закрыть
        </p>
      </MakeCloseModal>
    </div>
    <div class="mt-4" v-if="user">
      <UserMini :user="user.info" />
      <UserStorageIndicator
        class="mt-4"
        :total-space="user.brief.totalAvailableSpaceInBytes"
        :used-space="user.brief.totalUsedSpaceInBytes"
      />
      <h3 class="text-white mt-6">Подписка</h3>
      <SubscriptionWorkUntil
        class="mt-2"
        v-if="user.subscription"
        :subscription="user.subscription"
      />
      <div v-else class="border border-gray mt-2 rounded-md py-2 px-4">
        <p class="text-white">Подписка отсутствует</p>
      </div>
    </div>
    <div v-else-if="pending" class="mt-16 mb-12">
      <p class="text-gray-light text-center">Загрузка...</p>
    </div>
  </div>
</template>
