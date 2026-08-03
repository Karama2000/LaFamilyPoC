<!--
  HeroSection.vue
  ----------------
  Bandeau principal (hero) de la page d'accueil : gros titre, sous-titre,
  deux boutons d'appel à l'action (Bons plans / Partenaires) et une photo
  décorative avec un fond rose incliné derrière l'image.
-->
<script setup lang="ts">
defineProps<{ t: (key: string) => string }>()
</script>

<template>
  <main
    class="relative z-20 flex-1 flex items-start md:items-center justify-between gap-4 md:gap-8 px-5 md:px-12 pt-4 pb-16 md:pb-32">

    <!-- Colonne de gauche : titre, texte et boutons -->
    <div class="flex-1 min-w-0 md:max-w-[599px] md:flex-none md:shrink-0 text-left">
      <!-- Titre : affiché sur mobile ET desktop, découpé en 3 lignes traduites séparément -->
      <h1 class="w-full text-2xl md:text-[40px] font-bold leading-[30px] md:leading-[48px] tracking-[0.2px] mb-2 md:mb-4 break-words">
        <span class="block whitespace-nowrap">{{ t('heroTitle1') }}</span>
        <span class="block">{{ t('heroTitle2') }}</span>
        <span class="block">{{ t('heroTitle3') }}</span>
      </h1>
      <!-- Sous-titre -->
      <p
        class="text-sm md:text-[20px] leading-snug md:leading-[30px] tracking-[0.2px] mb-6 md:mb-10 max-w-[260px] md:max-w-[408px] break-words">
        {{ t('heroSubtitle') }}
      </p>

      <!-- Boutons d'action : empilés sur mobile, côte à côte sur desktop -->
      <div class="flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-start md:gap-5">
        <!-- Bouton principal (rempli, pêche) vers l'agenda -->
        <NuxtLink to="/agenda" class="rounded-[5px] w-[227px] h-[40px] pl-1 pr-5 md:w-[264px] md:h-[52px] md:pl-1 md:pr-5 text-sm leading-[22px] font-bold tracking-[0.2px] flex items-center gap-3 md:gap-2 whitespace-nowrap"
          style="background:#FFD1B5;color:#E61171">
          <span class="w-7 h-7 flex items-center justify-center shrink-0 md:w-10 md:h-10">
            <img src="/images/icones/bons-plans.png" alt="" class="w-6 h-6 object-contain md:w-10 md:h-10" />
          </span>
          {{ t('ctaBonsPlans') }}
        </NuxtLink>
        <!-- Bouton secondaire (contour blanc) vers la page partenaires -->
        <NuxtLink to="/partenaires" class="rounded-[5px] w-[191px] h-[45px] px-5 md:w-[217px] md:h-[52px] text-sm leading-[22px] font-bold tracking-[0.2px] whitespace-nowrap bg-transparent text-white border border-white flex items-center justify-center">
          {{ t('ctaPartenaires') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Colonne de droite : visuel photo + fond décoratif incliné -->
    <div class="relative w-[460px] max-w-[38vw] md:max-w-[42vw] mt-14 md:mt-0 -mr-8 md:mr-0 shrink-0 aspect-square">
      <!-- Fond pêche : reste à sa taille pleine, inchangé -->
      <div
        class="absolute inset-0 translate-x-[15%] translate-y-[2%] h-[117%] rotate-[15deg] rounded-[20px] md:rounded-[75px] border-2"
        style="background:#FFCEE4;border-color:#E61171"></div>
      <!-- Photo : réduite avec marge interne sur mobile, bordure pêche bien visible autour -->
      <div
        class="absolute inset-[7%] md:inset-0 translate-y-[7%] rotate-[15deg] rounded-[20px] md:rounded-[70px] border-2 overflow-hidden z-10"
        style="border-color:#E61171">
        <img src="/images/famille.jpeg" alt="Famille" class="w-full h-full object-cover block" />
      </div>
    </div>
  </main>
</template>
