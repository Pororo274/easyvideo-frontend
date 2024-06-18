<script setup lang="ts">
defineProps<{
  mimeType: string;
}>();
</script>

<template>
  <figure>
    <img
      v-if="['video/mp4'].find((x) => x === mimeType)"
      class="icon-blue w-5"
      src="~/assets/img/icons/format/video.svg"
      alt=""
    />
    <img
      v-else
      class="icon-yellow w-5"
      src="~/assets/img/icons/format/image.svg"
      alt=""
    />
  </figure>
</template>
