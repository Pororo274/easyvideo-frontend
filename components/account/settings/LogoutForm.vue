<script setup lang="ts">
import logout from "~/assets/img/icons/actions/logout.svg";

const { clearUser } = useUser();

const onLogout = () => {
  clearUser();
  navigateTo("/");
};
</script>

<template>
  <AppForm @success="onLogout" action="/auth/logout">
    <button>
      <IconButton :animation="false" :icon="logout" />
    </button>
  </AppForm>
</template>
