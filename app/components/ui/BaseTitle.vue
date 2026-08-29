<!--
  BaseTitle.vue
  =============
  Composant unique pour TOUS les titres (h1, h2, h3) de l'application.
  Toutes les valeurs (taille, interligne, tracking) sont écrites
  directement ici, dans sizeClass. Il n'y a AUCUN fichier CSS externe :
  si vous devez changer une taille demain, c'est ICI et nulle part
  ailleurs.

  TAILLES DE LA CHARTE :
  -----------------------
  size="page" -> grand titre de page (hero)
    mobile  : 28px / line-height 34px
    desktop : 36px / line-height 44px
    tag par défaut : <h1>

  size="section" / "sectionLarge" -> titre de bloc à l'intérieur
    d'une page (ex: "Raffiner votre recherche", "Informations
    pratiques"...). Les deux noms pointent vers la même taille ;
    ils sont gardés séparés uniquement pour ne pas casser des
    appels déjà existants qui utiliseraient l'un ou l'autre.
    mobile  : 20px / line-height 26px
    desktop : 24px / line-height 30px
    tag par défaut : <h3>

  size="card" -> titre à l'intérieur d'une carte (ArticleCard,
    AgendaEventCard, PartnerCard, titre de la sidebar Coups de
    Cœur, nom d'un fondateur...)
    mobile  : 16px / line-height 22px
    desktop : 20px / line-height 26px
    tag par défaut : <h3>
    (line-clamp-2 inclus : un titre de carte trop long est coupé
    proprement après 2 lignes)

  PROPS :
  -------
  tag   : force le tag HTML rendu (sinon déduit automatiquement).
  color : couleur du texte (style inline, car les fonds varient
          beaucoup selon les pages : rose, blanc, beige...).

  SURCHARGER UN CAS PARTICULIER :
  --------------------------------
  Si un titre précis doit avoir une taille différente de la charte
  (cas exceptionnel), ajoutez une classe Tailwind au moment de
  l'appel, préfixée par "!" pour être sûr qu'elle gagne sur celle
  du composant (les classes utilitaires Tailwind n'ont pas de
  priorité liée à l'ordre dans le HTML, seul "!" force la priorité) :

    <BaseTitle size="page" class="!text-[32px] md:!text-[42px]">
      Titre exceptionnel
    </BaseTitle>

  CE QUE LE COMPOSANT GÈRE POUR VOUS :
    - taille (mobile ET desktop)
    - line-height
    - graisse (toujours font-bold, un titre est toujours en gras)
    - letter-spacing (tracking)
    - couleur
    - majuscule automatique de la première lettre (classe "cap-first",
      définie ailleurs dans le projet)
    - le bon tag HTML
-->

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: "page" | "section" | "sectionLarge" | "card" | "TitrePage";
    tag?: string;
    color?: string;
  }>(),
  {
    size: "page",
    tag: undefined, // calculé automatiquement plus bas si non fourni
    color: "#FFFFFF",
  },
);

// Tag HTML par défaut selon le niveau du titre.
// Reste surchargeable via la prop "tag" pour respecter la hiérarchie
// sémantique réelle de la page (ex: forcer un <h2> même en size="card").
const resolvedTag = computed(
  () => props.tag ?? (props.size === "page" ? "h1" : "h3"),
);



// Toutes les valeurs sont écrites en dur ICI, aucune classe externe.
const sizeClass = computed(() => {
  switch (props.size) {
    case "page":
      // mobile 28px -> desktop 36px
      return "text-[28px] md:text-[36px] leading-[34px] md:leading-[44px] tracking-[0.2px]";

    case "TitrePage":
      return "text-[24px] md:text-[30px] leading-[34px] md:leading-[44px] tracking-[0.2px]";
    case "section":
    case "sectionLarge":
      // mobile 20px -> desktop 24px
      return "text-[20px] md:text-[24px] leading-[26px] md:leading-[30px] tracking-[0.2px]";

    case "card":
      // mobile 16px -> desktop 18px
      return " text-[16px] md:text-[18px] leading-[22px] md:leading-[26px] tracking-[0.1px] line-clamp-2";

    default:
      return "text-[16px] leading-[22px]";
  }
});
</script>

<template>
  <component
    :is="resolvedTag"
    class="!cap-first font-bold"
    :class="sizeClass"
    :style="{ color }"
  >
    <slot />
  </component>
</template>
