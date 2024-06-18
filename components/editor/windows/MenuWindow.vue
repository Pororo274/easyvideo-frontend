<script setup lang="ts">
const mediaWindow = resolveComponent("MediaWindow");
const textWindow = resolveComponent("TextWindow");
const videoWindow = resolveComponent("VideoWindow");
const imageWindow = resolveComponent("ImageWindow");

const { currentWindow } = useEditorWindows();

const windows: any = {
  mediaWindow,
  textWindow,
  videoWindow,
  imageWindow,
};
</script>

<template>
  <div>
    <component :is="windows[currentWindow]" />
  </div>
</template>
