<script setup lang="ts">
const isActive = defineModel<boolean>({
  default: false,
});

const hideModal = () => {
  isActive.value = false;
};

provide("appModal", {
  hideModal,
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isActive"
      class="w-full h-screen fixed z-50 top-0 left-0 backdrop-blur-sm"
    >
      <div
        class="w-full h-full absolute top-0 left-0 bg-black opacity-70"
      ></div>
      <AppModalContent>
        <slot></slot>
      </AppModalContent>
    </div>
  </Teleport>
</template>
