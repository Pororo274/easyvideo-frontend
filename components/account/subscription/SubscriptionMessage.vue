<script setup lang="ts">
const isModalActive = ref(false);

const { account } = useAccountProvider();
</script>

<template>
  <div
    v-if="!account.subscription"
    class="p-2 w-full shadow-lg z-30 flex justify-center"
  >
    <AppModal v-model="isModalActive">
      <SubscriptionModalContent />
    </AppModal>
    <div class="flex gap-3 items-center">
      <p class="text-yellow select-none">
        У бесплатных пользователей есть водяной знак.
      </p>
      <SubscriptionButton @click="isModalActive = true" />
    </div>
  </div>
</template>
