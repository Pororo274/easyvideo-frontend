<script setup lang="ts">
const props = defineProps<{
  content: string;
  currentTime: number;
  isActive: boolean;
}>();

const video = ref<HTMLVideoElement>();

const { isAutoplay } = useTimeLine();

watchEffect(() => {
  if (!video.value) return;

  if (isAutoplay.value && props.isActive) {
    video.value.play();
    return;
  } else {
    video.value.pause();
  }
  video.value.currentTime = props.currentTime;
});
</script>

<template>
  <video :src="content" class="absolute" ref="video"></video>
</template>
