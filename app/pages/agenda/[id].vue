<!-- ============================================================ -->
<!-- FICHIER : pages/agenda/[id].vue                                  -->
<!-- DESCRIPTION : Page de détail d'un événement de l'agenda.     -->
<!-- Route dynamique Nuxt : /agenda/:id (id = AgendaEvent.id)     -->
<!-- ============================================================ -->

<script setup lang="ts">
// ----------------------------------------------------------------
// 1. IMPORTS
// ----------------------------------------------------------------
import { agendaEventsFR } from "~/data/agendaData";
import type { AgendaEvent } from "~/data/agendaData";
import { useReferenceHeight } from "~/composables/useReferenceHeight";

const { referenceRef, referenceHeight } = useReferenceHeight();

// ----------------------------------------------------------------
// 2. COMPOSABLES & ROUTING
// ----------------------------------------------------------------
const { currentLang, t, setLang } = useTranslation();
const route = useRoute();
const router = useRouter();

const { data: apiAgendaEvents } = await useFetch<AgendaEvent[]>("/api/agenda", {
  default: () => agendaEventsFR,
});

/**
 * Change la langue courante de l'application
 */
function onLangChange(lang: string) {
  setLang(lang as any, [], []);
}

// ----------------------------------------------------------------
// 3. RÉCUPÉRATION DE L'ÉVÉNEMENT
// ----------------------------------------------------------------

/** Événement correspondant à l'id de la route (undefined si introuvable) */
const agendaEvents = computed(() =>
  apiAgendaEvents.value?.length ? apiAgendaEvents.value : agendaEventsFR,
);
const event = computed(() =>
  agendaEvents.value.find((ev) => ev.id === route.params.id),
);

// Si l'id ne correspond à aucun événement connu, on redirige vers l'agenda
// plutôt que d'afficher une page vide.
if (!event.value) {
  await navigateTo("/agenda");
}

// Correspondance catégorie -> clé de traduction du badge (même logique que AgendaEventCard.vue)
const categoryLabel: Record<string, string> = {
  activite: "filterActivites",
  campLogement: "filterCamps",
  campJour: "filterCampsJour",
  cours: "filterCours",
};

/**
 * Libellés des tranches d'âge concernées par l'événement (ex: "Petit enfant", "Enfant"),
 * affichés en badges sous le titre.
 */
const badgeLabel = computed(() =>
  event.value?.categorieDetaillee ||
  event.value?.categorieLabel ||
  t(categoryLabel[event.value?.categorie ?? ""] ?? event.value?.categorie ?? ""),
);

const ageBadges = computed(() => {
  const labels: Record<string, string> = {
    bebe: "ageBebe",
    petitEnfant: "agePetitEnfant",
    enfant: "ageEnfant",
    adolescent: "ageAdolescent",
    adulte: "ageAdulte",
  };
  return (event.value?.ageKeys ?? []).map((key) => t(labels[key] ?? key));
});
</script>

<!-- ============================================================ -->
<!-- TEMPLATE : STRUCTURE DE LA PAGE                              -->
<!-- ============================================================ -->
<template>
  <div
    v-if="event"
    class="min-h-screen overflow-x-hidden text-white font-sans"
    style="background: #ffffff"
  >
    <!-- ---------------------------------------- -->
    <!-- SECTION : EN-TÊTE HERO — vagues + titre  -->
    <!-- MODIFICATION : même structure que agenda.vue (fond rose uni +      -->
    <!-- ---------------------------------------- -->
    <div
      class="relative overflow-hidden min-h-[220px] md:min-h-[260px] flex flex-col text-white"
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
          fill="#FFFFFF"
        />
      </svg>
      <!-- Vagues de séparation (desktop)supprimé -->

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

      <!-- Titre + lieu de l'événement, écrits directement sur le fond rose -->
      <div
        class="relative z-20 px-5 md:px-7 pt-2 pb-20 md:pb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8"
      >
        <div class="flex flex-col gap-2 md:gap-3 md:max-w-[420px] md:shrink-0">
          <BaseTitle size="TitrePage">
            {{ event.titre }}
          </BaseTitle>
          <BaseSubtitle size="description" class="" tag="h2" color="#ffffff">
            {{ event.lieu }}</BaseSubtitle
          >
        </div>

        <div
          class="hidden md:block flex-1 max-w-[908px] h-[145px] rounded-[14px]"
          style="background: #ffede3; opacity: 0.5; border: 2px solid #ffcee4"
        ></div>
      </div>
    </div>

    <!-- ---------------------------------------- -->
    <!-- CONTENU PRINCIPAL                        -->
    <!-- ---------------------------------------- -->
    <section class="px-5 md:px-7 mx-auto md:mt-10 relative z-10 pb-10 bg-white">
      <!--
    GRID PRINCIPALE
    - Mobile (< md)  : 1 colonne (empilé) — INCHANGÉ
    - MD (md → lg)   : 2 colonnes -> [ colonne contenu (image+desc+infos+contact) | sidebar ]
    - LG (>= lg)     : 3 colonnes -> [ image+description | infos pratiques+contact | sidebar ]
  -->
      <div
        class="grid grid-cols-1 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_320px_220px] gap-3 md:gap-8 items-start"
      >
        <!--
      WRAPPER "colonne contenu"
      - Sur mobile/MD : flex-col -> image+description et infos+contact sont empilés
        l'un sous l'autre, formant UNE seule colonne (celle de gauche dans la grille MD).
      - Sur LG : lg:flex-row -> les deux blocs se séparent côte à côte pour occuper
        les 2 premières colonnes de la grille (1fr + 320px), grâce à lg:col-span-2.
    -->
        <div
          ref="referenceRef"
          class="flex flex-col lg:flex-row lg:col-span-2 gap-3 md:gap-8"
        >
          <!-- ===================== BLOC 1 : image + description ===================== -->
          <!-- lg:flex-1 -> occupe l'espace restant (colonne "1fr") à partir de lg -->
          <div class="flex flex-col gap-3 min-w-0 lg:flex-1">
            <!-- Image de l'événement -->
            <div
              class="relative rounded-[10px] overflow-hidden shadow-[0_13px_19px_rgba(0,0,0,0.08)] h-[220px] md:h-[320px]"
            >
              <img
                :src="event.image"
                :alt="event.titre"
                class="w-full h-full object-cover"
              />

              <div
                class="absolute top-3 left-3 md:top-4 md:left-4 flex flex-wrap gap-2 z-10"
              >
                <BaseButton variant="badge">
                  {{ badgeLabel }}
                </BaseButton>
                <BaseButton v-for="age in ageBadges" :key="age" variant="badge">
                  {{ age }}
                </BaseButton>
              </div>
            </div>

            <!-- ===== Carte : Description ===== -->
            <BaseCard
              v-if="event.description"
              variant="detailAgenda"
              class="md:mb-4"
            >
              <BaseTitle size="card" tag="h2" color="#e61171" class="mb-4">
                {{ t("agendaDescription") }}</BaseTitle
              >

              <BaseText
                size="body"
                tag="p"
                color="#000000"
                class="!leading-relaxed text-justify mb-4"
              >
                {{ event.description }}
              </BaseText>

              <p
                v-if="event.infoComplementaire"
                class="text-sm leading-relaxed text-justify font-bold"
                style="color: #2e2f30"
              >
                {{ event.infoComplementaire }}
              </p>
            </BaseCard>
          </div>

          <!-- ===================== BLOC 2 : bouton organisateur + infos pratiques + contact ===================== -->
          <!--
        lg:w-[320px] lg:shrink-0 -> largeur fixe (colonne du milieu) uniquement à partir de lg.
        En dessous de lg, ce bloc prend toute la largeur de la colonne contenu (w-full par défaut).
      -->
          <div
            class="flex flex-col gap-3 min-w-0 lg:w-[320px] lg:shrink-0 md:-mt-10 lg:-mt-5"
          >
            <!-- Lien "Plus d'infos sur le site de l'organisateur" -->
            <BaseButton
              v-if="event.siteUrl"
              variant="external"
              :href="event.siteUrl"
              class="hidden md:flex items-center  md:!px-3 md:!text-[14px]"
            >
              {{ t("agendaSiteOrganisateur") }}
              
            </BaseButton>

            <!-- ===== Carte : Informations pratiques ===== -->
            <BaseCard variant="detailAgenda">
              <BaseTitle size="card" tag="h2" color="#e61171" class="mb-4">
                {{ t("agendaInfosPratiques") }}
              </BaseTitle>

              <div class="flex flex-col gap-5">
                <!-- Date -->
                <div class="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="shrink-0 mt-0.5"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                
                  <!-- ici -->
                  <div>
                    <BaseText
                      size="caption"
                      :bold="true"
                      color="#999999"
                      class="mb-0.5 font-semibold"
                    >
                      {{ t("agendaLabelDate") }}
                    </BaseText>

                    <BaseText size="button" color="#2e2f30">
                      {{ event.date }}
                    </BaseText>
                  </div>
                </div>

                <!-- Lieu -->
                <div class="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="shrink-0 mt-0.5"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <BaseText
                      size="caption"
                      :bold="true"
                      color="#999999"
                      class="mb-0.5 font-semibold"
                    >
                      {{ t("agendaLabelLieu") }}
                    </BaseText>
                    
                    <BaseText size="button" color="#2e2f30">
                      {{ event.lieu }}
                    </BaseText>
                  </div>
                </div>

                <!-- Horaires -->
                <div v-if="event.horaires" class="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 14" />
                  </svg>
                  <div>
                   <BaseText
                      size="caption"
                      :bold="true"
                      color="#999999"
                      class="mb-0.5 font-semibold"
                    >
                      {{ t("agendaLabelHoraires") }}
                   </BaseText>
                   
                    <BaseText size="button" color="#2e2f30">
                      {{ event.horaires }}
                   </BaseText>
                  </div>
                </div>

                <!-- Tarif -->
                <div v-if="event.tarif" class="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 12h6M12 9v6" />
                  </svg>
                  <div>
                    <BaseText
                      size="caption"
                      :bold="true"
                      color="#999999"
                      class="mb-0.5 font-semibold"
                    >
                      {{ t("agendaLabelTarif") }}
                    </BaseText>
                    
                    <BaseText size="button" color="#2e2f30">
                      {{ event.tarif }}
                    </BaseText>
                  </div>
                </div>
              </div>
            </BaseCard>

            <!-- ===== Carte : Contact ===== -->
            <BaseCard
              v-if="event.contactTel || event.contactEmail"
              variant="detailAgenda"
            >
              <BaseTitle size="card" tag="h2" color="#e61171" class="mb-4">
                {{ t("agendaContact") }}
              </BaseTitle>

              <div class="flex flex-col gap-3">
                <a
                  v-if="event.contactTel"
                  :href="`tel:${event.contactTel.replace(/\s/g, '')}`"
                  class="flex items-center gap-2 text-sm font-bold w-fit"
                  style="color: #444444"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67 A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11 L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27 a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7 A2 2 0 0 1 22 16.92z"
                    />
                  </svg>
                  {{ event.contactTel }}
                </a>

                <a
                  v-if="event.contactEmail"
                  :href="`mailto:${event.contactEmail}`"
                  class="flex items-center gap-2 text-sm font-bold w-fit"
                  style="color: #444444"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                  {{ event.contactEmail }}
                </a>
              </div>
            </BaseCard>
          </div>
        </div>

        <!-- ===================== COLONNE SIDEBAR : coups de cœur ===================== -->
        <!-- Toujours en dernière colonne de la grille (md et lg) -->
        <aside class="w-full md:w-[220px] shrink-0">
          <CoupsDeCoeurSidebar
            class="w-full md:sticky md:top-24"
            :reference-height="referenceHeight"
          />
        </aside>
      </div>
      <!-- btn mobile seul -->
      <div>
        <!-- Lien "Plus d'infos sur le site de l'organisateur" (version mobile uniquement) -->
        <BaseButton
          v-if="event.siteUrl"
          variant="external"
          :href="event.siteUrl"
          class="flex w-full md:hidden items-center px-3 !mt-2"
        >
          {{ t("agendaSiteOrganisateur") }}
        
        </BaseButton>
      </div>

      <!-- ===== Occurrences supplémentaires regroupées par le back ===== -->
      <div
        v-if="event.autresDates?.length"
        class="mt-8 flex flex-col items-center gap-4"
      >
        <BaseTitle size="card" tag="h2" color="#e61171" class="mb-4">
          {{ t("agendaAutresDates") }}
        </BaseTitle>
        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="date in event.autresDates"
            :key="date"
            class="rounded-[10px] px-4 py-1.5 text-sm font-bold text-center"
            style="background: #ffcee4; color: #e61171"
          >
            {{ date }}
          </span>
        </div>
      </div>

      <div
        v-if="event.autresAdresses?.length"
        class="mt-8 flex flex-col items-center gap-4"
      >
        <BaseTitle size="card" tag="h2" color="#e61171" class="mb-4">
          {{ t("agendaAutresAdresses") }}
        </BaseTitle>
        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="address in event.autresAdresses"
            :key="address"
            class="rounded-[10px] px-4 py-1.5 text-sm font-bold text-center"
            style="background: #ffcee4; color: #e61171"
          >
            {{ address }}
          </span>
        </div>
      </div>

      <!-- ===== "Retrouvez-nous également à" ===== -->
      <div
        v-if="event.autresLieuxDates?.length"
        class="mt-8 flex flex-col items-center gap-4"
      >
       <BaseTitle size="card" tag="h2" color="#e61171" class="mb-4">
          {{ t("agendaAutresLieuxDates") }}
       </BaseTitle>

        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="item in event.autresLieuxDates"
            :key="item.lieu + item.date"
            class="rounded-[10px] px-4 py-1.5 text-sm font-bold text-center"
            style="background: #ffcee4; color: #e61171"
          >
            {{ item.lieu }} {{ t("agendaLe") }} {{ item.date }}
          </span>
        </div>
      </div>
    </section>

    <!-- ---------------------------------------- -->
    <!-- SECTION : PIED DE PAGE (identique à agenda.vue) -->
    <!-- ---------------------------------------- -->
    <NewsletterSection :t="t" />
    <SiteFooter :t="t" />
  </div>
</template>
