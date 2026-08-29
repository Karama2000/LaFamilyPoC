<!-- ============================================================ -->
<!-- FICHIER : pages/article/[id].vue                            -->
<!-- DESCRIPTION : Détail d'un article de blog.                    -->
<!-- Route dynamique Nuxt : /article/:id (id = Article.id)       -->
<!-- ============================================================ -->
<script setup lang="ts">
import { articlesFR, articleCategories } from "~/data/articleData";
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

const article = computed(() =>
  articlesFR.find((a) => a.id === route.params.id),
);

if (!article.value) {
  await navigateTo("/blog");
}

const categoryLabel = computed(() =>
  article.value
    ? t(
        articleCategories.find((c) => c.key === article.value!.category)
          ?.labelKey ?? "",
      )
    : "",
);

// À lire aussi : autres articles de la même catégorie, article courant exclu
const relatedArticles = computed(() =>
  articlesFR
    .filter(
      (a) =>
        a.category === article.value?.category && a.id !== article.value?.id,
    )
    .slice(0, 2),
);

// Agenda lié
const relatedEvents = computed(() =>
  agendaEventsFR.filter((ev) =>
    article.value?.relatedEventIds?.includes(ev.id),
  ),
);

// Partenaires liés
const relatedPartners = computed(() =>
  partnersFR.filter((p) => article.value?.relatedPartnerIds?.includes(p.id)),
);

// Scroll doux vers une section de la même page (Agenda / Partenaires)
function scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<template>
  <div
    v-if="article"
    class="min-h-screen overflow-x-hidden text-white font-sans"
    style="background: #ffffff"
  >
    <!-- ===== HERO (vagues identiques à agenda/[id].vue) ===== -->
    <div
      class="relative overflow-hidden min-h-[300px] md:min-h-[340px] flex flex-col text-white"
      style="background: #e61171"
    >
      <!-- Vague de séparation (mobile) -->
      <svg
        class="absolute -bottom-px left-0 w-full h-[120px] z-0 pointer-events-none md:hidden"
        viewBox="0 0 830 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 L0,70 Q207.5,40 415,60 Q622.5,80 830,30 L830,120 Z"
          fill="#ffffff"
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
        class="relative z-20 px-5 md:px-12 pt-2 pb-20 md:pb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8"
      >
        <div class="flex flex-col gap-3 md:max-w-[420px] md:shrink-0">
          <BaseTitle size="TitrePage">{{ article.titre }}</BaseTitle>

          <!-- Date + catégorie sous le titre -->
          <div class="flex flex-col items-start gap-2">
            <BaseText size="caption" color="#ffffff">{{
              article.date
            }}</BaseText>
            <BaseButton variant="beigeBadge">
              {{ categoryLabel }}
            </BaseButton>
          </div>
        </div>

        <div
          class="hidden md:block flex-1 max-w-[908px] h-[145px] rounded-[10px]"
          style="background: #ffede3; opacity: 0.5; border: 2px solid #ffcee4"
        ></div>
      </div>
    </div>

    <!-- ---------------------------------------- -->
    <!-- CONTENU + SIDEBAR : même pattern que agenda.vue          -->
    <!-- (md:flex md:gap-8 : contenu flex-1 à gauche, sidebar      -->
    <!-- sticky à droite, sidebar cachée sur mobile).               -->
    <!-- ---------------------------------------- -->
    <div
      class="px-5 md:px-7 mx-auto -mt-8 md:mt-7 relative z-10 md:flex md:gap-8 md:items-start"
    >
      <!-- ===================== COLONNE PRINCIPALE ===================== -->
      <div ref="referenceRef" class="flex flex-col gap-0 md:flex-1 md:min-w-0">
        <!-- ===== IMAGE DE COUVERTURE ===== -->
        <section>
          <!-- Boutons Partenaires/ autres articles : sous l'image, style CSS Figma exact -->
          <div
            class="flex flex-wrap justify-center md:justify-start gap-2 my-5"
          >
            <!-- partenaires -->
            <BaseButton
              type="button"
              variant="outlineAction"
              class="!text-[14px]"
              @click="scrollToSection('partenaires-section')"
            >
              <svg
                viewBox="0 0 24 24"
                class="w-4 h-4 shrink-0"
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

            <!-- autres articles -->
            <BaseButton
              type="button"
              variant="outlineAction"
              class="!text-[14px]"
              @click="scrollToSection('autresArticles-section')"
            >
              <svg
                class="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E61171"
                stroke-width="2.1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="16" x2="16" y2="16" />
              </svg>
              {{ t("AutreArticles") }}
            </BaseButton>
          </div>

          <div
            class="rounded-[10px] overflow-hidden"
            style="
              border: 3px solid #ffd1b5;
              box-shadow: 0 13px 19px rgba(0, 0, 0, 0.08);
            "
          >
            <img
              :src="article.image"
              :alt="article.titre"
              class="w-full h-[200px] md:h-[420px] object-cover"
            />
          </div>
        </section>

        <!-- ===== CORPS DE L'ARTICLE ===== -->
        <section class="my-6">
          <div class="flex flex-col gap-6">
            <template v-for="(block, i) in article.blocks" :key="i">
              <!-- TEXTE -->
              <BaseText
                size="body"
                v-if="block.type === 'text'"
                class="text-sm leading-relaxed text-justify"
                style="color: #000000"
              >
                {{ block.content }}
              </BaseText>

              <!-- IMAGE -->
              <figure v-else-if="block.type === 'image'" class="w-full">
                <div
                  class="w-full aspect-[16/9] overflow-hidden rounded-[10px]"
                  style="background: #fff8f4"
                >
                  <img
                    :src="block.src"
                    :alt="block.alt || ''"
                    class="w-full h-full object-cover block"
                  />
                </div>
              </figure>
            </template>
          </div>
        </section>
      </div>

      <!-- ===================== SIDEBAR (desktop uniquement, sticky) ===================== -->
      <CoupsDeCoeurSidebar
        class="hidden md:block md:sticky md:top-6 md:pt-2"
        :reference-height="referenceHeight"
      />
    </div>

    <div class="w-full mt-8 md:mt-12">
      <!-- ===== PARTENAIRES LIÉS ===== -->
      <section
        id="partenaires-section"
        class="px-5 md: px:7 py-5 mt-2 flex flex-col gap-4"
        style="scroll-margin-top: 90px; background-color: #fff8f4"
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
            {{ t("partnerBtn") }}
          </BaseTitle>
        </div>
        <div v-if="relatedPartners.length" class="cards-grid gap-4">
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

      <!-- ===== AUTRES ARTICLES ===== -->
      <section
        id="autresArticles-section"
        class="px-5 md: px:7 py-5 flex flex-col gap-4"
        style="background-color: #fff8f4"
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
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="8" y1="16" x2="16" y2="16" />
          </svg>
          <BaseTitle
            size="section"
            class="!text-[19px]"
            tag="h2"
            color="#e61171"
          >
            {{ t("articleAlsoRead") }}
          </BaseTitle>
        </div>

        <div v-if="relatedArticles.length" class="cards-grid gap-5">
          <ArticleCard
            v-for="a in relatedArticles"
            :key="a.id"
            :article="a"
            :t="t"
          />
        </div>
        <div v-else class="text-center py-10" style="color: #2e2f30">
          {{ t("agendaEmptyText") }}
        </div>
      </section>
    </div>

    <!-- pied de page -->
    <NewsletterSection :t="t" />
    <SiteFooter :t="t" />
  </div>
</template>
