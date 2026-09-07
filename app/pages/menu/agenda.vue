<!-- ============================================================ -->
<!-- FICHIER : pages/menu/agenda.vue                              -->
<!-- DESCRIPTION : Vue Agenda pré-filtrée depuis le menu          -->
<!-- (Activités / Vacances enfants / Cours). Reçoit ?categorie=...  -->
<!-- et ?sousCategorie=... (voir menuLinkTarget dans menuData.ts)  -->
<!--                                                                -->

<!-- ============================================================ -->
<script setup lang="ts">
import { agendaEventsFR } from "~/data/agendaData";
import type { AgendaEvent } from "~/data/agendaData";
import { activitesItems, vacancesItems, coursItems } from "~/data/menuData";
import CoupsDeCoeurSidebar from "~/components/CoupsDeCoeurSidebar.vue";
import { useReferenceHeight } from "~/composables/useReferenceHeight";

const { referenceRef, referenceHeight } = useReferenceHeight();

const { currentLang, t, setLang } = useTranslation();
const route = useRoute();

function onLangChange(lang: string) {
  setLang(lang as any);
}

// Utilise exactement la même source de données que l’agenda principal.
const { data: apiAgendaEvents } = useFetch<AgendaEvent[]>("/api/agenda", {
  default: () => agendaEventsFR,
});
const agendaEvents = computed(() =>
  apiAgendaEvents.value?.length ? apiAgendaEvents.value : agendaEventsFR,
);

const categorieParam = computed(() =>
  typeof route.query.categorie === "string" ? route.query.categorie : "",
);
const sousCategorieParam = computed(() =>
  typeof route.query.sousCategorie === "string"
    ? route.query.sousCategorie
    : "",
);

const pageTitle = computed(() => {
  if (categorieParam.value === "activite") {
    const key = activitesItems.find(
      (i) => i.key === sousCategorieParam.value,
    )?.key;
    return key ? t(key) : t("navActivites");
  }
  if (
    categorieParam.value === "campLogement" ||
    categorieParam.value === "campJour"
  ) {
    const itemKey =
      categorieParam.value === "campLogement" ? "vacCamps" : "vacCampsDuJour";
    return t(itemKey);
  }
  if (categorieParam.value === "cours") {
    const key = coursItems.find(
      (i) => i.key === sousCategorieParam.value,
    )?.key;
    return key ? t(key) : t("navCours");
  }
  return t("agendaTitle");
});

const pageDescription = computed(() => {
  if (categorieParam.value === "activite") {
    const key = activitesItems.find(
      (i) => i.key === sousCategorieParam.value,
    )?.descriptionKey;
    return key ? t(key) : "";
  }
  if (
    categorieParam.value === "campLogement" ||
    categorieParam.value === "campJour"
  ) {
    const itemKey =
      categorieParam.value === "campLogement" ? "vacCamps" : "vacCampsDuJour";
    const key = vacancesItems.find((i) => i.key === itemKey)?.descriptionKey;
    return key ? t(key) : "";
  }
  if (categorieParam.value === "cours") {
    const key = coursItems.find(
      (i) => i.key === sousCategorieParam.value,
    )?.descriptionKey;
    return key ? t(key) : "";
  }
  return "";
});

const filters = reactive({ dateFrom: "", dateTo: "" });

function onSetDate(field: "dateFrom" | "dateTo", value: string) {
  filters[field] = value;
}

const resultsSection = ref<HTMLElement | null>(null);

function onSearch() {
  resultsSection.value?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const filteredEvents = computed(() => {
  return agendaEvents.value.filter((ev) => {
    if (categorieParam.value && ev.categorie !== categorieParam.value)
      return false;
    if (
      sousCategorieParam.value &&
      ev.sousCategorie !== sousCategorieParam.value
    )
      return false;
    if (filters.dateFrom && ev.dateEnd < filters.dateFrom) return false;
    if (filters.dateTo && ev.dateStart > filters.dateTo) return false;
    return true;
  });
});
</script>

<template>
  <div
    class="min-h-screen overflow-x-hidden text-white font-sans"
    style="background: #fff8f4"
  >
    <!-- ===== HERO ===== -->
    <div
      class="relative overflow-hidden min-h-[300px] md:min-h-[340px] flex flex-col text-white"
      style="background: #e61171"
    >
      <!-- Vague de séparation : MOBILE UNIQUEMENT -->
      <svg
        class="absolute -bottom-px left-0 w-full h-[120px] z-0 pointer-events-none md:hidden"
        viewBox="0 0 830 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 L0,70 Q207.5,40 415,60 Q622.5,80 830,30 L830,120 Z"
          fill="#FFFFFF"
        />
      </svg>

      <FixedMobileHeader
        :t="t"
        :current-lang="currentLang"
        @set-lang="onLangChange"
        class="md:hidden"
      />
      <div class="hidden md:block">
        <SiteHeader
          :t="t"
          :current-lang="currentLang"
          @set-lang="onLangChange"
        />
      </div>

      <div
        class="relative z-20 px-5 md:px-7 pt-2 pb-20 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8"
      >
        <div class="flex flex-col gap-3 md:max-w-[420px] md:shrink-0">
          <BaseTitle size="TitrePage">
            {{ pageTitle }}
          </BaseTitle>
          <BaseSubtitle size="description" tag="p" color="#FFCEE4">
            {{ pageDescription}}
          </BaseSubtitle>
        </div>

        <div
          class="hidden md:block flex-1 max-w-[908px] h-[145px] rounded-[10px]"
          style="background: #ffede3; opacity: 0.5; border: 2px solid #ffcee4"
        ></div>
      </div>
    </div>

    <!-- ---------------------------------------- -->
    <!-- MOBILE UNIQUEMENT : barre de recherche pleine largeur — INCHANGÉE -->
    <!-- ---------------------------------------- -->
    <div
      class="md:hidden relative z-30 pb-7 md:mt-5 px-5 md:px-7"
      style="background: #ffffff"
    >
      <AgendaSearchCard
        :date-from="filters.dateFrom"
        :date-to="filters.dateTo"
        :t="t"
        @set-date="onSetDate"
        @search="onSearch"
      />
    </div>

    <!-- ---------------------------------------- -->
    <!-- DESKTOP UNIQUEMENT : barre de recherche sur fond BLANC qui chevauche -->
    <!-- le hero, comme pages/agenda.vue. PAS de bouton "Filtres" (cette page -->
    <!-- est déjà pré-filtrée par catégorie depuis le menu, pas de tiroir).   -->
    <!-- ---------------------------------------- -->
    <div
      class="hidden md:flex relative z-30 -mt-8 py-7 px-7 items-start"
      style="background: #ffffff"
    >
      <AgendaSearchCard
        :date-from="filters.dateFrom"
        :date-to="filters.dateTo"
        :t="t"
        class="w-full shadow-[0_4px_15px_rgba(0,0,0,0.18)]"
        @set-date="onSetDate"
        @search="onSearch"
      />
    </div>

    <!-- ---------------------------------------- -->
    <!-- RÉSULTATS + SIDEBAR (desktop) — mobile : résultats seuls, sidebar cachée -->
    <!-- ---------------------------------------- -->
    <div
      ref="resultsSection"
      class="px-5 md:px-7 mx-auto mt-4 pb-5 md:my-5 relative z-10 md:flex md:gap-8 md:items-start"
    >
      <div ref="referenceRef" class="flex flex-col gap-6 md:gap-7 md:flex-1 md:min-w-0 mt-2">
        <section
          id="agenda-section"
          class="flex flex-col"
          style="scroll-margin-top: 90px"
        >
          <!-- Compteur de résultats, comme pages/agenda.vue -->
         <BaseText
            size="caption"
            bold
            color="#e61171"
            class="font-semibold text-[14px]"
          >
            {{ filteredEvents.length }} {{ t("agendaResultsSuffix") }}
         </BaseText>

          <div
            v-if="filteredEvents.length"
            class="cards-grid gap-5 md:gap-6 mt-7"
          >
            <AgendaEventCard
              v-for="ev in filteredEvents"
              :key="ev.id"
              :event="ev"
              :t="t"
            />
          </div>
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
            <h3 class="font-bold text-lg mb-2" style="color: #e61171">
              {{ t("agendaEmptyTitle") }}
            </h3>
            <p class="text-sm max-w-[320px]" style="color: #2e2f30">
              {{ t("agendaEmptyText") }}
            </p>
          </div>
        </section>
      </div>

      <CoupsDeCoeurSidebar class="hidden md:block md:sticky md:top-6 md:pt-2" :reference-height="referenceHeight" />
    </div>

    <NewsletterSection :t="t" />
    <SiteFooter :t="t" />
  </div>
</template>
