<script setup lang="ts">
import type { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum";

const props = defineProps<{
  type: SystemNotificationType;
}>();

const type = computed(() => props.type);

provide("notificationIcon", {
  type,
});
</script>

<template>
  <figure>
    <SuccessIcon />
    <AttentionIcon />
    <ErrorIcon />
  </figure>
</template>
