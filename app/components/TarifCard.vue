<!--
  TarifCard.vue
  ==============
  RÔLE :
  ------
  Carte présentant une formule tarifaire dans la section "Nos tarifs"
  de /devenir-partenaire : titre de l'offre, prix, description, liste
  de fonctionnalités incluses (avec coche), et bouton d'action. Utilisée
  en boucle (v-for) sur `partnershipTiers` (voir ~/data/partnershipData.ts).
 
  PROPS :
  -------
  - tier : objet PartnershipTier : title, price, priceSuffix,
           description, features (tableau de chaînes), ctaLabel,
           highlighted (booléen).
  - t    : fonction de traduction i18n (présente dans les props mais
           actuellement NON utilisée dans le template : tous les textes
           viennent directement de `tier`, déjà traduit en amont par la
           page appelante). Gardée dans les props pour cohérence avec
           les autres cartes de l'app et pour usage futur si besoin.
 
  MISE EN AVANT DE L'OFFRE RECOMMANDÉE (`tier.highlighted`) :
  -------------------------------------------------------------
  Quand `highlighted` est vrai, la carte :
    - remonte légèrement sur desktop (`md:-translate-y-4`) pour ressortir
      visuellement au-dessus des autres offres
    - a une bordure rose + ombre plus marquée
    - affiche un badge "Le plus choisi" en haut, centré, à cheval sur le
      bord supérieur de la carte (positionnement absolu)
    - son bouton d'action passe en variante pleine (`pink`) au lieu de
      la variante discrète (`rosePale`)
  C'est la SEULE carte de listing de l'app qui n'a PAS de hauteur ou de
  zones de texte fixes en pixels : les 3 offres ont un contenu de
  longueur comparable par construction (données maîtrisées côté admin),
  donc l'alignement est géré plus simplement via `flex-1` sur la liste
  de fonctionnalités (`<ul>`), qui pousse le bouton en bas quelle que
  soit la carte.
 
  TYPOGRAPHIE :
  -------------
  - Titre de l'offre -> BaseTitle size="card" (16px mobile / 20px
    desktop), même échelle que les autres cartes de l'app.
  - Prix              -> BaseText size="body" bold (accent visuel fort,
    comme les autres montants affichés dans l'app, ex: devenir-partenaire.vue).
  - Suffixe de prix / description / fonctionnalités / badge "Le plus
    choisi" -> BaseText size="caption", cohérent avec le texte
    secondaire des autres cartes.
-->

<script setup lang="ts">
import type { PartnershipTier } from "~/data/partnershipData";

defineProps<{
  tier: PartnershipTier;
  t: (key: string) => string;
}>();
</script>

<template>
  <div
    class="relative flex flex-col p-6 rounded-[10px]"
    :class="tier.highlighted ? 'md:-translate-y-4' : ''"
    :style="
      tier.highlighted
        ? 'background:#FFFFFF;border:2px solid #E61171;box-shadow:0 18px 35px rgba(0,0,0,0.16), 0 6px 14px rgba(0,0,0,0.08)'
        : 'background:#FFFFFF;border:1px solid #FFE4D3;box-shadow:0 12px 28px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.05)'
    "
  >
    <!-- Badge "Le plus choisi" -->
    <span
      v-if="tier.highlighted"
      class="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10.5px] font-bold whitespace-nowrap"
      style="background: #e61171; color: #ffffff; border: 1.5px solid #fff0e5"
    >
      {{ t("lePlusChoisi") }}
    </span>

    <BaseText
      v-if="tier.highlighted"
      tag="span"
      size="caption"
      bold
      color="#ffffff"
      class="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 whitespace-nowrap"
      style="background: #e61171; border: 1.5px solid #fff0e5"
    >
      {{ t("lePlusChoisi") }}
    </BaseText>

    <!-- Titre -->

    <BaseTitle
      size="card"
      tag="h3"
      color="#2e2f30"
      class="mb-1 text-left !text-[15px] font-bold"
    >
      {{ tier.title }}
    </BaseTitle>

    <!-- Prix -->
    <div class="flex items-baseline gap-1 mb-1">
     
      <BaseText
        tag="span"
        size="body"
        bold
        color="#e61171"
        class="!font-bold !text-[24px] py-3"
      >
        {{ tier.price }}
      </BaseText>

      <BaseText tag="span" size="caption" color="#2e2f30">
        {{ tier.priceSuffix }}
      </BaseText>
    </div>

    <!-- Description -->
    <BaseText
      size="caption"
      color="#888888"
      class="mb-4 text-left !text-[13px]"
    >
      {{ tier.description }}
    </BaseText>
    <!-- Fonctionnalités -->
    <ul class="flex flex-col gap-3 mb-6 flex-1">
      <li
        v-for="(feat, i) in tier.features"
        :key="i"
        class="flex items-start gap-2"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#E61171"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="shrink-0 mt-0.5"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>

        <BaseText
          tag="span"
          size="caption"
          color="#2e2f30"
          class="!text-[13px] !text-left"
        >
          {{ feat }}
        </BaseText>
      </li>
    </ul>

    <!-- Bouton -->
    <BaseButton
      :variant="tier.highlighted ? 'pink' : 'rosePale'"
      :class="{ '!bg-[#FDF1EA]': !tier.highlighted }"
      fullWidth
      type="button"
      href="mailto:info@lafamily.ch"
    >
      {{ tier.ctaLabel }}
    </BaseButton>
  </div>
</template>
