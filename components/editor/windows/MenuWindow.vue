<script setup lang="ts">
const mediaWindow = resolveComponent("MediaWindow");
const textWindow = resolveComponent("TextWindow");
const videoWindow = resolveComponent("VideoWindow");

const { currentWindow } = useEditorWindows();

const windows: any = {
  mediaWindow,
  textWindow,
  videoWindow,
};
</script>

<template>
  <div>
    <component :is="windows[currentWindow]" />
  </div>
</template>
