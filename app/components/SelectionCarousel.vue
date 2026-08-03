<!--
  SelectionCarousel.vue
  -----------------------
  Carrousel "Notre sélection" avec défilement automatique (5s). Comme pour
  NouveautesSection.vue, deux mises en page cohabitent dans ce fichier :
    - une version MOBILE (carte + overlay d'info en bas à gauche)
    - une version DESKTOP (grande image pleine largeur + overlay centré)
  Les deux partagent le même état (currentSlide) et se basculent via
  les classes Tailwind "md:hidden" / "hidden md:block".
-->
<script setup lang="ts">
import type { ContentItem } from '~/data/mockContent'

const props = defineProps<{
  t: (key: string) => string
  selections: ContentItem[]
}>()

// Index de la diapositive actuellement affichée
const currentSlide = ref(0)

const currentItem = computed(() => props.selections[currentSlide.value])

// Passe à la diapositive suivante (en boucle)
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % props.selections.length
}
// Revient à la diapositive précédente (en boucle)
function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + props.selections.length) % props.selections.length
}

// Défilement automatique toutes les 5 secondes
let autoplayTimer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  autoplayTimer = setInterval(nextSlide, 5000)
})
// Nettoyage du timer pour éviter les fuites mémoire quand le composant est détruit
onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer)
})
</script>

<template>
  <!-- Titre : mobile remonté (-mt-32), desktop inchangé (md:mt-0 + pt-8 pb-10 px-12 d'origine) -->
  <section class="relative z-30 bg-white -mt-32 md:mt-0 pb-6 px-5 md:pt-8 md:pb-10 md:px-12">
    <h2 class="text-center font-bold text-xl md:text-2xl leading-[30px] tracking-[0.2px]" style="color:#E61171">
      {{ t('selectionTitle') }}
    </h2>
  </section>

  <!-- ===== VERSION MOBILE : carte avec overlay d'info en bas à gauche ===== -->
  <section class="relative z-20 bg-white pb-16 px-5 md:hidden">
    <div class="relative mx-auto w-full max-w-[366px] aspect-[366/244] rounded-[5px] overflow-hidden shadow-[0_13px_19px_rgba(0,0,0,0.07)]">
      <!-- Image de la diapositive, avec transition de glissement horizontal -->
      <Transition name="slide">
        <img v-if="currentItem" :key="'mimg-' + currentSlide" :src="currentItem.image" :alt="currentItem.titre"
          class="absolute inset-0 w-full h-full object-cover block" />
      </Transition>

      <!-- Encart d'info (titre + bouton), en fondu -->
      <Transition name="fade" mode="out-in">
        <div v-if="currentItem" :key="'mbox-' + currentSlide"
          class="absolute left-0 top-[60%] w-[55%] h-[40%] flex flex-col justify-center gap-2 px-3 py-2"
          style="background:rgba(255,255,255,0.7)">
          <h3 class="text-[14px] font-bold leading-[20px] tracking-[0.2px]" style="color:#E61171">
            {{ currentItem.titre }}
          </h3>
          <button class="self-start rounded-[5px] px-3 py-1.5 text-[12px] leading-[22px] font-bold tracking-[0.2px]"
            style="background:#FFD1B5;color:#E61171">
            {{ t('enSavoirPlus') }}
          </button>
        </div>
      </Transition>

      <!-- Flèches de navigation précédent/suivant -->
      <button @click="prevSlide"
        class="absolute left-2 top-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full flex items-center justify-center z-30 shadow-md"
        style="background:#FF863D" aria-label="Précédent">
        <img src="/images/icones/fleche.png" alt="" class="w-3 h-3" />
      </button>
      <button @click="nextSlide"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full flex items-center justify-center z-30 shadow-md"
        style="background:#FF863D" aria-label="Suivant">
        <img src="/images/icones/fleche.png" alt="" class="w-3 h-3 rotate-180" />
      </button>
    </div>

    <!-- Points de pagination (indiquent et permettent de sauter à une diapositive) -->
    <div class="flex justify-center gap-2 mt-4">
      <button v-for="(s, i) in selections" :key="i" @click="currentSlide = i"
        class="w-2.5 h-2.5 rounded-full transition-colors"
        :style="{ background: i === currentSlide ? '#E61171' : '#FFD1B5' }"
        :aria-label="`Aller à la diapositive ${i + 1}`">
      </button>
    </div>
  </section>

  <!-- ===== VERSION DESKTOP : grande image pleine largeur + overlay centré (inchangée) ===== -->
  <section class="relative z-20 bg-white pb-24 px-12 hidden md:block">
    <div class="relative max-w-[1319px] mx-auto aspect-[1319/642]">
      <div class="absolute inset-0 rounded-[10px] overflow-hidden shadow-[0_13px_19px_rgba(0,0,0,0.07)]">
        <!-- Image de fond de la diapositive, en fondu -->
        <Transition name="fade" mode="out-in">
          <img v-if="currentItem" :key="currentSlide" :src="currentItem.image" :alt="currentItem.titre"
            class="w-full h-full object-cover block" />
        </Transition>

        <!-- Encart d'info centré (titre + description + bouton), en fondu -->
        <Transition name="fade" mode="out-in">
          <div v-if="currentItem" :key="currentSlide"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[492px] max-w-[85%] rounded-[6px] px-8 py-8 text-center z-10"
            style="background:rgba(255,255,255,0.7)">
            <h3 class="text-2xl font-bold mb-4" style="color:#E61171">{{ currentItem.titre }}</h3>
            <p class="text-[20px] leading-[30px] mb-6" style="color:#2E2F30">
              {{ currentItem.description }}
            </p>
            <button class="rounded-[5px] px-10 py-3.5 text-sm leading-[22px] font-bold tracking-[0.2px]"
              style="background:#FFD1B5;color:#E61171">
              {{ t('enSavoirPlus') }}
            </button>
          </div>
        </Transition>

        <!-- Points de pagination -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <button v-for="(s, i) in selections" :key="i" @click="currentSlide = i"
            class="w-2.5 h-2.5 rounded-full transition-colors"
            :style="{ background: i === currentSlide ? '#E61171' : '#FFD1B5' }"
            :aria-label="`Aller à la diapositive ${i + 1}`">
          </button>
        </div>
      </div>

      <!-- Flèches de navigation, positionnées à cheval sur les bords gauche/droit du cadre -->
      <button @click="prevSlide"
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center text-white z-20 shadow-lg"
        style="background:#FF863D" aria-label="Précédent">
        <img src="/images/icones/fleche.png" alt="" class="w-5 h-5" />
      </button>

      <button @click="nextSlide"
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center text-white z-20 shadow-lg"
        style="background:#FF863D" aria-label="Suivant">
        <img src="/images/icones/fleche.png" alt="" class="w-5 h-5 rotate-180" />
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Transition en fondu utilisée pour les images/overlays desktop et l'overlay mobile */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Transition de glissement horizontal utilisée pour l'image de la version mobile */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.6s ease, opacity 0.6s ease;
  position: absolute;
  inset: 0;
}
.slide-enter-from { transform: translateX(100%); opacity: 0; }
.slide-leave-to { transform: translateX(-100%); opacity: 0; }
.slide-enter-to, .slide-leave-from { transform: translateX(0); opacity: 1; }
</style>
