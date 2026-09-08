<!--================================================== -->
<!-- FICHIER:pages/index.vue -->
<!-- DESCRIPTION : Page d'accueil (accueil) -->
<!-- ============================================ -->

<script setup lang="ts">
//--------------------------------------------------------
// 1. IMPORTS
// -------------------------------------------------------
import type { AgendaEvent } from "~/data/agendaData";

// pages/index.vue — <script setup>
import type { ContentItem } from "~/data/mockContent";
import { nouveautesFR } from "~/data/mockContent";

interface Article {
  id: string;
  titre: string;
  excerpt: string;
  image: string;
}

// ----------------------------------------------------------------
// 2. COMPOSABLES & ÉTAT
// ----------------------------------------------------------------
const { currentLang,  t, setLang,  } =
  useTranslation();

const { data: apiArticles } = await useFetch<Article[]>("/api/articles", {
  query: computed(() => ({ lang: currentLang.value })),
    watch: [currentLang],
  key: computed(() => `home-articles-${currentLang.value}`),
});

// Transforme les vrais articles au format attendu par BlogSection,
// avec repli sur le mock si l'API ne renvoie rien.
const nouveautes = computed<ContentItem[]>(() => {
  if (!apiArticles.value?.length) return nouveautesFR;
  return apiArticles.value.map((a) => ({
    titre: a.titre,
    description: a.excerpt,
    image: a.image,
  }));
});



// ----------------------------------------------------------------
// 3. SÉLECTION (carrousel "Notre sélection") — DONNÉES BACK
// ----------------------------------------------------------------
// Même route que la page Agenda : /api/agenda interroge le webhook n8n
// (Google Sheet), normalise les lignes et renvoie tous les événements.
const { data: apiAgendaEvents, refresh: refreshAgenda } = await useFetch<AgendaEvent[]>("/api/agenda", {
  query: computed(() => ({ lang: currentLang.value })),
  // Le changement est piloté explicitement dans onLangChange afin d'éviter
  // que useFetch réutilise la réponse FR pour une nouvelle langue.
  watch: false,
  key: computed(() => `home-agenda-${currentLang.value}`),
  default: () => [],
});

/** Nombre maximum d’items affichés dans le carrousel "Sélection de la semaine" */
const MAX_SELECTIONS = 6;

/**
 * Sélection de la semaine : seuls les événements réels renvoyés par l’API
 * Agenda dont la colonne « À la une » vaut « Oui » sont affichés.
 *
 * Le back convertit cette valeur en `misEnAvant: true`. Aucun repli vers les
 * données mock n’est appliqué afin que le carrousel reste strictement aligné
 * sur le contenu publié dans le Sheet.
 */
const selections = computed<AgendaEvent[]>(() =>
  (apiAgendaEvents.value ?? [])
    .filter((event) => event.misEnAvant === true)
    .slice(0, MAX_SELECTIONS),
);

// ----------------------------------------------------------------
// 4. FONCTIONS
// ----------------------------------------------------------------

/**
 * Change la langue et met à jour le cache avec les données FR
 * @param lang - Code de la langue cible
 */
async function onLangChange(lang: string) {
  setLang(lang as any);
  await nextTick();
  await refreshAgenda({ dedupe: "cancel" });
}




</script>

<!-- ============================================================ -->
<!-- TEMPLATE : PAGE D'ACCUEIL                                    -->
<!-- ============================================================ -->
<template>
  <div class="min-h-screen overflow-x-hidden text-white font-sans">
    <!-- ---------------------------------------- -->
    <!-- SECTION : HERO / BANDEAU PRINCIPAL       -->
    <!-- ---------------------------------------- -->
    <div
      class="relative overflow-hidden min-h-[855px] md:min-h-[920px] flex flex-col"
      style="background: #e61171"
    >
      <!-- Fond uni -->
      <div
        class="absolute inset-x-0 top-0 h-[781px] z-0 pointer-events-none"
        style="background: #e61171"
      ></div>

      <!-- Vague mobile (grande vague) -->
      <svg
        class="absolute -bottom-px left-0 w-full h-[810px] z-0 pointer-events-none md:hidden"
        viewBox="0 0 830 644"
        preserveAspectRatio="none"
      >
        <path
          d="M0,644 L0,490 Q207.5,450 415,470 Q622.5,500 830,420 L830,644 Z"
          fill="white"
        />
      </svg>

      <!-- Vague desktop (plus fine) -->
      <svg
        class="absolute -bottom-px left-0 w-full h-[270px] z-0 pointer-events-none hidden md:block"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <path
          d="M0,300 C150,270 300,260 420,280 C540,300 600,300 660,280 C750,250 780,150 850,90 C920,30 980,0 1080,0 L1440,0 L1440,400 L0,400 Z"
          fill="white"
        />
      </svg>

      <!-- En-tête du site  -->
      <!-- Bandeau "Coups de cœur" mobile -->

      <div
        class="md:hidden fixed top-0 left-0 right-0 z-[100]"
        style="background: #e61171"
      >
        <FixedMobileHeader />
      </div>

      <div class="h-[265px] md:hidden"></div>

      <div class="hidden md:block">
        <SiteHeader
          :t="t"
          :current-lang="currentLang"
          @set-lang="onLangChange"
        />
      </div>

     <!-- Badge "lafamilyshop.ch" (desktop uniquement) -->
<a
  href="https://lafamilyshop.ch/"
  target="_blank"
  rel="noopener noreferrer"
  class="absolute z-20 rounded-[5px] hover:opacity-90 transition-opacity hidden md:block"
  style="
    background: #ffcee4;
    width: 285px;
    height: 88px;
    left: 30px;
    top: 178px;
  "
>
  <img
    src="/images/icones/shop-panier.png"
    alt=""
    class="absolute object-contain"
    style="width: 50px; height: 50px; left: 18px; top: 19px"
  />

  <img
    src="/images/logo_lafamilyshop.png"
    alt="lafamilyshop.ch"
    class="absolute object-contain"
    style="width: 182px; height: 54px; left: 84px; top: 22px"
  />
</a>

      <!-- Section héro (titres, CTA, etc.) -->
      <HeroSection :t="t" />
    </div>

    <!-- ---------------------------------------- -->
    <!-- SECTION : CARROUSEL DES SÉLECTIONS      -->
    <!-- ---------------------------------------- -->
    <SelectionCarousel :t="t" :selections="selections" />

    <!-- ---------------------------------------- -->
    <!-- SECTION : Blog                    -->
    <!-- ---------------------------------------- -->
    <BlogSection :t="t" :nouveautes="nouveautes" />

    <!-- ---------------------------------------- -->
    <!-- SECTION : COUPS DE CŒUR                -->
    <!-- ---------------------------------------- -->
    <CoupsDeCoeurSection :t="t" />

    <!-- ---------------------------------------- -->
    <!-- SECTION : PIED DE PAGE                   -->
    <!-- ---------------------------------------- -->
    <NewsletterSection :t="t" />
    <SiteFooter :t="t" />
  </div>
</template>
