<script setup lang="ts">
import play from "~/assets/img/icons/editor/play.svg";
import pause from "~/assets/img/icons/editor/pause.svg";

const { virtualMedias } = useVirtualMedias();

const { project } = useProject();

const previewStyle = computed(() => ({
  aspectRatio: `${project.value.width}/${project.value.height}`,
  width: `min(${project.value.width}px, 100%)`,
}));

const { startAutoPlay, isAutoplay, stopAutoPlay } = useTimeLine();
</script>

<template>
  <div class="overflow-hidden">
    <div class="flex h-full flex-col">
      <div class="flex-1">
        <div class="px-5 pt-5 w-full h-full flex items-center justify-center">
          <div :style="previewStyle" class="relative max-h-full">
            <div class="absolute w-full h-full z-10">
              <VirtualMediaPreview
                v-for="media in virtualMedias"
                :media="media"
              >
                <GizmoItem />
              </VirtualMediaPreview>
            </div>
            <div class="relative w-full h-full overflow-hidden bg-gray-dark">
              <VirtualMediaPreview
                v-for="media in virtualMedias"
                :media="media"
              >
                <VideoPreviewItem />
                <ImagePreviewItem />
              </VirtualMediaPreview>
            </div>
          </div>
        </div>
      </div>
      <div class="p-5">
        <div class="flex justify-center">
          <IconButton
            v-if="!isAutoplay"
            @click="startAutoPlay"
            :animation="false"
            :icon="play"
          />
          <IconButton
            v-else
            @click="stopAutoPlay"
            :animation="false"
            :icon="pause"
          />
        </div>
      </div>
    </div>
  </div>
</template>
