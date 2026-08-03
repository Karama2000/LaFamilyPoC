<!--
  AgendaSearchCard.vue
  ---------------------
  Carte de recherche affichée au-dessus de l'agenda : contient une icône
  loupe + deux sélecteurs de date (date de début / date de fin) qui
  utilisent le composant AgendaDatePicker.
-->
<script setup lang="ts">
defineProps<{
  t: (key: string) => string   // fonction de traduction (i18n)
  dateFrom: string             // date de début sélectionnée (format ISO ou vide)
  dateTo: string                // date de fin sélectionnée (format ISO ou vide)
}>()

// Événement remonté au parent quand une des deux dates change
const emit = defineEmits<{
  'set-date': [field: 'dateFrom' | 'dateTo', value: string]
}>()
</script>

<template>
  <div class="w-full bg-white rounded-[10px] shadow-[0_13px_19px_rgba(0,0,0,0.08)] px-5 py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

    <!-- Icône loupe + titre de la carte -->
    <div class="flex items-center gap-2 shrink-0" style="color:#E61171">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2.3"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span class="font-bold text-sm whitespace-nowrap">{{ t('agendaSearchTitle') }}</span>
    </div>

    <!-- Deux sélecteurs de date côte à côte (empilés sur mobile) -->
    <div class="flex-1 flex flex-col sm:flex-row gap-3">
      <!-- Date de début -->
      <AgendaDatePicker
        :t="t"
        :label="t('agendaSearchDateFrom')"
        :model-value="dateFrom"
        @update:model-value="(v: string) => emit('set-date', 'dateFrom', v)" />
      <!-- Date de fin -->
      <AgendaDatePicker
        :t="t"
        :label="t('agendaSearchDateTo')"
        :model-value="dateTo"
        @update:model-value="(v: string) => emit('set-date', 'dateTo', v)" />
    </div>
  </div>
</template>
