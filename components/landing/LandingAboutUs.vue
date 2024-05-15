<template>
  <section class="pt-32">
    <div class="container">
      <LandingPageHeader>
        <template #name>ЗАДАЧИ</template>
        <template #cta>
          Для работы или домашнего <br />
          использования, неважно</template
        >
        <template #description
          >EasyVideo решает любую типовую проблему в видеомонтаже</template
        >
      </LandingPageHeader>
      <div class="grid grid-cols-3 gap-24 mt-12">
        <InfoItem>
          <template #name>Простота использования</template>
          <template #description
            >Интерфейс, который запросто позволит реализовать ваши
            идеи</template
          >
        </InfoItem>
        <InfoItem>
          <template #name>Облачное хранилище</template>
          <template #description>Больше места для ваших шедевров</template>
        </InfoItem>
        <InfoItem>
          <template #name>Иструменты автоматизации</template>
          <template #description>Сделайте рутинные задачи не скучными</template>
        </InfoItem>
      </div>
    </div>
  </section>
</template>
