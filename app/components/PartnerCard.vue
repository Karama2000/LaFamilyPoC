<!--
  PartnerCard.vue
  -----------------
  Carte présentant un partenaire dans la liste/grille des partenaires :
  logo, badges de zone de couverture (Suisse romande / alémanique),
  catégorie, nom et bouton "visiter le site".
-->
<script setup lang="ts">
import type { Partner } from '~/data/partnersData'

defineProps<{
  partner: Partner              // données du partenaire à afficher
  t: (key: string) => string    // fonction de traduction (i18n)
}>()
</script>

<template>
  <!-- Carte avec effet de survol (légère élévation + ombre plus marquée) -->
  <article
    class="group relative flex flex-col items-center text-center rounded-[18px] bg-white p-5 shadow-[0_10px_20px_rgba(230,17,113,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(230,17,113,0.14)]">

    <!-- Badges de zone de couverture (SR = Suisse romande, SA = Suisse alémanique), affichés seulement si applicable -->
    <div class="absolute top-3 right-3 flex gap-1">
      <span v-if="partner.coverage.includes('SR')" class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
        style="background:#FFCEE4;color:#E61171" title="Suisse romande">SR</span>
      <span v-if="partner.coverage.includes('SA')" class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
        style="background:#FFD1B5;color:#E61171" title="Suisse alémanique">SA</span>
    </div>

    <!-- Logo du partenaire (masqué automatiquement si l'image ne charge pas) -->
    <div class="w-20 h-20 rounded-[16px] flex items-center justify-center mb-4 mt-2 overflow-hidden"
      style="background:#FFF8F4;border:2px solid #FFE4D3">
      <img :src="partner.logo" :alt="partner.name" class="w-full h-full object-contain p-2"
        @error="($event.target as HTMLImageElement).style.display = 'none'" />
    </div>

    <!-- Badge de catégorie du partenaire -->
    <span class="rounded-full px-3 py-1 text-[11px] font-bold mb-2" style="background:#FFF0E5;color:#E61171">
      {{ t(partner.category) }}
    </span>

    <!-- Nom du partenaire (hauteur minimale fixe pour aligner les cartes entre elles) -->
    <h3 class="text-[15px] font-bold leading-snug mb-4 min-h-[40px] flex items-center" style="color:#2E2F30">
      {{ partner.name }}
    </h3>

    <!-- Bouton d'appel à l'action : ouvre le site du partenaire dans un nouvel onglet -->
    <a :href="partner.link" target="_blank" rel="noopener noreferrer"
      class="mt-auto w-full rounded-[10px] py-2.5 text-[13px] font-bold tracking-[0.2px] transition-colors flex items-center justify-center gap-1.5"
      style="background:#E61171;color:#FFFFFF">
      {{ t('visitSite') }}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17L17 7M7 7h10v10" />
      </svg>
    </a>
  </article>
</template>
