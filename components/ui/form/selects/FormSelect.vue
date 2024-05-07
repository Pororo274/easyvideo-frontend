<script setup lang="ts">
const props = defineProps<{
  name: string;
  defaultValue: string;
}>();

const { error, field } = useFormAdapter(props.name, props.defaultValue);
</script>

<template>
  <AppSelect v-model="field">
    <template #label>
      <slot name="label"></slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </AppSelect>
</template>
