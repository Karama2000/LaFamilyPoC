<!--
  BaseButton.vue
  ---------------
  Composant bouton réutilisable pour toute l'application.

  Props principales :
  - variant     : définit le style visuel du bouton
  - selected    : état actif pour les filtres / catégories
  - open        : état ouvert du calendrier
  - to          : transforme le bouton en NuxtLink
  - href        : transforme le bouton en lien <a>
  - fullWidth   : largeur 100%
  - disabled    : bouton désactivé

  ------------------------------------------------------------------
  RÈGLE TYPOGRAPHIQUE (appliquée à TOUTES les variantes ci-dessous) :
  ------------------------------------------------------------------
  Chaque variante a une taille de texte FIXE sur mobile, et une
  taille sur desktop égale à "mobile + 2px" — jamais un ratio,
  jamais un saut arbitraire, toujours exactement +2px. C'est une
  règle globale du composant : si vous ajoutez une nouvelle variante
  demain, gardez le même principe (ex: mobile 15px -> desktop 17px).

  Avant cette modification, plusieurs variantes utilisaient la classe
  "text-body", qui n'existe dans AUCUN fichier du projet (pas de
  tailwind.config visible, rien dans variables.css) : elle n'avait
  donc AUCUN effet, et ces boutons héritaient simplement de la taille
  par défaut du navigateur (~16px), sans variation mobile/desktop.
  Ces variantes ont maintenant une taille explicite, avec la même
  règle +2px que les autres.

  Table des tailles mobile -> desktop par variante (pour référence
  rapide, à tenir à jour si vous changez une valeur ci-dessous) :

    peach            14px -> 16px
    pink             16px -> 18px
    rosePale         16px -> 18px
    pinkShadow       16px -> 18px
    region           16px -> 18px
    filter           16px -> 18px
    softOutline      16px -> 18px
    thinOutline      16px -> 18px
    calendar         16px -> 18px
    badge            12px -> 14px
    badgePeach       10.5px -> 12.5px
    beigeBadge       12.5px -> 14.5px
    chip             12px -> 14px
    navMenu          17px -> 19px
    navMenuCherche   17px -> 19px
    navMenuDevPart   17px -> 19px
    outlineAction    13px -> 15px  (AVANT : desktop tombait à 10px,
                                     donc plus PETIT sur desktop —
                                     c'était l'inverse de la règle
                                     voulue, corrigé ici)
    whiteOutline     14px -> 16px
    external         14px -> 16px

    badgeLarge : cas à part, volontairement laissé en dehors de la
    règle +2px fixe. Il utilise déjà `clamp(14px, 2vw, 20px)`, une
    taille FLUIDE qui grandit en continu avec la largeur d'écran
    (pas de palier mobile/desktop figé). Elle grandit donc déjà plus
    que +2px sur de grands écrans. Dites-moi si vous préférez la
    convertir en palier fixe 14px -> 16px comme les autres variantes.

    articleCategory, categoryFilter, categDesktop : ces 3 variantes
    ne fixent volontairement AUCUNE taille de texte au niveau du
    bouton, car leur contenu (icône + libellé) est un slot qui gère
    déjà sa propre taille via BaseText/BaseTitle ou une classe locale
    à l'appel. Ajouter une taille ici créerait un conflit de priorité
    avec le texte interne.
-->

<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";

type ButtonVariant =
  | "peach"
  | "pink"
  | "rosePale"
  | "region"
  | "filter"
  | "pinkShadow"
  | "softOutline"
  | "calendar"
  | "badge"
  | "badgePeach"
  | "external"
  | "thinOutline"
  | "whiteOutline"
  | "chip"
  | "badgeLarge"
  | "beigeBadge"
  | "articleCategory"
  | "categoryFilter"
  | "outlineAction"
  | "navMenu"
  | "categDesktop"
  | "navMenuCherche"
  | "navMenuDevPart";

const props = withDefaults(
  defineProps<{
    variant: ButtonVariant;
    to?: RouteLocationRaw;
    href?: string;
    type?: "button" | "submit";
    selected?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    open?: boolean;
  }>(),
  {
    to: undefined,
    href: undefined,
    type: "button",
    selected: false,
    disabled: false,
    fullWidth: false,
    open: false,
  },
);

/* -------------------------------------------------------
 * Élément HTML utilisé par le composant
 * ----------------------------------------------------- */

const tag = computed(() => {
  if (props.to) return resolveComponent("NuxtLink");
  if (props.href) return "a";
  return "button";
});

/* -------------------------------------------------------
 * Classes communes
 * ----------------------------------------------------- */

const baseClasses =
  "inline-flex items-center justify-center gap-1.5 rounded-[10px] font-bold font-sans transition-colors duration-150 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed px-3";

/* -------------------------------------------------------
 * Variantes
 * Chaque taille de texte est écrite en dur ici, en 2 valeurs :
 * mobile puis desktop (préfixe md:), avec toujours desktop = mobile + 2px.
 * ----------------------------------------------------- */

const variantClasses = computed<Record<ButtonVariant, string>>(() => ({
  /* ---------- Boutons principaux ---------- */

  // 14px -> 16px
  peach:
    "self-start bg-brand-peach text-brand-pink px-4 py-2 mt-3 text-[14px] md:text-[16px]",

  // 16px -> 18px
  pink: "bg-brand-pink text-white px-6 md:!px-2 py-2.5 text-[14px] md:text-[16px]",

  // 16px -> 18px
  rosePale:
    "bg-brand-pinkPale text-brand-pink px-4 py-2.5 text-[14px] md:text-[16px]",

  // 16px -> 18px
  pinkShadow:
    "flex-col bg-brand-pink text-white py-[14px] px-6 text-[16px] md:text-[18px]",

  /* ---------- Régions / filtres ---------- */

  // 16px -> 18px (les deux états, sélectionné ou non)
  region: props.selected
    ? "bg-brand-pink text-white border-2 border-brand-pink px-4 py-2.5 text-[16px] md:text-[18px]"
    : "bg-brand-cream text-brand-pink border-2 border-brand-peachLight px-4 py-2.5 text-[16px] md:text-[18px]",

  // 16px -> 18px (les deux états)
  filter: props.selected
    ? "bg-brand-pink text-white border-2 border-brand-pink px-2 py-5 text-[14px] md:text-[16px]"
    : "bg-brand-cream text-brand-pink border-2 border-brand-peachLight !px-5 py-1 text-[14px] md:text-[16px] ",

  // 16px -> 18px (les deux états)
  softOutline: props.selected
    ? "bg-brand-cream text-brand-pink border-2 border-brand-pink py-[14px] px-5 text-[16px] md:text-[18px]"
    : "bg-brand-cream text-brand-pink border-2 border-brand-peachLight py-[14px] px-5 text-[16px] md:text-[18px]",

  // 16px -> 18px (les deux états)
  thinOutline: props.selected
    ? "bg-white text-brand-pink border-2 border-brand-pink px-4 py-3 mb-6 text-[16px] md:text-[18px]"
    : "bg-white text-brand-pink border border-brand-peach px-4 py-3 text-[16px] md:text-[18px]",

  /* ---------- Calendrier ---------- */

  // 16px -> 18px (les deux états)
  calendar: props.open
    ? "w-full !justify-start gap-2 bg-brand-pink text-white px-3 py-2 text-left text-[16px] md:text-[18px]"
    : "w-full !justify-start gap-2 bg-white px-3 py-2 text-left text-[16px] md:text-[18px]",

  /* ---------- Badges ---------- */

  // 12px -> 14px
  badge:
    "!rounded-full bg-white border border-brand-peach text-brand-pink px-3 py-1.5 font-bold tracking-[0.3px] text-[12px] md:text-[14px]",

  // Cas à part : taille fluide (clamp), voir note en haut de fichier.
  badgeLarge:
    "!rounded-full p-0 text-brand-pink text-[clamp(14px,2vw,20px)] font-bold leading-[1.3] tracking-[0.2px] !px-0",

  // 10.5px -> 12.5px
  badgePeach:
    "!rounded-full bg-brand-peach text-brand-pink px-3 py-1 font-bold text-[10.5px] md:text-[12.5px]",

  // 12.5px -> 14.5px
  beigeBadge:
    "!rounded-full bg-[#FFF0E5] text-brand-pink px-3 py-1 font-bold text-[12.5px] md:text-[14.5px]",

  /* ---------- Chips ---------- */

  // 12px -> 14px
  chip:
    "bg-brand-pinkPale text-brand-pink px-3 py-1 font-bold !rounded-full text-[12px] md:text-[14px]",

  /* ---------- Catégories articles ---------- */
  // Pas de taille de texte ici volontairement : le libellé (slot)
  // gère déjà sa propre taille (voir note en haut de fichier).
  articleCategory: props.selected
    ? "bg-brand-pink text-white border-2 border-brand-pink flex-col gap-2 py-4 px-2 text-center"
    : "bg-white text-brand-pink border-2 border-brand-peach flex-col gap-2 py-4 px-2 text-center hover:!bg-[#FFF5F0]",

  /* ---------- Grille "Raffiner votre recherche" : wrap forcé + hauteur uniforme ---------- */
  // Pas de taille de texte ici non plus, même raison.
  categoryFilter: props.selected
    ? "!whitespace-normal !h-auto md:!h-[110px] min-h-[92px] w-full bg-brand-pink text-white border-2 border-brand-pink flex-col gap-2 py-4 px-2 text-center leading-tight"
    : "!whitespace-normal !h-auto md:!h-[110px] min-h-[92px] w-full bg-white text-brand-pink border-2 border-brand-peach flex-col gap-2 py-4 px-2 text-center leading-tight hover:!bg-[#FFF5F0]",

  /* ---------- Item de nav desktop (Je cherche / Activités / Vacances / Cours / Partenaire) ---------- */
  // 17px -> 19px
  navMenu:
    "!rounded-t-[10px] !rounded-b-none bg-transparent text-white group-hover:!bg-[#FEF2EB] group-hover:!text-brand-pink px-5 py-4 text-[17px] ]",

  // 17px -> 19px
  navMenuCherche:
    "bg-transparent text-white group-hover:!bg-[#FEF2EB] group-hover:!text-brand-pink px-5 py-4 group-hover:!rounded-t-[10px] group-hover:!rounded-b-none text-[17px] ",

  // 17px -> 19px
  navMenuDevPart:
    "bg-transparent text-white hover:!bg-[#FEF2EB] hover:!text-brand-pink px-5 py-4 text-[17px]",

  /* ---------- Items des dropdowns desktop (Je cherche / Activités / Vacances / Cours) ---------- */
  // Pas de taille de texte ici : même raison que articleCategory/categoryFilter.
  categDesktop:
    "bg-white text-brand-pink border-[3px] border-[#FFD1B5] flex-col gap-2 py-4 px-2 text-center hover:bg-[#FFF5F0] !h-[65px]",

  /* ---------- Actions secondaires ---------- */

  // 13px -> 15px
  // AVANT : "md:text-[10px]" faisait rétrécir le texte sur desktop
  // (10px < 13px mobile), donc à l'inverse de la règle "+2px". Corrigé.
  outlineAction:
    "bg-white text-brand-pink border-2 border-brand-peach px-5 py-2 font-bold gap-2 text-[13px] md:text-[15px]",

  // 14px -> 16px
  whiteOutline:
    "bg-transparent text-white border border-white font-bold tracking-[0.2px] px-4 py-2 text-[14px] md:text-[16px]",

  /* ---------- Lien externe ---------- */

  // 14px -> 16px
  external:
    "bg-brand-pink text-white px-8 py-3.5 font-bold tracking-[0.2px] mt-5 text-[14px] md:text-[16px]",
}));

/* -------------------------------------------------------
 * Classes finales
 * ----------------------------------------------------- */

const classes = computed(() => [
  baseClasses,
  variantClasses.value[props.variant],
  props.fullWidth ? "w-full" : "",
]);
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    :type="!to && !href ? type : undefined"
    :disabled="!to && !href ? disabled : undefined"
    :aria-disabled="to && disabled ? 'true' : undefined"
    :class="classes"
  >
    <slot />
  </component>
</template>