<script setup lang="ts">
import gear from "~/assets/img/icons/editor/gear.svg";

import type { User } from "~/interfaces/account/user.interface";

const { user } = useUser();

const isModalActive = ref(false);
const isSettingsModalActive = ref(false);
</script>

<template>
  <AppHeader class="fixed top-0 left-0 z-20">
    <div class="flex items-center justify-between">
      <UserMini :user="user as User" />
      <div class="flex items-center gap-4">
        <OnlyUser>
          <BlueButton @click="isModalActive = true">
            <div class="flex gap-3 items-center">
              <p class="flex-1">Создать проект</p>
              <figure>
                <img
                  class="icon-white w-4 h-4"
                  src="~/assets/img/icons/actions/plus.svg"
                  alt=""
                />
              </figure>
            </div>
          </BlueButton>
        </OnlyUser>
        <div class="flex gap-2">
          <IconButton @click="isSettingsModalActive = true" :icon="gear" />
          <UserNotificationList />
        </div>
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
