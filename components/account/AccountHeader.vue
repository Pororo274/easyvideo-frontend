<script setup lang="ts">
import gear from "~/assets/img/icons/editor/gear.svg";
import notification from "~/assets/img/icons/account/notification.svg";

import type { User } from "~/interfaces/account/user.interface";
import type { UserNotification } from "~/interfaces/notifications/user-notification.interface";

const { user } = useUser();

const isModalActive = ref(false);
const isSettingsModalActive = ref(false);
const isNotificationWindowActive = ref(false);

const { $api } = useNuxtApp();

const { userNotifications, markAsReadUserNotification } =
  useAppNotification<any>();
const onDownloadClick = (notification: UserNotification<any>) => {
  $api(`users/${user.value.id}/notifications/${notification.id}/mark`, {
    method: "post",
  });
  $api(notification.data.link, {
    method: "get",
    responseType: "blob",
  }).then((data: any) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "easyvideo.mp4");
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
  markAsReadUserNotification(notification.id);
};

const readedNotifications = computed(() =>
  userNotifications.value.filter((notification) => !notification.read_at)
);
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
                class="icon-white w-4 h-4"
                src="~/assets/img/icons/actions/plus.svg"
                alt=""
              />
            </figure>
          </div>
        </AppButton>
        <div class="flex gap-2">
          <IconButton @click="isSettingsModalActive = true" :icon="gear" />
          <div class="relative">
            <IconButton
              @click="isNotificationWindowActive = !isNotificationWindowActive"
              :icon="notification"
              :animation="false"
            />
            <div
              :class="[isNotificationWindowActive ? 'block' : 'hidden']"
              class="absolute border border-gray top-12 rounded-md right-0 bg-black w-[240px]"
            >
              <div class="px-4 py-2 border-b border-gray">
                <h3 class="text-white font-medium">Сообщения</h3>
              </div>
              <div v-if="readedNotifications.length">
                <div v-for="notification in readedNotifications" class="p-4">
                  <h3 class="text-white font-medium">Экспорт видео завершен</h3>
                  <div
                    @click="onDownloadClick(notification)"
                    class="block mt-4 py-1 px-4 bg-blue rounded-md hover:bg-blue-dark cursor-pointer text-center text-white font-medium"
                  >
                    Скачать
                  </div>
                </div>
              </div>
              <div
                v-else
                class="h-[100px] flex items-center w-full justify-center"
              >
                <p class="text-gray-light">Сообщений не найдено</p>
              </div>
            </div>
          </div>
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
