<!-- ============================================================ -->
<!-- FICHIER : pages/blog.vue                                     -->
<!-- DESCRIPTION : Liste des articles du blog "Nos nouveautés"     -->
<!-- avec filtre par catégorie (multi-sélection, même pattern que  -->
<!-- l'agenda et les partenaires).                                 -->
<!--      
<!-- ============================================================ -->
<script setup lang="ts">
import {  articleCategories } from "~/data/articleData";
import CoupsDeCoeurSidebar from "~/components/CoupsDeCoeurSidebar.vue";
import { useReferenceHeight } from "~/composables/useReferenceHeight";

const { data: articlesFR } = await useArticles();
const { referenceRef, referenceHeight } = useReferenceHeight();

const { currentLang, t, setLang } = useTranslation();

function onLangChange(lang: string) {
  setLang(lang as any, [], []);
}

// ----------------------------------------------------------------
// FILTRES : catégories actives (multi-sélection)
// ----------------------------------------------------------------
const activeCategories = ref<string[]>([]);

function toggleCategory(key: string) {
  const idx = activeCategories.value.indexOf(key);
  if (idx === -1) activeCategories.value.push(key);
  else activeCategories.value.splice(idx, 1);
}

function resetFilters() {
  activeCategories.value = [];
}

const activeChips = computed(() =>
  activeCategories.value.map((key) => {
    const c = articleCategories.find((c) => c.key === key);
    return { key, label: c ? t(c.labelKey) : key };
  }),
);

function removeChip(key: string) {
  toggleCategory(key);
}

const filteredArticles = computed(() => {
  if (!activeCategories.value.length) return articlesFR.value;
  return articlesFR.value.filter((a) => activeCategories.value.includes(a.category));
});
</script>

<template>
  <div
    class="min-h-screen overflow-x-hidden text-white font-sans"
    style="background: #fff8f4"
  >
    <!-- ===== HERO ===== -->
    <div
      class="relative overflow-hidden min-h-[300px] md:min-h-[340px] flex flex-col"
      style="background: #e61171"
    >
      <!-- vague mobile -->
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
      <!-- vague desktop : supprimée volontairement, comme les autres pages -->

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

      <!--
        Titre + description (identiques mobile/desktop, structure inchangée)
        + bannière rose translucide DESKTOP UNIQUEMENT à droite, comme
        article.vue / partenaires.vue / agenda.vue.
      -->
      <div
        class="relative z-20 px-5 md:px-7 pt-2 pb-20 md:pb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8"
      >
        <div class="flex flex-col gap-2 md:gap-3 md:max-w-[420px] md:shrink-0">
          <BaseTitle size="TitrePage"> {{ t("blogTitle") }}</BaseTitle>
          <BaseSubtitle size="description" tag="p" color="#FFCEE4">
            {{ t("blogSubtitle") }}
          </BaseSubtitle>
        </div>

        <!-- Bannière : DESKTOP UNIQUEMENT -->
        <div
          class="hidden md:block flex-1 max-w-[908px] h-[145px] rounded-[14px]"
          style="background: #ffede3; opacity: 0.5; border: 2px solid #ffcee4"
        ></div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- BLOC PRINCIPAL : filtre + 1ère ligne d'articles + sidebar     -->
    <!-- La sidebar est en flex desktop UNIQUEMENT (md:flex) à côté   -->
      <!-- ============================================================ -->
    <div
      class="px-5 md:px-7 mx-auto -mt-0 md:mt-5 relative z-10 md:flex md:gap-8 md:items-start"
    >
      <!-- ---------- COLONNE GAUCHE : filtre + résultats ---------- -->
      <div class="flex flex-col gap-4 md:flex-1 md:min-w-0" ref="referenceRef">
        <!-- ===== FILTRE : Raffiner votre recherche ===== -->
        <section>
          <div
            class="rounded-[10px] p-5 flex flex-col gap-4"
            style="
              background: #fdf1ea;
              border: 1px solid #ffd1b5;
              box-shadow: 0 5px 10px rgba(0, 0, 0, 0.08);
            "
          >
            <BaseSubtitle
              size="description"
              tag="p"
              class="!text-sm font-bold"
              color="#e61171"
              >{{ t("blogRefineSearch") }}</BaseSubtitle
            >

            <!--
              Filtres actifs : chips à gauche, "Réinitialiser" aligné à
              droite sur la même ligne (desktop) — conforme au design.
              Sur mobile, ça reste en flex-wrap comme avant (le bouton
              "Réinitialiser" du bloc RÉSULTATS plus bas gère déjà le
              reset sur mobile, celui-ci est un raccourci desktop en plus).
            -->
            <div
              v-if="activeCategories.length"
              class="flex flex-wrap items-center justify-between gap-2"
            >
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="text-sm font-semibold underline underline-offset-2 mr-1"
                  style="color: #e61171"
                >
                  {{ activeCategories.length }}
                  {{
                    activeCategories.length > 1
                      ? "filtres actifs"
                      : "filtre actif"
                  }}
                </span>

                <BaseButton
                  v-for="chip in activeChips"
                  :key="chip.key"
                  type="button"
                  variant="chip"
                  @click="removeChip(chip.key)"
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

            <!-- Grille des catégories : responsive par vraies classes, pas de style inline -->
            <div
              class="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5 lg:px-12"
            >
              <BaseButton
                v-for="cat in articleCategories"
                :key="cat.key"
                type="button"
                variant="categoryFilter"
                :selected="activeCategories.includes(cat.key)"
                @click="toggleCategory(cat.key)"
              >
                <MenuIcon
                  :name="
                    activeCategories.includes(cat.key)
                      ? cat.key + '-blanc'
                      : cat.key
                  "
                  class="w-8 h-8"
                />

                <span class="text-xs font-bold">
                  {{ t(cat.labelKey) }}
                </span>
              </BaseButton>
            </div>
          </div>
        </section>

        <!-- ===== RÉSULTATS : en-tête + articles ===== -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <BaseText
              size="caption"
              bold
              color="#e61171"
              class="!font-semibold text-[14px]"
            >
              {{ filteredArticles.length }} {{ t("agendaResultsSuffix") }}
            </BaseText>
            <button
              type="button"
              @click="resetFilters"
              class="text-sm font-bold underline underline-offset-2"
              style="color: #e61171"
            >
              {{ t("agendaReset") }}
            </button>
          </div>
          <!-- tous les cards -->
          <div
            v-if="filteredArticles.length"
            class="cards-grid px-5 md:px-7 mx-auto mt-6 mb-6"
          >
            <ArticleCard
              v-for="article in filteredArticles"
              :key="article.id"
              :article="article"
              :t="t"
            />
          </div>
          <div v-else class="text-center py-20" style="color: #2e2f30">
            {{ t("agendaEmptyText") }}
          </div>
        </section>
      </div>

      <!-- ---------- SIDEBAR "COUPS DE CŒUR" : desktop uniquement ---------- -->
      <CoupsDeCoeurSidebar
        class="hidden md:flex"
        sticky-top="md:top-6"
        :reference-height="referenceHeight"
      />
    </div>

    <NewsletterSection :t="t" />
    <SiteFooter :t="t" />
  </div>
</template>
