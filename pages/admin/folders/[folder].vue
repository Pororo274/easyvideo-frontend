<script setup lang="ts">
import dateFormat from "dateformat";
import type { FileData } from "~/interfaces/admin/file-data.interface";

const { $api } = useNuxtApp();

const route = useRoute();

const { data: files } = await useAsyncData<FileData[]>(() =>
  $api(`/admin/folders/${route.params.folder}`)
);
</script>

<template>
  <TableLayout :data="files">
    <template #name> Список файлов папки {{ route.params.folder }} </template>
    <template #header>
      <TableHeaderCell class="col-span-4">Название</TableHeaderCell>
      <TableHeaderCell class="col-span-4">Дата редактирования</TableHeaderCell>
      <TableHeaderCell class="col-span-2">Размер</TableHeaderCell>
    </template>
    <template #default="{ data }">
      <TableRow v-for="file in data">
        <div class="col-span-4 flex items-center gap-1.5">
          <MediaFormatIcon :mime-type="file.mimeType" />
          <p class="text-white text-ellipsis flex-1 overflow-hidden">
            {{ file.name }}
          </p>
        </div>
        <p class="text-white col-span-4">
          {{ dateFormat(file.dateModified, "dd.mm.yyyy MM:HH") }}
        </p>
        <p class="text-white col-span-2">
          {{ (file.sizeInBytes / 1024 / 1024).toFixed(2) }} МБ
        </p>
        <div class="col-span-2 flex justify-end">
          <figure
            @click="
              navigateTo(file.url, {
                open: {
                  target: '_blank',
                },
              })
            "
            class="w-8 h-8 rounded-md hover:bg-gray cursor-pointer flex items-center justify-center"
          >
            <img
              class="icon-white w-4"
              src="~/assets/img/icons/actions/look.svg"
              alt=""
            />
          </figure>
        </div>
      </TableRow>
    </template>
  </TableLayout>
</template>
