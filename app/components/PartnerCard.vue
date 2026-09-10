<!--
  PartnerCard.vue
  -----------------
  Carte présentant un partenaire dans la liste/grille des partenaires :
  logo, badges de zone de couverture (Suisse romande / alémanique),
  catégorie, nom et bouton "visiter le site".
-->
<script setup lang="ts">
import { computed } from "vue";
import type { Partner } from "~/data/partnersData";
import { usePartnerLogo } from "~/composables/usepartnerlogo";

const props = defineProps<{
  partner: Partner; // données du partenaire à afficher
  t: (key: string) => string; // fonction de traduction (i18n)
}>();

// Alias utilisés par le template existant, afin de ne modifier ni la carte
// ni sa mise en page.
const partner = computed(() => props.partner);
const t = (key: string) => props.t(key);

// Logique de fallback du logo mutualisée avec la page détail partenaire
// (voir composables/usePartnerLogo.ts) afin que les deux pages affichent
// toujours la même image.
const { displayedLogo, useFallbackLogo } = usePartnerLogo(partner);
</script>

<template>
  <!-- Carte avec effet de survol (légère élévation + ombre plus marquée) -->
<BaseCard
  variant="agenda"
  :padding="false"
  class="h-[270px] group hover:shadow-[0_14px_28px_rgba(230,17,113,0.12)] hover:-translate-y-0.5 transition-all duration-300"
>
  <div class="h-full flex flex-col items-center text-center px-5 pt-4 pb-2">
    <!-- Logo : 80px fixe, jamais écrasé -->
    <div
      class="w-20 h-20 rounded-[10px] flex items-center justify-center mb-3 shrink-0 overflow-hidden"
      style="background: #fff8f4; border: 2px solid #ffe4d3"
    >
      <img
        :src="displayedLogo"
        :alt="partner.name"
        class="w-full h-full object-contain p-2"
        @error="useFallbackLogo"
      />
    </div>

    <!-- Catégorie : hauteur fixe 32px -->
    <BaseButton
      variant="beigeBadge"
      style="background: #fff0e5"
      class="shrink-0 h-[32px] !py-0 mb-3"
    >
      {{ t(partner.category) }}
    </BaseButton>

    <!-- Nom : HAUTEUR STRICTE 48px, texte coupé proprement -->
    <div
      class="shrink-0 h-[48px] mb-3 w-full flex items-center justify-center overflow-hidden"
    >
      
       <BaseTitle size="card" tag="h3" color="#2e2f30" class="!text-[15px] font-bold !leading-snug line-clamp-2"> {{ partner.name }}</BaseTitle>
    </div>

    <!-- Bouton : proche du bas de la card -->
    <div class="mt-auto shrink-0 w-full flex justify-center ">
      <BaseButton
        variant="pink"
        :to="`/partenaire/${partner.id}`"
      >
        {{ t("voirLesDetails") }}
      </BaseButton>
    </div>
  </div>
</BaseCard>
</template>