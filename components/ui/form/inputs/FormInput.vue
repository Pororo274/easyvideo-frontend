<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder: string;
    type?: "text" | "password";
    name: string;
  }>(),
  {
    type: "text",
  }
);

interface AppFormProvide {
  errors: Ref<{ [key: string]: string }>;
  updateField: (name: string, newValue: string) => void;
}

const { errors, updateField } = inject<AppFormProvide>(
  "appForm"
) as AppFormProvide;

watch(errors, (newErrors) => {
  console.log(newErrors);
});

const field = ref("");

watchEffect(() => {
  updateField(props.name, field.value);
});
</script>

<template>
  <div>
    <AppInput
      v-model="field"
      :input-class="{
        'border-red-500': errors[name],
        'border-zinc-700': !errors[name],
      }"
      :placeholder="placeholder"
      :type="type"
    >
      <slot></slot>
    </AppInput>
    <p v-show="errors[name]" class="font-sans-serif mt-1.5 text-red-500 pl-1.5">
      {{ errors[name] }}
    </p>
  </div>
</template>
