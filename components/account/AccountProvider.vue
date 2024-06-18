<script setup lang="ts">
const { account } = useAccountProvider();
</script>

<template>
  <slot :account="account"></slot>
</template>
