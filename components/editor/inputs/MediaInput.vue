<script setup lang="ts">
const { addFromFiles, allowedTypesString } = useMedias();

const onFileInput = (e: Event) => {
  if (!e.target) return;
  const target = e.target as HTMLInputElement;

  if (!target.files) return;

  const files = target.files;

  addFromFiles(...files);
};
</script>

<template>
  <input
    @input="onFileInput"
    type="file"
    class="hidden h-0 w-0"
    multiple
    :accept="allowedTypesString"
  />
</template>
