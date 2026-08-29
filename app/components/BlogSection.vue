<!--
  BlogSection.vue
  -----------------------
  Section "blog" présentant un carrousel d'éléments (props.nouveautes).
  Deux mises en page distinctes cohabitent dans ce fichier :
    - une version MOBILE (une seule carte visible + flèches superposées)
    - une version DESKTOP (carte centrale active + aperçus estompés
      des cartes précédente/suivante de part et d'autre)
  Les deux versions partagent le même état (currentIndex) et se
  masquent/affichent via les classes Tailwind "md:hidden" / "hidden md:block".
-->
<script setup lang="ts">
import { ref, computed } from "vue";
import type { ContentItem } from "~/data/mockContent";

const props = defineProps<{
  t: (key: string) => string;
  nouveautes: ContentItem[];
}>();

// Index de l'élément actuellement affiché au centre du carrousel
const currentIndex = ref(0);

const total = computed(() => props.nouveautes.length);

// Modulo "sûr" qui reste positif même avec des nombres négatifs
// (utile pour boucler vers la fin du tableau quand on recule depuis l'index 0)
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// Élément vide utilisé comme valeur de repli si le tableau est vide
const emptyItem: ContentItem = { titre: "", description: "", image: "" };

// Élément précédent / actuel / suivant, calculés en boucle (carrousel infini)
const prevItem = computed(
  () => props.nouveautes[mod(currentIndex.value - 1, total.value)] ?? emptyItem,
);
const currentItem = computed(
  () => props.nouveautes[currentIndex.value] ?? emptyItem,
);
const nextItem = computed(
  () => props.nouveautes[mod(currentIndex.value + 1, total.value)] ?? emptyItem,
);

// Navigation vers l'élément précédent (en boucle)
function goPrev() {
  currentIndex.value = mod(currentIndex.value - 1, total.value);
}
// Navigation vers l'élément suivant (en boucle)
function goNext() {
  currentIndex.value = mod(currentIndex.value + 1, total.value);
}
</script>

<template>
  <!-- ===== VERSION MOBILE : une seule carte + flèches superposées sur les bords ===== -->
  <section
    class="relative z-20 pt-7 pb-7 px-6 md:hidden"
    style="background: #ffd1b5"
  >
    <BaseTitle size="section" class="text-center mb-7" style="color: #e61171">
      {{ t("blogTitle") }}
    </BaseTitle>

    <div class="relative max-w-[306px] mx-auto">
      <!-- Carte -->
      <BaseCard variant="agenda" class="relative !h-[284px]">
        <!-- Image : hauteur fixe -->
        <div
          class="rounded-[10px] overflow-hidden w-full h-[139px] mb-7 shrink-0 mt-1"
        >
          <Transition name="fade" mode="out-in">
            <img
              :key="'nmimg-' + currentIndex"
              :src="currentItem.image"
              :alt="currentItem.titre"
              class="w-full h-full object-cover block"
            />
          </Transition>
        </div>

        <!-- Titre : hauteur réservée fixe -->

        <BaseSubtitle
          size="subtitle"
          tag="h3"
          color="#e61171"
          class="!text-[14px] font-bold mb-1 h-[20px] overflow-hidden"
        >
          {{ currentItem.titre }}</BaseSubtitle
        >

        <!-- Description : maximum 2 lignes -->

        <BaseSubtitle
          size="description"
          color="#2e2f30"
          class="!text-[12px] leading-[22px] line-clamp-2 h-[44px] overflow-hidden"
        >
          {{ currentItem.description }}
        </BaseSubtitle>
      </BaseCard>

      <!-- Flèche précédente -->
      <button
        @click="goPrev"
        class="absolute left-[-35px] md:left-[-45px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full flex items-center justify-center z-20 shadow-md"
        style="background: #ff863d"
        aria-label="Précédent"
      >
        <img src="/images/icones/fleche.png" alt="" class="w-2.5 h-2.5" />
      </button>

      <!-- Flèche suivante -->
      <button
        @click="goNext"
        class="absolute right-[-35px] md:right-[-45px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full flex items-center justify-center z-20 shadow-md"
        style="background: #ff863d"
        aria-label="Suivant"
      >
        <img
          src="/images/icones/fleche.png"
          alt=""
          class="w-2.5 h-2.5 rotate-180"
        />
      </button>
    </div>

    <!-- Bouton "Voir plus" -->
    <div class="flex justify-center mt-8">
      <BaseButton variant="pink" to="/blog">
        {{ t("voirPlus") }}
      </BaseButton>
    </div>
  </section>

  <!-- ===== VERSION DESKTOP : carte centrale active + aperçus estompés de part et d'autre (inchangée) ===== -->
  <section
    class="relative z-20 pt-16 pb-20 px-6 hidden md:block mb:px-7"
    style="background: #e61171"
  >
    <!-- Forme décorative courbe blanche en haut de la section -->
    <div
      class="absolute inset-x-0 top-0 h-[128px] -translate-y-1/2 rounded-[100%] bg-white pointer-events-none"
    ></div>

    <BaseTitle size="section" class="text-center my-10">
      {{ t("blogTitle") }}
    </BaseTitle>

    <div class="relative mx-auto flex items-center justify-center gap-6">
      <!-- Carte petite à gauche : élément précédent (estompé), cliquable pour reculer -->
      <button
        type="button"
        @click="goPrev"
        class="relative shrink-0 w-[306px] h-[284px] bg-white rounded-[10px] shadow-[0_13px_19px_rgba(0,0,0,0.07)] p-[23px_23px_20px] text-left overflow-hidden"
      >
        <div
          class="relative rounded-[6px] overflow-hidden w-[259px] h-[139px] mb-4"
        >
          <img
            :src="prevItem.image"
            :alt="prevItem.titre"
            class="w-full h-full object-cover block"
          />
          <span
            class="absolute left-[16px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg z-20"
            style="background: #ff863d"
            aria-label="Précédent"
          >
            <img src="/images/icones/fleche.png" alt="" class="w-5 h-5" />
          </span>
        </div>
        <h3 class="text-sm font-bold mb-1" style="color: #e61171">
          {{ prevItem.titre }}
        </h3>
        <p
          class="text-xs leading-[22px]"
          style="
            color: #2e2f30;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          {{ prevItem.description }}
        </p>
        <!-- Overlay blanc translucide : donne l'aspect "en retrait" de la carte -->
        <div
          class="absolute inset-0 rounded-[10px] pointer-events-none"
          style="background: rgba(255, 255, 255, 0.7)"
        ></div>
      </button>

      <!-- Carte centrale : élément actif, en pleine taille et pleine opacité -->

      <!--
        Carte centrale : élément actif. BaseCard variant="agendaDesktopLarge"
        = dimensions FIXES (636x680), ne bouge JAMAIS peu importe la longueur
        du texte — la description est coupée à 6 lignes (line-clamp-6, "..."
        automatique) au lieu de faire grandir la card.
        :padding="false" car on gère l'espacement nous-mêmes (p-[23px_23px_28px]
        d'origine, gardé pour respecter l'agencement précis du design).
      -->
      <BaseCard
        variant="agendaDesktop"
        :padding="false"
        class="p-[23px_23px_28px]"
      >
        <div
          class="rounded-[10px] overflow-hidden w-full h-[425px] mb-5 shrink-0"
        >
          <img
            :src="currentItem.image"
            :alt="currentItem.titre"
            class="w-full h-full object-cover block"
          />
        </div>

        <!-- Titre 24px = BaseSubtitle size="subtitle" (même composant que les
             autres sous-titres de l'app) -->
        <BaseSubtitle
          size="subtitle"
          tag="h3"
          color="#e61171"
          class="text-left mb-3 shrink-0 font-semibold"
        >
          {{ currentItem.titre }}
        </BaseSubtitle>

        <!-- Description : BaseText (20px, comme partout ailleurs), coupée à
             6 lignes pour ne jamais faire déborder la card -->

        <BaseSubtitle
          size="description"
          color="#2e2f30"
          class="!line-clamp-4 !h-[100px] overflow-hidden"
        >
          {{ currentItem.description }}
        </BaseSubtitle>
      </BaseCard>

      <!-- Carte petite à droite : élément suivant (estompé), cliquable pour avancer -->
      <button
        type="button"
        @click="goNext"
        class="relative shrink-0 w-[306px] h-[284px] bg-white rounded-[10px] shadow-[0_13px_19px_rgba(0,0,0,0.07)] p-[23px_23px_20px] text-left overflow-hidden"
      >
        <div
          class="relative rounded-[6px] overflow-hidden w-[259px] h-[139px] mb-4"
        >
          <img
            :src="nextItem.image"
            :alt="nextItem.titre"
            class="w-full h-full object-cover block"
          />
          <span
            class="absolute right-[16px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg z-20"
            style="background: #ff863d"
            aria-label="Suivant"
          >
            <img
              src="/images/icones/fleche.png"
              alt=""
              class="w-5 h-5 rotate-180"
            />
          </span>
        </div>
        <h3 class="text-sm font-bold mb-1" style="color: #e61171">
          {{ nextItem.titre }}
        </h3>
        <p
          class="text-xs leading-[22px]"
          style="
            color: #2e2f30;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          "
        >
          {{ nextItem.description }}
        </p>
        <div
          class="absolute inset-0 rounded-[10px] pointer-events-none"
          style="background: rgba(255, 255, 255, 0.7)"
        ></div>
      </button>
    </div>

    <!-- Bouton "Voir plus" -->
    <div class="flex justify-center mt-8">
      <BaseButton
        variant="peach"
        to="/blog"
        class="!px-12 mt-6 self-center md:!px-12 md:!py-2.5 md:!text-[17px]"
      >
        {{ t("voirPlus") }}
      </BaseButton>
    </div>
  </section>
</template>

<style scoped>
/* Transition en fondu utilisée pour le changement d'image sur la version mobile */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
