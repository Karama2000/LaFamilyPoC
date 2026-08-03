<!--
  AgendaEventCard.vue
  --------------------
  Carte affichant un événement de l'agenda : image, badge de catégorie,
  titre, lieu, date et bouton "en savoir plus". Utilisée dans les listes
  et grilles d'événements (agenda, coups de cœur, etc.).
-->
<script setup lang="ts">
import type { AgendaEvent } from '~/data/agendaData'

defineProps<{
  event: AgendaEvent            // objet contenant les données de l'événement
  t: (key: string) => string    // fonction de traduction (i18n)
}>()

// Correspondance entre la catégorie technique de l'événement
// et la clé de traduction du badge à afficher sur l'image
const categoryLabel: Record<AgendaEvent['categorie'], string> = {
  activite: 'filterActivites',
  campLogement: 'filterCamps',
  campJour: 'filterCampsJour',
  cours: 'filterCours'
}
</script>

<template>
  <!-- Carte avec léger effet de survol (translation vers le haut) -->
  <article
    class="group flex flex-col rounded-[10px] overflow-hidden bg-white shadow-[0_13px_19px_rgba(0,0,0,0.07)] transition-transform duration-200 hover:-translate-y-1">

    <!-- Image de l'événement + badge catégorie en superposition -->
    <div class="relative aspect-[4/3] overflow-hidden">
      <img :src="event.image" :alt="event.titre"
        class="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105" />
      <span class="absolute top-3 left-3 rounded-[5px] px-3 py-1 text-[11px] font-bold tracking-[0.3px]"
        style="background:#FFD1B5;color:#E61171">
        {{ t(categoryLabel[event.categorie]) }}
      </span>
    </div>

    <!-- Contenu texte de la carte -->
    <div class="flex flex-col flex-1 gap-2 px-4 py-4">
      <!-- Titre de l'événement -->
      <h3 class="text-[15px] font-bold leading-snug" style="color:#E61171">
        {{ event.titre }}
      </h3>

      <!-- Lieu (icône marqueur de carte) -->
      <div class="flex items-center gap-1.5 text-[13px]" style="color:#2E2F30">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span class="truncate">{{ event.lieu }}</span>
      </div>

      <!-- Date (icône calendrier) -->
      <div class="flex items-center gap-1.5 text-[13px] font-semibold" style="color:#2E2F30">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        {{ event.date }}
      </div>

      <!-- Bouton d'action (poussé en bas grâce à mt-auto) -->
      <button
        class="mt-auto self-start rounded-[5px] px-4 py-2 text-[12px] leading-[22px] font-bold tracking-[0.2px]"
        style="background:#FFD1B5;color:#E61171">
        {{ t('enSavoirPlus') }}
      </button>
    </div>
  </article>
</template>
