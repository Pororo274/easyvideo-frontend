<script setup lang="ts">
import gear from "~/assets/img/icons/editor/gear.svg";

import type { User } from "~/interfaces/account/user.interface";

const { user } = useUser();

const isModalActive = ref(false);
const isSettingsModalActive = ref(false);
</script>

<template>
  <AppHeader class="fixed top-0 left-0">
    <div class="flex items-center justify-between">
      <UserMini :user="user as User" />
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
        <IconButton @click="isSettingsModalActive = true" :icon="gear" />
      </div>
    </div>
  </AppHeader>
  <AppModal v-model="isModalActive">
    <CreateProjectModalContent />
  </AppModal>
  <AppModal v-model="isSettingsModalActive">
    <SettingsModalContent :username="user.username" />
  </AppModal>
</template>
