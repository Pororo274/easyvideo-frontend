<script setup lang="ts">
defineProps<{
  name: string;
}>();

const { isUploading } = useMediaUpload();
const { project } = useProject();
const { virtualMedias } = useVirtualMedias();
</script>

<template>
  <AppHeader>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/account"
          class="rounded-md flex items-center justify-center w-6 h-6 hover:bg-zinc-800"
        >
          <img
            class="icon-white rotate-90 w-4 h-4"
            src="~/assets/img/icons/actions/arrow-down.svg"
            alt=""
          />
        </NuxtLink>
        <h2 class="text-white font-medium text-base">
          {{ name }}
        </h2>
      </div>
      <div class="flex gap-2">
        <AppForm
          :action="`/projects/${project.id}/render`"
          :data="{ virtualMedias }"
        >
          <button
            class="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer hover:bg-zinc-900"
          >
            <img
              class="icon-white w-4"
              src="~/assets/img/icons/editor/download.svg"
              alt=""
            />
          </button>
        </AppForm>
        <figure
          class="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer hover:bg-zinc-900"
        >
          <img
            v-show="isUploading"
            class="sync_rotation icon-amber w-4"
            src="~/assets/img/icons/editor/sync.svg"
            alt=""
          />
          <img
            v-show="!isUploading"
            class="icon-green w-[22px]"
            src="~/assets/img/icons/editor/cloud-success.svg"
            alt=""
          />
        </figure>
      </div>
    </div>
  </AppHeader>
</template>

<style scoped>
@keyframes sync-rotation {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.sync_rotation {
  animation: sync-rotation 2.5s linear 0s infinite;
}
</style>
