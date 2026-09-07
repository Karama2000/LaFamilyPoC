<!--
  AgendaDatePicker.vue
  ----------------------
  Sélecteur de date personnalisé (calendrier déroulant) utilisé pour les
  filtres "date de début" / "date de fin" de l'agenda.

  Fonctionne en v-model (modelValue au format 'YYYY-MM-DD' ou '' si aucune
  date choisie).

-->

<script setup lang="ts">
const props = defineProps<{
  t: (key: string) => string;
  label: string;
  modelValue: string; // format 'YYYY-MM-DD' ou ''
  highlightDate?: string; // format 'YYYY-MM-DD' ou ''
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

// ============================================================
// ÉTAT DU CALENDRIER
// ============================================================

const open = ref(false);

const rootEl = ref<HTMLElement | null>(null);

// =======================================================
// UTILITAIRES DATE
// =======================================================

function parse(value: string): Date | null {
  if (!value) return null;

  const parts = value.split("-").map(Number);

  const y = parts[0] ?? 1970;
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;

  return new Date(y, m - 1, d);
}

function format(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
}

// =======================================================
// DATE DU JOUR
// =======================================================

const today = new Date();

today.setHours(0, 0, 0, 0);

// =======================================================
// DATE CONFIRMÉE
// ======================================================

const selectedDate = computed(() => {
  return parse(props.modelValue);
});

// ========================================================
// DATE REPÈRE
// ========================================================

const highlightedDate = computed(() => {
  return parse(props.highlightDate ?? "");
});

// =======================================================
// DATE PROVISOIRE
// =======================================================

const draftDate = ref<Date | null>(null);

// ====================================================
// MOIS AFFICHÉ
// ===================================================

const viewYear = ref((selectedDate.value ?? today).getFullYear());

const viewMonth = ref((selectedDate.value ?? today).getMonth());

// ============================================================
// NOMS DES MOIS / JOURS
// ============================================================

const MONTH_KEYS = [
  "agendaJanuary",
  "agendaFebruary",
  "agendaMarch",
  "agendaApril",
  "agendaMay",
  "agendaJune",
  "agendaJuly",
  "agendaAugust",
  "agendaSeptember",
  "agendaOctober",
  "agendaNovember",
  "agendaDecember",
];

const WEEKDAY_KEYS = [
  "agendaMonday",
  "agendaTuesday",
  "agendaWednesday",
  "agendaThursday",
  "agendaFriday",
  "agendaSaturday",
  "agendaSunday",
];

// ============================================================
// LABEL DU BOUTON
// ============================================================

const displayLabel = computed(() => {
  const d = selectedDate.value;

  if (!d) {
    return props.label;
  }

  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1,
  ).padStart(2, "0")}/${d.getFullYear()}`;
});

// ============================================================
// GRILLE DU CALENDRIER
// ============================================================

const days = computed(() => {
  const firstOfMonth = new Date(viewYear.value, viewMonth.value, 1);

  // La semaine commence lundi
  const startOffset = (firstOfMonth.getDay() + 6) % 7;

  const gridStart = new Date(viewYear.value, viewMonth.value, 1 - startOffset);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart);

    date.setDate(gridStart.getDate() + i);

    return {
      date,

      inMonth: date.getMonth() === viewMonth.value,

      // Date provisoire sélectionnée
      isPending:
        !!draftDate.value && date.getTime() === draftDate.value.getTime(),

      // Date confirmée
      isConfirmed:
        !draftDate.value &&
        !!selectedDate.value &&
        date.getTime() === selectedDate.value.getTime(),

      // Date repère
      isHighlighted:
        !!highlightedDate.value &&
        date.getTime() === highlightedDate.value.getTime(),
    };
  });
});

// ============================================================
// NAVIGATION MOIS
// ============================================================

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11;
    viewYear.value--;
  } else {
    viewMonth.value--;
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0;
    viewYear.value++;
  } else {
    viewMonth.value++;
  }
}

// ============================================================
// SÉLECTION PROVISOIRE
// ============================================================

function selectDraft(date: Date) {
  draftDate.value = date;
}

// ============================================================
// AUJOURD'HUI
// ============================================================

function selectToday() {
  viewYear.value = today.getFullYear();

  viewMonth.value = today.getMonth();

  draftDate.value = today;
}

// ============================================================
// VALIDATION
// ============================================================

function confirm() {
  if (draftDate.value) {
    emit("update:modelValue", format(draftDate.value));
  }

  open.value = false;

  draftDate.value = null;
}

// ============================================================
// OUVERTURE / FERMETURE
// ============================================================

function toggle() {
  if (!open.value) {
    // On centre sur la date déjà confirmée,
    // sinon sur aujourd'hui.
    viewYear.value = (selectedDate.value ?? today).getFullYear();

    viewMonth.value = (selectedDate.value ?? today).getMonth();

    // Aucune sélection provisoire à l'ouverture
    draftDate.value = null;
  }

  open.value = !open.value;
}

// ============================================================
// CLIC À L'EXTÉRIEUR
// ============================================================

function onClickOutside(e: MouseEvent) {
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
    open.value = false;

    draftDate.value = null;
  }
}

// ============================================================
// LIFECYCLE
// ============================================================

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<template>
  <div ref="rootEl" class="relative flex-1">
    <!-- =================================================
    BOUTON DÉCLENCHEUr
    ============================================ -->

    <!-- ici  -->
    <BaseButton
      variant="calendar"
      :open="open"
      :full-width="true"
      @click="toggle"
    >
      <!-- Icône calendrier -->
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        :stroke="open ? '#FFFFFF' : '#E61171'"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="shrink-0"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />

        <line x1="16" y1="2" x2="16" y2="6" />

        <line x1="8" y1="2" x2="8" y2="6" />

        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>

      <span
        class="text-sm font-semibold truncate"
        :style="{
          color: open ? '#FFFFFF' : selectedDate ? '#E61171' : '#8A8A8A',
        }"
      >
        {{ displayLabel }}
      </span>
    </BaseButton>

    <!-- =================================================
    CALENDRIer
    ============================================ -->

    <div
      v-if="open"
      class="absolute z-50 mt-2 w-[320px] max-w-[90vw] rounded-[5px] bg-white shadow-[0_13px_30px_rgba(0,0,0,0.15)] p-4"
    >
      <!-- ===============================================
      HEADER
      ========================================== -->

      <div class="flex items-center justify-between mb-3">
        <!-- Mois précédent -->

        <button
          type="button"
          @click="prevMonth"
          :aria-label="t('agendaPreviousMonth')"
          class="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#FFF0F5]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E61171"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <!-- Mois / année -->

        <span class="font-bold text-sm capitalize" style="color: #2e2f30">
          {{ t(MONTH_KEYS[viewMonth]) }}
          {{ viewYear }}
        </span>

        <!-- Mois suivant -->

        <button
          type="button"
          @click="nextMonth"
          :aria-label="t('agendaNextMonth')"
          class="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#FFF0F5]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E61171"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <!-- ==================================================
      JOURS DE LA SEMAINE
      ================================================== -->

      <div class="grid grid-cols-7 mb-1">
        <span
          v-for="wd in WEEKDAY_KEYS"
          :key="wd"
          class="text-center text-[11px] font-bold uppercase"
          style="color: #b8b8b8"
        >
          {{ t(wd) }}
        </span>
      </div>

      <!-- ===============================================
      GRILLE DES JOURS======================================= -->

      <div class="grid grid-cols-7 gap-y-1">
        <button
          v-for="(d, i) in days"
          :key="i"
          type="button"
          @click="selectDraft(d.date)"
          class="h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm font-semibold transition-colors"
          :class="!d.inMonth ? 'opacity-30' : ''"
          :style="{
            background:
              d.isConfirmed || d.isHighlighted ? '#E61171' : 'transparent',

            color:
              d.isConfirmed || d.isHighlighted
                ? '#FFFFFF'
                : d.isPending
                  ? '#E61171'
                  : '#2E2F30',

            border: d.isPending
              ? '1.5px solid #E61171'
              : '1.5px solid transparent',
          }"
        >
          {{ d.date.getDate() }}
        </button>
      </div>

      <!-- ==================================================
      FOOTER
      ================================================== -->

      <div
        class="flex items-center justify-between mt-3 pt-3"
        style="border-top: 1px solid #f0f0f0"
      >
        <!-- Aujourd'hui -->

        <button
          type="button"
          @click="selectToday"
          class="text-xs font-medium underline underline-offset-2"
          style="color: #444444"
        >
          {{ t("agendaCalendarToday") }}
        </button>

        <!-- Valider -->

        <button
          type="button"
          @click="confirm"
          class="text-xs font-bold underline underline-offset-2"
          style="color: #e61171"
        >
          {{ t("agendaDateValidate") }}
        </button>
      </div>
    </div>
  </div>
</template>
