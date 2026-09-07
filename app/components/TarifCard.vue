<!--
  TarifCard.vue
  =============

  RÔLE :
  ------
  Carte présentant une formule tarifaire dans la section
  "Nos tarifs" de /devenir-partenaire.

  - t    : fonction de traduction
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
    <!-- =========================================================
         BADGE : LE PLUS CHOISI
         ========================================================= -->

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

    <!-- =========================================================
         TITRE DE L'OFFRE
         ========================================================= -->

    <BaseTitle
      size="card"
      tag="h3"
      color="#2e2f30"
      class="mb-1 text-left !text-[15px] font-bold"
    >
      {{ t(tier.title) }}
    </BaseTitle>

    <!-- =========================================================
         PRIX
         ========================================================= -->

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

      <BaseText
        tag="span"
        size="caption"
        color="#2e2f30"
      >
        {{ t(tier.priceSuffix) }}
      </BaseText>
    </div>

    <!-- =========================================================
         DESCRIPTION
         ========================================================= -->

    <BaseText
      size="caption"
      color="#888888"
      class="mb-4 text-left !text-[13px]"
    >
      {{ t(tier.description) }}
    </BaseText>

    <!-- =========================================================
         FONCTIONNALITÉS
         ========================================================= -->

    <ul class="flex flex-col gap-3 mb-6 flex-1">
      <li
        v-for="(feat, i) in tier.features"
        :key="i"
        class="flex items-start gap-2"
      >
        <!-- Icône check -->
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

        <!-- Texte traduit -->
        <BaseText
          tag="span"
          size="caption"
          color="#2e2f30"
          class="!text-[13px] !text-left"
        >
          {{ t(feat) }}
        </BaseText>
      </li>
    </ul>

    <!-- =========================================================
         BOUTON
         ========================================================= -->

    <BaseButton
      :variant="tier.highlighted ? 'pink' : 'rosePale'"
      :class="{ '!bg-[#FDF1EA]': !tier.highlighted }"
      fullWidth
      type="button"
      href="mailto:info@lafamily.ch"
    >
      {{ t(tier.ctaLabel) }}
    </BaseButton>
  </div>
</template>