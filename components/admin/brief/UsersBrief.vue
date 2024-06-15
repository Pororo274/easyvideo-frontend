<script setup lang="ts">
import type { UsersBrief } from "~/interfaces/admin/brief.interface";

defineProps<{
  brief: UsersBrief;
}>();
</script>

<template>
  <BriefBorder>
    <div class="p-4">
      <h3 class="text-white">О пользователях</h3>
      <div class="mt-3">
        <div class="flex justify-between">
          <h3 class="text-white">Всего:</h3>
          <p class="text-white">{{ brief.total }}</p>
        </div>
      </div>
      <div class="mt-3">
        <div class="flex justify-between">
          <h3 class="text-white">Всего с подпиской:</h3>
          <p class="text-white">{{ brief.totalWithSubscription }}</p>
        </div>
      </div>
      <div class="mt-3">
        <div class="flex justify-between">
          <h3 class="text-white">Всего забаненных:</h3>
          <p class="text-white">{{ brief.totalBanned }}</p>
        </div>
      </div>
    </div>
  </BriefBorder>
</template>
