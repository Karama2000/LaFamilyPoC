<!--
  BaseCard.vue
  -------------
  Carte unique et réutilisable pour toute l'application.

  Regroupe tes 5 types de cards (même logique que BaseButton : même
  structure partout, seuls le fond / la bordure / l'ombre changent) :

    variant="agenda"        -> #1 Card agenda (+ utilisée aussi pour "article", cf. note en bas)
    variant="filter"        -> #2 Card choix filtres
    variant="detailAgenda"  -> #3 Card détail agenda
    variant="partner"       -> #4 Card partenaire
    variant="partnerBox"    -> #5 Box de détail partenaire

  Règle globale respectée : border-radius 10px ET même padding partout
  (PADDING_CLASS ci-dessous = LA seule valeur de padding utilisée par
  toutes les cards de l'app, ne pas la dupliquer ailleurs).

  Structure à 2 zones :
  - slot "image"   : zone haute pleine largeur, SANS padding (photo qui doit
                      toucher les bords de la card). Optionnel : si tu ne le
                      remplis pas, cette zone n'existe pas.
  - slot par défaut : contenu texte, avec le padding standard appliqué
                      automatiquement.

  Exemple (card agenda, avec image) :
    <BaseCard variant="agenda">
      <template #image>
        <img :src="event.image" class="w-full h-full object-cover" />
      </template>
      <h3>{{ event.titre }}</h3>
      <BaseButton variant="peach" :to="...">En savoir plus</BaseButton>
    </BaseCard>

  Exemple (card filtre, sans image, sélectionnable) :
    <BaseCard variant="filter" :selected="age === '0-2'" @click="age = '0-2'">
      0 – 2 ans
    </BaseCard>
-->
<script setup lang="ts">
import { computed } from "vue";

type CardVariant = "agenda" | "filter" | "detailAgenda" | "partner" | "partnerBox"  | "spotlight"| "stats"|"agendaDesktop";

const props = withDefaults(
  defineProps<{
    variant: CardVariant;
    selected?: boolean; // borde en rose plein #E61171 (variant "filter" uniquement)
    padding?: boolean; // false = pas de padding auto sur le slot par défaut (pour composer soi-même)
    tag?: string; // "article" (défaut) ou "section" (ex: groupe de filtres dans un drawer)
  }>(),
  {
    selected: false,
    padding: true,
    tag: "article",
  }
);

// >>> LA seule valeur de padding pour toutes les cards de l'app <<<
// Si un jour tu dois l'ajuster, change-la ICI et ça se répercute partout.
const PADDING_CLASS = "px-5 py-4";

const baseClasses = "rounded-[10px] bg-white overflow-hidden";

const variantClasses = computed<Record<CardVariant, string>>(() => ({
  // #1 — Card agenda (et article, cf. note en bas de fichier)
  agenda: "shadow-[0_13px_19px_rgba(0,0,0,0.07)] hover:shadow-[0_14px_28px_rgba(230,17,113,0.12)] hover:-translate-y-0.5 transition-all duration-300",

  // #1bis — Card agenda desktop : taille fixe, identique à la logique mobile
  agendaDesktop:
    "shadow-[0_13px_19px_rgba(0,0,0,0.07)] shrink-0 w-[636px] h-[680px] flex flex-col",

  // #2 — Card choix filtres (bordure rose pleine si sélectionnée)
  filter: props.selected
    ? "shadow-[0_4px_14px_rgba(230,17,113,0.06)] border-2 border-brand-pink cursor-pointer"
    : "shadow-[0_4px_14px_rgba(230,17,113,0.06)] border-2 border-transparent cursor-pointer",

  // #3 — Card détail agenda
 detailAgenda:
  "border-2 border-brand-pinkPale shadow-[0_10px_20px_rgba(230,17,113,0.06)]",

  // #4 — Card partenaire
  partner: "shadow-[0_10px_20px_rgba(230,17,113,0.06)] ",

  // #5 — Box de détail partenaire
  partnerBox: "border border-brand-peach shadow-[0_10px_10px_rgba(230,17,113,0.06)] md:w-300 md:h-400",

  //#6 box devenir parenaitre
  spotlight:
  "!bg-brand-cream border border-brand-peachLight",
//#`statistique page devenir partenaire
  stats:
  "!bg-brand-cream border-2 border-brand-peachLight",
}));

const classes = computed(() => [baseClasses, variantClasses.value[props.variant]]);
</script>

<template>
  <component :is="tag" :class="classes">
    <!-- Zone image : pleine largeur, jamais de padding -->
    <div v-if="$slots.image" class="relative w-full overflow-hidden">
      <slot name="image" />
    </div>

    <!-- Zone contenu : padding standard (sauf si padding=false) -->
    <div :class="padding ? PADDING_CLASS : ''">
      <slot />
    </div>
  </component>
</template>

<!--
  NOTE — Card "article" :
  ta charte ne définit pas de style séparé pour la card article (seulement
  son badge de catégorie). Vu qu'elle a la même logique visuelle qu'une card
  agenda (image + contenu + bg blanc + ombre légère), j'utilise variant="agenda"
  pour elle aussi. Dis-moi si tu veux une ombre/un radius différent pour
  la card article spécifiquement -> on ajoutera un variant="article" dédié.
-->