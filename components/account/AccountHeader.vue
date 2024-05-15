<script setup lang="ts">
import gear from "~/assets/img/icons/editor/gear.svg";

const { user } = useUser();

const isModalActive = ref(false);
</script>

<template>
  <AppHeader class="fixed top-0 left-0">
    <div class="flex items-center justify-between">
      <div class="flex gap-3 items-center">
        <div
          class="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center"
        >
          <p class="text-white font-medium text-xs">
            {{ user?.username[0].toUpperCase() }}
          </p>
        </div>
        <h2 class="text-white text-base">{{ user?.username }}</h2>
      </div>
      <div class="flex items-center gap-4">
        <AppButton @click="isModalActive = true">
          <div class="flex gap-3 items-center">
            <p class="flex-1">Создать проект</p>
            <figure>
              <img
                style="
                  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(49deg)
                    brightness(103%) contrast(103%);
                "
                class="w-4 h-4"
                src="~/assets/img/icons/actions/plus.svg"
                alt=""
              />
            </figure>
          </div>
        </AppButton>
        <IconButton :icon="gear" />
      </div>
    </div>
  </AppHeader>
  <AppModal v-model="isModalActive">
    <CreateProjectModalContent />
  </AppModal>
</template>
