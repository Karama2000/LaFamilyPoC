<!--
  AgendaFilterDrawer.vue
  ------------------------
  Tiroir (drawer) de filtres avancés pour l'agenda : région/canton, âge,
  activités, camps (avec logement), camps de jour et cours. S'affiche en
  plein écran depuis le bas sur mobile et en modale centrée sur desktop.
  Le composant est "contrôlé" : tout l'état des filtres vit dans le
  parent (prop "filters") et chaque interaction émet un événement pour
  que le parent mette à jour cet état.

  MODIFICATIONS PAR RAPPORT À LA VERSION PRÉCÉDENTE :
  1. Section "Région" : remplacée par une grille de cartes (comme Âge/Activités)
     au lieu d'un menu déroulant avec recherche. Sélection MULTIPLE (comme les
     autres groupes) + bouton "Choisir" qui replie la grille et affiche le(s)
     canton(s) retenu(s) en résumé.
  2. "canton" est maintenant un tableau (string[]) et non plus une string unique,
     exactement comme "ages", "activites", "camps", "campsJour", "cours".
  3. Chaque canton sélectionné apparaît comme une chip individuelle dans le
     résumé en haut du tiroir, au même titre que les autres filtres (cliquer
     sur la chip retire uniquement ce canton-là).
  4. Toutes les icônes (Âge, Activités, Camps, Camps de jour, Cours) :
     suppression du cercle rose de fond (#FFCEE4) qui entourait <MenuIcon>.
     L'icône est maintenant affichée seule, colorée en rose foncé (#E61171)
     ou en blanc quand l'option est sélectionnée.
  5. Cartes "Âge" : contenu centré (icône au-dessus du texte, tout centré)
     au lieu d'aligné à gauche.

  ------------------------------------------------------------------
  MODIFICATION TYPOGRAPHIE (cette passe) :
  ------------------------------------------------------------------
  Uniquement les balises <h2>, <h3> et <p> de ce fichier ont été
  remplacées par les composants BaseTitle / BaseText, pour que ce
  tiroir suive exactement la même échelle de tailles que le reste de
  l'application. Les <span> internes (labels de cantons, résumé
  sélectionné, sous-textes des cartes Âge...) n'ont volontairement
  PAS été touchés dans cette passe — ils gardent leurs classes
  Tailwind d'origine. Aucun contenu texte, aucune logique, aucune
  classe de mise en page (grille, flex, marges...) n'a changé :
  seules les classes de TAILLE/GRAISSE/INTERLIGNE portées par les
  anciens h2/h3/p ont été déplacées dans les composants Base.

  Détail des 8 remplacements effectués :
    - h2 "agendaFiltresTitle" (titre du tiroir)
        text-xl (20px, fixe) -> BaseTitle size="section"
        (20px mobile / 24px desktop, cohérent avec le reste de l'app)
    - p  (compteur "X filtres actifs", 13px)
        -> BaseText size="caption" bold (12px mobile / 14px desktop)
    - h3 "filterRegion" (titre de section, 14px/text-sm)
        -> BaseTitle size="card" (16px mobile / 20px desktop)
    - h3 "filterAge", "filterActivites", "filterCamps",
      "filterCampsJour", "filterCours" (5 titres de section identiques)
        -> BaseTitle size="card", mêmes valeurs que ci-dessus.
        Ces h3 ne contiennent pas de texte directement : le texte
        visible est porté par un <span style="color:#e61171"> à
        l'intérieur (non modifié). Le h3 lui-même ne sert que de
        conteneur flex (icône + titre alignés) — sa couleur d'origine
        est conservée en fallback via la prop "color" du composant.
-->
<script setup lang="ts">
import { cantons, ageGroups, campSubcategories } from "~/data/agendaData";
import { activitesItems, coursItems } from "~/data/menuData";

// Forme de l'objet représentant l'ensemble des filtres actifs de l'agenda
export interface AgendaFilters {
  dateFrom: string;
  dateTo: string;
  canton: string[]; // multi-sélection, comme les autres groupes ci-dessous
  ages: string[];
  activites: string[];
  camps: string[];
  campsJour: string[];
  cours: string[];
  // Grandes catégories sélectionnées depuis le menu principal.
  categories: string[];
}

const props = defineProps<{
  open: boolean; // le tiroir est-il ouvert ?
  filters: AgendaFilters; // état actuel des filtres (fourni par le parent)
  resultCount: number; // nombre de résultats correspondant aux filtres, affiché sur le bouton "Appliquer"
  t: (key: string) => string; // fonction de traduction (i18n)
}>();

const emit = defineEmits<{
  close: []; // ferme le tiroir sans réinitialiser les filtres
  reset: []; // réinitialise tous les filtres
  "set-canton": [keys: string[]]; // remplace la liste complète des cantons sélectionnés
  toggle: [
    group: "ages" | "activites" | "camps" | "campsJour" | "cours",
    key: string,
  ]; // (dé)coche une option dans un groupe de filtres à choix multiple
}>();

// Indique si une option donnée est actuellement cochée dans un groupe de filtres
function isChecked(
  group: "ages" | "activites" | "camps" | "campsJour" | "cours",
  key: string,
) {
  return props.filters[group].includes(key);
}
// Nombre d'options cochées dans un groupe donné (affiché en badge à côté du titre de section)
const sectionCount = (
  group: "ages" | "activites" | "camps" | "campsJour" | "cours",
) => props.filters[group].length;

// Nombre total de filtres actifs, tous groupes confondus (cantons + toutes les cases cochées)
const totalActive = computed(
  () =>
    props.filters.canton.length +
    props.filters.ages.length +
    props.filters.activites.length +
    props.filters.camps.length +
    props.filters.campsJour.length +
    props.filters.cours.length,
);

// Icônes (MenuIcon) affichées sur les cartes de tranche d'âge — noms de fichiers du dossier icones/menu
const ageIcon: Record<string, string> = {
  bebe: "bebe",
  petitEnfant: "petiteEnfance",
  enfant: "enfance",
  adolescent: "adolescence",
  adulte: "travail",
};
// Icônes (MenuIcon) affichées sur les pilules de sous-catégories de camps — noms de fichiers du dossier icones/menu
const campIcon: Record<string, string> = {
  langues: "cours de langue",
  loisirs: "loisirs",
  sports: "sports",
  etudes: "etudes",
  digital: "digital",
};

// noUncheckedIndexedAccess considère qu’un accès record[clé] peut être undefined.
// Ces helpers garantissent toujours une chaîne valide à MenuIcon.
function ageIconName(key: string, selected: boolean): string {
  const icon = ageIcon[key] ?? "bebe";
  return selected ? `${icon}-blanc` : icon;
}

function campIconName(key: string, selected: boolean): string {
  const icon = campIcon[key] ?? "loisirs";
  return selected ? `${icon}-blanc` : icon;
}

// ---------- Section Région : grille de cartes (remplace l'ancien menu déroulant) ----------
// "regionOpen" contrôle si la grille de sélection est dépliée ou repliée sur un résumé.
// Par défaut fermée (repliée), avec "Toute la Suisse" affiché en résumé tant qu'aucun
// canton n'est choisi — exactement comme demandé ("par défaut Toute la Suisse").
const regionOpen = ref(false);

// Choix temporaire de régions pendant que la grille est ouverte (multi-sélection)
const draftCantons = ref<string[]>([]);

// Libellé résumé (état confirmé, replié) : "Toute la Suisse", 1 canton,
// ou "X régions sélectionnées" si plusieurs
const selectedCantonLabel = computed(() => {
  const selected = props.filters.canton;
  if (!selected || selected.length === 0) return props.t("filterRegionAll");
  if (selected.length === 1) {
    return (
      cantons.find((c) => c.key === selected[0])?.label ??
      props.t("filterRegionAll")
    );
  }
  return `${selected.length} ${props.t("filterRegionSelected")}`; // ex: "3 régions sélectionnées"
});

// Libellé complet de tous les cantons cochés, pour le tooltip du résumé replié
// (utile dès qu'il y a plus d'un canton, sinon le libellé seul suffit déjà)
const selectedCantonsTooltip = computed(() => {
  const selected = props.filters.canton;
  if (selected.length <= 1) return "";
  return cantons
    .filter((c) => selected.includes(c.key))
    .map((c) => c.label)
    .join(", ");
});

// Ouvre la grille : repart de l'état confirmé actuel (pas d'un tableau vide)
function openRegion() {
  draftCantons.value = [...props.filters.canton];
  regionOpen.value = true;
}

// Toggle d'un canton dans le draft :
// - cliquer sur "Toute la Suisse" (key === '') vide tout le tableau
// - cliquer sur un canton déjà sélectionné le retire (désélection)
// - cliquer sur un canton non sélectionné l'ajoute
function chooseCanton(key: string) {
  if (key === "") {
    draftCantons.value = [];
    return;
  }
  const idx = draftCantons.value.indexOf(key);
  if (idx === -1) {
    draftCantons.value.push(key);
  } else {
    draftCantons.value.splice(idx, 1);
  }
}

// Valide le(s) choix : replie la grille et émet le tableau complet
function confirmCanton() {
  emit("set-canton", draftCantons.value);
  regionOpen.value = false;
}
// Réinitialise le filtre région : vide le draft, émet un tableau vide (= "Toute la Suisse")
// et replie la grille, exactement comme cliquer sur "Toute la Suisse" puis "Choisir"
function resetCanton() {
  draftCantons.value = [];
  emit("set-canton", []);
  regionOpen.value = false;
}

// Un canton occupe toute la largeur de la grille (comme "Toute la Suisse")
// si son libellé dépasse 14 caractères, sinon il reste sur 1 des 2 colonnes.
function cantonSpanClass(label: string) {
  return label.length > 14 ? "col-span-2" : "";
}

// ---------- Chips résumé : pastilles récapitulant tous les filtres actifs, affichées en haut du tiroir ----------
const activeChips = computed(() => {
  const chips: {
    group: "ages" | "activites" | "camps" | "campsJour" | "cours" | "canton";
    key: string;
    label: string;
  }[] = [];
  // Une chip PAR canton sélectionné, exactement comme pour les autres groupes
  for (const key of props.filters.canton) {
    const c = cantons.find((c) => c.key === key);
    if (c) chips.push({ group: "canton", key, label: c.label });
  }
  for (const key of props.filters.ages) {
    const a = ageGroups.find((a) => a.key === key);
    if (a) chips.push({ group: "ages", key, label: props.t(a.labelKey) });
  }
  for (const key of props.filters.activites)
    chips.push({ group: "activites", key, label: props.t(key) });
  for (const key of props.filters.camps) {
    const s = campSubcategories.find((s) => s.key === key);
    if (s) chips.push({ group: "camps", key, label: props.t(s.labelKey) });
  }
  for (const key of props.filters.campsJour) {
    const s = campSubcategories.find((s) => s.key === key);
    if (s) chips.push({ group: "campsJour", key, label: props.t(s.labelKey) });
  }
  for (const key of props.filters.cours)
    chips.push({ group: "cours", key, label: props.t(key) });
  return chips;
});

// Retire un filtre via sa chip :
// - pour un canton, on retire uniquement CE canton du tableau et on ré-émet le reste
// - pour les autres groupes, on décoche l'option correspondante
function removeChip(chip: { group: string; key: string }) {
  if (chip.group === "canton") {
    emit(
      "set-canton",
      props.filters.canton.filter((k) => k !== chip.key),
    );
  } else {
    emit("toggle", chip.group as any, chip.key);
  }
}

// Bloque le scroll du body pendant que le tiroir est ouvert
watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
  },
);
onBeforeUnmount(() => {
  if (typeof document !== "undefined") document.body.style.overflow = "";
});
</script>

<template>
  <!-- Le tiroir est téléporté à la racine du body pour éviter les problèmes d'empilement (z-index) -->
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div v-if="open" class="fixed inset-0 z-[200]">
        <!-- Fond assombri, clic dessus = fermeture du tiroir -->
        <div
          class="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
          @click="emit('close')"
        ></div>

        <Transition name="drawer-slide" appear>
          <div
            v-if="open"
            class="absolute bottom-0 left-0 right-0 md:left-1/2 md:right-auto md:-translate-x-1/2 md:bottom-6 w-full md:w-[620px] max-h-[92vh] md:max-h-[84vh] flex flex-col rounded-t-[10px] md:rounded-[28px] shadow-2xl overflow-hidden"
            style="background: #fff8f4"
          >
            <!-- Petite poignée décorative, visible seulement sur mobile (indique que le tiroir se glisse depuis le bas) -->
            <div
              class="md:hidden flex justify-center pt-2.5 pb-1 shrink-0"
              style="background: #e61171"
            >
              <span
                class="w-10 h-1 rounded-full"
                style="background: rgba(255, 255, 255, 0.5)"
              ></span>
            </div>

            <!-- En-tête : titre, compteur de filtres actifs, bouton fermer + chips des filtres actifs -->
            <div
              class="relative px-6 pt-3 pb-5 shrink-0"
              style="background: #e61171"
            >
              <div class="relative flex items-center justify-between mb-1">
                <div class="flex items-center gap-2">
                 
                  <BaseTitle size="section" tag="h2" color="#ffffff" class="leading-tight">
                    {{ t("agendaFiltresTitle") }}
                  </BaseTitle>

                 
                  <BaseText size="caption" bold color="#ffd1b5" class="mt-0.5 font-semibold">
                    {{
                      totalActive > 0
                        ? `${totalActive} filtre${totalActive > 1 ? "s" : ""} actif${totalActive > 1 ? "s" : ""}`
                        : t("")
                    }}
                  </BaseText>
                </div>
                <button
                  type="button"
                  @click="emit('close')"
                  :aria-label="t('filterClose')"
                  class="flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors hover:bg-white/15"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="w-5 h-5"
                    fill="none"
                    stroke="#FFFFFF"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  >
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </svg>
                </button>
              </div>

              <!-- Chips résumant les filtres actifs : clic sur une chip = retire ce filtre -->
              <div v-if="activeChips.length" class="flex flex-wrap gap-2 mt-4">
                <BaseButton
                  v-for="chip in activeChips"
                  :key="chip.group + chip.key"
                  variant="chip"
                  type="button"
                  @click="removeChip(chip)"
                  class="transition-transform hover:-translate-y-0.5 "
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

            <!-- Contenu scrollable : une section par groupe de filtres -->
            <div
              class="flex-1 overflow-y-auto overscroll-contain px-5 py-6 flex flex-col gap-5"
            >
              <!-- ===== Section Région : résumé replié OU 2 blocs dépliés (sélection actuelle + grille) ===== -->
              <section
                class="rounded-[10px] p-4 transition-colors"
                :style="
                  filters.canton.length
                    ? 'background:#FFFFFF;border:2px solid #E61171;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                    : 'background:#FFFFFF;border:2px solid transparent;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                "
              >
                <!-- BLOC 1 : titre "Région" (toujours visible) -->
                <!--
                  AVANT : <h3 class="text-sm font-bold mb-3 tracking-[0.2px]" style="color:#e61171">
                  APRÈS : BaseTitle size="card" (16px mobile / 20px desktop).
                  Les classes de mise en page (mb-3, tracking) sont conservées
                  telles quelles via l'attribut class du composant.
                -->
                <BaseTitle size="card" tag="h3" color="#e61171" class="mb-3 tracking-[0.2px]">
                  {{ t("filterRegion") }}
                </BaseTitle>

                <!--
                  État REPLIÉ
                -->
                <BaseButton
                  v-if="!regionOpen"
                  variant="thinOutline"
                  full-width
                  class="!justify-between"
                  style="background-color: #fff8f4"
                  :title="selectedCantonsTooltip"
                  @click="openRegion"
                >
                  <span class="text-[#444444b0]">
                    {{ selectedCantonLabel }}
                  </span>

                  <svg
                    viewBox="0 0 24 24"
                    class="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </BaseButton>
                <!--
                  BLOC DÉPLIÉ
                -->
                <div v-else>
                  <!-- Résumé confirmé -->
                  <BaseButton
                    variant="thinOutline"
                    style="background-color: #fff8f4"
                    full-width
                    class="!justify-between mb-3"
                    @click="confirmCanton"
                  >
                    <span class="text-[#444444b0]">
                      {{ selectedCantonLabel }}
                    </span>

                    <svg
                      viewBox="0 0 24 24"
                      class="w-4 h-4 shrink-0 rotate-180"
                      fill="none"
                      stroke="#E61171"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </BaseButton>

                  <!-- Grille des cantons -->
                  <div class="grid grid-cols-2 gap-2.5 mb-3">
                    <!-- Toute la Suisse -->
                    <BaseButton
                      variant="region"
                      :selected="draftCantons.length === 0"
                      class="col-span-2"
                      @click="chooseCanton('')"
                    >
                      {{ t("filterRegionAll") }}
                    </BaseButton>

                    <!-- Cantons -->
                    <BaseButton
                      v-for="c in cantons"
                      :key="c.key"
                      variant="region"
                      :selected="draftCantons.includes(c.key)"
                      :class="[
                        '!rounded-[14px] !px-3 !py-2.5 !text-sm',
                        cantonSpanClass(c.label),
                        'truncate',
                      ]"
                      @click="chooseCanton(c.key)"
                    >
                      {{ c.label }}
                    </BaseButton>
                  </div>

                  <!-- Réinitialiser + Choisir -->
                  <div class="flex justify-center gap-3 mt-4">
                    <BaseButton
                      variant="softOutline"
                      class="!w-[140px] !h-[44px]"
                      @click="resetCanton"
                    >
                      {{ t("filterReset") }}
                    </BaseButton>

                    <BaseButton
                      variant="pink"
                      class="!w-[192px] !h-[44px]"
                      @click="confirmCanton"
                    >
                      {{ t("filterRegionChoisir") }}
                    </BaseButton>
                  </div>
                </div>
              </section>

              

              <!-- ===== Section Âge : grille de cartes CENTRÉES à sélection multiple ===== -->

             
              <section
                class="rounded-[10px] p-4 transition-colors"
                :style="
                  sectionCount('ages')
                    ? 'background:#FFFFFF;border:2px solid #E61171;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                    : 'background:#FFFFFF;border:2px solid transparent;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                "
              >
               
                <BaseTitle
                  size="card"
                  tag="h3"
                  color="#2e2f30"
                  class="mb-3 tracking-[0.2px] flex items-center justify-between"
                >
                  <span style="color: #e61171">{{ t("filterAge") }}</span>
                </BaseTitle>
                <div class="flex flex-wrap justify-center gap-1.5">
                
                  
                  <BaseButton
                    v-for="age in ageGroups"
                    :key="age.key"
                    variant="filter"
                    :selected="isChecked('ages', age.key)"
                    @click="emit('toggle', 'ages', age.key)"
                    class="w-[104px] h-[70px] flex-col !gap-1"
                  >
                    <MenuIcon
                      :name="ageIconName(age.key, isChecked('ages', age.key))"
                      class="w-6 h-6"
                    />

                    <span
                      :class="isChecked('ages', age.key) ? 'text-white' : 'text-brand-pink'"
                      class="text-[13px] leading-tight"
                    >
                      {{ t(age.labelKey) }}
                    </span>

                    <span
                      :class="isChecked('ages', age.key) ? 'text-white' : 'text-[#9A9A9A]'"
                      class="text-[10px] leading-tight"
                    >
                      {{ age.range }}
                    </span>
                  </BaseButton>
                </div>
              </section>

              <!-- ===== Section Activités : pilules à sélection multiple ===== -->
             
              <section
                class="rounded-[10px] p-4 transition-colors"
                :style="
                  sectionCount('activites')
                    ? 'background:#FFFFFF;border:2px solid #E61171;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                    : 'background:#FFFFFF;border:2px solid transparent;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                "
              >
                
                <BaseTitle
                  size="card"
                  tag="h3"
                  color="#2e2f30"
                  class="mb-3 tracking-[0.2px] flex items-center justify-between"
                >
                  <span style="color: #e61171">{{ t("filterActivites") }}</span>
                </BaseTitle>
                <div class="flex flex-wrap justify-center gap-2">
                  <!-- ici -->
                  <BaseButton
                    v-for="item in activitesItems"
                    :key="item.key"
                    variant="filter"
                    :selected="isChecked('activites', item.key)"
                    @click="emit('toggle', 'activites', item.key)"
                    class="w-[230px] h-[44px] !px-3"
                  >
                    <MenuIcon
                      :name="item.icon + (isChecked('activites', item.key) ? '-blanc' : '')"
                      class="w-5 h-5"
                    />

                    {{ t(item.key) }}
                  </BaseButton>
                </div>
              </section>

              <!-- ===== Section Camps avec logement : pilules à sélection multiple ===== -->
             
              <section
                class="rounded-[10px] p-4 transition-colors"
                :style="
                  sectionCount('camps')
                    ? 'background:#FFFFFF;border:2px solid #E61171;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                    : 'background:#FFFFFF;border:2px solid transparent;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                "
              >
              
                <BaseTitle
                  size="card"
                  tag="h3"
                  color="#2e2f30"
                  class="mb-3 tracking-[0.2px] flex items-center justify-between"
                >
                  <span style="color: #e61171">{{ t("filterCamps") }}</span>
                </BaseTitle>
                <div class="flex flex-wrap justify-center gap-2">
                  <BaseButton
                    v-for="sub in campSubcategories"
                    :key="'camp-' + sub.key"
                    variant="filter"
                    :selected="isChecked('camps', sub.key)"
                    @click="emit('toggle', 'camps', sub.key)"
                    class="w-[150px] h-[44px] px-3"
                  >
                    <MenuIcon
                      :name="campIconName(sub.key, isChecked('camps', sub.key))"
                      class="w-5 h-5"
                    />

                    {{ t(sub.labelKey) }}
                  </BaseButton>
                </div>
              </section>

              <!-- ===== Section Camps de jour : pilules à sélection multiple ===== -->
             
              <section
                class="rounded-[10px] p-4 transition-colors"
                :style="
                  sectionCount('campsJour')
                    ? 'background:#FFFFFF;border:2px solid #E61171;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                    : 'background:#FFFFFF;border:2px solid transparent;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                "
              >
                <!-- Même remplacement que "filterAge" ci-dessus : h3 -> BaseTitle, span interne inchangé. -->
                <BaseTitle
                  size="card"
                  tag="h3"
                  color="#2e2f30"
                  class="mb-3 tracking-[0.2px] flex items-center justify-between"
                >
                  <span style="color: #e61171">{{ t("filterCampsJour") }}</span>
                </BaseTitle>
                <div class="flex flex-wrap justify-center gap-1.5">
                  <BaseButton
                    v-for="sub in campSubcategories"
                    :key="'campjour-' + sub.key"
                    variant="filter"
                    :selected="isChecked('campsJour', sub.key)"
                    @click="emit('toggle', 'campsJour', sub.key)"
                    class="w-[150px] h-[44px] px-3"
                  >
                    <MenuIcon
                      :name="campIconName(sub.key, isChecked('campsJour', sub.key))"
                      class="w-5 h-5"
                    />

                    {{ t(sub.labelKey) }}
                  </BaseButton>
                </div>
              </section>

              <!-- ===== Section Cours : pilules à sélection multiple ===== -->
             
              <section
                class="rounded-[10px] p-4 transition-colors"
                :style="
                  sectionCount('cours')
                    ? 'background:#FFFFFF;border:2px solid #E61171;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                    : 'background:#FFFFFF;border:2px solid transparent;box-shadow:0 4px 14px rgba(230,17,113,0.06)'
                "
              >
               
                <BaseTitle
                  size="card"
                  tag="h3"
                  color="#2e2f30"
                  class="mb-3 tracking-[0.2px] flex items-center justify-between"
                >
                  <span style="color: #e61171">{{ t("filterCours") }}</span>
                </BaseTitle>
                <div class="flex flex-wrap justify-center gap-2">
                  <BaseButton
                    v-for="item in coursItems"
                    :key="item.key"
                    variant="filter"
                    :selected="isChecked('cours', item.key)"
                    @click="emit('toggle', 'cours', item.key)"
                    class="w-[200px] h-[44px] px-3"
                  >
                    <MenuIcon
                      :name="item.icon + (isChecked('cours', item.key) ? '-blanc' : '')"
                      class="w-5 h-5"
                    />

                    {{ t(item.key) }}
                  </BaseButton>
                </div>
              </section>
            </div>
            <!-- Pied du tiroir, toujours visible : réinitialiser les filtres / rechercher -->
            <div
              class="flex items-center gap-3 px-5 py-4 shrink-0"
              style="border-top: 1px solid #ffe4d3; background: #ffffff"
            >
              <BaseButton
                variant="softOutline"
                @click="emit('reset')"
                class="shrink-0"
              >
                {{ t("agendaReset") }}
              </BaseButton>
              <!--
                Bouton "Rechercher" : valide tous les filtres choisis et lance la recherche.
                Utilise la même clé de traduction "agendaApply" — pense à changer sa VALEUR
                dans staticTexts.ts en "Rechercher" pour chaque langue (fr/en/de/it) si ce
                n'est pas déjà fait, plutôt que de renommer la clé partout dans le code.
              -->

              <BaseButton
                variant="pinkShadow"
                @click="emit('close')"
                class="flex-1"
              >
                {{ t("agendaApply") }}
              </BaseButton>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Fondu du fond assombri à l'ouverture/fermeture */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}
/* Glissement vertical du panneau (depuis le bas de l'écran) */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateY(100%);
}
</style>