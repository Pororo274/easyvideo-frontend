<script setup lang="ts">
import close from "~/assets/img/icons/actions/close.svg";

const { hideModal } = useAppModal();
</script>

<template>
  <IconButton @click="hideModal" :animation="false" :icon="close" />
</template>
