<!-- ============================================================ -->
<!-- FICHIER : pages/partenaireFolder/[id].vue                          -->
<!-- DESCRIPTION : Page de détail d'un partenaire.                -->
<!-- Route dynamique Nuxt : /partenaire/:id (id = Partner.id)     -->
<!--                                                                -->

<!-- ============================================================ -->

<script setup lang="ts">
// ----------------------------------------------------------------
// 1. IMPORTS
// ----------------------------------------------------------------
import { partnersFR, type Partner } from "~/data/partnersData";
import PartnerIcon from "~/components/PartnerIcon.vue";
import { agendaEventsFR } from "~/data/agendaData";
import type { AgendaEvent } from "~/data/agendaData";
import CoupsDeCoeurSidebar from "~/components/CoupsDeCoeurSidebar.vue";
import { useReferenceHeight } from "~/composables/useReferenceHeight";

const { referenceRef, referenceHeight } = useReferenceHeight();

// Les deux listes passent par les routes serveur fusionnées. Les données
// locales restent un repli afin que la page reste utilisable sans n8n.


// ----------------------------------------------------------------
// 2. COMPOSABLES & ROUTING
// ----------------------------------------------------------------
const { currentLang, t, setLang } = useTranslation();
const route = useRoute();

// Même logique que agenda.vue / partenaires.vue : `lang` transmis à la route
// serveur + `key` par langue, sinon la page détail reste bloquée en français
// après un changement de langue.
const { data: apiPartners } = await useFetch<Partner[]>("/api/partners", {
  query: { lang: currentLang },
  key: computed(() => `partners-detail-${currentLang.value}`),
  default: () => (currentLang.value === "fr" ? partnersFR : []),
});
const { data: apiAgendaEvents } = await useFetch<AgendaEvent[]>("/api/agenda", {
  query: { lang: currentLang },
  key: computed(() => `agenda-detail-${currentLang.value}`),
  default: () => (currentLang.value === "fr" ? agendaEventsFR : []),
});
const partners = computed(() =>
  apiPartners.value?.length ? apiPartners.value : partnersFR,
);
const agendaEvents = computed(() =>
  apiAgendaEvents.value?.length ? apiAgendaEvents.value : agendaEventsFR,
);

function onLangChange(lang: string) {
  setLang(lang as any, );
}

// ----------------------------------------------------------------
// 3. RÉCUPÉRATION DU PARTENAIRE
// ----------------------------------------------------------------
const partner = computed(() =>
  partners.value.find((p) => p.id === Number(route.params.id)),
);

// Tous les événements qui appartiennent à CE partenaire.
const partnerEvents = computed(() =>
  agendaEvents.value.filter((ev) => ev.partnerId === partner.value?.id),
);

if (!partner.value) {
  await navigateTo("/partenaires");
}

const categoryLabel = computed(() =>
  partner.value ? t(partner.value.category) : "",
);

const coverageLabels: Record<string, string> = {
  SR: "partnerCoverageSR",
  SA: "partnerCoverageSA",
};
const coverageBadges = computed(() =>
  (partner.value?.coverage ?? []).map((c) => t(coverageLabels[c] ?? c)),
);
</script>

<!-- ============================================================ -->
<!-- TEMPLATE : STRUCTURE DE LA PAGE                              -->
<!-- ============================================================ -->
<template>
  <div
    v-if="partner"
    class="min-h-screen overflow-x-hidden text-white font-sans"
    style="background: #fdf1ea"
  >
    <!-- ---------------------------------------- -->
    <!-- SECTION : EN-TÊTE HERO PARTENAIRE       -->
    <!-- ---------------------------------------- -->
    <div
      class="relative overflow-hidden min-h-[220px] md:min-h-[260px] flex flex-col text-white"
      style="background: #e61171"
    >
      <div
        class="absolute inset-x-0 top-0 h-full z-0 pointer-events-none"
        style="background: #e61171"
      ></div>

      <!-- Vague — MOBILE uniquement -->
      <svg
        class="absolute -bottom-px left-0 w-full h-[100px] z-0 pointer-events-none md:hidden"
        viewBox="0 0 830 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 L0,70 Q207.5,40 415,60 Q622.5,80 830,30 L830,120 Z"
          fill="#FFFFFF"
        />
      </svg>

      <!-- Vague — DESKTOP -->
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

      <!-- Titre + bannière desktop -->
      <div
        class="relative z-20 px-5 md:px-7 pt-2 pb-20 md:pb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8"
      >
        <!--  cette div est seuelment pour le web -->
        <div class="hidden md:flex gap-4 items-center">
          <!-- Logo (gauche) -->
          <div
            class="w-[140px] h-[140px] rounded-[10px] overflow-hidden flex items-center justify-center p-2 shrink-0"
            style="
              background: #ffffff;
              border: 2px solid #ffe4d3;
              box-shadow: 0 10px 20px rgba(230, 17, 113, 0.06);
            "
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="w-full h-full object-contain"
            />
          </div>

          <!-- Bloc texte : nom + catégorie (droite) -->
          <div class="flex flex-col items-start gap-2 pt-2 px-20">
            <!-- NOM -->

            <BaseTitle
              size="page"
              tag="h1"
              color="#FFFFFF"
              class="max-w-[420px] !text-[30px] !leading-tight"
            >
              {{ partner.name }}
            </BaseTitle>

            <!-- Categ -->
            <BaseButton variant="beigeBadge" class="w-fit">
              {{ categoryLabel }}
            </BaseButton>
          </div>
        </div>

        <!-- Bannière rose translucide desktop, comme les autres pages -->
        <div
          class="hidden md:block flex-1 max-w-[908px] h-[145px] rounded-[14px]"
          style="background: #ffede3; opacity: 0.5; border: 2px solid #ffcee4"
        ></div>
      </div>
    </div>

    <!-- ===== SECTION 1 : Bloc blanc — photo + CTA + catégorie ===== mobile seul -->
    <section
      class="px-5 md:px-12 mx-auto -mt-10 md:hidden relative z-10 bg-white"
    >
      <div class="rounded-[10px] p-5 md:p-6 flex flex-col gap-5 md:gap-6">
        <div
          class="w-[270px] h-[270px] md:w-[220px] md:h-[220px] rounded-[10px] overflow-hidden flex items-center justify-center p-2 mx-auto"
          style="
            background: #ffffff;
            border: 2px solid #ffe4d3;
            box-shadow: 0 10px 20px rgba(230, 17, 113, 0.06);
          "
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="w-full h-full object-contain"
          />
        </div>

        <!-- nom mobile(seulement) -->
        <BaseTitle
          size="page"
          tag="h1"
          color="#E61171"
          class="md:hidden self-center !text-[24px] !leading-tight"
        >
          {{ partner.name }}
        </BaseTitle>

        <BaseButton
          v-if="partner.link"
          variant="external"
          class="w-fit mx-auto !mt-0"
          :href="partner.link"
        >
          {{ t("VisiterLeSite") }}

          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </BaseButton>

        <BaseButton variant="beigeBadge" class="w-fit mx-auto">
          {{ categoryLabel }}
        </BaseButton>
      </div>
    </section>

    <!-- ===== SECTION 2 : À propos + Descriptions + Coordonnées + sidebar (desktop) ===== -->
    <div
      class="px-5 md:px-7 mx-auto py-5 md:flex md:gap-8 md:items-start"
      style="background-color: #ffffff"
    >
      <div
        ref="referenceRef"
        class="flex flex-col gap-5 md:gap-5 md:!pt-12 md:flex-1 md:min-w-0"
      >
        <!-- =====  Coordonnées + RS : grille 2 colonnes qui remplit tout l'espace ===== -->
        <div class="flex flex-col gap-4 lg:grid lg:grid-cols-1 lg:gap-0 w-full">
          <!-- ===== Carte : Coordonnées desktop (coordonnees + RS mobile)  ===== -->
          <BaseCard
            v-if="
              partner.contact.address ||
              partner.contact.phone ||
              partner.contact.mobile ||
              partner.contact.email ||
              partner.contact.website
            "
            variant="partnerBox"
          >
            <BaseTitle
              size="card"
              tag="h2"
              color="#E61171"
              class="flex items-center gap-2 !text-[18px] !mb-6"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E61171"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              {{ t("partnerCoordonnees") }}
            </BaseTitle>

            <div class="flex flex-col gap-4 md:grid lg:grid-cols-2">
              <!-- Adresse -->
              <div
                v-if="partner.contact.address"
                class="flex items-center gap-4"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style="background: #fff0e5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <BaseText
                    size="caption"
                    bold
                    tag="p"
                    color="#888888"
                    class="!tracking-[0.55px] !font-semibold"
                  >
                    {{ t("partnerLabelAdresse") }}
                  </BaseText>
                  <BaseText
                    size="caption"
                    bold
                    tag="p"
                    class="!tracking-[0.55px] !font-semibold"
                    style="color: #2e2f30"
                  >
                    {{ partner.contact.address }}
                  </BaseText>
                </div>
              </div>

              <!-- Téléphone fixe -->
              <a
                v-if="partner.contact.phone"
                :href="`tel:${partner.contact.phone.replace(/\s/g, '')}`"
                class="flex items-center gap-4"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style="background: #fff0e5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                    />
                  </svg>
                </div>
                <div>
                  <BaseText
                    size="caption"
                    bold
                    tag="p"
                    color="#888888"
                    class="!tracking-[0.55px] !font-semibold"
                  >
                    {{ t("partnerLabelTelephone") }}
                  </BaseText>
                  <BaseText
                    size="caption"
                    bold
                    tag="p"
                    class="!tracking-[0.55px] !font-semibold"
                    style="color: #e61171"
                  >
                    {{ partner.contact.phone }}
                  </BaseText>
                </div>
              </a>

              <!-- Mobile -->
              <a
                v-if="partner.contact.mobile"
                :href="`tel:${partner.contact.mobile.replace(/\s/g, '')}`"
                class="flex items-center gap-4"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style="background: #fff0e5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="7" y="2" width="10" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <div>
                  <BaseText
                    size="caption"
                    bold
                    tag="p"
                    color="#888888"
                    class="!tracking-[0.55px] !font-semibold"
                  >
                    {{ t("partnerLabelMobile") }}
                  </BaseText>
                  <BaseText
                    size="caption"
                    bold
                    tag="p"
                    class="!tracking-[0.55px] !font-semibold"
                    style="color: #e61171"
                  >
                    {{ partner.contact.mobile }}
                  </BaseText>
                </div>
              </a>

              <!-- Email -->
              <a
                v-if="partner.contact.email"
                :href="`mailto:${partner.contact.email}`"
                class="flex items-center gap-4"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style="background: #fff0e5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <BaseText
                    size="caption"
                    bold
                    tag="p"
                    color="#888888"
                    class="!tracking-[0.55px] !font-semibold"
                  >
                    {{ t("partnerLabelEmail") }}
                  </BaseText>
                  <BaseText
                    size="caption"
                    bold
                    tag="p"
                    class="!tracking-[0.55px] !font-semibold"
                    style="color: #e61171"
                  >
                    {{ partner.contact.email }}
                  </BaseText>
                </div>
              </a>

              <!-- Site internet -->
              <a
                v-if="partner.contact.website"
                :href="partner.contact.website"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style="background: #fff0e5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path
                      d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"
                    />
                  </svg>
                </div>
                <div>
                  <BaseText
                    size="caption"
                    bold
                    tag="p"
                    color="#888888"
                    class="!tracking-[0.55px] !font-semibold"
                  >
                    {{ t("partnerLabelSite") }}
                  </BaseText>
                  <BaseText
                    size="caption"
                    bold
                    tag="p"
                    class="!tracking-[0.55px] !font-semibold"
                    style="color: #e61171"
                  >
                    {{ partner.link }}
                  </BaseText>
                </div>
              </a>

              <!-- Réseaux sociaux -->
              <div
                v-if="
                  partner.socialNetworks &&
                  Object.values(partner.socialNetworks).some(Boolean)
                "
                class="pt-6 flex flex-col gap-4 md:hidden"
              >
                <BaseText
                  size="caption"
                  bold
                  tag="p"
                  color="#888888"
                  class="!tracking-[0.55px] !font-semibold"
                >
                  {{ t("partnerReseauxSociaux") }}
                </BaseText>

                <div class="flex flex-wrap items-center gap-3">
                  <!-- facebook  -->
                  <a
                    v-if="partner.socialNetworks.facebook"
                    :href="partner.socialNetworks.facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    class="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                    style="background: #fff0e5"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#E61171"
                    >
                      <path
                        d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.66.34-1 1-1Z"
                      />
                    </svg>
                  </a>
                  <!-- insta -->
                  <a
                    v-if="partner.socialNetworks.instagram"
                    :href="partner.socialNetworks.instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    class="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                    style="background: #fff0e5"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E61171"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="#E61171"
                        stroke="none"
                      />
                    </svg>
                  </a>
                  <!-- youtube -->
                  <a
                    v-if="partner.socialNetworks.youtube"
                    :href="partner.socialNetworks.youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    class="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                    style="background: #fff0e5"
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="#E61171"
                    >
                      <path
                        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z"
                      />
                    </svg>
                  </a>
                  <!-- linkedin -->
                  <a
                    v-if="partner.socialNetworks.linkedin"
                    :href="partner.socialNetworks.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    class="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                    style="background: #fff0e5"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#E61171"
                    >
                      <path
                        d="M5 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.1c.5-1 1.7-2.1 3.8-2.1 4 0 4.7 2.6 4.7 6v6.4h-4v-5.7c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9V9Z"
                      />
                    </svg>
                  </a>
                  <!-- tiktok -->
                  <a
                    v-if="partner.socialNetworks.tiktok"
                    :href="partner.socialNetworks.tiktok"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    class="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                    style="background: #fff0e5"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#E61171"
                    >
                      <path
                        d="M16.5 3c.4 2.2 1.7 3.7 4 4v3.2c-1.5-.1-2.8-.5-4-1.3v6.2c0 4.1-2.8 6.9-6.6 6.9-3.5 0-6.4-2.7-6.4-6.2 0-3.7 3-6.3 6.8-6.3.4 0 .8 0 1.2.1v3.3c-.4-.1-.8-.2-1.2-.2-1.8 0-3.3 1.2-3.3 3s1.3 3 3 3c1.9 0 3.2-1.3 3.2-3.5V3h3.3Z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- ===== Réseaux sociaux + bouton site ===== -->
          <div
            class="hidden md:flex w-full min-w-0 items-start justify-between gap-6 pt-6"
          >
            <!-- Réseaux sociaux -->
            <div
              v-if="
                partner.socialNetworks &&
                Object.values(partner.socialNetworks).some(Boolean)
              "
              class="flex flex-col gap-3"
            >
              <BaseText
                size="caption"
                bold
                tag="p"
                color="#888888"
                class="!tracking-[0.55px] !font-semibold"
              >
                {{ t("partnerReseauxSociaux") }}
              </BaseText>

              <div class="flex flex-wrap items-center gap-3">
                <!-- Facebook -->
                <a
                  v-if="partner.socialNetworks.facebook"
                  :href="partner.socialNetworks.facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  class="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                  style="background: #fff0e5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#E61171"
                  >
                    <path
                      d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.66.34-1 1-1Z"
                    />
                  </svg>
                </a>

                <!-- Instagram -->
                <a
                  v-if="partner.socialNetworks.instagram"
                  :href="partner.socialNetworks.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  class="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                  style="background: #fff0e5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="#E61171"
                      stroke="none"
                    />
                  </svg>
                </a>

                <!-- YouTube -->
                <a
                  v-if="partner.socialNetworks.youtube"
                  :href="partner.socialNetworks.youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  class="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                  style="background: #fff0e5"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="#E61171"
                  >
                    <path
                      d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z"
                    />
                  </svg>
                </a>

                <!-- LinkedIn -->
                <a
                  v-if="partner.socialNetworks.linkedin"
                  :href="partner.socialNetworks.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  class="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                  style="background: #fff0e5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#E61171"
                  >
                    <path
                      d="M5 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.1c.5-1 1.7-2.1 3.8-2.1 4 0 4.7 2.6 4.7 6v6.4h-4v-5.7c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9V9Z"
                    />
                  </svg>
                </a>

                <!-- TikTok -->
                <a
                  v-if="partner.socialNetworks.tiktok"
                  :href="partner.socialNetworks.tiktok"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  class="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                  style="background: #fff0e5"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#E61171"
                  >
                    <path
                      d="M16.5 3c.4 2.2 1.7 3.7 4 4v3.2c-1.5-.1-2.8-.5-4-1.3v6.2c0 4.1-2.8 6.9-6.6 6.9-3.5 0-6.4-2.7-6.4-6.2 0-3.7 3-6.3 6.8-6.3.4 0 .8 0 1.2.1v3.3c-.4-.1-.8-.2-1.2-.2-1.8 0-3.3 1.2-3.3 3s1.3 3 3 3c1.9 0 3.2-1.3 3.2-3.5V3h3.3Z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <!-- =====  bouton "Visiter le site" ===== -->
            <div v-if="partner.link" class="pt-5">
              <BaseButton
                variant="external"
                class="!mt-0 md:ml-auto md:flex md:w-fit shrink-0"
                :href="partner.link"
              >
                {{ t("VisiterLeSite") }}

                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </BaseButton>
            </div>
          </div>
        </div>

        <!-- a propos / description -->
        <div v-if="partner.description">
          <div
            v-for="(section, index) in partner.description"
            :key="index"
            class="mb-6 last:mb-0"
          >
            <BaseTitle
              size="card"
              tag="h2"
              color="#e61171"
              class="cap-first !text-[13px] md:!text-[18px] !tracking-[0.7px] !mb-4"
            >
              {{ section.title }}
            </BaseTitle>

            <BaseText
              size="body"
              bold
              tag="p"
              class="!tracking-[0.7px]"
              style="color: #2e2f30"
            >
              {{ section.text }}
            </BaseText>
          </div>
        </div>
      </div>

      <!-- Sidebar desktop -->
      <CoupsDeCoeurSidebar
        class="hidden md:block md:sticky md:top-6 md:pt-0 md:shrink-0"
        :reference-height="referenceHeight"
      />
    </div>

    <!-- ===== SECTION 3 :   ===== -->
    <section
      class="px-5 md:px-7 mx-auto pb-6 flex flex-col gap-5 md:gap-6 py-5"
      style="background-color: #fff8f4"
    >
      <!-- ===== Galerie photos : 3 grandes photos par ligne en desktop ===== -->
      <div v-if="partner.photos?.length" class="flex flex-col gap-5">
        <BaseTitle
          size="card"
          tag="h2"
          color="#e61171"
          class="cap-first !text-xl"
        >
          {{ t("partnerGalerie") }}
        </BaseTitle>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="(img, i) in partner.photos"
            :key="i"
            class="rounded-[16px] overflow-hidden h-[270px] md:h-[300px]"
            style="background: #ffffff; border: 1px solid #ffe4d3"
          >
            <img :src="img" alt="" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- ===== Camps / événements du partenaire ===== -->
      <div v-if="partnerEvents.length" class="flex flex-col gap-5">
        <BaseTitle
          size="card"
          tag="h2"
          color="#e61171"
          class="cap-first !text-xl"
        >
          {{ t("partnerEvenements") }} {{ partner.name }}
        </BaseTitle>
        <div class="cards-grid">
          <AgendaEventCard
            v-for="evt in partnerEvents"
            :key="evt.id"
            :event="evt"
            :t="t"
          />
        </div>
      </div>
    </section>

    <!-- ---------------------------------------- -->
    <!-- SECTION : PIED DE PAGE -->
    <!-- ---------------------------------------- -->
    <NewsletterSection :t="t" />
    <SiteFooter :t="t" />
  </div>
</template>