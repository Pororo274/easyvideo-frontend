<script setup lang="ts">
const { account } = useAccountProvider();
</script>

<template>
  <UserStorageIndicator
    :total-space="account.brief.totalAvailableSpaceInBytes"
    :used-space="account.brief.totalUsedSpaceInBytes"
  />
</template>
