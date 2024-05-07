<script setup lang="ts">
const props = defineProps<{
  fileType: string;
  objectUrl: string;
}>();

const format = computed(() =>
  (props.fileType.match(/^.*\//) as RegExpExecArray)[0].replace("/", "")
);
</script>

<template>
  <img
    v-if="format === 'image'"
    :src="objectUrl"
    alt=""
    class="w-full h-full object-contain"
  />
  <video
    v-if="format === 'video'"
    :src="objectUrl"
    class="w-full h-full object-contain"
  ></video>
</template>
