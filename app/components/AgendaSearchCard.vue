<!--
  AgendaSearchCard.vue
  ---------------------
  Carte de recherche affichée au-dessus de l'agenda : contient une icône
  loupe + deux sélecteurs de date (date de début / date de fin) qui
  utilisent le composant AgendaDatePicker.


-->
<script setup lang="ts">
// "props" est nommé (const props = ...) pour pouvoir être lu dans le computed ci-dessous
const props = defineProps<{
  t: (key: string) => string; // fonction de traduction (i18n)
  dateFrom: string; // date de début sélectionnée (format ISO ou vide)
  dateTo: string; // date de fin sélectionnée (format ISO ou vide)
}>();

// Événements remontés au parent
const emit = defineEmits<{
  "set-date": [field: "dateFrom" | "dateTo", value: string];
  search: []; // émis quand l'utilisateur clique sur le bouton "Chercher"
}>();

// Le bouton "Chercher" ne s'affiche que si les 2 dates (début ET fin)  sont renseignées ou au moins un filtre est selectionné
const canSearch = computed(() => !!props.dateFrom && !!props.dateTo); //a modifier
</script>
<template>
  <div
    class="relative w-full rounded-[10px]  px-4 py-4 md:px-5 md:py-4 flex flex-col md:flex-row md:items-center gap-3 bg-[#FFEDE3] md:bg-[#FFEDE3]" 
  >
    <!-- Titre -->
    <div class="flex items-center gap-2 shrink-0 md:w-auto">
      <span class="font-bold text-sm whitespace-nowrap text-[#E61171]">
        {{ t("agendaSearchTitle") }}
      </span>
    </div>

    <!-- Dates -->
    <div class="flex-1 min-w-0 flex flex-col sm:flex-row gap-3 md:items-center">
      <!-- Date de début -->
      <div class="flex-1 min-w-0">
        <AgendaDatePicker
          :t="t"
          :label="t('agendaSearchDateFrom')"
          :model-value="dateFrom"
          @update:model-value="(v: string) => emit('set-date', 'dateFrom', v)"
        />
      </div>

      <!-- Date de fin -->
      <div class="flex-1 min-w-0">
        <AgendaDatePicker
          :t="t"
          :label="t('agendaSearchDateTo')"
          :model-value="dateTo"
          :highlight-date="dateFrom"
          @update:model-value="(v: string) => emit('set-date', 'dateTo', v)"
        />
      </div>
    </div>

    <!-- Bouton Chercher -->
    <BaseButton
      v-if="canSearch"
      variant="rosePale"
      type="button"
      class="!w-[100px] !h-[30px] !text-[14px] shrink-0 self-center md:self-auto"
      @click="emit('search')"
    >
      <span class="whitespace-nowrap">
        {{ t("agendaSearchBtn") }}
      </span>

      <span class="w-5 h-5 flex items-center justify-center shrink-0">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#E61171"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </span>
    </BaseButton>
  </div>
</template>
