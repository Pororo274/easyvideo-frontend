<script setup lang="ts">
const { $api } = useNuxtApp();

const props = withDefaults(
  defineProps<{
    method?: "post" | "get" | "put" | "patch";
    action: string;
  }>(),
  {
    method: "post",
  }
);

const emit = defineEmits<{
  error: [res: object];
  success: [data: unknown];
}>();

const body = reactive<{ [key: string]: string }>({});
const errors = reactive<{ [key: string]: string[] }>({});
const isLoading = ref(false);

const sendRequest = async () => {
  isLoading.value = true;
  for (const error in errors) {
    delete errors[error];
  }
  try {
    const data = await $api(props.action, {
      method: props.method,
      body: body,
    });
    emit("success", data);
  } catch (e: any) {
    if (e.status === 422) {
      const requestErrors = e.data.errors;
      for (const key in requestErrors) {
        errors[key] = requestErrors[key][0];
      }
    }
    emit("error", e);
  } finally {
    isLoading.value = false;
  }
};

const updateField = (name: string, newValue: string) => {
  body[name] = newValue;
};

provide("appForm", {
  errors,
  updateField,
  isLoading,
});
</script>

<template>
  <form @submit.prevent="sendRequest">
    <slot></slot>
  </form>
</template>
