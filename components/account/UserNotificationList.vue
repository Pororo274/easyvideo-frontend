<script setup lang="ts">
import notification from "~/assets/img/icons/account/notification.svg";
import type { UserNotification } from "~/interfaces/notifications/user-notification.interface";

const isNotificationWindowActive = ref(false);

const { $api } = useNuxtApp();
const { user } = useUser();

const { userNotifications, markAsReadUserNotification } =
  useAppNotification<any>();

const onSuccessDownload = (data: any) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "easyvideo.mp4");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const markNotification = (notification: UserNotification) => {
  $api(`users/${user.value.id}/notifications/${notification.id}/mark`, {
    method: "post",
  });
  markAsReadUserNotification(notification.id);
};

const nonReadedNotifications = computed(() =>
  userNotifications.value.filter((notification) => !notification.read_at)
);
</script>

<template>
  <div
    @click.stop
    v-out="() => (isNotificationWindowActive = false)"
    class="relative z-50"
  >
    <div
      v-if="nonReadedNotifications.length"
      class="absolute z-10 w-4 h-4 bg-red rounded-full flex items-center justify-center"
    >
      <p class="text-white text-xs">
        {{ nonReadedNotifications.length }}
      </p>
    </div>
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
        <h3 class="text-white font-medium">Уведомления</h3>
      </div>
      <div v-if="nonReadedNotifications.length">
        <div v-for="notification in nonReadedNotifications" class="p-4">
          <h3 class="text-white font-medium">Экспорт видео завершен</h3>
          <AppForm
            @success="(data: any) => { onSuccessDownload(data); markNotification(notification) }"
            :custom-action="notification.data.link"
            class="mt-2"
            method="get"
          >
            <FormButton>Скачать</FormButton>
          </AppForm>
        </div>
      </div>
      <div v-else class="h-[100px] flex items-center w-full justify-center">
        <p class="text-gray-light">Сообщений не найдено</p>
      </div>
    </div>
  </div>
</template>
