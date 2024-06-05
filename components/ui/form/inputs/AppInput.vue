<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "password" | "text" | "number";
    placeholder: string;
    inputClass?: string | string[] | object;
    disabled?: boolean;
  }>(),
  {
    type: "text",
    disabled: false,
  }
);

const model = defineModel();

defineEmits<{
  blur: [e: FocusEvent];
}>();
</script>

<template>
  <div>
    <AppLabel>
      <slot></slot>
    </AppLabel>
    <input
      @blur="(e) => $emit('blur', e)"
      v-model="model"
      :type="type"
      :class="inputClass"
      :placeholder="placeholder"
      :disabled="disabled"
      class="block bg-transparent border text-base rounded-md px-4 py-2 w-full mt-1 focus:outline-none focus:border-blue caret-white text-white placeholder:text-gray-light disabled:opacity-70"
    />
  </div>
</template>
