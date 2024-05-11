<script setup lang="ts">
import { SystemNotificationType } from "~/enums/notifications/system-notification-type.enum";

useHead({
  title: "EasyVideo - Login",
});

definePageMeta({
  layout: "auth",
  middleware: ["guest"],
});

const { pushSystemNotification } = useAppNotification();
const { refreshUserData } = useUser();

const onError = (e: any) => {
  if (e.status !== 422 || e.data.errors) return;

  pushSystemNotification({
    type: SystemNotificationType.ERROR,
    message: e.data.message,
  });
};

const onSuccess = async (data: any) => {
  await refreshUserData(data);
  await navigateTo("/account");
};
</script>

<template>
  <AppForm
    @error="onError"
    @success="onSuccess"
    action="/auth/login"
    class="col-start-4 col-span-2 bg-zinc-900 rounded-lg p-4"
  >
    <h1 class="text-2xl font-medium text-white">Вход</h1>
    <div class="flex flex-col gap-4 mt-4">
      <FormInput name="email" placeholder="example@mail.ru"
        >Электронная почта</FormInput
      >
      <FormInput name="password" placeholder="Что-то секретное" type="password"
        >Пароль</FormInput
      >
    </div>
    <FormButton class="mt-6 w-full">Войти</FormButton>
    <p class="text-white mt-4 text-center">
      Нет аккаунта?
      <NuxtLink to="/" class="text-indigo-600 underline"
        >Зарегистрироваться</NuxtLink
      >
    </p>
  </AppForm>
</template>
