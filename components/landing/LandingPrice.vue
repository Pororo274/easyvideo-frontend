<template>
  <section class="mt-24 lg:mt-48 pb-6">
    <div class="container">
      <h2 class="text-white font-medium text-center text-2xl">
        Выберите свой тариф
      </h2>
      <div class="grid md:grid-cols-2 gap-6 mt-12">
        <LandingRate>
          <template #name> Старт </template>
          <template #subname>Отлично чтобы попробовать</template>
          <template #price>Бесплатно</template>
          <template #description>
            Водяной знак на видео. В подарок 1 ГБ облачного хранилища. Не более
            5 проектов</template
          >
        </LandingRate>
        <LandingRate>
          <template #name> Стандарт </template>
          <template #subname>Для поседневных задач</template>
          <template #price>399руб</template>
          <template #description>
            4 ГБ облачного хранилища. Неограниченное количество
            проектов</template
          >
        </LandingRate>
      </div>
    </div>
  </section>
</template>
