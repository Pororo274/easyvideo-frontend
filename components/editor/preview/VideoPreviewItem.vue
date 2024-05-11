<script setup lang="ts">
const props = defineProps<{
  content: string;
  currentTime: number;
}>();

const video = ref<HTMLVideoElement>();

watchEffect(() => {
  if (!video.value) return;

  video.value.currentTime = props.currentTime;
});
</script>

<template>
  <video :src="content" class="absolute" ref="video"></video>
</template>
