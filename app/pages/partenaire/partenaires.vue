<!-- ============================================================ -->
<!-- FICHIER : pages/partenaires.vue                              -->
<!-- DESCRIPTION : Page des partenaires (Suisse-Alémanique)       -->
<!-- ============================================================ -->

<script setup lang="ts">
// ----------------------------------------------------------------
// 1. IMPORTS
// ----------------------------------------------------------------
import { partnersFR, type Partner } from "~/data/partnersData";

// Les partenaires sont chargés via la route serveur afin de garder l’URL
// n8n privée. Le catalogue local sert de repli pour préserver l’affichage
// même lorsque la source distante est momentanément indisponible.
const {
  data: apiPartners,
  pending: partnersPending,
  error: partnersError,
} = useFetch<Partner[]>("/api/partners", {
  default: () => partnersFR,
});
const partners = computed(() =>
  apiPartners.value?.length ? apiPartners.value : partnersFR,
);

// ----------------------------------------------------------------
// 2. COMPOSABLES & ROUTING
// ----------------------------------------------------------------
const { currentLang, t, setLang } = useTranslation();
const router = useRouter();
import { useReferenceHeight } from "~/composables/useReferenceHeight";

const { referenceRef, referenceHeight } = useReferenceHeight();

// ----------------------------------------------------------------
// 3. FONCTIONS NAVIGATION & LANGUE
// ----------------------------------------------------------------

/**
 * Change la langue courante
 * @param lang - Code de la langue
 */
function onLangChange(lang: string) {
  setLang(lang as any, [], []);
}

// ----------------------------------------------------------------
// 4. ÉTAT LOCAL : FILTRES
// ----------------------------------------------------------------

/** Zone et Catégorie de partenaire sélectionnée */
const zone = ref<string[]>([]);
const category = ref<string[]>([]);

/**
 * Réinitialise les filtres
 */
function resetFilters() {
  zone.value = [];
  category.value = [];
}

// ----------------------------------------------------------------
// 5. COMPUTED : FILTRAGE
// ----------------------------------------------------------------

const filteredPartners = computed(() =>
  partners.value.filter((p) => {
    // Zone : le partenaire doit couvrir AU MOINS une des zones sélectionnées
    if (
      zone.value.length &&
      !zone.value.some((z) => p.coverage.includes(z as "SR" | "SA"))
    ) {
      return false;
    }

    // Catégorie : le partenaire doit être dans AU MOINS une des catégories sélectionnées
    if (category.value.length && !category.value.includes(p.category)) {
      return false;
    }

    return true;
  }),
);

const activeFilterCount = computed(
  () => zone.value.length + category.value.length,
);
</script>

<!-- ============================================================ -->
<!-- TEMPLATE : PAGE PARTENAIRES                                  -->
<!-- ============================================================ -->
<template>
  <div
    class="min-h-screen overflow-x-hidden text-white font-sans"
    style="background: #fff8f4"
  >
    <!-- ============================================================ -->
    <!-- HERO                                                         -->
    <!-- ============================================================ -->
    <div
      class="relative overflow-hidden min-h-[300px] md:min-h-[340px] flex flex-col text-white"
      style="background: #e61171"
    >
      <!-- ======================================================== -->
      <!-- VAGUE MOBILE UNIQUEMENT                                  -->
      <!-- ======================================================== -->
      <svg
        class="absolute -bottom-px left-0 w-full h-[120px] z-0 pointer-events-none md:hidden"
        viewBox="0 0 830 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 L0,70 Q207.5,40 415,60 Q622.5,80 830,30 L830,120 Z"
          fill="#FFF8F4"
        />
      </svg>

      <!-- ======================================================== -->
      <!-- HEADER DESKTOP                                            -->
      <!-- ======================================================== -->
      <div class="hidden md:block relative z-[100]">
        <SiteHeader
          :t="t"
          :current-lang="currentLang"
          @set-lang="onLangChange"
        />
      </div>

      <!-- ======================================================== -->
      <!-- HEADER MOBILE                                             -->
      <!-- ======================================================== -->
      <div class="md:hidden relative z-[100]">
        <FixedMobileHeader
          :t="t"
          :current-lang="currentLang"
          @set-lang="onLangChange"
        />
      </div>

      <!-- ======================================================== -->
      <!-- HERO CONTENT                                               -->
      <!-- Même padding que article.vue : px-5 md:px-7              -->
      <!-- ======================================================== -->
      <div
        class="relative z-20 px-5 md:px-7 pt-2 pb-20 md:pb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8"
      >
        <!-- TITRE + DESCRIPTION -->
        <div class="flex flex-col gap-3 md:max-w-[420px] md:shrink-0">
          <BaseTitle size="TitrePage">{{ t("partnersTitle") }}</BaseTitle>

          <div class="flex flex-col items-start gap-2">
            <BaseText size="body" class="max-w-[480px]">{{
              t("partnersSubtitle1")
            }}</BaseText>
            <BaseText size="body" class="max-w-[480px]">{{
              t("partnersSubtitle2")
            }}</BaseText>
          </div>
        </div>

        <!-- ====================================================== -->
        <!-- BANNIÈRE HAUT DE SITE                                  -->
        <!-- DESKTOP UNIQUEMENT                                     -->
        <!-- Même principe que article.vue                          -->
        <!-- ====================================================== -->
        <div
          class="hidden md:block flex-1 max-w-[908px] h-[145px] rounded-[10px]"
          style="background: #ffede3; opacity: 0.5; border: 2px solid #ffcee4"
        ></div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- CONTENU PRINCIPAL DESKTOP + MOBILE                           -->
    <!-- ============================================================ -->
    <div
      class="px-5 md:px-7 mx-auto -mt-8 md:mt-7 relative z-10 md:flex md:gap-8 md:items-start"
    >
      <!-- ======================================================== -->
      <!-- COLONNE GAUCHE                                           -->
      <!-- ======================================================== -->
      <div
        ref="referenceRef"
        class="flex flex-col gap-6 md:gap-8 md:flex-1 md:min-w-0"
      >
        <!-- ====================================================== -->
        <!-- FILTRES                                                -->
        <!-- ====================================================== -->

        <BaseSubtitle
          size="description"
          tag="p"
          class="font-bold"
          color="#e61171"
          >{{ t("blogRefineSearch") }}</BaseSubtitle
        >
        <section>
          <PartnersFilterBar
            :zone="zone"
            :category="category"
            :t="t"
            @set-zone="zone = $event"
            @set-category="category = $event"
          />
        </section>

        <!-- ====================================================== -->
        <!-- RÉSULTATS                                              -->
        <!-- ====================================================== -->
        <section>
          <!-- En-tête résultats -->
          <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
          <BaseText
            size="caption"
            bold
            color="#e61171"
            class="!font-semibold text-[14px]"
          >
              {{ filteredPartners.length }}
              {{ t("partnersResultsSuffix") }}
          </BaseText>

            <!-- Reset -->
            <button
              v-if="activeFilterCount"
              type="button"
              @click="resetFilters"
              class="text-sm font-bold underline underline-offset-2"
              style="color: #e61171"
            >
              {{ t("partnersReset") }}
            </button>
          </div>
          <!-- GRILLE PARTENAIRES : tous     -->
          <!-- ==================================================== -->
          <div
            v-if="filteredPartners.length"
            ref="firstRowGridRef"
            class="cards-grid"
          >
            <PartnerCard
              v-for="partner in filteredPartners"
              :key="partner.id"
              :partner="partner"
              :t="t"
            />
          </div>

          <!-- ==================================================== -->
          <!-- ÉTAT VIDE                                            -->
          <!-- ==================================================== -->
          <div v-else class="flex flex-col items-center text-center py-20 px-5">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFD1B5"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mb-4"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <BaseTitle size="card" tag="h3" color="#e61171" class="mb-2">{{
              t("agendaEmptyTitle")
            }}</BaseTitle>
            <BaseText size="caption" color="#2e2f30" class="max-w-[320px]">{{
              t("agendaEmptyText")
            }}</BaseText>
          </div>
        </section>
      </div>

      <!-- ======================================================== -->
      <!-- SIDEBAR COUPS DE CŒUR                                   -->
      <!-- DESKTOP UNIQUEMENT                                     -->
      <!-- ======================================================== -->
      <CoupsDeCoeurSidebar
        class="hidden md:block md:sticky md:top-6 md:shrink-0"
        :reference-height="referenceHeight"
      />
    </div>

    <!-- ============================================================ -->
    <!-- NEWSLETTER                                                  -->
    <!-- ============================================================ -->
    <NewsletterSection :t="t" class="mt-10" />

    <!-- ============================================================ -->
    <!-- FOOTER                                                      -->
    <!-- ============================================================ -->
    <SiteFooter :t="t" />
  </div>
</template>
