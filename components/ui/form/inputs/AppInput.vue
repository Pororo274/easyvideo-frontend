<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "password" | "text";
    placeholder: string;
    inputClass: string | string[] | object;
  }>(),
  {
    type: "text",
  }
);

const model = defineModel();
</script>

<template>
  <div>
    <AppLabel>
      <slot></slot>
    </AppLabel>
    <input
      v-model="model"
      :type="type"
      :class="inputClass"
      :placeholder="placeholder"
      class="block bg-transparent border text-base rounded-md px-3 py-1.5 w-full mt-1 focus:outline-none focus:border-indigo-500 caret-white text-white placeholder:text-zinc-600"
    />
  </div>
</template>
