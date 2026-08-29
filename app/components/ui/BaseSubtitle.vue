<!--
  BaseSubtitle.vue
  ================
  Composant pour les textes qui accompagnent un titre : sous-titre
  de hero, texte d'introduction d'un bloc, description de catégorie...
  Différence avec BaseTitle : jamais en gras par défaut (un sous-titre
  est un texte de lecture, pas un titre visuel fort).

  TAILLES DE LA CHARTE :
  -----------------------
  size="subtitle" -> sous-titre marquant (accroche sous un titre
    de page, résumé important). Reprend volontairement la même
    échelle que "section" dans BaseTitle, pour garder un poids
    visuel cohérent entre les deux.
    mobile  : 20px / line-height 26px
    desktop : 24px / line-height 30px
    tag par défaut : <h2>

  size="description" -> texte descriptif plus discret (description
    de catégorie, sous-titre secondaire).
    mobile  : 16px / line-height 22px
    desktop : 20px / line-height 26px
    tag par défaut : <h2> (à surcharger en "p" si le contexte ne
    doit pas être un titre au sens HTML/SEO)

  PROPS :
  -------
  tag   : tag HTML rendu (défaut "h2").
  color : couleur du texte (défaut "#ffffff").

  SURCHARGER UN CAS PARTICULIER :
  --------------------------------
    <BaseSubtitle size="description" class="!text-[18px]">
      Texte un peu plus grand ici seulement
    </BaseSubtitle>

  CE QUE LE COMPOSANT GÈRE POUR VOUS :
    - taille (mobile ET desktop)
    - line-height
    - letter-spacing
    - couleur
    - majuscule première lettre
    - tag HTML
-->

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: "subtitle" | "description";
    tag?: string;
    color?: string;
  }>(),
  {
    size: "subtitle",
    tag: "h2",
    color: "#ffffff",
  }
);

const sizeClass = computed(() => {
  switch (props.size) {
    case "subtitle":
      // mobile 20px -> desktop 24px (même échelle que BaseTitle "section")
      return "text-[20px] md:text-[24px] leading-[26px] md:leading-[30px] tracking-[0.2px]";

    case "description":
      // mobile 16px -> desktop 20px
      return "text-[16px] md:text-[18px] leading-[22px] md:leading-[26px] tracking-[0.2px]";

    default:
      return "text-[16px] leading-[22px]";
  }
});
</script>

<template>
  <component
    :is="tag"
    class="cap-first"
    :class="sizeClass"
    :style="{ color }"
  >
    <slot />
  </component>
</template>