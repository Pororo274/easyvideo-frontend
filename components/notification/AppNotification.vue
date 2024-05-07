<script setup lang="ts">
import type { SystemNotification } from "~/interfaces/notifications/system-notification.interface";

const appNotifications = ref<SystemNotification[]>([]);

const pushSystemNotification = (notification: SystemNotification): void => {
  appNotifications.value.push(notification);
  setTimeout(() => {
    appNotifications.value.shift();
  }, 3000);
};

provide("appNotification", {
  pushSystemNotification,
});
</script>

<template>
  <NotificationItem v-for="notification in appNotifications">
    {{ notification.message }}
  </NotificationItem>
  <slot></slot>
</template>
