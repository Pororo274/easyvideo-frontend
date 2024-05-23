<script setup lang="ts">
import { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum";

const { $api } = useNuxtApp();
const { pushSystemNotification } = useAppNotification();

const props = withDefaults(
  defineProps<{
    method?: "post" | "get" | "put" | "patch";
    data?: any;
    action: string;
  }>(),
  {
    method: "post",
    data: {},
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
      body: {
        ...body,
        ...props.data,
      },
    });
    emit("success", data);
  } catch (e: any) {
    if (e.status === 422) {
      const requestErrors = e.data.errors;
      for (const key in requestErrors) {
        errors[key] = requestErrors[key][0];
      }
    }
    if (e.status === 500) {
      pushSystemNotification({
        type: SystemNotificationType.ERROR,
        message: "Случилось что-то плохое",
      });
    }
    emit("error", e);
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
