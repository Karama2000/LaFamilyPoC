<!--
  ArticleCard.vue
  ----------------
  Carte affichant un article du blog : image, badge de catégorie, titre,
  résumé, date et lien "En savoir plus". Utilisée dans blogs.vue et dans
  la section "À lire aussi" de article/[id].vue.
-->
<script setup lang="ts">
import type { Article } from "~/data/articleData";
import { articleCategories } from "~/data/articleData";

const props = defineProps<{
  article: Article;
  t: (key: string) => string;
}>();

const categoryLabel = computed(
  () =>
    articleCategories.find((c) => c.key === props.article.category)?.labelKey ??
    "",
);
</script>

<template>
  <BaseCard variant="agenda" class="h-full flex flex-col">
    <!-- Image -->
    <template #image>
      <div class="w-full aspect-[16/10]">
        <img
          :src="article.image"
          :alt="article.titre"
          class="w-full h-full object-cover block"
        />
      </div>
    </template>

    <!-- Contenu : chaque zone a une hauteur FIXE, le footer ne bouge jamais -->
    <div class="flex flex-col flex-1 gap-2">
      <!-- Badge : hauteur STRICTE -->
      <div class="h-[26px] shrink-0">
        <BaseButton variant="badgePeach" class="!self-start !py-1 h-full">
          {{ t(categoryLabel) }}
        </BaseButton>
      </div>

      <!-- Titre : hauteur STRICTE 2 lignes, coupé proprement si plus long -->
      <div class="h-[40px] shrink-0">
       
        <BaseTitle size="card" tag="h3" color="#2e2f30" class="!text-[15px] font-bold !leading-snug line-clamp-2">
          {{ article.titre }}
        </BaseTitle>

      </div>

      <!-- Résumé : hauteur STRICTE 3 lignes, coupé proprement si plus long -->
      <div class="h-[60px] shrink-0">
        

         <BaseText size="caption" color="#2e2f30" class="leading-relaxed line-clamp-3">
          {{ article.excerpt }}
        </BaseText>
      </div>

      <!-- Footer (date + lien) : TOUJOURS collé en bas, position fixe -->
      <div class="flex items-center justify-between mt-auto pt-2">
        

        <BaseText tag="span" size="caption" color="#888888" class="!text-[11.5px] truncate">
          {{ article.date }}
        </BaseText>

        <!-- Lien -->
        <NuxtLink
          :to="`/articleFolder/${article.id}`"
          class="flex items-center gap-1 text-[11.5px] font-bold shrink-0"
          style="color: #e61171"
        >
          {{ t("enSavoirPlus") }}

          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E61171"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </BaseCard>
</template>