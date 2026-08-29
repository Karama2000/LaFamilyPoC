<!--
  PartnersFilterBar.vue
  -----------------------
  Barre de filtres pour la liste des partenaires :
    - un menu déroulant personnalisé pour choisir un canton (zone), en 2 temps :
      on choisit dans la liste (draft), puis on clique "Choisir" pour confirmer
    - une rangée de pilules pour choisir une ou PLUSIEURS catégories de partenaire
      (multi-sélection, comme les filtres de l'agenda)
  Les filtres actifs sont pilotés par le parent via les props "zone" et
  "category" et les événements "set-zone" / "set-category".

  MODIFICATIONS :
  1. Suppression du code lié à un éventuel "emoji" sur les zones (n'existe pas
     dans la liste "zones", ça n'affichait jamais rien mais polluait le code).
  2. Le panneau du dropdown fait maintenant EXACTEMENT la même largeur que le
     bouton déclencheur (plus de left-4/right-4 qui le désalignait).
  3. Sélection de zone en 2 temps : cliquer une zone la sélectionne dans un
     état "draft" (surbrillance immédiate) SANS fermer le dropdown ni valider.
     Le bouton "Choisir" apparaît dès qu'un draft est en cours, et c'est lui
     qui valide (émet vers le parent) et ferme le dropdown.
  4. "category" est maintenant un tableau (string[]) et non plus une string
     unique : sélection multiple de catégories, comme ages/activites/etc.
     dans AgendaFilterDrawer.vue. Résumé en bas : nombre de filtres actifs,
     chips des filtres actifs (retirables), bouton "Réinitialiser".
-->
<script setup lang="ts">
import { partnerCategories as partnerCategoriesData  } from "~/data/partnersData";
import PartnerIcon from "~/components/PartnerIcon.vue";

const props = defineProps<{
  zone: string[]; // clés des cantons CONFIRMÉS (multi-sélection)
  category: string[]; // clés des catégories CONFIRMÉES (multi-sélection)
  t: (key: string) => string;
}>();

const emit = defineEmits<{
  (e: "set-zone", value: string[]): void;
  (e: "set-category", value: string[]): void;
}>();

const partnerCategories = [
  { key: "partnerCatEcole", labelKey: "partnerCatEcole" },
  { key: "partnerCatMusee", labelKey: "partnerCatMusee" },
  { key: "partnerCatAssociation", labelKey: "partnerCatAssociation" },
  { key: "partnerCatGardeEnfants", labelKey: "partnerCatGardeEnfants" },
  { key: "partnerCatCabinet", labelKey: "partnerCatCabinet" },
  { key: "partnerCatExpert", labelKey: "partnerCatExpert" },
];

const zones = [
  { key: "AG", label: "Argovie" },
  { key: "AI", label: "Appenzell Rhodes-Intérieures" },
  { key: "AR", label: "Appenzell Rhodes-Extérieures" },
  { key: "BE", label: "Berne" },
  { key: "BL", label: "Bâle-Campagne" },
  { key: "BS", label: "Bâle-Ville" },
  { key: "FR", label: "Fribourg" },
  { key: "GE", label: "Genève" },
  { key: "GL", label: "Glaris" },
  { key: "GR", label: "Grisons" },
  { key: "JU", label: "Jura" },
  { key: "LU", label: "Lucerne" },
  { key: "NE", label: "Neuchâtel" },
  { key: "NW", label: "Nidwald" },
  { key: "OW", label: "Obwald" },
  { key: "SG", label: "Saint-Gall" },
  { key: "SH", label: "Schaffhouse" },
  { key: "SO", label: "Soleure" },
  { key: "SZ", label: "Schwytz" },
  { key: "TG", label: "Thurgovie" },
  { key: "TI", label: "Tessin" },
  { key: "UR", label: "Uri" },
  { key: "VD", label: "Vaud" },
  { key: "VS", label: "Valais" },
  { key: "ZG", label: "Zoug" },
  { key: "ZH", label: "Zurich" },
];

const zoneOpen = ref(false);
const zoneSearch = ref("");
const zoneWrapper = ref<HTMLElement | null>(null);

// Choix temporaire de zones (tableau) pendant que le dropdown est ouvert
const draftZones = ref<string[]>([]);

const filteredZones = computed(() => {
  const q = zoneSearch.value.trim().toLowerCase();
  if (!q) return zones;
  return zones.filter(
    (z) => z.label.toLowerCase().includes(q) || z.key.toLowerCase().includes(q),
  );
});

// Ouvre le dropdown : repart des zones CONFIRMÉES actuelles comme point de départ du draft
function openZoneDropdown() {
  draftZones.value = [...props.zone];
  zoneOpen.value = true;
}

// Clic sur une zone : (dé)sélectionne dans le DRAFT, sans fermer le dropdown
function pickZone(key: string) {
  const idx = draftZones.value.indexOf(key);
  if (idx === -1) draftZones.value.push(key);
  else draftZones.value.splice(idx, 1);
}

// Valide le draft : émet le tableau vers le parent, referme le dropdown
function confirmZone() {
  emit("set-zone", [...draftZones.value]);
  zoneOpen.value = false;
  zoneSearch.value = "";
}

function handleMouseEnter(event: MouseEvent, isSelected: boolean) {
  const target = event.currentTarget as HTMLElement | null;
  if (target) target.style.background = isSelected ? "#FFF0E4" : "#FFF8F4";
}
function handleMouseLeave(event: MouseEvent, isSelected: boolean) {
  const target = event.currentTarget as HTMLElement | null;
  if (target) target.style.background = isSelected ? "#FFF0E4" : "transparent";
}

// Ferme le dropdown sans valider si on clique en dehors (le draft est abandonné)
function onClickOutside(e: MouseEvent) {
  if (zoneWrapper.value && !zoneWrapper.value.contains(e.target as Node)) {
    zoneOpen.value = false;
  }
}

onMounted(() => document.addEventListener("click", onClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", onClickOutside));

// ---------- Catégorie : multi-sélection ----------
function toggleCategory(key: string) {
  const idx = props.category.indexOf(key);
  const next = [...props.category];
  if (idx === -1) next.push(key);
  else next.splice(idx, 1);
  emit("set-category", next);
}

// ---------- Résumé des filtres actifs ----------
const activeCount = computed(() => props.zone.length + props.category.length);

const activeChips = computed(() => {
  const chips: { group: "zone" | "category"; key: string; label: string }[] =
    [];
  for (const zKey of props.zone) {
    const z = zones.find((z) => z.key === zKey);
    if (z) chips.push({ group: "zone", key: z.key, label: z.label });
  }
  for (const key of props.category) {
    const c = partnerCategories.find((c) => c.key === key);
    if (c) chips.push({ group: "category", key, label: props.t(c.labelKey) });
  }
  return chips;
});

function removeChip(chip: { group: string; key: string }) {
  if (chip.group === "zone") {
    emit(
      "set-zone",
      props.zone.filter((z) => z !== chip.key),
    );
  } else {
    toggleCategory(chip.key);
  }
}

</script>

<template>
  <div
    class="rounded-[10px] bg-white shadow-[0_10px_24px_rgba(230,17,113,0.07)] p-4 md:p-5 flex flex-col gap-4"
    style="border: 1px solid #ffd1b5"
  >
    <!-- ===== Filtre Zone : dropdown personnalisé avec recherche ===== -->
    <div>
      <p
        class="text-[14px] font-bold tracking-wider mb-2"
        style="color: #e61171"
      >
        {{ t("partnersFilterZone") }}
      </p>

      <div ref="zoneWrapper" class="relative w-full ">
        <!-- Bouton déclencheur : affiche le nombre de zones confirmées, ou "Toute la Suisse" -->

        <BaseButton
          type="button"
          variant="thinOutline"
          :full-width="true"
          class="!justify-between !pl-4 !pr-3 !py-2.5 !text-sm "
          style="background: #fff8f4"
          @click="zoneOpen ? (zoneOpen = false) : openZoneDropdown()"
        >
          <span class="flex items-center gap-1.5 truncate">
            <template v-if="zone.length === 0"> Toute la Suisse </template>

            <template v-else-if="zone.length === 1">
              {{ zones.find((z) => z.key === zone[0])?.label }}
            </template>

            <template v-else> {{ zone.length }} cantons sélectionnés </template>
          </span>

          <svg
            viewBox="0 0 24 24"
            class="w-4 h-4 shrink-0 transition-transform duration-200"
            :class="zoneOpen ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </BaseButton>

        <!-- Panneau du dropdown : largeur EXACTEMENT identique au bouton déclencheur -->
        <Transition name="dropdown">
          <div
            v-if="zoneOpen"
            class="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-[10px] overflow-hidden"
            style="
              background: #ffffff;
              border: 2px solid #ffe4d3;
              box-shadow: 0px 16px 40px rgba(230, 17, 113, 0.16);
            "
          >
            <!-- ============================= -->
            <!-- RECHERCHE + BOUTON CHOISIR -->
            <!-- ============================= -->
            <div class="relative h-[69px] px-[11px] pt-[13px]">
              <!-- Champ recherche : se rétrécit automatiquement quand "Choisir" est visible (pr-[71px] déjà prévu dans le CSS via width calc) -->
              <div
                class="relative h-[32px]"
                :class="draftZones !== null ? 'w-[calc(100%-71px)]' : 'w-full'"
              >
                <input
                  v-model="zoneSearch"
                  type="text"
                  placeholder="Rechercher un canton..."
                  class="w-full h-[32px] rounded-[10px] outline-none pl-[36px] pr-3 font-semibold"
                  style="
                    background: #fff8f4;
                    color: #e61171;
                    font-size: 12.8px;
                    line-height: 15px;
                  "
                  @click.stop
                />
                <svg
                  viewBox="0 0 24 24"
                  class="pointer-events-none absolute left-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px]"
                  fill="none"
                  stroke="#E61171"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              <!-- Bouton CHOISIR : visible dès qu'au moins une zone est cochée dans le draft -->

              <BaseButton
                v-if="draftZones.length > 0"
                type="button"
                variant="rosePale"
                class="!absolute !right-[11px] !top-[13px] !w-[64px] !h-[29px] !px-0 !py-0 !text-[10.5px] !leading-[16px] !tracking-[0.3px]"
                @click.stop="confirmZone"
              >
                Choisir
              </BaseButton>
            </div>

            <!-- ============================= -->
            <!-- LISTE DES CANTONS -->
            <!-- ============================= -->
            <div
              class="overflow-y-auto px-[6px] pb-2 flex flex-col gap-[2px]"
              style="
                height: calc(100vh - 160px);
                min-height: 400px;
                max-height: 1139px;
              "
            >
              <!-- Liste des cantons : chaque clic (dé)coche dans le draft, sans fermer -->

              <BaseButton
                v-for="z in filteredZones"
                :key="z.key"
                type="button"
                variant="region"
                :selected="draftZones.includes(z.key)"
                class="!w-full !h-[40px] !min-h-[40px] !justify-between !px-[12px] !py-0 !text-left !text-[13.2px] !leading-[20px]"
                @click="pickZone(z.key)"
              >
                <span class="truncate">{{ z.label }}</span>

                <svg
                  v-if="draftZones.includes(z.key)"
                  viewBox="0 0 24 24"
                  class="w-[16px] h-[16px] shrink-0 ml-2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="5 12 10 17 19 7" />
                </svg>
              </BaseButton>
              <!-- Aucun résultat -->
              <p
                v-if="!filteredZones.length"
                class="text-center py-4 font-semibold"
                style="color: #c9a9a0; font-size: 12.8px"
              >
                Aucun canton trouvé
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- ===== Filtre Catégorie : pilules à sélection MULTIPLE ===== -->
    <div>
      <p
        class="text-[14px] font-bold tracking-wider mb-2 flex items-center gap-2 "
        style="color: #e61171"
      >
        {{ t("partnersFilterCategory") }}
      </p>
      <!-- ICI -->
      <div class="flex flex-wrap justify-center gap-2 md:justify-start">
        <!-- Pilule "Toutes les catégories" : active visuellement quand AUCUNE catégorie n'est cochée -->

        <BaseButton
          type="button"
          variant="region"
          :selected="category.length === 0"
          class="!pl-3 !pr-4 !py-2 !text-sm"
          @click="emit('set-category', [])"
        >
          {{ t("partnersCategoryAll") }}
        </BaseButton>
        <!-- Une pilule par catégorie de partenaire : plusieurs peuvent être actives à la fois -->

        <BaseButton
          v-for="cat in partnerCategories"
          :key="cat.key"
          type="button"
          variant="region"
          :selected="category.includes(cat.key)"
          class="!px-2 !py-2 !text-sm !gap-1.5"
          @click="toggleCategory(cat.key)"
        >
          <PartnerIcon
            :name="category.includes(cat.key) ? cat.key + '-blanc' : cat.key"
            class="w-5 h-5"
          />

          {{ t(cat.labelKey) }}
        </BaseButton>
      </div>
    </div>

    <!-- ===== Résumé : nombre de filtres actifs + chips + Réinitialiser ===== -->
    <div v-if="activeCount" class="pt-3" style="border-top: 1px solid #ffe4d3">
      <!-- Ligne 1 : compteur à gauche, Réinitialiser à droite -->
      <div class="flex items-center justify-between mb-2">
        <span
          class="text-sm font-semibold underline underline-offset-2"
          style="color: #e61171"
        >
          {{ activeCount }}
          {{ activeCount > 1 ? "filtres actifs" : "filtre actif" }}
        </span>

        
      </div>

      <!-- Ligne 2 : les chips, à la ligne -->
      <div class="flex flex-wrap items-center gap-2 justify-start">
        <BaseButton
          v-for="chip in activeChips"
          :key="chip.group + chip.key"
          type="button"
          variant="chip"
          class="!pl-3 !pr-2 !py-1 !gap-1.5 hover:-translate-y-0.5"
          @click="removeChip(chip)"
        >
          {{ chip.label }}

          <svg
            viewBox="0 0 24 24"
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
          >
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation d'ouverture/fermeture du panneau dropdown (fondu + léger glissement vertical) */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
