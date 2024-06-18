<script setup lang="ts">
import type { StorageBrief } from "~/interfaces/admin/brief.interface";

const props = defineProps<{
  brief: StorageBrief;
}>();

const usedSpaceInMB = computed(() => props.brief.usedSpace / 1024 / 1024);

const totalAvailableSpaceInMB = computed(
  () => props.brief.totalAvailableSpace / 1024 / 1024
);
</script>

<template>
  <BriefBorder>
    <div class="px-4 pt-4">
      <h3 class="text-white">Состояние хранилища</h3>
      <ProgressIndicator
        :total="totalAvailableSpaceInMB"
        :current="usedSpaceInMB"
        class="mt-3"
      />

      <div class="text-sm text-gray-light mt-2">
        {{ (totalAvailableSpaceInMB - usedSpaceInMB).toFixed(2) }} МБ свободно
        из 100 МБ
      </div>
      <h3 class="text-white mt-3">Папки</h3>
    </div>
    <div class="py-2 px-4 hover:bg-gray">
      <div class="flex justify-between">
        <h4 class="text-white">Media</h4>
        <NuxtLink to="/admin/folders/media" class="text-white hover:underline"
          >Подробнее</NuxtLink
        >
      </div>
    </div>
    <div class="py-2 px-4 hover:bg-gray">
      <div class="flex justify-between">
        <h4 class="text-white">Outputs</h4>
        <NuxtLink to="/admin/folders/outputs" class="text-white hover:underline"
          >Подробнее</NuxtLink
        >
      </div>
    </div>
  </BriefBorder>
</template>
