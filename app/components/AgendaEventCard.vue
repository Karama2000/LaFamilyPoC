<script setup lang="ts">
import type { AgendaEvent } from "~/data/agendaData";

const props = defineProps<{
  event: AgendaEvent;
  t: (key: string) => string;
  externalLink?: string;
}>();

const categoryLabel: Record<AgendaEvent["categorie"], string> = {
  activite: "filterActivites",
  campLogement: "filterCamps",
  campJour: "filterCampsDuJour",
  cours: "filterCours",
};

// Le back fournit en priorité le libellé exact saisi dans le Sheet.
const badgeLabel = computed(() => {
  if (props.event.categorieDetaillee?.trim()) return props.event.categorieDetaillee;
  if (props.event.categorieLabel?.trim()) return props.event.categorieLabel;
  if (props.event.sousCategorie?.trim()) return props.t(props.event.sousCategorie);
  return props.t(categoryLabel[props.event.categorie]);
});

// Le back regroupe les lignes qui partagent le même titre.
const repeatCount = computed(() =>
  (props.event.autresDates?.length ?? 0) +
  (props.event.autresAdresses?.length ?? 0) +
  (props.event.autresLieuxDates?.length ?? 0),
);

const repeatLabel = computed(() =>
  repeatCount.value === 1 ? "autre occurrence" : "autres occurrences",
);

function handleImageError(event: Event) {
  const image = event.target as HTMLImageElement;
  image.onerror = null;
  image.src = "/images/nouveautes/1.jpeg";
}
</script>

<template>
  <BaseCard variant="agenda" class="group h-full flex flex-col">
    <template #image>
      <div class="relative aspect-[4/3] overflow-hidden">
        <img
          :src="event.image || '/images/famille.jpeg'"
          :alt="event.titre"
          class="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          @error="handleImageError"
        />

        <div class="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center gap-1.5">
          <BaseButton variant="badge">
            {{ badgeLabel }}
          </BaseButton>
          <span
            v-if="repeatCount > 0"
            class="inline-flex items-center gap-1 rounded-[5px] px-2.5 py-1 text-[11px] font-bold tracking-[0.2px]"
            style="background:#e61171;color:#ffffff"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M17 2.1 21 6l-4 3.9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="m7 21.9-4-3.9 4-3.9" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            Se répète
          </span>
        </div>
      </div>
    </template>

    <div class="flex flex-col flex-1 gap-2">
      <div class="h-[40px] shrink-0">
        <BaseTitle size="card" tag="h3" color="#e61171" class="leading-snug">
          {{ event.titre }}
        </BaseTitle>
      </div>

      <div class="h-[18px] shrink-0 flex items-center gap-1.5 pt-3" style="color:#2e2f30">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
        <BaseText tag="span" size="caption" color="#2e2f30" class="truncate">
          {{ event.lieu || "Lieu non spécifié" }}
        </BaseText>
      </div>

      <div class="h-[18px] shrink-0 flex items-center gap-1.5 pt-3" style="color:#2e2f30">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <BaseText tag="span" size="caption" bold color="#2e2f30" class="truncate !font-semibold">
          {{ event.date || "Date non spécifiée" }}
        </BaseText>
      </div>

      <p v-if="repeatCount > 0" class="mt-2 text-[12px] font-semibold" style="color:#e61171">
        + {{ repeatCount }} {{ repeatLabel }}
      </p>

      <BaseButton
        variant="peach"
        :to="externalLink || `/agenda/${event.id}`"
        class="tracking-[0.2px] self-start mt-auto"
      >
        {{ t("enSavoirPlus") }}
      </BaseButton>
    </div>
  </BaseCard>
</template>
