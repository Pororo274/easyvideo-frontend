<script setup lang="ts">
import dateFormat from "dateformat";
import type { User } from "~/interfaces/account/user.interface";

defineProps<{
  username: string;
}>();

const isModalActive = ref(false);

const { user } = useUser();
</script>

<template>
  <AppModal v-model="isModalActive">
    <SubscriptionModalContent />
  </AppModal>
  <div class="p-5 border-b border-b-zinc-800">
    <div class="flex items-center justify-between">
      <h2 class="text-white text-xl font-medium">Настройки</h2>
      <CloseModalButton />
    </div>
  </div>
  <div class="p-5">
    <UserMini :user="user as User" />
    <div class="flex items-center gap-3 mt-4">
      <div
        class="py-1.5 rounded-md border border-gray cursor-pointer hover:bg-gray flex-1"
      >
        <p class="text-white text-center">Изменить аватарку</p>
      </div>
      <div
        class="py-1.5 rounded-md border border-gray cursor-pointer hover:bg-gray flex-1"
      >
        <p class="text-white text-center">Сменить пароль</p>
      </div>
    </div>
    <OnlyUser>
      <AccountProvider v-slot="{ account }">
        <StorageSettings class="mt-8" />
        <h3 class="text-white mt-8">Подписка</h3>
        <div
          v-if="account.subscription"
          class="bg-gradient-to-r from-blue to-purple mt-1 rounded-md py-2 px-4"
        >
          <p class="text-white">
            Действительна до
            {{ dateFormat(account.subscription.workUntil, "dd.mm.yyyy") }}
          </p>
        </div>
        <MakeCloseModal v-else>
          <SubscriptionButton @click="isModalActive = true" class="mt-2" />
        </MakeCloseModal>
      </AccountProvider>
    </OnlyUser>
    <LogoutForm class="mt-6" />
  </div>
</template>
