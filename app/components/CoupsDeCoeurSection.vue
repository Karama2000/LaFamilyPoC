<!--
  CoupsDeCoeurSection.vue
  ------------------------
  Section "Coups de cœur" affichée sur desktop uniquement (masquée sur
  mobile, voir CoupsDeCoeurMobileStrip.vue pour l'équivalent mobile).
  Affiche une rangée de cartes colorées sur un fond pêche avec une forme
  courbe rose en haut de la section.
-->
<script setup lang="ts">
import { coupsDeCoeur } from "~/data/coupsDeCoeur";

defineProps<{ t: (key: string) => string }>();
</script>

<template>
  <!-- Section visible uniquement à partir du breakpoint md (masquée sur mobile) -->
  <section
    class="relative z-10 pt-20 pb-20 px-6 md:px-12 hidden md:block"
    style="background: #ffd1b5"
  >
    <!-- Forme décorative courbe rose, positionnée à cheval sur le haut de la section -->
    <div
      class="absolute inset-x-0 top-0 h-[128px] -translate-y-1/2 rounded-[100%] pointer-events-none"
      style="background: #e61171"
    ></div>

    <BaseTitle
      size="section"
      tag="h2"
      color="#E61171"
      class="relative z-10 text-center mb-12 pt-16 !font-bold"
    >
      {{ t("coupsDeCoeurTitle") }}
    </BaseTitle>

    <!-- Rangée de cartes (couleur de fond/bordure définie dans les données coupsDeCoeur) -->
    <div
      class="relative max-w-[1319px] mx-auto flex flex-nowrap justify-center gap-[30px]"
    >
      <div
        v-for="(coup, i) in coupsDeCoeur"
        :key="i"
        class="w-[244px] h-[284px] rounded-[10px] border-[3px] shadow-[0_13px_19px_rgba(0,0,0,0.07)]"
        :style="{ background: coup.bg, borderColor: coup.border }"
      ></div>
    </div>
  </section>
</template>
