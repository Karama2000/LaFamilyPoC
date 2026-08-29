<!--
  BaseText.vue
  ============
  Composant pour TOUT texte qui n'est ni un titre ni un sous-titre :
  paragraphes, compteurs de résultats, labels de bouton, légendes,
  liens "Réinitialiser", chips de filtre, métadonnées (date, lieu)...

  TAILLES DE LA CHARTE :
  -----------------------
  size="body" -> texte de lecture standard (paragraphes, contenu
    d'article, description longue).
    16px, IDENTIQUE mobile et desktop (pas de variante responsive :
    un paragraphe de 16px reste lisible sur les deux formats).

  size="caption" -> petit texte : compteur de résultats, légende,
    métadonnée, texte secondaire.
    12px, IDENTIQUE mobile et desktop.

  size="button" -> texte de bouton ou de lien actionnable qui
    n'utilise pas déjà BaseButton (ex: "Réinitialiser").
    12px EN GRAS, IDENTIQUE mobile et desktop.

  PROPS :
  -------
  tag       : tag HTML rendu (défaut "p"). Mettre "button", "span",
              "label"... selon le contexte sémantique réel.
  bold      : force le gras, indépendamment de la taille choisie
              (ex: un "body" en gras pour une accroche importante).
  color     : couleur du texte (défaut "#ffffff").
  underline : ajoute un soulignement (utile pour les liens type
              "Réinitialiser").

  SURCHARGER UN CAS PARTICULIER :
  --------------------------------
    <BaseText size="body" class="!text-[18px]">
      Un paragraphe volontairement plus grand ici
    </BaseText>

  CE QUE LE COMPOSANT GÈRE POUR VOUS :
    - taille (fixe, volontairement non responsive à ce niveau)
    - line-height
    - graisse (normal par défaut, gras si bold=true ou size="button")
    - couleur
    - soulignement optionnel
    - majuscule première lettre
    - tag HTML
-->

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: "body" | "caption" | "button" | "bodyFooter";
    tag?: string;
    bold?: boolean;
    color?: string;
    underline?: boolean;
  }>(),
  {
    size: "body",
    tag: "p",
    bold: false,
    color: "#ffffff",
    underline: false,
  },
);

const sizeClass = computed(() => {
  switch (props.size) {
    case "caption":
      return "text-[13px] md:text-[14px] leading-[16px] font-normal";

    case "button":
      return "text-[12px] leading-[16px] font-bold";

    case "bodyFooter":
      return "text-[16px] md:text-[18px] leading-[22px]  font-semibold ";

    default: // "body"
      return "text-[16px] md:text-[17px] leading-[20px] font-normal";
  }
});
</script>

<template>
  <component
    :is="tag"
    class="!cap-first"
    :class="[
      sizeClass,
      props.bold ? 'font-bold' : '',
      props.underline ? 'underline' : '',
    ]"
    :style="{ color }"
  >
    <slot />
  </component>
</template>
