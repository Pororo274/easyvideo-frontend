<script setup lang="ts" generic="T = unknown[]">
defineProps<{
  data: T;
}>();
</script>

<template>
  <div class="grid grid-cols-[1fr_70ch_1fr]">
    <div class="col-start-2">
      <h2 v-if="$slots.name" class="text-white font-medium text-2xl mb-3">
        <slot name="name"></slot>
      </h2>
      <TableHeader>
        <slot name="header"></slot>
      </TableHeader>
      <div v-if="data && (data as unknown[]).length">
        <slot :data="data"></slot>
      </div>
      <TableRow v-else>
        <p class="text-gray-light text-center col-span-12">Ничего не найдено</p>
      </TableRow>
    </div>
  </div>
</template>
