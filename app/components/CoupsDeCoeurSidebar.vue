<!--
  CoupsDeCoeurSidebar.vue
  -----------------------
  Sidebar desktop ADAPTATIVE : elle occupe toute la hauteur que la
  page appelante lui donne (via "self-stretch" sur l'appel), et
  affiche automatiquement 2, 3 ou 4 cartes selon cette hauteur.

  - <aside ref="rootRef">  -> conteneur EXTÉRIEUR : "h-full", reçoit
    et mesure la hauteur totale imposée par la page (self-stretch).
  - <div sticky>           -> conteneur INTÉRIEUR : garde sa hauteur
    naturelle et "colle" en haut de l'écran pendant le scroll, tout
    en restant DANS la hauteur du conteneur extérieur.
-->

<script setup lang="ts">
import { coupsDeCoeur } from "~/data/coupsDeCoeur";
const { t } = useTranslation();

// ----------------------------------------------------------------
// 0. PROPS
// ----------------------------------------------------------------
// stickyTop : décalage sticky personnalisable par page appelante
// (header différent selon les pages).
const props = withDefaults(
  defineProps<{
    stickyTop?: string;
    referenceHeight?: number; // hauteur (px) donnée par la page appelante
  }>(),
  {
    stickyTop: "md:top-6",
    referenceHeight: 0,
  },
);

// ----------------------------------------------------------------
// 1. CONSTANTES DE DIMENSIONS
// ----------------------------------------------------------------
const CARD_HEIGHT = 284; // Hauteur d'une carte
const GAP = 12; // Espace entre deux cartes (gap-3 = 12px)
const STEP = CARD_HEIGHT + GAP; // Pas entre 2 cartes

const TITLE_HEIGHT = 40; // Hauteur du titre
const TITLE_GAP = 16; // Espace sous le titre (gap-4 = 16px)

const MIN_CARDS = 2; // Toujours au moins 2 cartes
const MAX_CARDS = 4; // Jamais plus de 4 cartes
const AUTOPLAY_INTERVAL = 4000; // ms entre deux rotations

// ----------------------------------------------------------------
// 2. MESURE DE LA HAUTEUR DISPONIBLE
// ----------------------------------------------------------------
const rootRef = ref<HTMLElement | null>(null);
const visibleCount = ref(MIN_CARDS); // valeur de secours = minimum

/**
 * Calcule combien de cartes (entre 2 et 4) tiennent dans la
 * hauteur actuellement disponible pour le sidebar.
 */
function computeVisibleCount() {
  const availableHeight =
    props.referenceHeight > 0
      ? props.referenceHeight
      : (rootRef.value?.clientHeight ?? 0); // fallback si pas de prop fournie

  const cardsZoneHeight = availableHeight - TITLE_HEIGHT - TITLE_GAP;

  if (cardsZoneHeight <= 0) {
    visibleCount.value = MIN_CARDS;
    return;
  }

  let count = Math.floor((cardsZoneHeight + GAP) / STEP);
  count = Math.min(Math.max(count, MIN_CARDS), MAX_CARDS);
  count = Math.min(count, coupsDeCoeur.length || MIN_CARDS);
  visibleCount.value = count;
}

// recalcule dès que la page nous donne une nouvelle hauteur
watch(() => props.referenceHeight, computeVisibleCount);

// ----------------------------------------------------------------
// 3. ÉTAT DU CARROUSEL
// ----------------------------------------------------------------
const currentIndex = ref(0);
const enableTransition = ref(true);
const isPaused = ref(false); // pause au survol

// ----------------------------------------------------------------
// 4. CARTES VISIBLES (2, 3 ou 4 selon visibleCount)
// ----------------------------------------------------------------
const visibleCards = computed(() => {
  const total = coupsDeCoeur.length;
  if (total === 0) return [];

  const result = [];
  for (let i = 0; i < visibleCount.value; i++) {
    const card = coupsDeCoeur[(currentIndex.value + i) % total];
    if (card) result.push(card);
  }
  return result;
});

// ----------------------------------------------------------------
// 5. AUTOPLAY (défilement automatique continu)
// ----------------------------------------------------------------
let autoplayTimer: ReturnType<typeof setInterval> | null = null;

function advance() {
  if (isPaused.value) return; // ne pas tourner si la souris est dessus
  enableTransition.value = true;
  if (coupsDeCoeur.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % coupsDeCoeur.length;
}

onMounted(() => {
  computeVisibleCount();
  autoplayTimer = setInterval(advance, AUTOPLAY_INTERVAL);
});

onUnmounted(() => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
});
</script>

<template>
  <!-- CONTENEUR EXTÉRIEUR : "h-full" = prend toute la hauteur donnée
       par la page (self-stretch). C'est lui qu'on mesure. -->
  <aside
    ref="rootRef"
    class="hidden md:flex flex-col items-center w-full max-w-[284px] min-w-0 h-full bg-transparent p-0 rounded-none shadow-none shrink"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <!-- CONTENEUR INTÉRIEUR STICKY : titre + cartes, colle en haut
         de l'écran pendant le scroll, dans la limite du conteneur
         extérieur. -->
    <div
      class="w-full flex flex-col items-center gap-4 md:sticky"
      :class="stickyTop"
    >
      
      <BaseTitle
        size="card"
        tag="h2"
        color="#E61171"
        class=" items-center justify-center text-center !text-[16px] !leading-[20px] !tracking-[0.7px] "
        >{{ t("coupSideBarText") }}</BaseTitle
      >

      <div class="w-[244px] overflow-hidden">
        <div
          class="flex flex-col gap-3"
          :class="
            enableTransition
              ? 'transition-transform duration-700 ease-in-out'
              : ''
          "
        >
          <!-- Affiche entre 2 et 4 cartes selon visibleCards -->
          <div
            v-for="(coup, i) in visibleCards"
            :key="`${currentIndex}-${i}`"
            class="w-[244px] h-[284px] shrink-0 rounded-[10px] box-border"
            :style="{
              background: coup.bg,
              border: `3px solid ${coup.border}`,
            }"
          />
        </div>
      </div>
    </div>
  </aside>
</template>