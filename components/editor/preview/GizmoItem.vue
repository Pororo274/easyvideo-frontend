<script setup lang="ts">
import type { VirtualVideo } from "~/interfaces/editor/virtual-video.interface";

const { mediaPreviewStyle, virtualMedia } = useVirtualMediaPreview();
const { updatePositionByUuid } = useVirtualMedias();

const onMove = ({ xPos, yPos }: { xPos: number; yPos: number }) => {
  updatePositionByUuid(virtualMedia.value.uuid, {
    x: xPos,
    y: yPos,
  });
};
</script>

<template>
  <AppDrag
    @move="onMove"
    :self-drag="false"
    :style="mediaPreviewStyle"
    class="border border-transparent hover:border-blue absolute top-0 left-0"
  />
</template>
