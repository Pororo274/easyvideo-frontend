<template>
  <section class="pt-32 pb-6 relative overflow-hidden">
    <div class="absolute w-full h-full blur-[200px]">
      <div
        class="absolute w-72 h-72 bg-indigo-500 rounded-full -translate-x-1/2 bottom-0"
      ></div>
    </div>
    <div class="container relative">
      <LandingPageHeader>
        <template #name>ЦЕНЫ</template>
        <template #cta>
          Выберите что вам по душе, <br />
          творить надо с душой</template
        >
        <template #description
          >Все что нужно для одного человека или целой команды</template
        >
      </LandingPageHeader>
      <div class="grid grid-cols-3 mt-12 gap-6">
        <LandingRate>
          <template #name> Старт </template>
          <template #price>Бесплатно</template>
          <template #description
            >Отлично подойдет что бы попробовать и сделать правильный
            выбор</template
          >
          <template #advantages>
            <RateAdvantages>Полная функциональность</RateAdvantages>
            <RateDisadvantages>Одновременно 5 проектов</RateDisadvantages>
            <RateDisadvantages>300 МБ облачного хранилища</RateDisadvantages>
            <RateDisadvantages>Водяной знак на видео</RateDisadvantages>
          </template>
        </LandingRate>
        <LandingRate>
          <template #name> Стандарт </template>
          <template #price>399 руб. в мес</template>
          <template #description
            >Все что нужно для ежедневной работы и чуть-чуть больше</template
          >
          <template #advantages>
            <RateAdvantages>Полная функциональность</RateAdvantages>
            <RateAdvantages>Неограниченное количество проектов</RateAdvantages>
            <RateAdvantages>6 ГБ облачного хранилища</RateAdvantages>
            <RateAdvantages>Отсутствует водяной знак</RateAdvantages>
          </template>
        </LandingRate>
        <LandingRate>
          <template #name> Бизнес </template>
          <template #price>Договорная</template>
          <template #description
            >Для больших команд, которым нужна вся мощь технологий</template
          >
          <template #advantages>
            <RateAdvantages>Все что в тарифе "Стандарт"</RateAdvantages>
            <RateAdvantages>Больше возможностей</RateAdvantages>
            <RateAdvantages
              >Выбрать вместимость облачного хранилища</RateAdvantages
            >
            <RateAdvantages>API для автоматизации</RateAdvantages>
          </template>
        </LandingRate>
      </div>
    </div>
  </section>
</template>
