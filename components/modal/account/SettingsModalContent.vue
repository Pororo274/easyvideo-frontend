<script setup lang="ts">
import logout from "~/assets/img/icons/actions/logout.svg";

defineProps<{
  username: string;
}>();

const field = ref("");

const { clearUser } = useUser();

const onLogout = () => {
  clearUser();
  navigateTo("/");
};
</script>

<template>
  <div class="p-5 border-b border-b-zinc-800">
    <div class="flex items-center justify-between">
      <h2 class="text-white text-xl font-medium">Настройки</h2>
      <CloseModalButton />
    </div>
  </div>
  <div class="p-5">
    <AppInput v-model="field" :placeholder="username" :disabled="true">
      Имя пользователя
    </AppInput>
    <AppForm @success="onLogout" class="mt-4" action="/auth/logout">
      <button>
        <IconButton :animation="false" :icon="logout" />
      </button>
    </AppForm>
  </div>
</template>
