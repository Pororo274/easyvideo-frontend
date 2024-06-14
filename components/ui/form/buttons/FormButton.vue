<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

interface AppForm {
  isLoading: Ref<boolean>;
}

const { isLoading } = inject<AppForm>("appForm") as AppForm;
</script>

<template>
  <BlueButton :disabled="isLoading" type="submit" class="relative">
    <div
      :class="{
        'opacity-0': isLoading,
      }"
    >
      <slot></slot>
    </div>

    <SpinnerLoading v-show="isLoading" />
  </BlueButton>
</template>
