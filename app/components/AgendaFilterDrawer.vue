<!--
  AgendaFilterDrawer.vue
  ------------------------
  Tiroir (drawer) de filtres avancés pour l'agenda : région/canton, âge,
  activités, camps (avec logement), camps de jour et cours. S'affiche en
  plein écran depuis le bas sur mobile et en modale centrée sur desktop.
  Le composant est "contrôlé" : tout l'état des filtres vit dans le
  parent (prop "filters") et chaque interaction émet un événement pour
  que le parent mette à jour cet état.
-->
<script setup lang="ts">
import { cantons, ageGroups, campSubcategories } from '~/data/agendaData'
import { activitesItems, coursItems } from '~/data/menuData'

// Forme de l'objet représentant l'ensemble des filtres actifs de l'agenda
export interface AgendaFilters {
  dateFrom: string
  dateTo: string
  canton: string
  ages: string[]
  activites: string[]
  camps: string[]
  campsJour: string[]
  cours: string[]
}

const props = defineProps<{
  open: boolean                  // le tiroir est-il ouvert ?
  filters: AgendaFilters         // état actuel des filtres (fourni par le parent)
  resultCount: number            // nombre de résultats correspondant aux filtres, affiché sur le bouton "Appliquer"
  t: (key: string) => string     // fonction de traduction (i18n)
}>()

const emit = defineEmits<{
  close: []                      // ferme le tiroir sans réinitialiser les filtres
  reset: []                      // réinitialise tous les filtres
  'set-canton': [key: string]    // change le canton sélectionné
  toggle: [group: 'ages' | 'activites' | 'camps' | 'campsJour' | 'cours', key: string] // (dé)coche une option dans un groupe de filtres à choix multiple
}>()

// Indique si une option donnée est actuellement cochée dans un groupe de filtres
function isChecked(group: 'ages' | 'activites' | 'camps' | 'campsJour' | 'cours', key: string) {
  return props.filters[group].includes(key)
}
// Nombre d'options cochées dans un groupe donné (affiché en badge à côté du titre de section)
const sectionCount = (group: 'ages' | 'activites' | 'camps' | 'campsJour' | 'cours') => props.filters[group].length

// Nombre total de filtres actifs, tous groupes confondus (canton + toutes les cases cochées)
const totalActive = computed(() =>
  (props.filters.canton ? 1 : 0) +
  props.filters.ages.length + props.filters.activites.length +
  props.filters.camps.length + props.filters.campsJour.length + props.filters.cours.length
)

// Émojis décoratifs affichés sur les cartes de tranche d'âge
const ageEmoji: Record<string, string> = {
  bebe: '🍼', petitEnfant: '🧸', enfant: '⚽️', adolescent: '🎧', adulte: '☕️'
}
// Émojis décoratifs affichés sur les pilules de sous-catégories de camps
const campEmoji: Record<string, string> = {
  langues: '🗣️', loisirs: '🎨', sports: '🤸', etudes: '📚', it: '💻'
}

// ---------- Menu déroulant région, personnalisé ----------
const cantonOpen = ref(false)
const cantonSearch = ref('')
const cantonBoxEl = ref<HTMLElement | null>(null)

// Liste des cantons filtrée selon le texte de recherche
const filteredCantons = computed(() => {
  const q = cantonSearch.value.trim().toLowerCase()
  if (!q) return cantons
  return cantons.filter(c => c.label.toLowerCase().includes(q))
})
// Libellé du canton actuellement sélectionné, affiché sur le bouton déclencheur
const selectedCantonLabel = computed(() => cantons.find(c => c.key === props.filters.canton)?.label ?? props.t('filterRegionAll'))

// Sélectionne un canton et referme le dropdown
function chooseCanton(key: string) {
  emit('set-canton', key)
  cantonOpen.value = false
  cantonSearch.value = ''
}
// Ferme le dropdown canton si on clique en dehors de celui-ci
function handleClickOutside(e: MouseEvent) {
  if (cantonBoxEl.value && !cantonBoxEl.value.contains(e.target as Node)) cantonOpen.value = false
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

// ---------- Chips résumé : pastilles récapitulant tous les filtres actifs, affichées en haut du tiroir ----------
const activeChips = computed(() => {
  const chips: { group: 'ages' | 'activites' | 'camps' | 'campsJour' | 'cours' | 'canton'; key: string; label: string }[] = []
  if (props.filters.canton) {
    const c = cantons.find(c => c.key === props.filters.canton)
    if (c) chips.push({ group: 'canton', key: c.key, label: c.label })
  }
  for (const key of props.filters.ages) {
    const a = ageGroups.find(a => a.key === key)
    if (a) chips.push({ group: 'ages', key, label: props.t(a.labelKey) })
  }
  for (const key of props.filters.activites) chips.push({ group: 'activites', key, label: props.t(key) })
  for (const key of props.filters.camps) {
    const s = campSubcategories.find(s => s.key === key)
    if (s) chips.push({ group: 'camps', key, label: props.t(s.labelKey) })
  }
  for (const key of props.filters.campsJour) {
    const s = campSubcategories.find(s => s.key === key)
    if (s) chips.push({ group: 'campsJour', key, label: props.t(s.labelKey) })
  }
  for (const key of props.filters.cours) chips.push({ group: 'cours', key, label: props.t(key) })
  return chips
})
// Retire un filtre via sa chip (soit en vidant le canton, soit en décochant l'option correspondante)
function removeChip(chip: { group: string; key: string }) {
  if (chip.group === 'canton') emit('set-canton', '')
  else emit('toggle', chip.group as any, chip.key)
}

// Bloque le scroll du body pendant que le tiroir est ouvert
watch(() => props.open, (isOpen) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = isOpen ? 'hidden' : ''
})
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<template>
  <!-- Le tiroir est téléporté à la racine du body pour éviter les problèmes d'empilement (z-index) -->
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div v-if="open" class="fixed inset-0 z-[200]">
        <!-- Fond assombri, clic dessus = fermeture du tiroir -->
        <div class="absolute inset-0 bg-black/45 backdrop-blur-[2px]" @click="emit('close')"></div>

        <Transition name="drawer-slide" appear>
          <div v-if="open"
            class="absolute bottom-0 left-0 right-0 md:left-1/2 md:right-auto md:-translate-x-1/2 md:bottom-6 w-full md:w-[620px] max-h-[92vh] md:max-h-[84vh] flex flex-col rounded-t-[28px] md:rounded-[28px] shadow-2xl overflow-hidden"
            style="background:#FFF8F4">

            <!-- Petite poignée décorative, visible seulement sur mobile (indique que le tiroir se glisse depuis le bas) -->
            <div class="md:hidden flex justify-center pt-2.5 pb-1 shrink-0" style="background:#E61171">
              <span class="w-10 h-1 rounded-full" style="background:rgba(255,255,255,0.5)"></span>
            </div>

            <!-- En-tête : titre, compteur de filtres actifs, bouton fermer + chips des filtres actifs -->
            <div class="relative px-6 pt-3 pb-5 shrink-0" style="background:#E61171">
              <div class="relative flex items-center justify-between mb-1">
                <div>
                  <h2 class="text-white font-bold text-xl leading-tight">{{ t('agendaFiltresTitle') }}</h2>
                  <p class="text-[13px] mt-0.5 font-medium" style="color:#FFD1B5">
                    {{ totalActive > 0 ? `${totalActive} filtre${totalActive > 1 ? 's' : ''} actif${totalActive > 1 ? 's' : ''}` : t('agendaFilterBtn') }}
                  </p>
                </div>
                <button type="button" @click="emit('close')" :aria-label="t('filterClose')"
                  class="flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors hover:bg-white/15">
                  <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round">
                    <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
                  </svg>
                </button>
              </div>

              <!-- Chips résumant les filtres actifs : clic sur une chip = retire ce filtre -->
              <div v-if="activeChips.length" class="flex flex-wrap gap-2 mt-4">
                <button v-for="chip in activeChips" :key="chip.group + chip.key" type="button" @click="removeChip(chip)"
                  class="flex items-center gap-1.5 rounded-full pl-3 pr-2 py-1.5 text-xs font-bold transition-transform hover:-translate-y-0.5"
                  style="background:#FFCEE4;color:#E61171">
                  {{ chip.label }}
                  <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="#E61171" stroke-width="3" stroke-linecap="round">
                    <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Contenu scrollable : une section par groupe de filtres -->
            <div class="flex-1 overflow-y-auto overscroll-contain px-5 py-6 flex flex-col gap-5">

              <!-- ===== Section Région : menu déroulant personnalisé avec recherche ===== -->
              <section class="rounded-[18px] p-4" style="background:#FFFFFF;box-shadow:0 4px 14px rgba(230,17,113,0.06)">
                <h3 class="text-sm font-bold mb-3 tracking-[0.2px] flex items-center gap-2" style="color:#2E2F30">
                  <span class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm" style="background:#FFD1B5">📍</span>
                  {{ t('filterRegion') }}
                </h3>

                <div ref="cantonBoxEl" class="relative">
                  <button type="button" @click="cantonOpen = !cantonOpen"
                    class="w-full flex items-center justify-between rounded-[12px] px-4 py-3 text-sm font-semibold transition-colors"
                    style="background:#FFF8F4;border:2px solid #FFD1B5;color:#2E2F30">
                    <span :style="filters.canton ? 'color:#E61171' : 'color:#2E2F30'">{{ selectedCantonLabel }}</span>
                    <svg viewBox="0 0 24 24" class="w-4 h-4 shrink-0 transition-transform" :class="cantonOpen ? 'rotate-180' : ''"
                      fill="none" stroke="#E61171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  <Transition name="dropdown-fade">
                    <div v-if="cantonOpen"
                      class="absolute z-10 mt-2 w-full rounded-[14px] overflow-hidden shadow-lg"
                      style="background:#FFFFFF;border:2px solid #FFD1B5">
                      <div class="p-2" style="border-bottom:1px solid #FFE4D3">
                        <input v-model="cantonSearch" type="text" :placeholder="t('filterRegionAll')"
                          class="w-full rounded-[8px] px-3 py-2 text-sm outline-none"
                          style="background:#FFF8F4;color:#2E2F30" />
                      </div>
                      <div class="max-h-[220px] overflow-y-auto p-2 grid grid-cols-2 gap-1.5">
                        <button type="button" @click="chooseCanton('')"
                          class="col-span-2 text-left rounded-[8px] px-3 py-2 text-sm font-bold transition-colors"
                          :style="!filters.canton ? 'background:#E61171;color:#FFFFFF' : 'color:#E61171'">
                          {{ t('filterRegionAll') }}
                        </button>
                        <button v-for="c in filteredCantons" :key="c.key" type="button" @click="chooseCanton(c.key)"
                          class="text-left rounded-[8px] px-3 py-2 text-sm font-semibold transition-colors truncate"
                          :style="filters.canton === c.key ? 'background:#E61171;color:#FFFFFF' : 'color:#2E2F30'">
                          {{ c.label }}
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
              </section>

              <!-- ===== Section Âge : grille de cartes à sélection multiple ===== -->
              <section class="rounded-[18px] p-4" style="background:#FFFFFF;box-shadow:0 4px 14px rgba(230,17,113,0.06)">
                <h3 class="text-sm font-bold mb-3 tracking-[0.2px] flex items-center justify-between" style="color:#2E2F30">
                  <span class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm" style="background:#FFD1B5">🎂</span>
                    {{ t('filterAge') }}
                  </span>
                  <span v-if="sectionCount('ages')" class="text-[11px] font-bold rounded-full px-2 py-0.5" style="background:#FFCEE4;color:#E61171">
                    {{ sectionCount('ages') }}
                  </span>
                </h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button v-for="age in ageGroups" :key="age.key" type="button" @click="emit('toggle', 'ages', age.key)"
                    class="relative rounded-[14px] px-3 py-3 text-left transition-all"
                    :style="isChecked('ages', age.key)
                      ? 'background:#E61171;border:2px solid #E61171'
                      : 'background:#FFF8F4;border:2px solid #FFE4D3'">
                    <svg v-if="isChecked('ages', age.key)" viewBox="0 0 24 24" class="absolute top-1.5 right-1.5 w-3.5 h-3.5"
                      fill="none" stroke="#FFD1B5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span class="text-lg leading-none block mb-1">{{ ageEmoji[age.key] }}</span>
                    <span class="block text-sm font-bold pr-3" :style="isChecked('ages', age.key) ? 'color:#FFFFFF' : 'color:#E61171'">
                      {{ t(age.labelKey) }}
                    </span>
                    <span class="block text-[11px]" :style="isChecked('ages', age.key) ? 'color:#FFD1B5' : 'color:#9a9a9a'">
                      {{ age.range }}
                    </span>
                  </button>
                </div>
              </section>

              <!-- ===== Section Activités : pilules à sélection multiple ===== -->
              <section class="rounded-[18px] p-4" style="background:#FFFFFF;box-shadow:0 4px 14px rgba(230,17,113,0.06)">
                <h3 class="text-sm font-bold mb-3 tracking-[0.2px] flex items-center justify-between" style="color:#2E2F30">
                  <span class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm" style="background:#FFD1B5">⭐️</span>
                    {{ t('filterActivites') }}
                  </span>
                  <span v-if="sectionCount('activites')" class="text-[11px] font-bold rounded-full px-2 py-0.5" style="background:#FFCEE4;color:#E61171">
                    {{ sectionCount('activites') }}
                  </span>
                </h3>
                <div class="flex flex-wrap gap-2">
                  <button v-for="item in activitesItems" :key="item.key" type="button"
                    @click="emit('toggle', 'activites', item.key)"
                    class="rounded-full pl-2 pr-4 py-1.5 text-sm font-bold transition-all flex items-center gap-2"
                    :style="isChecked('activites', item.key)
                      ? 'background:#E61171;color:#FFFFFF;border:2px solid #E61171'
                      : 'background:#FFF8F4;color:#E61171;border:2px solid #FFE4D3'">
                    <span class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                      :style="isChecked('activites', item.key) ? 'background:rgba(255,255,255,0.2)' : 'background:#FFCEE4'">
                      <MenuIcon :name="item.icon" class="w-4 h-4" />
                    </span>
                    {{ t(item.key) }}
                  </button>
                </div>
              </section>

              <!-- ===== Section Camps avec logement : pilules à sélection multiple ===== -->
              <section class="rounded-[18px] p-4" style="background:#FFFFFF;box-shadow:0 4px 14px rgba(230,17,113,0.06)">
                <h3 class="text-sm font-bold mb-3 tracking-[0.2px] flex items-center justify-between" style="color:#2E2F30">
                  <span class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm" style="background:#FFD1B5">🏕️</span>
                    {{ t('filterCamps') }}
                  </span>
                  <span v-if="sectionCount('camps')" class="text-[11px] font-bold rounded-full px-2 py-0.5" style="background:#FFCEE4;color:#E61171">
                    {{ sectionCount('camps') }}
                  </span>
                </h3>
                <div class="flex flex-wrap gap-2">
                  <button v-for="sub in campSubcategories" :key="'camp-' + sub.key" type="button"
                    @click="emit('toggle', 'camps', sub.key)"
                    class="rounded-full pl-3.5 pr-4 py-2 text-sm font-bold transition-all flex items-center gap-1.5"
                    :style="isChecked('camps', sub.key)
                      ? 'background:#E61171;color:#FFFFFF;border:2px solid #E61171'
                      : 'background:#FFF8F4;color:#E61171;border:2px solid #FFE4D3'">
                    <span>{{ campEmoji[sub.key] }}</span>
                    {{ t(sub.labelKey) }}
                  </button>
                </div>
              </section>

              <!-- ===== Section Camps de jour : pilules à sélection multiple ===== -->
              <section class="rounded-[18px] p-4" style="background:#FFFFFF;box-shadow:0 4px 14px rgba(230,17,113,0.06)">
                <h3 class="text-sm font-bold mb-3 tracking-[0.2px] flex items-center justify-between" style="color:#2E2F30">
                  <span class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm" style="background:#FFD1B5">🎒</span>
                    {{ t('filterCampsJour') }}
                  </span>
                  <span v-if="sectionCount('campsJour')" class="text-[11px] font-bold rounded-full px-2 py-0.5" style="background:#FFCEE4;color:#E61171">
                    {{ sectionCount('campsJour') }}
                  </span>
                </h3>
                <div class="flex flex-wrap gap-2">
                  <button v-for="sub in campSubcategories" :key="'campjour-' + sub.key" type="button"
                    @click="emit('toggle', 'campsJour', sub.key)"
                    class="rounded-full pl-3.5 pr-4 py-2 text-sm font-bold transition-all flex items-center gap-1.5"
                    :style="isChecked('campsJour', sub.key)
                      ? 'background:#E61171;color:#FFFFFF;border:2px solid #E61171'
                      : 'background:#FFF8F4;color:#E61171;border:2px solid #FFE4D3'">
                    <span>{{ campEmoji[sub.key] }}</span>
                    {{ t(sub.labelKey) }}
                  </button>
                </div>
              </section>

              <!-- ===== Section Cours : pilules à sélection multiple ===== -->
              <section class="rounded-[18px] p-4" style="background:#FFFFFF;box-shadow:0 4px 14px rgba(230,17,113,0.06)">
                <h3 class="text-sm font-bold mb-3 tracking-[0.2px] flex items-center justify-between" style="color:#2E2F30">
                  <span class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm" style="background:#FFD1B5">🎓</span>
                    {{ t('filterCours') }}
                  </span>
                  <span v-if="sectionCount('cours')" class="text-[11px] font-bold rounded-full px-2 py-0.5" style="background:#FFCEE4;color:#E61171">
                    {{ sectionCount('cours') }}
                  </span>
                </h3>
                <div class="flex flex-wrap gap-2">
                  <button v-for="item in coursItems" :key="item.key" type="button"
                    @click="emit('toggle', 'cours', item.key)"
                    class="rounded-full pl-2 pr-4 py-1.5 text-sm font-bold transition-all flex items-center gap-2"
                    :style="isChecked('cours', item.key)
                      ? 'background:#E61171;color:#FFFFFF;border:2px solid #E61171'
                      : 'background:#FFF8F4;color:#E61171;border:2px solid #FFE4D3'">
                    <span class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                      :style="isChecked('cours', item.key) ? 'background:rgba(255,255,255,0.2)' : 'background:#FFCEE4'">
                      <MenuIcon :name="item.icon" class="w-4 h-4" />
                    </span>
                    {{ t(item.key) }}
                  </button>
                </div>
              </section>
            </div>

            <!-- Pied du tiroir, toujours visible : réinitialiser les filtres / appliquer et fermer -->
            <div class="flex items-center gap-3 px-5 py-4 shrink-0" style="border-top:1px solid #FFE4D3;background:#FFFFFF">
              <button type="button" @click="emit('reset')"
                class="rounded-[12px] px-5 py-3.5 text-sm font-bold shrink-0 transition-colors"
                style="background:#FFF8F4;color:#E61171;border:2px solid #FFE4D3">
                {{ t('agendaReset') }}
              </button>
              <button type="button" @click="emit('close')"
                class="flex-1 rounded-[12px] py-3.5 text-sm font-bold tracking-[0.2px] shadow-[0_8px_20px_rgba(230,17,113,0.3)] transition-transform hover:-translate-y-0.5"
                style="background:#E61171;color:#FFFFFF">
                {{ t('agendaApply') }} · {{ resultCount }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Fondu du fond assombri à l'ouverture/fermeture */
.drawer-fade-enter-active, .drawer-fade-leave-active { transition: opacity 0.25s ease; }
.drawer-fade-enter-from, .drawer-fade-leave-to { opacity: 0; }
/* Glissement vertical du panneau (depuis le bas de l'écran) */
.drawer-slide-enter-active, .drawer-slide-leave-active { transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1); }
.drawer-slide-enter-from, .drawer-slide-leave-to { transform: translateY(100%); }

/* Animation d'ouverture du dropdown "canton" */
.dropdown-fade-enter-active, .dropdown-fade-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-fade-enter-from, .dropdown-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>