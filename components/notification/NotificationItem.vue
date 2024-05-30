<script setup lang="ts">
import type { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum";

defineProps<{
  type: SystemNotificationType;
}>();
</script>

<template>
  <div
    class="absolute z-50 bottom-5 left-5 p-3 rounded-md bg-gray-dark border border-gray"
  >
    <div class="flex gap-3 items-center">
      <NotifiationIcon :type="type" />
      <p class="text-white">
        <slot></slot>
      </p>
    </div>
  </div>
</template>
