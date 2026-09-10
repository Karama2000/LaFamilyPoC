<!-- ============================================================ -->
<!-- FICHIER : pages/agenda.vue                                    -->
<!-- DESCRIPTION : Page d'affichage de l'agenda avec filtres      -->
<!-- ============================================================ -->

<script setup lang="ts">
// ----------------------------------------------------------------
// 1. IMPORTS
// ----------------------------------------------------------------
import {
  agendaEventsFR,
  cantons,
  ageGroups,
  campSubcategories,
} from "~/data/agendaData";
import type { AgendaEvent } from "~/data/agendaData";
import type { AgendaFilters } from "~/components/AgendaFilterDrawer.vue";
import { useReferenceHeight } from "~/composables/useReferenceHeight";

const { referenceRef, referenceHeight } = useReferenceHeight();

// ----------------------------------------------------------------
// 2. COMPOSABLES & ROUTING
// ----------------------------------------------------------------
const { currentLang, t, setLang } = useTranslation();
const router = useRouter();
const route = useRoute();

// Les données live passent par la route serveur fusionnée, qui protège les

const {
  data: apiAgendaEvents,
  pending: agendaPending,
  error: agendaError,
} = useFetch<AgendaEvent[]>("/api/agenda", {
  query: { lang: currentLang },
  key: computed(() => `agenda-${currentLang.value}`),
  default: () => (currentLang.value === "fr" ? agendaEventsFR : []),
});
const agendaEvents = computed(() => apiAgendaEvents.value ?? []);

// ----------------------------------------------------------------
// 3. FONCTIONS NAVIGATION & LANGUE
// ----------------------------------------------------------------

/**
 * Change la langue courante de l'application
 * @param lang - Code de la langue ('fr', 'de', etc.)
 */
function onLangChange(lang: string) {
  setLang(lang as any);
}

// ----------------------------------------------------------------
// 4. ÉTAT LOCAL : FILTRES
// ----------------------------------------------------------------

/** État d'ouverture du tiroir de filtres (mobile) */
const filtersOpen = ref(false);

/** Objet réactif contenant tous les critères de filtrage */
const filters = reactive<AgendaFilters>({
  dateFrom: "", // Date de début (format YYYY-MM-DD)
  dateTo: "", // Date de fin (format YYYY-MM-DD)
  canton: [], // Code du canton (ex: 'VD', 'GE')
  ages: [], // Tranches d'âge sélectionnées
  activites: [], // Sous-catégories d'activités
  camps: [], // Sous-catégories de camps avec hébergement
  campsJour: [], // Sous-catégories de camps de jour
  cours: [], // Sous-catégories de cours
  categories: [], // Grandes catégories sélectionnées depuis le menu
});

/** Synchronise les liens du menu avec les filtres de l’agenda. */
watch(
  () => [route.query.categorie, route.query.sousCategorie],
  ([categorie, sousCategorie]) => {
    const category = typeof categorie === "string" ? categorie : "";
    const subcategory =
      typeof sousCategorie === "string" ? sousCategorie : "";

    filters.categories = category ? [category] : [];
    filters.activites =
      category === "activite" && subcategory ? [subcategory] : [];
    filters.camps = [];
    filters.campsJour = [];
    filters.cours = category === "cours" && subcategory ? [subcategory] : [];
  },
  { immediate: true },
);

// ----------------------------------------------------------------
// 5. MUTATIONS DES FILTRES
// ----------------------------------------------------------------

/**
 * Active/désactive une valeur dans un tableau de filtres (toggle)
 * @param group - Nom du groupe de filtres (ages, activites, etc.)
 * @param key - Valeur à basculer
 */
function onToggle(
  group: "ages" | "activites" | "camps" | "campsJour" | "cours",
  key: string,
) {
  const arr = filters[group];
  const idx = arr.indexOf(key);
  if (idx === -1) arr.push(key);
  else arr.splice(idx, 1);
}

/**
 * Définit le canton sélectionné
 * @param key - Code du canton
 */
function onSetCanton(keys: string[]) {
  filters.canton = keys;
}

/**
 * Définit une date (début ou fin)
 * @param field - Champ à modifier ('dateFrom' ou 'dateTo')
 * @param value - Nouvelle valeur (format YYYY-MM-DD)
 */
function onSetDate(field: "dateFrom" | "dateTo", value: string) {
  filters[field] = value;
}

/**
 * Réinitialise tous les filtres à leurs valeurs par défaut
 */
function resetFilters() {
  filters.dateFrom = "";
  filters.dateTo = "";
  filters.canton = [];
  filters.ages = [];
  filters.activites = [];
  filters.camps = [];
  filters.campsJour = [];
  filters.cours = [];
  filters.categories = [];
}
// ----------------------------------------------------------------
// 5bis. BOUTON "CHERCHER" (carte de recherche par dates)
// ----------------------------------------------------------------

/** Référence DOM vers la section des résultats, utilisée pour y faire défiler la page */
const resultsSection = ref<HTMLElement | null>(null);

/**
 * Appelé quand l'utilisateur clique sur "Chercher" dans AgendaSearchCard.
 * Le filtrage est déjà réactif (computed filteredEvents ci-dessous), donc
 * il n'y a rien à recalculer ici : on se contente de faire défiler la page
 * jusqu'aux résultats pour une meilleure expérience, surtout sur mobile.
 */
function onSearch() {
  resultsSection.value?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ----------------------------------------------------------------
// 6. COMPUTED : DÉRIVATIONS
// ----------------------------------------------------------------

/**
 * Nombre total de filtres actifs (pour le badge)
 */
const activeFilterCount = computed(
  () =>
    filters.canton.length +
    filters.ages.length +
    filters.activites.length +
    filters.camps.length +
    filters.campsJour.length +
    filters.cours.length,
);

/**
 * Union de toutes les sous-catégories sélectionnées, avec leur type
 * Utile pour le filtrage multi-catégories
 */
const selectedTypeChips = computed(() => [
  ...filters.activites.map((k) => ({ cat: "activite" as const, sub: k })),
  ...filters.camps.map((k) => ({ cat: "campLogement" as const, sub: k })),
  ...filters.campsJour.map((k) => ({ cat: "campJour" as const, sub: k })),
  ...filters.cours.map((k) => ({ cat: "cours" as const, sub: k })),
]);

/**
 * Chips récapitulant TOUS les filtres actifs (canton + âges + activités +
 * camps + camps de jour + cours), affichées au-dessus de la grille de
 * résultats. Même logique que dans AgendaFilterDrawer.vue, pour garder
 * des libellés cohérents entre le tiroir et la page.
 */
const activeChips = computed(() => {
  const chips: {
    group: "ages" | "activites" | "camps" | "campsJour" | "cours" | "canton";
    key: string;
    label: string;
  }[] = [];

  for (const key of filters.canton) {
    const c = cantons.find((c) => c.key === key);
    if (c) chips.push({ group: "canton", key, label: c.label });
  }
  for (const key of filters.ages) {
    const a = ageGroups.find((a) => a.key === key);
    if (a) chips.push({ group: "ages", key, label: t(a.labelKey) });
  }
  for (const key of filters.activites)
    chips.push({ group: "activites", key, label: t(key) });
  for (const key of filters.camps) {
    const s = campSubcategories.find((s) => s.key === key);
    if (s) chips.push({ group: "camps", key, label: t(s.labelKey) });
  }
  for (const key of filters.campsJour) {
    const s = campSubcategories.find((s) => s.key === key);
    if (s) chips.push({ group: "campsJour", key, label: t(s.labelKey) });
  }
  for (const key of filters.cours)
    chips.push({ group: "cours", key, label: t(key) });

  return chips;
});

/**
 * Retire un filtre via sa chip : soit en vidant le canton, soit en
 * décochant l'option correspondante dans le bon groupe.
 */
function removeChip(chip: { group: string; key: string }) {
  if (chip.group === "canton") {
    filters.canton = filters.canton.filter((k) => k !== chip.key);
  } else {
    const group =
      filters[
        chip.group as "ages" | "activites" | "camps" | "campsJour" | "cours"
      ];
    const idx = group.indexOf(chip.key);
    if (idx === -1) group.push(chip.key);
    else group.splice(idx, 1);
  }
}

/** Vérifie le chevauchement d’une occurrence avec la période choisie. */
function occurrenceMatchesDate(
  occurrence: { dateStart: string; dateEnd: string },
  dateFrom: string,
  dateTo: string,
) {
  if (dateFrom && occurrence.dateEnd < dateFrom) return false;
  if (dateTo && occurrence.dateStart > dateTo) return false;
  return true;
}

/**
 * Le back regroupe les occurrences répétées et expose leurs dates ISO dans
 * autresDatesISO. Une occurrence secondaire doit donc être prise en compte
 * au même titre que la date principale.
 */
function eventMatchesDateFilter(ev: AgendaEvent) {
  if (!filters.dateFrom && !filters.dateTo) return true;
  return [
    { dateStart: ev.dateStart, dateEnd: ev.dateEnd },
    ...(ev.autresDatesISO ?? []),
  ].some((occurrence) =>
    occurrenceMatchesDate(occurrence, filters.dateFrom, filters.dateTo),
  );
}

/**
 * Liste des événements filtrés selon tous les critères actifs, en reprenant
 * les champs normalisés et les occurrences regroupées par l’API back.
 */
const filteredEvents = computed(() =>
  agendaEvents.value.filter((ev) => {
    // Filtre par date : la date principale ou une autre occurrence peut matcher
    if (!eventMatchesDateFilter(ev)) return false;
    // Filtre par canton
    if (filters.canton.length && !filters.canton.includes(ev.cantonKey))
      return false;
    // Filtre par tranches d'âge
    if (
      filters.ages.length &&
      !ev.ageKeys.some((a) => filters.ages.includes(a))
    )
      return false;
    // Filtre par grande catégorie (clic depuis une section du menu)
    if (filters.categories.length && !filters.categories.includes(ev.categorie))
      return false;
    // Filtre par catégories et sous-catégories. Les valeurs normalisées par le
    // back restent la source de vérité ; les camps sans sous-catégorie sont
    // donc sélectionnables via leur grande catégorie.
    if (
      selectedTypeChips.value.length &&
      !selectedTypeChips.value.some(
        (c) => c.cat === ev.categorie && (!c.sub || c.sub === ev.sousCategorie),
      )
    )
      return false;
    return true;
  }),
);
</script>

<!-- ============================================================ -->
<!-- TEMPLATE : STRUCTURE DE LA PAGE                              -->
<!-- ============================================================ -->
<template>
  <div
    class="min-h-screen overflow-x-hidden text-white font-sans"
    style="background: #fff8f4"
  >
    <!-- ---------------------------------------- -->
    <!-- SECTION : EN-TÊTE HERO                   -->
    <!-- ---------------------------------------- -->
    <div
      class="relative overflow-hidden min-h-[300px] md:min-h-[340px] flex flex-col text-white"
      style="background: #e61171"
    >
      <!-- Fond uni -->
      <div
        class="absolute inset-x-0 top-0 h-full z-0 pointer-events-none"
        style="background: #e61171"
      ></div>

      <!-- Vagues de séparation (mobile) -->
      <svg
        class="absolute -bottom-px left-0 w-full h-[120px] z-0 pointer-events-none md:hidden"
        viewBox="0 0 830 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 L0,70 Q207.5,40 415,60 Q622.5,80 830,30 L830,120 Z"
          fill="#FFFFFF
        "
        />
      </svg>
      <!-- Vagues de séparation (desktop) supprimé-->

      <!-- En-tête du site (logo, navigation, langue) -->
      <div class="hidden md:block relative z-[100]">
        <SiteHeader
          :t="t"
          :current-lang="currentLang"
          @set-lang="onLangChange"
        />
      </div>
      <div class="md:hidden relative z-[100]">
        <FixedMobileHeader
          :t="t"
          :current-lang="currentLang"
          @set-lang="onLangChange"
        />
      </div>

      <!-- Titre + bannière desktop -->
      <div
        class="relative z-20 px-5 md:px-7 pt-2 pb-20 md:pb-20 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8"
      >
        <div class="flex flex-col gap-2 md:gap-3 md:max-w-[420px] md:shrink-0">
          <BaseTitle size="TitrePage">{{ t("agendaTitle") }}</BaseTitle>
          <BaseSubtitle size="description" tag="p" color="#FFCEE4">{{
            t("agendaSubtitle")
          }}</BaseSubtitle>
        </div>

        <!-- Bannière desktop uniquement (même principe que article.vue / partenaires.vue) -->
        <div
          class="hidden md:block flex-1 max-w-[908px] h-[145px] rounded-[10px]"
          style="background: #ffede3; opacity: 0.5; border: 2px solid #ffcee4"
        ></div>
      </div>
    </div>

    <!-- ---------------------------------------- -->
    <!-- SECTION : BARRE DE RECHERCHE & FILTRES   -->
    <!-- ---------------------------------------- -->
    <div
      class="relative z-30 -mt-7 md:py-7 md:-mt-8 px-5 md:px-7 flex flex-col md:flex-row gap-3 items-start"
      style="background: #ffffff"
    >
      <!-- ====================================================== -->
      <!-- CARTE DE RECHERCHE                  -->
      <!-- ====================================================== -->
      <div class="flex-1 w-full flex flex-col">
        <!-- Carte de recherche par dates -->
        <AgendaSearchCard
          :date-from="filters.dateFrom"
          :date-to="filters.dateTo"
          :t="t"
          @set-date="onSetDate"
          @search="onSearch"
          class="w-full"
        />

        <!-- Chips des filtres actifs : SOUS la carte -->
        <div v-if="activeChips.length" class="flex flex-wrap gap-2 my-5">
          <BaseButton
            v-for="chip in activeChips"
            :key="chip.group + chip.key"
            variant="chip"
            type="button"
            @click="removeChip(chip)"
          >
            {{ chip.label }}

            <svg
              viewBox="0 0 24 24"
              class="w-3.5 h-3.5"
              fill="none"
              stroke="#E61171"
              stroke-width="3"
              stroke-linecap="round"
            >
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- Bouton "Filtres" -->
      <BaseButton
        
        variant="pink"
        class="!py-3 md:shrink-0  !mt-2 !mb-4 mx-auto"
        @click="filtersOpen = true"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="2.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </svg>

        {{ t("agendaFiltresTitle") }}

        <span
          v-if="activeFilterCount"
          class="rounded-full min-w-[22px] h-[22px] flex items-center justify-center text-[11px] font-bold px-1.5"
          style="background: #e61171; color: #ffffff"
        >
          {{ activeFilterCount }}
        </span>
      </BaseButton>
    </div>
    <!-- ---------------------------------------- -->
    <!-- SECTION : RÉSULTATS + SIDEBAR DESKTOP    -->
    <!-- ---------------------------------------- -->
    <div
      ref="referenceRef"
      class="px-5 md:px-7 mx-auto my-5 md:flex md:gap-8 md:items-start"
      style="background: #fff8f4"
    >
      <!-- ==================== CONTENU PRINCIPAL ==================== -->
      <section class="md:flex-1 md:min-w-0">
        <!-- En-tête des résultats -->
        <div class="flex items-center justify-between mb-2 flex-wrap gap-3">
          <BaseText
            size="caption"
            bold
            color="#e61171"
            class="!font-semibold text-[14px]"
          >
            {{ filteredEvents.length }} {{ t("agendaResultsSuffix") }}
          </BaseText>

          <button
            v-if="activeFilterCount"
            type="button"
            @click="resetFilters"
            class="text-sm font-bold underline underline-offset-2"
            style="color: #e61171"
          >
            {{ t("agendaReset") }}
          </button>
        </div>

        <!-- ==================== TOUS LES CARDS ==================== -->
        <div
          v-if="filteredEvents.length"
          class="cards-grid gap-5 md:gap-6 md:py-8"
        >
          <AgendaEventCard
            v-for="event in filteredEvents"
            :key="event.id"
            :event="event"
            :t="t"
          />
        </div>

        <!-- État vide -->
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

      <!-- ==================== SIDEBAR ==================== -->
      <CoupsDeCoeurSidebar
        class="hidden md:block md:sticky md:top-6 md:shrink-0"
        :reference-height="referenceHeight"
      />
    </div>

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
