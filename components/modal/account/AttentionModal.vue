<script setup lang="ts">
import type { HttpMethod } from "~/types/http-method.type";

const model = defineModel<boolean>();
defineProps<{
  action: string;
  method: HttpMethod;
}>();
const emit = defineEmits<{
  success: [];
}>();

const onSuccess = () => {
  model.value = false;
  emit("success");
};
</script>

<template>
  <AppModal v-model="model">
    <div class="p-5">
      <h3
        v-if="$slots.header"
        class="text-white font-medium text-xl text-center"
      >
        <slot name="header"></slot>
      </h3>
      <p v-if="$slots.text" class="text-white text-center">
        <slot name="text"></slot>
      </p>

      <div class="flex gap-4 mt-4">
        <AppForm
          @success="onSuccess"
          :action="action"
          class="flex-1"
          :method="method"
        >
          <FormButton class="w-full">Да</FormButton>
        </AppForm>
        <MakeCloseModal v-slot="{ hide }">
          <RedButton @click="hide" class="flex-1">Нет</RedButton>
        </MakeCloseModal>
      </div>
    </div>
  </AppModal>
</template>
