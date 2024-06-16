<script setup lang="ts">
type RangeInterval = number | string | undefined;

const model = defineModel<number | string>({
  required: true,
});

defineProps<{
  min: RangeInterval;
  max: RangeInterval;
  step: RangeInterval;
}>();

defineEmits<{
  blur: [];
}>();
</script>

<template>
  <div class="mt-5">
    <AppLabel>
      <slot></slot>
    </AppLabel>
    <div class="flex gap-3">
      <input
        v-model="model"
        type="range"
        @blur="$emit('blur')"
        class="appearance-none bg-transparent input_range flex-1"
        name=""
        :min="min"
        :max="max"
        :step="step"
        id=""
      />
      <p class="text-white text-sm w-10 text-end">
        {{ (+model).toFixed(2) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.input_range:focus {
  outline: none;
}

.input_range::-webkit-slider-runnable-track {
  background: #272727;
  height: 6px;
  border-radius: 10px;
}

.input_range::-webkit-slider-thumb {
  -webkit-appearance: none;
  -webkit-appearance: none;
  background: #666666;
  width: 14px;
  height: 14px;
  border-radius: 10px;
  margin-top: -4px;
  transition: all 0.1s ease;
}

.input_range:focus::-webkit-slider-thumb {
  background: #0066ff;
  transform: scale(1.2);
}
</style>
