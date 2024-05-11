<script setup lang="ts">
defineProps<{
  name: string;
}>();
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
            style="
              filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg)
                brightness(103%) contrast(103%);
            "
            class="rotate-90 w-4 h-4"
            src="~/assets/img/icons/actions/arrow-down.svg"
            alt=""
          />
        </NuxtLink>
        <h2 class="text-white font-medium text-base">
          {{ name }}
        </h2>
      </div>
      <div class="flex">
        <figure
          class="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer hover:bg-zinc-900"
        >
          <img
            class="sync_rotation icon-amber w-4 hidden"
            src="~/assets/img/icons/editor/sync.svg"
            alt=""
          />
          <img
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
  animation: sync-rotation 3s linear 0s infinite;
}
</style>
