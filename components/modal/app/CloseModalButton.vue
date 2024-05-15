<script setup lang="ts">
const { hideModal } = useAppModal();
</script>

<template>
  <figure @click="hideModal" class="cursor-pointer">
    <img
      style="
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg)
          brightness(103%) contrast(103%);
      "
      class="w-4 h-4"
      src="~/assets/img/icons/actions/close.svg"
      alt=""
    />
  </figure>
</template>
