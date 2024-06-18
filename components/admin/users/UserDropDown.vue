<script setup lang="ts">
import type { User as BaseUser } from "~/interfaces/account/user.interface";

interface User extends BaseUser {
  subscription: string;
}

const isDropDownMenuActive = ref(false);

const isBanModalActive = ref(false);

defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="col-span-3 flex justify-end">
    <AttentionModal
      v-model="isBanModalActive"
      :action="`/admin/users/${user.id}/ban`"
      method="patch"
    >
      <template #text>Вы уверены, что хотите забанить пользователя?</template>
    </AttentionModal>
    <figure
      v-out="() => (isDropDownMenuActive = false)"
      @click.stop="isDropDownMenuActive = !isDropDownMenuActive"
      class="relative flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray"
    >
      <img
        class="icon-white h-4"
        src="~/assets/img/icons/account/menu.svg"
        alt=""
      />
      <div
        v-show="isDropDownMenuActive"
        class="-left-2 translate-y-1 top-full absolute z-10 w-[200px] border bg-black border-gray rounded-md overflow-hidden"
      >
        <DropDownButton>Подробнее</DropDownButton>
        <DropDownButton v-if="!user.subscription"
          >Активировать подписку</DropDownButton
        >
        <DropDownButton @click="navigateTo(`/admin/users/${user.id}/projects`)"
          >Список проектов</DropDownButton
        >
        <DropDownButton @click="isBanModalActive = true"
          >Забанить</DropDownButton
        >
      </div>
    </figure>
  </div>
</template>
