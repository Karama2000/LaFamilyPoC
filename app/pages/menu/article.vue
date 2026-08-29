<!--======================================================== -->
<!-- FICHIER : pages/menuFolder/article.vue                        -->
<!-- DESCRIPTION : Articles pré-filtrés depuis le menu "Je cherche" -->
<!-- (?category=... = clé technique de articleCategories). Affiche -->
<!-- aussi une section "Agenda" et "Partenaires" en relation avec   -->
<!-- la catégorie sélectionnée.                                     -->
<!--                                                                -->
<!-- MODIFICATIONS :                                                -->
<!-- 1. Les boutons "Agenda" / "Partenaires" sont maintenant         -->
<!--    TOUJOURS affichés (avant : v-if sur chacun selon qu'il y     -->
<!--    avait des résultats). Un clic scrolle vers la section        -->
<!--    correspondante, même si elle est vide pour l'instant.        -->
<!-- 2. Ajout de la section "AGENDA EN RELATION" (id="agenda-section")-->
<!--    qui manquait — seule la section Partenaires existait.        -->
<!-- ====================================================== -->
<script setup lang="ts">
import { articlesFR, articleCategories } from "~/data/articleData";
import { searchCategories, searchCategoryToArticleKey } from "~/data/menuData";
import { agendaEventsFR } from "~/data/agendaData";
import { partnersFR } from "~/data/partnersData";
import CoupsDeCoeurSidebar from "~/components/CoupsDeCoeurSidebar.vue";
import { useReferenceHeight } from "~/composables/useReferenceHeight";

const { referenceRef, referenceHeight } = useReferenceHeight();

const { currentLang, t, setLang } = useTranslation();
const route = useRoute();

function onLangChange(lang: string) {
  setLang(lang as any, [], []);
}

// Catégorie sélectionnée (clé technique de articleCategories, ex: 'grossesse')
const selectedCategory = computed(() => {
  const category = route.query.category;
  return typeof category === "string" ? category : "";
});

const categoryLabel = computed(() => {
  const c = articleCategories.find((c) => c.key === selectedCategory.value);
  return c ? t(c.labelKey) : "";
});

// Description de la catégorie (texte affiché sous le titre du hero)
const categoryDescription = computed(() => {
  const searchCategory = searchCategories.find(
    (cat) => searchCategoryToArticleKey[cat.key] === selectedCategory.value,
  );
  return searchCategory?.descriptionKey ? t(searchCategory.descriptionKey) : "";
});

const filteredArticles = computed(() => {
  if (!selectedCategory.value) return articlesFR;
  return articlesFR.filter((a) => a.category === selectedCategory.value);
});

// ---------- Agenda en relation ----------
// Correspondance approximative catégorie d'article -> tranche d'âge de l'agenda,
// utilisée pour proposer des événements pertinents sous les articles.
const categoryToAgeKey: Record<string, string> = {
  bebe: "bebe",
  "petite enfance": "petitEnfant",
  enfance: "enfant",
  adolescence: "adolescent",
  scolarite: "enfant",
  parents: "adulte",
  travail: "adulte",
};

const relatedAgeKey = computed(
  () => categoryToAgeKey[selectedCategory.value] ?? "",
);

const relatedEvents = computed(() => {
  if (!relatedAgeKey.value) return [];
  return agendaEventsFR
    .filter((ev) => ev.ageKeys.includes(relatedAgeKey.value))
    .slice(0, 3);
});

// ---------- Partenaires en relation ----------
// Les partenaires liés sont ceux référencés (via partnerId) par les événements
// d'agenda ci-dessus — cohérent avec le lien déjà utilisé dans agendaFolder/[id].vue.
const relatedPartners = computed(() => {
  const ids = [
    ...new Set(
      relatedEvents.value
        .map((ev) => ev.partnerId)
        .filter((id): id is number => !!id),
    ),
  ];
  return partnersFR.filter((p) => ids.includes(p.id)).slice(0, 3);
});

// Scroll doux vers une section de la même page (Agenda / Partenaires),
// utilisé même si la section visée n'a aucun résultat pour l'instant
// (l'utilisateur verra alors le message "aucun résultat" de cette section).
function scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>
<template>
  <div
    class="min-h-screen overflow-x-hidden text-white font-sans"
    style="background: #fff8f4"
  >
    <!-- ===== HERO ===== -->
    <!--
      MOBILE (< md) : inchangé, garde la vague comme avant.
      DESKTOP (md+) : PLUS de vague — juste le bandeau rose normal, avec
      une bannière (box) ajoutée à droite du titre, comme sur la maquette
      Figma ("Card Bannière haut de site" : fond #FFEDE3 à 50% d'opacité,
      bordure 2px #FFCEE4). Radius mis à 10px (règle globale de l'app)
      au lieu des 14px du Figma.
    -->
    <div
      class="relative overflow-hidden min-h-[300px] md:min-h-[340px] flex flex-col text-white"
      style="background: #e61171"
    >
      <!-- Vague de séparation : MOBILE UNIQUEMENT désormais -->
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
      <!-- (Vague desktop supprimée : le bandeau desktop se termine par un bord droit, pas de vague) -->

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
        class="relative z-20 px-5 md:px-7 pt-2 pb-20 md:pb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8"
      >
        <!-- Colonne gauche : titre + description (identique mobile/desktop) -->
        <div class="flex flex-col gap-3 md:max-w-[420px] md:shrink-0">
          <BaseTitle size="TitrePage">
            {{ categoryLabel }}
          </BaseTitle>

          <div class="flex flex-col items-start gap-2">
            <BaseSubtitle size="description" tag="p" color="#FFCEE4">
              {{ categoryDescription }}
            </BaseSubtitle>
          </div>
        </div>

        <!--
          Bannière : DESKTOP UNIQUEMENT (md+), à droite du titre — reprend
          la "Card Bannière haut de site" du Figma. C'est un emplacement
          générique (bannière pub / mise en avant) ; dis-moi ce que tu veux
          mettre dedans si ce n'est pas juste un fond vide (image, lien,
          logo partenaire...).
        -->
        <div
          class="hidden md:block flex-1 max-w-[908px] h-[145px] rounded-[10px]"
          style="background: #ffede3; opacity: 0.5; border: 2px solid #ffcee4"
        ></div>
      </div>
    </div>

    <!-- ===== Boutons Agenda / Partenaires : TOUJOURS affichés, cliquer scrolle vers la section ===== -->
    <section class="px-5 md:px-7 mx-auto mt-7 relative z-10">
      <div class="flex flex-wrap justify-center gap-2 md:justify-start"></div>
    </section>

    <!-- ===== CONTENU PRINCIPAL : colonne gauche + sidebar desktop ===== -->
    <div
      class="px-5 md:px-7 mx-auto -mt-8 md:mt-7 relative z-10 md:flex md:gap-8 md:items-start"
    >
      <!-- ---------- COLONNE GAUCHE ---------- -->
      <div
        ref="referenceRef"
        class="flex flex-col gap-6 md:gap-8 md:flex-1 md:min-w-0"
      >
        <!-- Boutons Agenda / Partenaires -->
        <div class="flex flex-wrap justify-center md:justify-start gap-3">
          <BaseButton
            type="button"
            variant="outlineAction"
            class="md:!rounded-[10px] !text-[16px]"
            @click="scrollToSection('agenda-section')"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-5 h-5 shrink-0"
              fill="none"
              stroke="#E61171"
              stroke-width="2.1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {{ t("filterAgenda") }}
          </BaseButton>

          <BaseButton
            variant="outlineAction"
            type="button"
            class="md:!rounded-[10px] !text-[16px]"
            @click="scrollToSection('partenaires-section')"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E61171"
              stroke-width="2.1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {{ t("partnerBtn") }}
          </BaseButton>
        </div>

        <!-- Bannière rubrique jaune (desktop uniquement) -->
        <div
          class="hidden md:block rounded-[14px] h-[145px]"
          style="background: #fff5cd; border: 1px solid #ff863d"
        ></div>

        <!-- Articles : -->
        <section>
          <div v-if="filteredArticles.length" class="cards-grid">
            <ArticleCard
              v-for="a in filteredArticles"
              :key="a.id"
              :article="a"
              :t="t"
            />
          </div>
          <div v-else class="text-center py-20" style="color: #2e2f30">
            {{ t("agendaEmptyText") }}
          </div>
        </section>

        <!-- agenda et partenaire  -->
        <!-- ===== AGENDA EN RELATION ===== -->
        <section
          id="agenda-section"
          class="flex flex-col gap-4"
          style="scroll-margin-top: 90px"
        >
          <div class="flex items-center gap-3">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E61171"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <BaseTitle
              size="section"
              class="!text-[19px]"
              tag="h2"
              color="#e61171"
            >
              {{ t("filterAgenda") }}
            </BaseTitle>
          </div>

          <div v-if="relatedEvents.length" class="cards-grid">
            <AgendaEventCard
              v-for="e in relatedEvents"
              :key="e.id"
              :event="e"
              :t="t"
            />
          </div>
          <div v-else class="text-center py-10" style="color: #2e2f30">
            {{ t("agendaEmptyText") }}
          </div>
        </section>
        <!-- ===== PARTENAIRES EN RELATION ===== -->
        <section
          id="partenaires-section"
          class="flex flex-col gap-4 my-8"
          style="scroll-margin-top: 90px"
        >
          <div class="flex items-center gap-3">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E61171"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="shrink-0"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <BaseTitle
              size="section"
              class="!text-[19px]"
              tag="h2"
              color="#e61171"
            >
              {{ t("partnerBtn") }}</BaseTitle
            >
          </div>
          <div
            v-if="relatedPartners.length"
            class="cards-grid"
            id="partenaires-section"
          >
            <PartnerCard
              v-for="p in relatedPartners"
              :key="p.id"
              :partner="p"
              :t="t"
            />
          </div>
          <div v-else class="text-center py-10" style="color: #2e2f30">
            {{ t("agendaEmptyText") }}
          </div>
        </section>
      </div>

      <!-- ---------- SIDEBAR "COUPS DE CŒUR" desktop : ton composant, tel quel ---------- -->
      <CoupsDeCoeurSidebar
        class="md:sticky md:top-6 md:pt-8"
        :reference-height="referenceHeight"
      />
    </div>

    <!-- ===== pied de page ===== -->
    <NewsletterSection :t="t" class="mt-10" />
    <SiteFooter :t="t" />
  </div>
</template>
