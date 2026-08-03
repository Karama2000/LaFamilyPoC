<!--
  PartnersFilterBar.vue
  -----------------------
  Barre de filtres pour la liste des partenaires :
    - un menu déroulant personnalisé pour choisir un canton (zone),
      avec barre de recherche et liste scrollable
    - une rangée de pilules pour choisir une catégorie de partenaire
  Les filtres actifs sont pilotés par le parent via les props "zone" et
  "category" et les événements "set-zone" / "set-category".
-->
<script setup lang="ts">
import { partnerCategories } from '~/data/partnersData'

defineProps<{
  zone: string                  // clé du canton actuellement sélectionné ('' = toute la Suisse)
  category: string               // clé de la catégorie actuellement sélectionnée ('' = toutes)
  t: (key: string) => string     // fonction de traduction (i18n)
}>()

const emit = defineEmits<{
  'set-zone': [key: string]
  'set-category': [key: string]
}>()

// Liste statique des cantons suisses (avec l'option "Toute la Suisse" en tête)
const zones = [
  { key: '', label: 'Toute la Suisse', emoji: '🇨🇭' },
  { key: 'AG', label: 'Argovie' },
  { key: 'AI', label: 'Appenzell Rhodes-Intérieures' },
  { key: 'AR', label: 'Appenzell Rhodes-Extérieures' },
  { key: 'BE', label: 'Berne' },
  { key: 'BL', label: 'Bâle-Campagne' },
  { key: 'BS', label: 'Bâle-Ville' },
  { key: 'FR', label: 'Fribourg' },
  { key: 'GE', label: 'Genève' },
  { key: 'GL', label: 'Glaris' },
  { key: 'GR', label: 'Grisons' },
  { key: 'JU', label: 'Jura' },
  { key: 'LU', label: 'Lucerne' },
  { key: 'NE', label: 'Neuchâtel' },
  { key: 'NW', label: 'Nidwald' },
  { key: 'OW', label: 'Obwald' },
  { key: 'SG', label: 'Saint-Gall' },
  { key: 'SH', label: 'Schaffhouse' },
  { key: 'SO', label: 'Soleure' },
  { key: 'SZ', label: 'Schwytz' },
  { key: 'TG', label: 'Thurgovie' },
  { key: 'TI', label: 'Tessin' },
  { key: 'UR', label: 'Uri' },
  { key: 'VD', label: 'Vaud' },
  { key: 'VS', label: 'Valais' },
  { key: 'ZG', label: 'Zoug' },
  { key: 'ZH', label: 'Zurich' }
]

// État d'ouverture/fermeture du dropdown "canton"
const zoneOpen = ref(false)
// Texte tapé dans la barre de recherche du dropdown
const zoneSearch = ref('')
// Référence à l'élément racine du dropdown, utilisée pour détecter les clics à l'extérieur
const zoneWrapper = ref<HTMLElement | null>(null)

// Liste des cantons filtrée selon le texte de recherche (sur le libellé ou le code du canton)
const filteredZones = computed(() => {
  const q = zoneSearch.value.trim().toLowerCase()
  if (!q) return zones
  return zones.filter(z => z.label.toLowerCase().includes(q) || z.key.toLowerCase().includes(q))
})

// Sélectionne un canton : émet l'événement au parent, puis referme le dropdown et vide la recherche
function selectZone(key: string) {
  emit('set-zone', key)
  zoneOpen.value = false
  zoneSearch.value = ''
}

/**
 * Gère le survol d'un élément de la liste des cantons
 * @param event - Événement de souris
 * @param isSelected - Indique si l'élément est actuellement sélectionné
 */
function handleMouseEnter(event: MouseEvent, isSelected: boolean) {
  const target = event.currentTarget as HTMLElement | null
  if (target) {
    target.style.background = isSelected ? '#FFF0E4' : '#FFF8F4'
  }
}

/**
 * Gère la fin du survol d'un élément de la liste des cantons
 * @param event - Événement de souris
 * @param isSelected - Indique si l'élément est actuellement sélectionné
 */
function handleMouseLeave(event: MouseEvent, isSelected: boolean) {
  const target = event.currentTarget as HTMLElement | null
  if (target) {
    target.style.background = isSelected ? '#FFF0E4' : 'transparent'
  }
}

// Ferme le dropdown si l'utilisateur clique en dehors de celui-ci
function onClickOutside(e: MouseEvent) {
  if (zoneWrapper.value && !zoneWrapper.value.contains(e.target as Node)) {
    zoneOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div class="rounded-[20px] bg-white shadow-[0_10px_24px_rgba(230,17,113,0.07)] p-4 md:p-5 flex flex-col gap-4">

    <!-- ===== Filtre Zone : dropdown personnalisé avec recherche ===== -->
    <div>
      <p class="text-[11px] font-bold uppercase tracking-wider mb-2" style="color:#FF863D">{{ t('partnersFilterZone') }}</p>

      <div ref="zoneWrapper" class="relative w-full sm:w-80">
        <!-- Bouton déclencheur affichant le canton sélectionné -->
        <button type="button" @click="zoneOpen = !zoneOpen"
          class="w-full flex items-center justify-between gap-2 rounded-full pl-4 pr-3 py-2.5 text-sm font-bold transition-all"
          :style="zoneOpen
            ? 'background:#FFFFFF;color:#E61171;border:2px solid #E61171'
            : 'background:#FFF8F4;color:#E61171;border:2px solid #FFE4D3'">
          <span class="flex items-center gap-1.5 truncate">
            <span v-if="zones.find(z => z.key === zone)?.emoji">{{ zones.find(z => z.key === zone)?.emoji }}</span>
            {{ zones.find(z => z.key === zone)?.label || 'Toute la Suisse' }}
          </span>
          <!-- Chevron qui pivote de 180° quand le dropdown est ouvert -->
          <svg viewBox="0 0 24 24" class="w-4 h-4 shrink-0 transition-transform duration-200" :class="zoneOpen ? 'rotate-180' : ''"
            fill="none" stroke="#E61171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <!-- Panneau du dropdown (recherche + liste), avec animation d'ouverture -->
        <Transition name="dropdown">
          <div v-if="zoneOpen"
            class="absolute left-0 top-[calc(100%+8px)] z-30 w-full sm:min-w-[320px] rounded-[16px] overflow-hidden"
            style="background:#FFFFFF;border:2px solid #FFE4D3;box-shadow:0 16px 40px rgba(230,17,113,0.16)">

            <!-- Barre de recherche pour filtrer les cantons -->
            <div class="p-2.5" style="border-bottom:2px solid #FFF3EA">
              <div class="relative">
                <svg viewBox="0 0 24 24" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  fill="none" stroke="#FF863D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <!-- @click.stop empêche le clic dans le champ de fermer le dropdown via onClickOutside -->
                <input v-model="zoneSearch" type="text" placeholder="Rechercher un canton..."
                  class="w-full rounded-full pl-9 pr-3 py-2 text-sm font-semibold outline-none"
                  style="background:#FFF8F4;color:#E61171"
                  @click.stop />
              </div>
            </div>

            <!-- Liste scrollable des cantons filtrés -->
            <div class="max-h-72 overflow-y-auto p-1.5 flex flex-col gap-0.5">
              <button
                v-for="z in filteredZones"
                :key="z.key"
                type="button"
                @click="selectZone(z.key)"
                @mouseenter="handleMouseEnter($event, zone === z.key)"
                @mouseleave="handleMouseLeave($event, zone === z.key)"
                class="w-full flex items-center justify-between gap-2 rounded-[10px] px-3 py-2.5 text-sm font-semibold text-left transition-colors"
                :style="zone === z.key ? 'background:#FFF0E4;color:#E61171' : 'color:#8A5A4E'"
              >
                <span class="flex items-center gap-2 truncate">
                  <span v-if="z.emoji">{{ z.emoji }}</span>
                  {{ z.label }}
                </span>
                <!-- Coche affichée uniquement sur le canton actuellement sélectionné -->
                <svg v-if="zone === z.key" viewBox="0 0 24 24" class="w-4 h-4 shrink-0" fill="none" stroke="#E61171"
                  stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>

              <!-- Message affiché si la recherche ne donne aucun résultat -->
              <p v-if="!filteredZones.length" class="text-center text-sm font-semibold py-4" style="color:#C9A9A0">
                Aucun canton trouvé
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- ===== Filtre Catégorie : pilules ===== -->
    <div>
      <p class="text-[11px] font-bold uppercase tracking-wider mb-2" style="color:#FF863D">{{ t('partnersFilterCategory') }}</p>
      <div class="flex flex-wrap gap-2">
        <!-- Pilule "Toutes les catégories" -->
        <button type="button" @click="emit('set-category', '')"
          class="rounded-full pl-3 pr-4 py-2 text-sm font-bold transition-all"
          :style="category === ''
            ? 'background:#E61171;color:#FFFFFF;border:2px solid #E61171'
            : 'background:#FFF8F4;color:#E61171;border:2px solid #FFE4D3'">
          {{ t('partnersCategoryAll') }}
        </button>
        <!-- Une pilule par catégorie de partenaire -->
        <button v-for="cat in partnerCategories" :key="cat.key" type="button" @click="emit('set-category', cat.key)"
          class="rounded-full pl-3 pr-4 py-2 text-sm font-bold transition-all flex items-center gap-1.5"
          :style="category === cat.key
            ? 'background:#E61171;color:#FFFFFF;border:2px solid #E61171'
            : 'background:#FFF8F4;color:#E61171;border:2px solid #FFE4D3'">
          <span>{{ cat.emoji }}</span>{{ t(cat.labelKey) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation d'ouverture/fermeture du panneau dropdown (fondu + léger glissement vertical) */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>