<script setup lang="ts">
const props = defineProps<{
  totalSpace: number;
  usedSpace: number;
}>();

const availableSpace = computed(() => {
  return props.totalSpace - props.usedSpace;
});
</script>

<template>
  <div>
    <h3 class="text-white">Хранилище</h3>
    <ProgressIndicator :total="totalSpace" :current="usedSpace" />
    <p class="text-gray-light mt-2">
      Доступно {{ (availableSpace / 1024 / 1024).toFixed(2) }} МБ из
      {{ props.totalSpace / 1024 / 1024 }} МБ
    </p>
  </div>
</template>
