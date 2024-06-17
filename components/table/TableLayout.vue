<script setup lang="ts" generic="T = unknown">
defineProps<{
  data: T;
}>();
</script>

<template>
  <div class="grid grid-cols-[1fr_70ch_1fr]">
    <div class="col-start-2">
      <h2 v-if="$slots.name" class="text-white font-medium text-2xl mb-6">
        <slot name="name"></slot>
      </h2>
      <TableHeader>
        <slot name="header"></slot>
      </TableHeader>
      <div v-if="data">
        <slot :data="data"></slot>
      </div>
    </div>
  </div>
</template>
