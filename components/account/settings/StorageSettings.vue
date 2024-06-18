<script setup lang="ts">
const { account } = useAccountProvider();

const availableSpace = computed(() => {
  return (
    account.value.brief.totalAvailableSpaceInBytes -
    account.value.brief.totalUsedSpaceInBytes
  );
});
</script>

<template>
  <div>
    <h3 class="text-white">Хранилище</h3>
    <ProgressIndicator
      :total="account.brief.totalAvailableSpaceInBytes"
      :current="account.brief.totalUsedSpaceInBytes"
    />
    <p class="text-gray-light mt-2">
      Доступно {{ (availableSpace / 1024 / 1024).toFixed(2) }} МБ из
      {{ account.brief.totalAvailableSpaceInBytes / 1024 / 1024 }} МБ
    </p>
  </div>
</template>
