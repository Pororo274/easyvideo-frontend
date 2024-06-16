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

const { brief } = useAccountProvider();
</script>

<template>
  <div class="p-5 border-b border-b-zinc-800">
    <div class="flex items-center justify-between">
      <h2 class="text-white text-xl font-medium">Настройки</h2>
      <CloseModalButton />
    </div>
  </div>
  <div class="p-5">
    <div>
      <h3 class="text-white">Хранилище</h3>
      <ProgressIndicator
        :total="brief.totalAvailableSpaceInBytes"
        :current="brief.totalUsedSpaceInBytes"
      />
    </div>
    <AppInput
      v-model="field"
      :placeholder="username"
      :disabled="true"
      class="mt-5"
    >
      Имя пользователя
    </AppInput>
    <AppForm @success="onLogout" class="mt-4" action="/auth/logout">
      <button>
        <IconButton :animation="false" :icon="logout" />
      </button>
    </AppForm>
  </div>
</template>
