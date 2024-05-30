<script setup lang="ts">
import icon from "~/assets/img/icons/info/attention.svg";
import { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum";

const { type } = useNotificationIcon();
</script>

<template>
  <AppIcon
    v-if="SystemNotificationType.ERROR === type"
    class="icon-red"
    :icon="icon"
  />
</template>
