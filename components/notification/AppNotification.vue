<script setup lang="ts">
import type { NotificationData } from "~/interfaces/notifications/data/notification-data.interface";
import type { SystemNotification } from "~/interfaces/notifications/system-notification.interface";
import type { UserNotification } from "~/interfaces/notifications/user-notification.interface";

const appNotifications = ref<SystemNotification[]>([]);
const userNotifications = useState<UserNotification[]>(
  "userNotifications",
  () => []
);

const { user } = useUser();
const { $api } = useNuxtApp();

await callOnce(async () => {
  if (user.value) {
    userNotifications.value = await $api(
      `/users/${user.value.id}/notifications`
    );
  }
});

const markAsReadUserNotification = (id: string) => {
  userNotifications.value = userNotifications.value.map((notification) => {
    const { read_at, ...other } = notification;

    if (other.id === id) {
      return {
        ...other,
        read_at: "asfd",
      };
    }
    return notification;
  });
};

const pushSystemNotification = (notification: SystemNotification): void => {
  appNotifications.value.push(notification);
  setTimeout(() => {
    appNotifications.value.shift();
  }, 4000);
};

const pushUserNotification = <T extends NotificationData = NotificationData>(
  notification: UserNotification<T>
): void => {
  userNotifications.value.push(notification);
};

provide("appNotification", {
  pushSystemNotification,
  pushUserNotification,
  markAsReadUserNotification,
  userNotifications: readonly(userNotifications),
});
</script>

<template>
  <NotificationItem
    v-for="notification in appNotifications"
    :type="notification.type"
  >
    {{ notification.message }}
  </NotificationItem>
  <slot></slot>
</template>
