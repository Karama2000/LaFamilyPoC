<!--
  AgendaDatePicker.vue
  ----------------------
  Sélecteur de date personnalisé (calendrier déroulant) utilisé pour les
  filtres "date de début" / "date de fin" de l'agenda. Fonctionne en
  v-model (modelValue au format 'YYYY-MM-DD' ou '' si aucune date choisie).
-->
<script setup lang="ts">
const props = defineProps<{
  t: (key: string) => string
  label: string
  modelValue: string // format 'YYYY-MM-DD' ou ''
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

// État d'ouverture/fermeture du calendrier
const open = ref(false)
// Référence à l'élément racine, utilisée pour détecter les clics à l'extérieur
const rootEl = ref<HTMLElement | null>(null)

// Convertit une chaîne 'YYYY-MM-DD' en objet Date (ou null si vide)
function parse(value: string): Date | null {
  if (!value) return null
  const parts = value.split('-').map(Number)
  const y = parts[0] ?? 1970
  const m = parts[1] ?? 1
  const d = parts[2] ?? 1
  return new Date(y, m - 1, d)
}

// Convertit un objet Date en chaîne 'YYYY-MM-DD' (avec zéros de remplissage)
function format(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Date du jour, heure remise à zéro pour pouvoir comparer uniquement les jours
const today = new Date()
today.setHours(0, 0, 0, 0)

// Date actuellement sélectionnée, calculée à partir du modelValue reçu du parent
const selectedDate = computed(() => parse(props.modelValue))

// Mois/année actuellement affichés dans le calendrier (initialisés sur la date sélectionnée, ou aujourd'hui)
const viewYear = ref((selectedDate.value ?? today).getFullYear())
const viewMonth = ref((selectedDate.value ?? today).getMonth())

// Libellés des mois et des jours de la semaine (en français)
const MONTH_NAMES = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
]
const WEEKDAYS = ['lu', 'ma', 'me', 'je', 've', 'sa', 'di']

// Texte affiché sur le bouton déclencheur : la date formatée si sélectionnée,
// sinon le label par défaut (ex: "Date de début")
const displayLabel = computed(() => {
  const d = selectedDate.value
  if (!d) return props.label
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
})

// Calcule la grille de 42 cases (6 semaines) du mois affiché, en incluant
// les jours du mois précédent/suivant nécessaires pour compléter les lignes.
const days = computed(() => {
  const firstOfMonth = new Date(viewYear.value, viewMonth.value, 1)
  // Décalage pour que la semaine commence un lundi (getDay() renvoie 0 pour dimanche)
  const startOffset = (firstOfMonth.getDay() + 6) % 7
  const gridStart = new Date(viewYear.value, viewMonth.value, 1 - startOffset)

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + i)
    return {
      date,
      inMonth: date.getMonth() === viewMonth.value,       // fait partie du mois affiché ?
      isToday: date.getTime() === today.getTime(),         // correspond à aujourd'hui ?
      isSelected: !!selectedDate.value && date.getTime() === selectedDate.value.getTime() // correspond à la date sélectionnée ?
    }
  })
})

// Navigation au mois précédent (avec passage à l'année précédente si on est en janvier)
function prevMonth() {
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
  else viewMonth.value--
}
// Navigation au mois suivant (avec passage à l'année suivante si on est en décembre)
function nextMonth() {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
  else viewMonth.value++
}

// Sélectionne une date dans le calendrier : émet la nouvelle valeur et ferme le calendrier
function pick(date: Date) {
  emit('update:modelValue', format(date))
  open.value = false
}

// Efface la date sélectionnée
function clear() {
  emit('update:modelValue', '')
  open.value = false
}

// Raccourci "Aujourd'hui" : positionne la vue et la sélection sur la date du jour
function goToday() {
  viewYear.value = today.getFullYear()
  viewMonth.value = today.getMonth()
  emit('update:modelValue', format(today))
  open.value = false
}

// Ouvre/ferme le calendrier ; à l'ouverture, recentre la vue sur la date sélectionnée (ou aujourd'hui)
function toggle() {
  if (!open.value) {
    viewYear.value = (selectedDate.value ?? today).getFullYear()
    viewMonth.value = (selectedDate.value ?? today).getMonth()
  }
  open.value = !open.value
}

// Ferme le calendrier si l'utilisateur clique en dehors du composant
function onClickOutside(e: MouseEvent) {
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="rootEl" class="relative flex-1">
    <!-- Bouton déclencheur affichant la date choisie ou le label par défaut -->
    <button type="button" @click="toggle"
      class="w-full flex items-center gap-2 rounded-[8px] px-3 py-2 text-left"
      style="background:#FFF8F4">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      <span class="text-sm font-semibold truncate" :style="{ color: selectedDate ? '#2E2F30' : '#8A8A8A' }">
        {{ displayLabel }}
      </span>
    </button>

    <!-- Panneau calendrier, affiché uniquement quand "open" est vrai -->
    <div v-if="open"
      class="absolute z-50 mt-2 w-[290px] max-w-[90vw] rounded-[12px] bg-white shadow-[0_13px_30px_rgba(0,0,0,0.15)] p-4">

      <!-- En-tête : navigation mois précédent / nom du mois + année / mois suivant -->
      <div class="flex items-center justify-between mb-3">
        <button type="button" @click="prevMonth" aria-label="Mois précédent"
          class="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#FFF0F5]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2.4"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span class="font-bold text-sm capitalize" style="color:#2E2F30">
          {{ MONTH_NAMES[viewMonth] }} {{ viewYear }}
        </span>
        <button type="button" @click="nextMonth" aria-label="Mois suivant"
          class="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#FFF0F5]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2.4"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <!-- Ligne des initiales des jours de la semaine -->
      <div class="grid grid-cols-7 mb-1">
        <span v-for="wd in WEEKDAYS" :key="wd" class="text-center text-[11px] font-bold uppercase" style="color:#B8B8B8">
          {{ wd }}
        </span>
      </div>

      <!-- Grille des jours du mois (42 cases = 6 semaines) -->
      <div class="grid grid-cols-7 gap-y-1">
        <button v-for="(d, i) in days" :key="i" type="button" @click="pick(d.date)"
          class="h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm font-semibold transition-colors"
          :class="!d.inMonth ? 'opacity-30' : ''"
          :style="{
            background: d.isSelected ? '#E61171' : 'transparent',
            color: d.isSelected ? '#FFFFFF' : (d.isToday ? '#E61171' : '#2E2F30'),
            border: d.isToday && !d.isSelected ? '1.5px solid #E61171' : '1.5px solid transparent'
          }">
          {{ d.date.getDate() }}
        </button>
      </div>

      <!-- Pied du calendrier : effacer la sélection / revenir à aujourd'hui -->
      <div class="flex items-center justify-between mt-3 pt-3" style="border-top:1px solid #F0F0F0">
        <button type="button" @click="clear" class="text-xs font-bold underline underline-offset-2" style="color:#8A8A8A">
          {{ t('agendaCalendarClear') }}
        </button>
        <button type="button" @click="goToday" class="text-xs font-bold underline underline-offset-2" style="color:#E61171">
          {{ t('agendaCalendarToday') }}
        </button>
      </div>
    </div>
  </div>
</template>
