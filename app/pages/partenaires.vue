<!-- ============================================================ -->
<!-- FICHIER : pages/partenaires.vue                              -->
<!-- DESCRIPTION : Page des partenaires (Suisse-Alémanique)       -->
<!-- ============================================================ -->

<script setup lang="ts">
// ----------------------------------------------------------------
// 1. IMPORTS
// ----------------------------------------------------------------
import { partnersFR } from '~/data/partnersData'

// ----------------------------------------------------------------
// 2. COMPOSABLES & ROUTING
// ----------------------------------------------------------------
const { currentLang, t, setLang } = useTranslation()
const router = useRouter()

// ----------------------------------------------------------------
// 3. FONCTIONS NAVIGATION & LANGUE
// ----------------------------------------------------------------

/**
 * Change la langue courante
 * @param lang - Code de la langue
 */
function onLangChange(lang: string) {
  setLang(lang as any, [], [])
}

/**
 * Retour à la page précédente ou à l'accueil
 */
function goBack() {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    router.back()
  } else {
    navigateTo('/')
  }
}

// ----------------------------------------------------------------
// 4. ÉTAT LOCAL : FILTRES
// ----------------------------------------------------------------

/** Zone géographique sélectionnée ('SR' pour Romandie, 'SA' pour Alémanique) */
const zone = ref('')

/** Catégorie de partenaire sélectionnée */
const category = ref('')

/**
 * Réinitialise les filtres
 */
function resetFilters() {
  zone.value = ''
  category.value = ''
}

// ----------------------------------------------------------------
// 5. COMPUTED : FILTRAGE
// ----------------------------------------------------------------

/**
 * Liste des partenaires couvrant la Suisse-Alémanique (SA)
 * (seuls ou en plus de la Romandie)
 */
const saPartners = computed(() =>
  partnersFR.filter(p => p.coverage.includes('SA'))
)

/**
 * Partenaires filtrés selon zone et catégorie
 */
const filteredPartners = computed(() =>
  saPartners.value.filter(p => {
    if (zone.value && !p.coverage.includes(zone.value as 'SR' | 'SA')) return false
    if (category.value && p.category !== category.value) return false
    return true
  })
)

/**
 * Nombre de filtres actifs (pour le badge)
 */
const activeFilterCount = computed(() =>
  (zone.value ? 1 : 0) + (category.value ? 1 : 0)
)
</script>

<!-- ============================================================ -->
<!-- TEMPLATE : PAGE PARTENAIRES                                  -->
<!-- ============================================================ -->
<template>
  <div class="min-h-screen overflow-x-hidden text-white font-sans" style="background:#FFF8F4">

    <!-- ---------------------------------------- -->
    <!-- SECTION : EN-TÊTE HERO                   -->
    <!-- ---------------------------------------- -->
    <div class="relative overflow-hidden min-h-[300px] md:min-h-[340px] flex flex-col text-white" style="background:#E61171">
      <!-- Fond uni -->
      <div class="absolute inset-x-0 top-0 h-full z-0 pointer-events-none" style="background:#E61171"></div>

      <!-- Vagues de séparation (mobile) -->
      <svg class="absolute -bottom-px left-0 w-full h-[120px] z-0 pointer-events-none md:hidden" viewBox="0 0 830 120" preserveAspectRatio="none">
        <path d="M0,120 L0,70 Q207.5,40 415,60 Q622.5,80 830,30 L830,120 Z" fill="#FFF8F4" />
      </svg>

      <!-- Vagues de séparation (desktop) -->
      <svg class="absolute -bottom-px left-0 w-full h-[140px] z-0 pointer-events-none hidden md:block" viewBox="0 0 1440 140" preserveAspectRatio="none">
        <path d="M0,90 C240,60 480,110 720,90 C960,70 1200,20 1440,50 L1440,140 L0,140 Z" fill="#FFF8F4" />
      </svg>

      <!-- En-tête du site -->
      <SiteHeader :t="t" :current-lang="currentLang" @set-lang="onLangChange" />

      <!-- Titre + sous-titre -->
      <div class="relative z-20 px-5 md:px-12 pt-2 pb-16 md:pb-20">
        <!-- Bouton retour -->
        <button type="button" @click="goBack" aria-label="Retour"
          class="flex items-center justify-center w-9 h-9 rounded-full mb-3 transition-colors hover:bg-white/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 class="text-2xl md:text-4xl font-bold leading-tight tracking-[0.2px] mb-2 md:mb-3">
          {{ t('partnersTitle') }}
        </h1>
        <p class="text-sm md:text-base max-w-[480px]" style="color:#FFD1B5">
          {{ t('partnersSubtitle') }}
        </p>
      </div>
    </div>

    <!-- ---------------------------------------- -->
    <!-- SECTION : BARRE DE FILTRES              -->
    <!-- ---------------------------------------- -->
    <div class="relative z-30 -mt-7 md:-mt-8 px-5 md:px-12">
      <PartnersFilterBar
        :zone="zone"
        :category="category"
        :t="t"
        @set-zone="zone = $event"
        @set-category="category = $event"
      />
    </div>

    <!-- ---------------------------------------- -->
    <!-- SECTION : RÉSULTATS                     -->
    <!-- ---------------------------------------- -->
    <section class="px-5 md:px-12 py-8 md:py-10 max-w-[1200px] mx-auto">
      <!-- En-tête des résultats -->
      <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p class="text-sm font-semibold" style="color:#2E2F30">
          {{ filteredPartners.length }} {{ t('partnersResultsSuffix') }}
        </p>
        <!-- Bouton de réinitialisation -->
        <button v-if="activeFilterCount" type="button" @click="resetFilters"
          class="text-sm font-bold underline underline-offset-2" style="color:#E61171">
          {{ t('partnersReset') }}
        </button>
      </div>

      <!-- Grille des cartes partenaires -->
      <div v-if="filteredPartners.length" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        <PartnerCard v-for="partner in filteredPartners" :key="partner.slug" :partner="partner" :t="t" />
      </div>

      <!-- État vide -->
      <div v-else class="flex flex-col items-center text-center py-20 px-5">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFD1B5" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round" class="mb-4">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <h3 class="font-bold text-lg mb-2" style="color:#E61171">{{ t('partnersEmptyTitle') }}</h3>
        <p class="text-sm max-w-[320px]" style="color:#2E2F30">{{ t('partnersEmptyText') }}</p>
      </div>
    </section>

    <!-- ---------------------------------------- -->
    <!-- SECTION : PIED DE PAGE                   -->
    <!-- ---------------------------------------- -->
    <NewsletterSection :t="t" />
    <SiteFooter :t="t" />
  </div>
</template>