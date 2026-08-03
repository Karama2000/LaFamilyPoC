<!--
  CoupsDeCoeurMobileStrip.vue
  -----------------------------
  Version mobile de la section "Coups de cœur" : un bandeau de cartes
  qui défile automatiquement (carousel infini), visible uniquement sur
  mobile (voir CoupsDeCoeurSection.vue pour la version desktop en grille).
-->
<script setup lang="ts">
import { coupsDeCoeur } from '~/data/coupsDeCoeur'

// Dimensions d'une carte + espace entre les cartes = distance à parcourir à chaque défilement
const CARD_WIDTH = 114
const GAP = 12
const STEP = CARD_WIDTH + GAP

// Le motif de 5 cartes est répété plusieurs fois : ça garantit qu'il y a
// toujours une carte "en réserve" à droite, peu importe la largeur de l'écran.
const REPEAT = 3
const cards = ref(Array.from({ length: REPEAT }, () => coupsDeCoeur).flat())

// Décalage horizontal actuel du bandeau (en pixels)
const translateX = ref(0)
// Active/désactive la transition CSS (pour pouvoir "sauter" sans animation lors du recyclage des cartes)
const enableTransition = ref(true)

let autoplayTimer: ReturnType<typeof setInterval> | null = null

// Fait avancer le bandeau d'une carte, puis recycle la première carte
// à la fin du tableau pour créer un effet de boucle infinie.
function advance() {
  enableTransition.value = true
  translateX.value = -STEP

  // On attend la fin de l'animation (700ms) avant de recycler la carte
  // et de remettre translateX à 0 sans transition (effet invisible pour l'utilisateur)
  setTimeout(() => {
    const first = cards.value.shift()!
    cards.value.push(first)
    enableTransition.value = false
    translateX.value = 0
  }, 700)
}

// Démarre le défilement automatique toutes les 5 secondes
onMounted(() => {
  autoplayTimer = setInterval(advance, 5000)
})
// Nettoyage du timer pour éviter les fuites mémoire quand le composant est détruit
onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer)
})
</script>

<template>
  <!-- Visible uniquement sur mobile (masqué à partir du breakpoint md) -->
  <div class="md:hidden relative z-20 overflow-hidden py-4 px-[18px]"
    style="
      -webkit-mask-image: linear-gradient(to right, transparent 0, black 18px, black calc(100% - 18px), transparent 100%);
      mask-image: linear-gradient(to right, transparent 0, black 18px, black calc(100% - 18px), transparent 100%);
    ">
    <!-- Bandeau de cartes qui se translate horizontalement -->
    <div class="flex gap-3"
      :class="enableTransition ? 'transition-transform duration-700 ease-in-out' : ''"
      :style="{ transform: `translateX(${translateX}px)` }">
      <div v-for="(coup, i) in cards" :key="i"
        class="w-[114px] h-[142px] rounded-[8px] shrink-0"
        :style="{ background: coup.bg, border: `2px solid ${coup.border}` }">
      </div>
    </div>
  </div>
</template>
