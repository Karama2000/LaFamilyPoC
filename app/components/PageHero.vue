<!--
  PageHero.vue
  -------------
  Bandeau hero rose avec vagues de séparation (mobile + desktop), utilisé
  en haut de TOUTES les pages listing/détail (agenda, blogs, partenaires,
  et leurs pages de détail). Regroupe tout ce qui était dupliqué :
  fond rose, vagues SVG, header mobile/desktop, titre + sous-titre.

  Le slot par défaut permet de mettre n'importe quel contenu (titre simple,
  ou titre + badges + date comme dans article/[id].vue).
-->
<script setup lang="ts">
defineProps<{
  t: (key: string) => string;
  currentLang: string;
  /** Couleur de la vague de séparation (celle "sous" le hero). Par défaut blanc. */
  waveColor?: string;
  /** Hauteur mini du bandeau (classe Tailwind). Par défaut celle de l'agenda. */
  minHeightClass?: string;
}>();

defineEmits<{ setLang: [lang: string] }>();
</script>

<template>
  <div
    class="relative overflow-hidden flex flex-col text-white"
    :class="minHeightClass ?? 'min-h-[300px] md:min-h-[340px]'"
    style="background: var(--color-primary)"
  >
    <!-- Fond uni -->
    <div
      class="absolute inset-x-0 top-0 h-full z-0 pointer-events-none"
      style="background: var(--color-primary)"
    ></div>

    <!-- Vague de séparation (mobile) -->
    <svg
      class="absolute -bottom-px left-0 w-full h-[120px] z-0 pointer-events-none md:hidden"
      viewBox="0 0 830 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,120 L0,70 Q207.5,40 415,60 Q622.5,80 830,30 L830,120 Z"
        :fill="waveColor ?? '#FFFFFF'"
      />
    </svg>
    <!-- Vague de séparation (desktop) -->
    <svg
      class="absolute -bottom-px left-0 w-full h-[140px] z-0 pointer-events-none hidden md:block"
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
    >
      <path
        d="M0,90 C240,60 480,110 720,90 C960,70 1200,20 1440,50 L1440,140 L0,140 Z"
        :fill="waveColor ?? '#FFFFFF'"
      />
    </svg>

    <!-- En-tête mobile fixe -->
    <FixedMobileHeader
      :t="t"
      :current-lang="currentLang"
      @set-lang="$emit('setLang', $event)"
      class="md:hidden"
    />
    <!-- En-tête desktop -->
    <div class="hidden md:block">
      <SiteHeader
        :t="t"
        :current-lang="currentLang"
        @set-lang="$emit('setLang', $event)"
      />
    </div>

    <!-- Contenu du hero (titre, sous-titre, badges...) fourni par la page appelante -->
    <div class="relative z-20 px-5 md:px-12 pt-2 pb-20 md:pb-20 flex flex-col gap-2 md:gap-3">
      <slot />
    </div>
  </div>
</template>