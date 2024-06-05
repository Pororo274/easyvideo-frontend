<script setup lang="ts">
const mediaWindow = resolveComponent("MediaWindow");
const textWindow = resolveComponent("TextWindow");

const { currentWindow } = useEditorWindows();

const windows: any = {
  mediaWindow,
  textWindow,
};
</script>

<template>
  <div>
    <component :is="windows[currentWindow]" />
  </div>
</template>
