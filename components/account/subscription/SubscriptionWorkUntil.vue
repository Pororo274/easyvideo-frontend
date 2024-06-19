<script setup lang="ts">
import type { Subscription } from "~/interfaces/account/subscription.interface";
import dateFormat from "dateformat";

defineProps<{
  subscription: Subscription;
}>();
</script>

<template>
  <div class="bg-gradient-to-r from-blue to-purple mt-1 rounded-md py-2 px-4">
    <p class="text-white">
      Действительна до
      {{ dateFormat(subscription.workUntil, "dd.mm.yyyy") }}
    </p>
  </div>
</template>
