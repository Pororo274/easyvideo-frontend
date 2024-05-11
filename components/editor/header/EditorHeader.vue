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
    </div>
  </AppHeader>
</template>
