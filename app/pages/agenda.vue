<!-- ============================================================ -->
<!-- FICHIER : pages/agenda.vue                                    -->
<!-- DESCRIPTION : Page d'affichage de l'agenda avec filtres      -->
<!-- ============================================================ -->

<script setup lang="ts">
// ----------------------------------------------------------------
// 1. IMPORTS
// ----------------------------------------------------------------
import { agendaEventsFR } from '~/data/agendaData'
import type { AgendaFilters } from '~/components/AgendaFilterDrawer.vue'

// ----------------------------------------------------------------
// 2. COMPOSABLES & ROUTING
// ----------------------------------------------------------------
const { currentLang, t, setLang } = useTranslation()
const router = useRouter()

// ----------------------------------------------------------------
// 3. FONCTIONS NAVIGATION & LANGUE
// ----------------------------------------------------------------

/**
 * Change la langue courante de l'application
 * @param lang - Code de la langue ('fr', 'de', etc.)
 */
function onLangChange(lang: string) {
  setLang(lang as any, [], [])
}

/**
 * Retourne à la page précédente ou vers l'accueil
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

/** État d'ouverture du tiroir de filtres (mobile) */
const filtersOpen = ref(false)

/** Objet réactif contenant tous les critères de filtrage */
const filters = reactive<AgendaFilters>({
  dateFrom: '',      // Date de début (format YYYY-MM-DD)
  dateTo: '',        // Date de fin (format YYYY-MM-DD)
  canton: '',        // Code du canton (ex: 'VD', 'GE')
  ages: [],          // Tranches d'âge sélectionnées
  activites: [],     // Sous-catégories d'activités
  camps: [],         // Sous-catégories de camps avec hébergement
  campsJour: [],     // Sous-catégories de camps de jour
  cours: []          // Sous-catégories de cours
})

// ----------------------------------------------------------------
// 5. MUTATIONS DES FILTRES
// ----------------------------------------------------------------

/**
 * Active/désactive une valeur dans un tableau de filtres (toggle)
 * @param group - Nom du groupe de filtres (ages, activites, etc.)
 * @param key - Valeur à basculer
 */
function onToggle(group: 'ages' | 'activites' | 'camps' | 'campsJour' | 'cours', key: string) {
  const arr = filters[group]
  const idx = arr.indexOf(key)
  if (idx === -1) arr.push(key)
  else arr.splice(idx, 1)
}

/**
 * Définit le canton sélectionné
 * @param key - Code du canton
 */
function onSetCanton(key: string) {
  filters.canton = key
}

/**
 * Définit une date (début ou fin)
 * @param field - Champ à modifier ('dateFrom' ou 'dateTo')
 * @param value - Nouvelle valeur (format YYYY-MM-DD)
 */
function onSetDate(field: 'dateFrom' | 'dateTo', value: string) {
  filters[field] = value
}

/**
 * Réinitialise tous les filtres à leurs valeurs par défaut
 */
function resetFilters() {
  filters.dateFrom = ''
  filters.dateTo = ''
  filters.canton = ''
  filters.ages = []
  filters.activites = []
  filters.camps = []
  filters.campsJour = []
  filters.cours = []
}

// ----------------------------------------------------------------
// 6. COMPUTED : DÉRIVATIONS
// ----------------------------------------------------------------

/**
 * Nombre total de filtres actifs (pour le badge)
 */
const activeFilterCount = computed(() =>
  (filters.dateFrom ? 1 : 0) +
  (filters.dateTo ? 1 : 0) +
  (filters.canton ? 1 : 0) +
  filters.ages.length +
  filters.activites.length +
  filters.camps.length +
  filters.campsJour.length +
  filters.cours.length
)

/**
 * Union de toutes les sous-catégories sélectionnées, avec leur type
 * Utile pour le filtrage multi-catégories
 */
const selectedTypeChips = computed(() => [
  ...filters.activites.map(k => ({ cat: 'activite' as const, sub: k })),
  ...filters.camps.map(k => ({ cat: 'campLogement' as const, sub: k })),
  ...filters.campsJour.map(k => ({ cat: 'campJour' as const, sub: k })),
  ...filters.cours.map(k => ({ cat: 'cours' as const, sub: k }))
])

/**
 * Liste des événements filtrés selon tous les critères actifs
 */
const filteredEvents = computed(() =>
  agendaEventsFR.filter(ev => {
    // Filtre par date de début
    if (filters.dateFrom && ev.dateEnd < filters.dateFrom) return false
    // Filtre par date de fin
    if (filters.dateTo && ev.dateStart > filters.dateTo) return false
    // Filtre par canton
    if (filters.canton && ev.cantonKey !== filters.canton) return false
    // Filtre par tranches d'âge
    if (filters.ages.length && !ev.ageKeys.some(a => filters.ages.includes(a))) return false
    // Filtre par catégories et sous-catégories
    if (selectedTypeChips.value.length && !selectedTypeChips.value.some(c => c.cat === ev.categorie && c.sub === ev.sousCategorie)) return false
    return true
  })
)
</script>

<!-- ============================================================ -->
<!-- TEMPLATE : STRUCTURE DE LA PAGE                              -->
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

      <!-- En-tête du site (logo, navigation, langue) -->
      <SiteHeader :t="t" :current-lang="currentLang" @set-lang="onLangChange" />

      <!-- Bandeau "Coups de cœur" (mobile) -->
      <CoupsDeCoeurMobileStrip />

      <!-- Titre + bouton retour -->
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
          {{ t('agendaTitle') }}
        </h1>
      </div>
    </div>

    <!-- ---------------------------------------- -->
    <!-- SECTION : BARRE DE RECHERCHE & FILTRES   -->
    <!-- ---------------------------------------- -->
    <div class="relative z-30 -mt-7 md:-mt-8 px-5 md:px-12 flex flex-col md:flex-row gap-3 items-stretch">
      <!-- Carte de recherche par dates -->
      <AgendaSearchCard
        :date-from="filters.dateFrom"
        :date-to="filters.dateTo"
        :t="t"
        @set-date="onSetDate"
        class="flex-1"
      />

      <!-- Bouton d'ouverture du tiroir de filtres -->
      <button
        type="button"
        @click="filtersOpen = true"
        class="shrink-0 flex items-center justify-center gap-2.5 rounded-[10px] px-6 py-4 font-bold text-sm shadow-[0_13px_19px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5"
        style="background:#FFFFFF;color:#E61171"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2.3"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </svg>
        {{ t('agendaFiltresTitle') }}
        <!-- Badge du nombre de filtres actifs -->
        <span v-if="activeFilterCount" class="rounded-full min-w-[22px] h-[22px] flex items-center justify-center text-[11px] font-bold px-1.5"
          style="background:#E61171;color:#FFFFFF">
          {{ activeFilterCount }}
        </span>
      </button>
    </div>

    <!-- ---------------------------------------- -->
    <!-- SECTION : RÉSULTATS                     -->
    <!-- ---------------------------------------- -->
    <section class="px-5 md:px-12 py-8 md:py-10 max-w-[1200px] mx-auto">
      <!-- En-tête des résultats -->
      <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p class="text-sm font-semibold" style="color:#2E2F30">
          {{ filteredEvents.length }} {{ t('agendaResultsSuffix') }}
        </p>
        <!-- Bouton de réinitialisation -->
        <button v-if="activeFilterCount" type="button" @click="resetFilters"
          class="text-sm font-bold underline underline-offset-2" style="color:#E61171">
          {{ t('agendaReset') }}
        </button>
      </div>

      <!-- Grille des cartes d'événements -->
      <div v-if="filteredEvents.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <AgendaEventCard v-for="event in filteredEvents" :key="event.id" :event="event" :t="t" />
      </div>

      <!-- État vide -->
      <div v-else class="flex flex-col items-center text-center py-20 px-5">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFD1B5" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round" class="mb-4">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <h3 class="font-bold text-lg mb-2" style="color:#E61171">{{ t('agendaEmptyTitle') }}</h3>
        <p class="text-sm max-w-[320px]" style="color:#2E2F30">{{ t('agendaEmptyText') }}</p>
      </div>
    </section>

    <!-- ---------------------------------------- -->
    <!-- SECTION : TIROIR DE FILTRES (mobile)     -->
    <!-- ---------------------------------------- -->
    <AgendaFilterDrawer
      :open="filtersOpen"
      :filters="filters"
      :result-count="filteredEvents.length"
      :t="t"
      @close="filtersOpen = false"
      @reset="resetFilters"
      @toggle="onToggle"
      @set-canton="onSetCanton"
    />

    <!-- ---------------------------------------- -->
    <!-- SECTION : PIED DE PAGE                   -->
    <!-- ---------------------------------------- -->
    <NewsletterSection :t="t" />
    <SiteFooter :t="t" />
  </div>
</template>