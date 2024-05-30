<script setup lang="ts">
import type { SystemNotification } from "~/interfaces/notifications/system-notification.interface";

const appNotifications = ref<SystemNotification[]>([]);

const pushSystemNotification = (notification: SystemNotification): void => {
  appNotifications.value.push(notification);
  setTimeout(() => {
    appNotifications.value.shift();
  }, 4000);
};

provide("appNotification", {
  pushSystemNotification,
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
