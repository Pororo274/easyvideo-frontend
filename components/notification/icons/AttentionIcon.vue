<script setup lang="ts">
import icon from "~/assets/img/icons/info/attention.svg";
import { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum";

const { type } = useNotificationIcon();
</script>

<template>
  <AppIcon
    v-if="SystemNotificationType.ATTENTION === type"
    class="icon-yellow"
    :icon="icon"
  />
</template>
