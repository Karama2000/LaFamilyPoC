<!--
  NouveautesSection.vue
  -----------------------
  Section "Nouveautés" présentant un carrousel d'éléments (props.nouveautes).
  Deux mises en page distinctes cohabitent dans ce fichier :
    - une version MOBILE (une seule carte visible + flèches superposées)
    - une version DESKTOP (carte centrale active + aperçus estompés
      des cartes précédente/suivante de part et d'autre)
  Les deux versions partagent le même état (currentIndex) et se
  masquent/affichent via les classes Tailwind "md:hidden" / "hidden md:block".
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ContentItem } from '~/data/mockContent'

const props = defineProps<{
  t: (key: string) => string
  nouveautes: ContentItem[]
}>()

// Index de l'élément actuellement affiché au centre du carrousel
const currentIndex = ref(0)

const total = computed(() => props.nouveautes.length)

// Modulo "sûr" qui reste positif même avec des nombres négatifs
// (utile pour boucler vers la fin du tableau quand on recule depuis l'index 0)
function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

// Élément vide utilisé comme valeur de repli si le tableau est vide
const emptyItem: ContentItem = { titre: '', description: '', image: '' }

// Élément précédent / actuel / suivant, calculés en boucle (carrousel infini)
const prevItem = computed(() => props.nouveautes[mod(currentIndex.value - 1, total.value)] ?? emptyItem)
const currentItem = computed(() => props.nouveautes[currentIndex.value] ?? emptyItem)
const nextItem = computed(() => props.nouveautes[mod(currentIndex.value + 1, total.value)] ?? emptyItem)

// Navigation vers l'élément précédent (en boucle)
function goPrev() {
  currentIndex.value = mod(currentIndex.value - 1, total.value)
}
// Navigation vers l'élément suivant (en boucle)
function goNext() {
  currentIndex.value = mod(currentIndex.value + 1, total.value)
}
</script>

<template>
  <!-- ===== VERSION MOBILE : une seule carte + flèches superposées sur les bords ===== -->
  <section class="relative z-20 pt-10 pb-14 px-6 md:hidden" style="background:#FFD1B5">
    <h2 class="text-center text-xl font-bold mb-8" style="color:#E61171">
      {{ t('nouveautesTitle') }}
    </h2>

    <div class="relative max-w-[306px] mx-auto">
      <!-- Carte unique affichant l'élément courant, avec transition en fondu sur l'image -->
      <article class="relative bg-white rounded-[10px] shadow-[0_13px_19px_rgba(0,0,0,0.07)] p-[23px_23px_20px]">
        <div class="rounded-[6px] overflow-hidden w-full h-[139px] mb-4">
          <Transition name="fade" mode="out-in">
            <img :key="'nmimg-' + currentIndex" :src="currentItem.image" :alt="currentItem.titre"
              class="w-full h-full object-cover block" />
          </Transition>
        </div>
        <h3 class="text-[14px] font-bold mb-1" style="color:#E61171">{{ currentItem.titre }}</h3>
        <p class="text-[12px] leading-[22px]" style="color:#2E2F30">
          {{ currentItem.description }}
        </p>
      </article>

      <!-- Flèches de navigation, positionnées à cheval sur les bords gauche/droit de la carte -->
      <button @click="goPrev"
        class="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full flex items-center justify-center z-20 shadow-md"
        style="background:#FF863D" aria-label="Précédent">
        <img src="/images/icones/fleche.png" alt="" class="w-2.5 h-2.5" />
      </button>
      <button @click="goNext"
        class="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full flex items-center justify-center z-20 shadow-md"
        style="background:#FF863D" aria-label="Suivant">
        <img src="/images/icones/fleche.png" alt="" class="w-2.5 h-2.5 rotate-180" />
      </button>
    </div>

    <!-- Bouton "voir plus" -->
    <div class="flex justify-center mt-8">
      <div role="button" tabindex="0"
        class="cursor-pointer rounded-[5px] px-8 py-3 text-[12px] font-bold tracking-[0.2px] whitespace-nowrap select-none"
        style="background:#E61171;color:#FFFFFF">
        {{ t('voirPlus') }}
      </div>
    </div>
  </section>

  <!-- ===== VERSION DESKTOP : carte centrale active + aperçus estompés de part et d'autre (inchangée) ===== -->
  <section class="relative z-20 pt-16 pb-20 px-6 hidden md:block" style="background:#E61171">
    <!-- Forme décorative courbe blanche en haut de la section -->
    <div class="absolute inset-x-0 top-0 h-[128px] -translate-y-1/2 rounded-[100%] bg-white pointer-events-none"></div>

<h2 class="relative z-10 text-center text-2xl font-bold mb-14 md:mt-20">      {{ t('nouveautesTitle') }}
    </h2>

    <div class="relative max-w-[1310px] mx-auto flex items-center justify-center gap-6">

      <!-- Carte petite à gauche : élément précédent (estompé), cliquable pour reculer -->
      <button type="button" @click="goPrev"
        class="relative shrink-0 w-[306px] h-[284px] bg-white rounded-[10px] shadow-[0_13px_19px_rgba(0,0,0,0.07)] p-[23px_23px_20px] text-left overflow-hidden">
        <div class="relative rounded-[6px] overflow-hidden w-[259px] h-[139px] mb-4">
          <img :src="prevItem.image" :alt="prevItem.titre" class="w-full h-full object-cover block" />
          <span class="absolute left-[16px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg z-20"
            style="background:#FF863D" aria-label="Précédent">
            <img src="/images/icones/fleche.png" alt="" class="w-5 h-5" />
          </span>
        </div>
        <h3 class="text-sm font-bold mb-1" style="color:#E61171">{{ prevItem.titre }}</h3>
        <p class="text-xs leading-[22px]"
          style="color:#2E2F30; display:-webkit-box; -webkit-line-clamp:2; line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
          {{ prevItem.description }}
        </p>
        <!-- Overlay blanc translucide : donne l'aspect "en retrait" de la carte -->
        <div class="absolute inset-0 rounded-[10px] pointer-events-none" style="background:rgba(255,255,255,0.7)"></div>
      </button>

      <!-- Carte centrale : élément actif, en pleine taille et pleine opacité -->
      <article class="relative shrink-0 w-full max-w-[636px] bg-white rounded-[10px] shadow-[0_13px_19px_rgba(0,0,0,0.07)] p-[23px_23px_28px]">
        <div class="rounded-[6px] overflow-hidden w-full aspect-[590/425] mb-5">
          <img :src="currentItem.image" :alt="currentItem.titre" class="w-full h-full object-cover block" />
        </div>
        <h3 class="text-2xl font-bold mb-3" style="color:#E61171">{{ currentItem.titre }}</h3>
        <p class="text-sm leading-[22px]" style="color:#2E2F30">
          {{ currentItem.description }}
        </p>
      </article>

      <!-- Carte petite à droite : élément suivant (estompé), cliquable pour avancer -->
      <button type="button" @click="goNext"
        class="relative shrink-0 w-[306px] h-[284px] bg-white rounded-[10px] shadow-[0_13px_19px_rgba(0,0,0,0.07)] p-[23px_23px_20px] text-left overflow-hidden">
        <div class="relative rounded-[6px] overflow-hidden w-[259px] h-[139px] mb-4">
          <img :src="nextItem.image" :alt="nextItem.titre" class="w-full h-full object-cover block" />
          <span class="absolute right-[16px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg z-20"
            style="background:#FF863D" aria-label="Suivant">
            <img src="/images/icones/fleche.png" alt="" class="w-5 h-5 rotate-180" />
          </span>
        </div>
        <h3 class="text-sm font-bold mb-1" style="color:#E61171">{{ nextItem.titre }}</h3>
        <p class="text-xs leading-[22px]"
          style="color:#2E2F30; display:-webkit-box; -webkit-line-clamp:2; line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
          {{ nextItem.description }}
        </p>
        <div class="absolute inset-0 rounded-[10px] pointer-events-none" style="background:rgba(255,255,255,0.7)"></div>
      </button>
    </div>

    <!-- Bouton "voir plus" -->
    <div class="relative flex justify-center mt-14">
      <div role="button" tabindex="0"
        class="cursor-pointer rounded-[5px] px-10 py-3.5 text-sm font-bold tracking-[0.2px] whitespace-nowrap select-none"
        style="background:#FFD1B5;color:#E61171;line-height:normal">
        {{ t('voirPlus') }}
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Transition en fondu utilisée pour le changement d'image sur la version mobile */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
