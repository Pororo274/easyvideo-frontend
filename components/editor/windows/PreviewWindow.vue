<script setup lang="ts">
const { virtualMedias } = useVirtualMedias();

const { project } = useProject();

const previewStyle = computed(() => ({
  aspectRatio: `${project.value.width}/${project.value.height}`,
  width: `min(${project.value.width}px, 100%)`,
}));
</script>

<template>
  <div>
    <div class="flex h-full flex-col">
      <div class="flex-1">
        <div class="px-5 pt-5 w-full h-full flex items-center justify-center">
          <div
            :style="previewStyle"
            class="relative max-h-full overflow-hidden bg-slate-950"
          >
            <VirtualMediaPreview
              v-for="media in virtualMedias"
              :media="media"
            />
          </div>
        </div>
      </div>
      <div class="p-5">
        <div class="flex justify-center">
          <figure class="cursor-pointer">
            <img
              class="icon-white w-4"
              src="~/assets/img/icons/editor/play.svg"
              alt=""
            />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>
