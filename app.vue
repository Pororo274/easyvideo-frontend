<template>
  <div class="bg-zinc-950">
    <AppNotification>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </AppNotification>
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  border-radius: 12px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #18181b;
  border-radius: 12px;
}

::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0);
}
</style>
