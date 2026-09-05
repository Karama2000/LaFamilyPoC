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
import type { AgendaEvent } from "~/data/agendaData";

const props = defineProps<{
  t: (key: string) => string;
  selections: AgendaEvent[];
}>();

// Même correspondance catégorie -> clé de traduction que AgendaEventCard.vue
const categoryLabel: Record<AgendaEvent["categorie"], string> = {
  activite: "filterActivites",
  campLogement: "filterCamps",
  campJour: "filterCampsJour",
  cours: "filterCours",
};

// Index de la diapositive actuellement affichée
const currentSlide = ref(0);

const currentItem = computed(() => props.selections[currentSlide.value]);

// Passe à la diapositive suivante (en boucle)
function nextSlide() {
  if (!props.selections.length) return;
  currentSlide.value = (currentSlide.value + 1) % props.selections.length;
}
// Revient à la diapositive précédente (en boucle)
function prevSlide() {
  if (!props.selections.length) return;
  currentSlide.value =
    (currentSlide.value - 1 + props.selections.length) %
    props.selections.length;
}

// Réinitialise l’index si la réponse API remplace la liste affichée.
watch(
  () => props.selections.length,
  (length) => {
    if (!length || currentSlide.value >= length) currentSlide.value = 0;
  },
);

// Défilement automatique toutes les 5 secondes
let autoplayTimer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  autoplayTimer = setInterval(nextSlide, 5000);
});
// Nettoyage du timer pour éviter les fuites mémoire quand le composant est détruit
onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer);
});
</script>

<template>
  <!-- Titre : mobile remonté (-mt-32), desktop inchangé (md:mt-0 + pt-8 pb-10 px-12 d'origine) -->
  <section
    class="relative z-30 bg-white -mt-44 md:mt-0 pb-7 px-5 md:pt-0 md:pb-10 md:px-12"
  >
    <BaseTitle size="section" class="text-center" style="color: #e61171">
      {{ t("selectionTitle") }}
    </BaseTitle>
  </section>

  <!-- ===== VERSION MOBILE : carte avec overlay d'info en bas à gauche ===== -->
  <section class="relative z-20 bg-white pb-7 px-5 md:hidden">
    <BaseCard
      variant="agenda"
      :padding="false"
      class="relative mx-auto w-full max-w-[366px] aspect-[366/244]"
    >
      <!-- Image de la diapositive, avec transition de glissement horizontal -->
      <Transition name="slide">
        <img
          v-if="currentItem"
          :key="'mimg-' + currentSlide"
          :src="currentItem.image"
          :alt="currentItem.titre"
          class="absolute inset-0 w-full h-full object-cover block"
        />
      </Transition>

      <!-- Bouton Catégorie -->
      <div
        v-if="currentItem"
        class="absolute top-[3%] left-[3%] z-20 flex items-center justify-center rounded-[10px] border-[1.5px] border-[#FFD1B5] bg-white/90 px-[clamp(12px,2.5vw,20px)] py-[clamp(7px,1.2vw,12px)]"
      >
        <BaseButton variant="badgeLarge">
          {{ t(categoryLabel[currentItem.categorie]) }}
        </BaseButton>
      </div>

      <!-- Encart d'info (titre + bouton), en fondu -->
      <div
        v-if="currentItem"
        :key="'mbox-' + currentSlide"
        class="absolute left-0 top-[60%] w-[55%] min-h-[40%] flex flex-col px-3 md:px-3 pt-1 rounded-tr-[10px]"
        style="background: rgba(255, 255, 255, 0.7)"
      >
        <BaseTitle size="card" style="color: #e61171">
          {{ currentItem.titre }}
        </BaseTitle>

        <BaseButton
          variant="peach"
          class="!mt-1"
          :to="`/agendaFolder/${currentItem.id}`"
        >
          {{ t("enSavoirPlus") }}
        </BaseButton>
      </div>

      <!-- Flèches de navigation précédent/suivant (masquées s'il n'y a rien à faire défiler) -->
      <button
        v-if="currentItem"
        @click="prevSlide"
        class="absolute left-2 top-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full flex items-center justify-center z-30 shadow-md"
        style="background: #ff863d"
        aria-label="Précédent"
      >
        <img src="/images/icones/fleche.png" alt="" class="w-3 h-3" />
      </button>

      <button
        v-if="currentItem"
        @click="nextSlide"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full flex items-center justify-center z-30 shadow-md"
        style="background: #ff863d"
        aria-label="Suivant"
      >
        <img
          src="/images/icones/fleche.png"
          alt=""
          class="w-3 h-3 rotate-180"
        />
      </button>
    </BaseCard>
  </section>

  <!-- ===== VERSION DESKTOP : grande image pleine largeur + overlay centré ===== -->
  <section class="relative z-20 bg-white pb-24 px-5 md:px-7 hidden md:block">
    <!--
      Image plus grande : max-w augmenté (1319px -> 1600px) et padding
      latéral de la section réduit (px-12 -> px-6) pour lui laisser plus
      de place. Le ratio aspect-[1319/642] est gardé pour ne pas déformer
      les photos existantes, la card grandit juste proportionnellement.
    -->
    <div class="relative max-w-[1500px] mx-auto aspect-[1319/642]">
      <!--
        BaseCard variant="agenda" = même card que partout ailleurs dans l'app
        (bg blanc, radius 10px, ombre 0 13px 19px rgba(0,0,0,.07)).
        :padding="false" car l'image remplit toute la card.
      -->
      <BaseCard variant="agenda" :padding="false" class="absolute inset-0">
        <!-- Image de fond de la diapositive, en fondu -->
        <Transition name="fade" mode="out-in">
          <img
            v-if="currentItem"
            :key="currentSlide"
            :src="currentItem.image"
            :alt="currentItem.titre"
            class="w-full h-full object-cover block"
          />
        </Transition>

        <!-- Bouton Catégorie -->

        <div
          v-if="currentItem"
          class="absolute top-[3%] left-[3%] z-20 flex items-center justify-center rounded-[10px] border-[1.5px] border-[#FFD1B5] bg-white/90 px-[clamp(12px,2.5vw,20px)] py-[clamp(7px,1.2vw,12px)]"
        >
          <BaseButton variant="badgeLarge">
            {{ t(categoryLabel[currentItem.categorie]) }}
          </BaseButton>
        </div>

        <!--
          Encart d'info centré : responsive via clamp() au lieu d'une largeur
          fixe (492px) + max-w 85% -> s'adapte en continu à la taille d'écran
          sans jamais devenir trop étroit ni trop large.
          flex flex-col + bouton en dernier avec margin-top fixe (mt-6) au
          lieu de dépendre du flux du texte : la description est clampée à
          6 lignes (line-clamp-6, "..." automatique si plus long) donc la
          hauteur de l'encart varie très peu d'un item à l'autre, et le
          bouton reste visuellement à la même place / même style à chaque
          diapo.
        -->
        <Transition name="fade" mode="out-in">
          <div
            v-if="currentItem"
            :key="currentSlide"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(320px,40vw,492px)] rounded-[10px] px-8 py-8 text-center z-10 flex flex-col items-center"
            style="background: rgba(255, 255, 255, 0.7)"
          >
            <BaseSubtitle
              size="subtitle"
              color="#e61171"
              class="line-clamp-2 font-semibold"
            >
              {{ currentItem.titre }}
            </BaseSubtitle>

            <BaseSubtitle
              size="description"
              tag="p"
              color="#2e2f30"
              class="mt-4 line-clamp-6"
            >
              {{ currentItem.description }}
            </BaseSubtitle>

            <!-- mt-6 fixe (pas mb-6 sur la description) : le bouton garde
                 toujours le même espacement au-dessus de lui, peu importe
                 le nombre de lignes du texte au-dessus. -->
            <BaseButton
              variant="peach"
              :to="`/agendaFolder/${currentItem.id}`"
              class="mt-6 self-center md:!px-12 md:!py-2.5 md:!text-[17px]"
            >
              {{ t("enSavoirPlus") }}
            </BaseButton>
          </div>
        </Transition>
      </BaseCard>

      <!--
        Flèches de navigation : repositionnées à l'INTÉRIEUR du cadre de
        l'image (left-4/right-4) au lieu d'être à cheval sur le bord
        (-left-5/-translate-x-1/2 qui les faisait dépasser à moitié à
        l'extérieur) — comme sur la capture fournie.
      -->
      <button
        v-if="currentItem"
        @click="prevSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center text-white z-20 shadow-lg"
        style="background: #ff863d"
        aria-label="Précédent"
      >
        <img src="/images/icones/fleche.png" alt="" class="w-5 h-5" />
      </button>

      <button
        v-if="currentItem"
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full flex items-center justify-center text-white z-20 shadow-lg"
        style="background: #ff863d"
        aria-label="Suivant"
      >
        <img
          src="/images/icones/fleche.png"
          alt=""
          class="w-5 h-5 rotate-180"
        />
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Transition en fondu utilisée pour les images/overlays desktop et l'overlay mobile */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transition de glissement horizontal utilisée pour l'image de la version mobile */
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.6s ease,
    opacity 0.6s ease;
  position: absolute;
  inset: 0;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>