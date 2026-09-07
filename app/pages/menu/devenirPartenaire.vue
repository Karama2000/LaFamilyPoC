<!-- ============================================================ -->
<!-- FICHIER : pages/devenir-partenaire.vue                       -->
<!-- DESCRIPTION : Page "Devenir partenaire" — présentation de     -->
<!-- LaFamily.ch, équipe fondatrice, tarifs de référencement,      -->
<!-- coups de projecteur, publication d'article, offre Expert,     -->
<!-- contact. Structure calquée sur les autres pages (hero + vagues -->
<!-- + FixedMobileHeader/SiteHeader + NewsletterSection + Footer). -->
<!--                                                      ============================================================ -->
<script setup lang="ts">
import { foundersFR } from "~/data/foundersData";
import {
  partnershipTiers,
  spotlightOffers,
  partnersStats,
  publishArticleOffer,
  becomeExpertOffer,
} from "~/data/partnershipData";
import TarifCard from "~/components/TarifCard.vue";
import { useReferenceHeight } from "~/composables/useReferenceHeight";

const { referenceRef, referenceHeight } = useReferenceHeight();

const { currentLang, t, setLang } = useTranslation();

function onLangChange(lang: string) {
  setLang(lang as any);
}

// Icônes SVG associées aux statistiques (voir StatItem.icon dans partnershipData.ts)
const statIconPaths: Record<string, string> = {
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  mail: "", // traité séparément (icône composite, voir template)
  calendar: "",
  article: "",
};
</script>

<template>
  <div
    class="min-h-screen overflow-x-hidden text-white font-sans"
    style="background: #ffffff"
  >
    <!-- ===== HERO ===== -->
    <div
      class="relative overflow-hidden min-h-[300px] md:min-h-[340px] flex flex-col"
      style="background: #e61171"
    >
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
        class="relative z-20 px-5 md:px-7 py-5 pb-20 md:pb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8"
      >
        <div
          class="flex flex-col items-start gap-2 md:max-w-[420px] md:shrink-0"
        >
          <!-- Titre principal de page (hero) : size="page" -> h1, mobile 28px / desktop 36px -->
          <BaseTitle size="page" tag="h1" class="text-left">
            {{ t("navPartenaire") }}
          </BaseTitle>

          <!-- Sous-titre descriptif sous le h1 : size="description" -->
          <BaseSubtitle
            size="description"
            tag="p"
            color="#ffffff"
            class="max-w-[480px] text-left"
          >
            {{ t("devenirPartnerSubtitle") }}
          </BaseSubtitle>
        </div>

        <!-- Bannière rose translucide desktop, comme article.vue / partenaires.vue -->
        <div
          class="hidden md:block flex-1 max-w-[908px] h-[145px] rounded-[14px]"
          style="background: #ffede3; opacity: 0.5; border: 2px solid #ffcee4"
        ></div>
      </div>
    </div>

    <!-- ===== À PROPOS DE LAFAMILY + SIDEBAR ===== -->
    <section
      class="px-5 md:px-7 mx-auto -mt-10 md:mt-0 md:pt-10 pt-5 relative z-10 md:flex md:gap-8 md:items-start"
    >
      <!-- ========================================================== -->
      <!-- COLONNE GAUCHE                                             -->
      <!-- ========================================================== -->
      <div
        ref="referenceRef"
        class="flex flex-col gap-6 md:gap-8 md:flex-1 md:min-w-0"
      >
        <!-- ===== À PROPOS + STATISTIQUES ===== -->
        <div
          class="p-5 md:p-7 w-full mx-auto flex flex-col gap-4 rounded-[10px]"
          style="border: #ffd1b5 1px solid"
        >
          <!-- À PROPOS -->
          <div class="flex flex-col items-left text-center gap-2">
            <!-- Titre de bloc : size="section" -> h2, mobile 20px / desktop 24px -->
            <BaseTitle
              size="section"
              tag="h2"
              color="#e61171"
              class="text-left"
            >
              {{ t("devPartnerAProposTitle") }}
            </BaseTitle>

            <!-- Accroche en gras sous le titre de bloc : BaseText bold -->
            <BaseText
              size="body"
              
              color="#e61171"
              class="text-left font-semibold"
            >
              {{ t("devPartnerAProposSubtitle") }}
            </BaseText>

            <BaseText size="body" color="#000000" class="text-justify mt-2">
              {{ t("devPartnerAProposText") }}
            </BaseText>
          </div>

          <!-- GRILLE DES 4 STATISTIQUES -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:px-15">
            <BaseCard
              v-for="stat in partnersStats"
              :key="stat.key"
              variant="stats"
            >
              <div class="flex flex-col items-center text-center">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style="background: #ffd1b5"
                >
                  <!-- Œil -->
                  <svg
                    v-if="stat.icon === 'eye'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>

                  <!-- Enveloppe -->
                  <svg
                    v-else-if="stat.icon === 'mail'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>

                  <!-- Calendrier -->
                  <svg
                    v-else-if="stat.icon === 'calendar'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>

                  <!-- Article -->
                  <svg
                    v-else
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="4" y="3" width="16" height="18" rx="2" />
                    <line x1="8" y1="8" x2="16" y2="8" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                    <line x1="8" y1="16" x2="12" y2="16" />
                  </svg>
                </div>

                <!-- Chiffre de la statistique (accent visuel fort -> BaseText body bold) -->
                <BaseText
                  size="body"
                  bold
                  color="#e61171"
                  class="font-semibold"
                >
                  {{ stat.value }}
                </BaseText>

                <!-- Légende de la statistique -> caption -->
                <BaseText size="caption" color="#2e2f30" class="cap-first">
                  {{ t(stat.label) }}
                </BaseText>
              </div>
            </BaseCard>
          </div>
        </div>
        <!-- ===== NOTRE ÉQUIPE ===== -->
        <div
          class="p-5 md:p-7 w-full mx-auto flex flex-col gap-4 rounded-[10px]"
          style="border: #ffd1b5 1px solid"
        >
          <div class="text-center flex flex-col gap-2">
            <BaseTitle
              size="section"
              tag="h2"
              color="#e61171"
              class="text-left"
            >
              {{ t("devPartnerTeamTitle") }}
            </BaseTitle>
            <BaseText
              size="body"
              bold
              color="#e61171"
              class="text-left font-semibold"
            >
              {{ t("devPartnerTeamSubtitle") }}
            </BaseText>
            <BaseText size="body" color="#000000" class="text-left">
              {{ t("devPartnerTeamText") }}
            </BaseText>
          </div>

          <div
            class="flex flex-col items-center gap-4 lg:flex-row lg:justify-start lg:items-stretch"
          >
            <div
              v-for="founder in foundersFR"
              :key="founder.id"
              class="w-[300px] h-[300px] shrink-0 flex flex-col items-center text-center gap-2 p-6 rounded-[10px]"
              style="
                background: #fdf1ea;
                border: 1px solid #ffd1b5;
                box-shadow: 0 10px 20px rgba(230, 17, 113, 0.06);
              "
            >
              <!-- Photo -->
              <div
                class="w-24 h-24 shrink-0 rounded-full overflow-hidden flex items-center justify-center"
                style="background: #ffffff; border: 3px solid #ffd1b5"
              >
                <img
                  :src="founder.photo"
                  :alt="founder.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Nom -->
              <div class="h-[52px] flex items-center justify-center">
                <BaseTitle
                  size="card"
                  tag="h3"
                  color="#2e2f30"
                  class="!line-clamp-2"
                >
                  {{ founder.name }}
                </BaseTitle>
              </div>

              <!-- Rôle -->
              <div class="h-[32px] flex items-center justify-center">
                <BaseText size="caption" color="#e61171" class="line-clamp-2">
                  {{ founder.role }}
                </BaseText>
              </div>

              <!-- LinkedIn toujours en bas -->
              <BaseText
                tag="a"
                size="caption"
                bold
                color="#e61171"
                :href="founder.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 rounded-full px-4 py-2 shrink-0"
                style="background: #fff0e5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#E61171">
                  <path
                    d="M5 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.1c.5-1 1.7-2.1 3.8-2.1 4 0 4.7 2.6 4.7 6v6.4h-4v-5.7c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9V9Z"
                  />
                </svg>

                {{ t("voirProfilLinkedin") }}
              </BaseText>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================== -->
      <!-- SIDEBAR COUPS DE CŒUR                                      -->
      <!-- DESKTOP UNIQUEMENT                                         -->
      <!-- ========================================================== -->
      <CoupsDeCoeurSidebar
        class="hidden md:block md:sticky md:top-6 md:shrink-0"
        :reference-height="referenceHeight"
      />
    </section>

    <!-- ===== NOS TARIFS ===== -->
    <section
      class="w-full px-5 py-5 md:px-7 mx-auto mt-10 flex flex-col gap-4"
      style="background-color: #e61171"
    >
      <div class="text-center flex flex-col gap-3">
        <BaseTitle size="section" tag="h2" color="#ffffff">
          {{ t("devPartnerTarifsTitle") }}
        </BaseTitle>
        <BaseText size="body" bold color="#ffffff">
          {{ t("devPartnerTarifsSubtitle") }}
        </BaseText>
        <BaseText size="body" color="#ffffff">
          {{ t("devPartnerTarifsText") }}
        </BaseText>
      </div>
      <!-- ici -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 xl:gap-8 mx-auto pt-7 lg:px-10"
      >
        <TarifCard
          v-for="tier in partnershipTiers"
          :key="tier.key"
          :tier="tier"
          :t="t"
        />
      </div>
    </section>

    <!-- ===== COUPS DE PROJECTEURS ===== -->
    <section
      class="w-full mt-0 px-5 pt-7 md:px-7 mx-auto flex flex-col gap-4"
      style="background-color: #ffd1b5"
    >
      <BaseTitle size="section" tag="h2" color="#e61171" class="text-center">
        {{ t("devPartnerSpotlightsTitle") }}
      </BaseTitle>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-20">
        <BaseCard
          v-for="offer in spotlightOffers"
          :key="offer.key"
          variant="spotlight"
        >
          <div class="flex flex-col gap-1">
            <!-- Titre d'offre = titre de "carte" -->
            <BaseTitle size="card" tag="h4" color="#e61171">
              {{ t(offer.title) }}
            </BaseTitle>

            <BaseText size="caption" class="!font-bold" color="#2e2f30">
              {{ t(offer.price) }}
            </BaseText>

            <BaseText size="caption" color="#888888">
              {{ t(offer.description) }}
            </BaseText>
          </div>
        </BaseCard>
      </div>
    </section>

    <!-- ===== PUBLIER UN ARTICLE ===== -->
    <section
      class="w-full px-5 md:px-7 mx-auto pb-7 pt-4"
      style="background-color: #ffd1b5"
    >
      <div
        class="flex flex-col gap-4 p-6 rounded-[10px] max-w-[440px] mx-auto md:max-w-[640px]"
        style="background: #ffffff; border: 1px solid #ffe4d3"
      >
        <BaseTitle size="section" tag="h3" color="#e61171" class="text-center">
          {{ t(publishArticleOffer.title) }}
        </BaseTitle>
        <BaseText size="body" color="#2e2f30">
          {{ t(publishArticleOffer.description) }}
        </BaseText>
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-baseline gap-1">
            <BaseText tag="span" size="body" class="!font-bold" color="#e61171">
              {{ t(publishArticleOffer.price) }}
            </BaseText>
            <BaseText tag="span" size="caption" color="#2e2f30">
              {{ t(publishArticleOffer.priceSuffix) }}
            </BaseText>
          </div>
<!-- envoi un email  -->
          <div class="flex justify-center w-full">
            <BaseButton variant="pink" type="button" href="mailto:info@lafamily.ch">
              {{ t(publishArticleOffer.ctaLabel) }}
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DEVENEZ EXPERT LAFAMILY ===== -->
    <section
      class="w-full mt-0 px-5 md:px-7 mx-auto py-5 md:pt-10"
      style="background: #fff8f4"
    >
      <div
        class="relative flex flex-col items-center text-center gap-5 p-8 rounded-[10px] max-w-[440px] md:max-w-[640px] mx-auto"
        style="background: #ffffff; border: 2px solid #e61171"
      >
        <!-- Badge : petit texte fort -> caption bold, positionnement gardé via class -->
        <BaseText
          tag="span"
          size="caption"
          bold
          color="#e61171"
          class="absolute -top-3 rounded-full px-3 py-1 !font-bold"
          style="background: #ffffff; border: 1.5px solid #e61171"
        >
          {{ t(becomeExpertOffer.badge) }}
        </BaseText>

        <div
          class="w-16 h-16 rounded-full flex items-center justify-center"
          style="background: #ffd1b5"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#E61171">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </div>

        <BaseTitle size="section" tag="h3" color="#2e2f30">
          {{ t(becomeExpertOffer.title) }}
        </BaseTitle>
        <BaseText size="body" color="#2e2f30" class="max-w-[520px]">
          {{ t(becomeExpertOffer.description) }}
        </BaseText>

        <div class="flex flex-col gap-2 w-full max-w-[400px]">
          <!-- Chaque bénéfice : caption, avec son fond de pilule gardé via class -->
          <BaseText
            v-for="(benefit, i) in becomeExpertOffer.benefits"
            :key="i"
            tag="span"
            size="caption"
            color="#e61171"
            class="rounded-[10px] px-4 py-2 text-center"
            style="background: #ffd1b5"
          >
            {{ t(benefit) }}
          </BaseText>
        </div>

        <div class="flex items-baseline gap-1">
          <BaseText tag="span" size="body"  color="#e61171" class="!font-bold">
            {{ t(becomeExpertOffer.price) }}
          </BaseText>
          <BaseText tag="span" size="caption" color="#2e2f30">
            {{ t(becomeExpertOffer.priceSuffix) }}
          </BaseText>
        </div>
        <!-- envoi un email -->
        <BaseButton variant="pink" type="button" class="" href="mailto:info@lafamily.ch">
          {{ t(becomeExpertOffer.ctaLabel) }}
        </BaseButton>
      </div>
    </section>

    <!-- ===== CONTACT ===== -->
    <section class="px-5 md:px-7 !py-7" style="background: #fff8f4">
      <div
        class="max-w-[500px] mx-auto flex flex-col items-center text-center gap-3"
      >
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center"
          style="background: #ffd1b5"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E61171"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            />
          </svg>
        </div>

       
        <BaseTitle size="TitrePage" tag="h2" color="#2e2f30">
          {{ t("devPartnerContactTitle") }}
        </BaseTitle>
        <BaseText size="body" color="#2e2f30">
          {{ t("devPartnerContactText") }}
        </BaseText>
        <BaseText size="caption" color="#888888">
          {{ t("devPartnerContactAddress") }}
        </BaseText>

        <div
          class="flex flex-col md:flex-row gap-3 w-full max-w-[280px] md:max-w-[580px] mt-2"
        >
          <BaseButton
            variant="pink"
            href="mailto:info@lafamily.ch"
            class="md:flex-1 md:!w-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </svg>

            {{ t("mailDieFamilie") }}
          </BaseButton>

          <BaseButton
            variant="rosePale"
            href="tel:0216525293"
            style="background: #fff0e5"
            class="md:flex-1 md:!w-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 0 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>

            {{ t("numDieFamilie") }}
          </BaseButton>
        </div>
      </div>
    </section>

    <NewsletterSection :t="t" />
    <SiteFooter :t="t" />
  </div>
</template>
