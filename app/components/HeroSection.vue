<script setup lang="ts">
defineProps<{ t: (key: string) => string }>();
</script>

<template>
  <main
    class="relative z-20 flex-1 flex items-start md:items-center justify-between gap-4 md:gap-8 px-5 md:px-7  md:pt-30 pb-16 md:pb-40"
  >
    <!-- Colonne de gauche : titre, texte et boutons -->
    <div
      class="flex-1 min-w-0 md:w-[599px] md:max-w-[599px] md:flex-none md:shrink-0 text-left"
    >
      <BaseTitle size="page" class="mb-2 md:!leading-[54px]"  >
        <span class="block whitespace-nowrap">{{ t("heroTitle1") }}</span>
        <span class="block">{{ t("heroTitle2") }}</span>
        <span class="block">{{ t("heroTitle3") }}</span>
      </BaseTitle>

      <BaseSubtitle size="description" tag="p" >
        {{ t("heroSubtitle") }}
      </BaseSubtitle>

      <!-- Boutons d'action : toujours côte à côte (row), même sur web -->
      <div
        class="flex flex-row flex-wrap md:flex-wrap items-end gap-3 md:gap-5"
      >
        <BaseButton variant="peach" to="/agenda" class="">
          <span
            class="w-7 h-7 flex items-center justify-center shrink-0 md:w-7 md:h-7"
          >
            <img
              src="/images/icones/bons-plans.png"
              alt=""
              class="w-6 h-6 object-contain md:w-10 md:h-10"
            />
          </span>
          {{ t("ctaBonsPlans") }}
        </BaseButton>

        <BaseButton
          variant="whiteOutline"
          to="/partenaires"
          class="md:!px-3 md:py-2.5"
        >
          {{ t("ctaPartenaires") }}
        </BaseButton>
      </div>
    </div>

    <!-- Colonne de droite : visuel photo + fond décoratif incliné -->
    <div
      class="relative w-[460px] max-w-[38vw] md:max-w-[42vw] mt-14 md:mt-0 -mr-8 md:mr-0 shrink-0 aspect-square"
    >
      <div
        class="absolute inset-0 translate-x-[15%] translate-y-[2%] h-[117%] rotate-[15deg] rounded-[20px] md:rounded-[75px] border-2"
        style="background: #ffcee4; border-color: #e61171"
      ></div>
      <div
        class="absolute inset-[7%] md:inset-0 translate-y-[7%] rotate-[15deg] rounded-[20px] md:rounded-[70px] border-2 overflow-hidden z-10"
        style="border-color: #e61171"
      >
        <img
          src="/images/famille.jpeg"
          alt="Famille"
          class="w-full h-full object-cover block"
        />
      </div>
    </div>
  </main>
</template>
