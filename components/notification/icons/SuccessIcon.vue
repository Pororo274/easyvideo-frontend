<script setup lang="ts">
import icon from "~/assets/img/icons/info/success.svg";
import { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum";

const { type } = useNotificationIcon();
</script>

<template>
  <AppIcon
    v-if="SystemNotificationType.SUCCESS === type"
    class="icon-green"
    :icon="icon"
  />
</template>
