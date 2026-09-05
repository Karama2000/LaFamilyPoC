<!--
  SiteHeader.vue
  ----------------
  En-tête du site : logo, sélecteur de langue, menu de navigation avec
  sous-menus déroulants au survol (desktop) et bouton login.
  Sur mobile, la navigation desktop est masquée et remplacée par un
  bouton burger qui ouvre un tiroir (drawer) plein écran avec les mêmes
  sections en accordéon.
-->
<script setup lang="ts">
import {
  searchCategories,
  searchCategoryToArticleKey,
  activitesItems,
  vacancesItems,
  coursItems,
  
} from "~/data/menuData";

defineProps<{
  t: (key: string) => string; // fonction de traduction (i18n)
  currentLang: string; // langue actuellement sélectionnée ('fr', 'en', 'de', 'it')
}>();

const emit = defineEmits<{ setLang: [lang: string] }>();

// ---------- Menu mobile ----------
const mobileOpen = ref(false);
const openSection = ref<string | null>(null);

function toggleSection(key: string) {
  openSection.value = openSection.value === key ? null : key;
}

function closeMobileMenu() {
  mobileOpen.value = false;
  openSection.value = null;
}

function onSetLang(lang: string) {
  emit("setLang", lang);
}

// Bloque le scroll du body quand le drawer est ouvert
watch(mobileOpen, (open) => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = open ? "hidden" : "";
});

onBeforeUnmount(() => {
  if (typeof document !== "undefined") document.body.style.overflow = "";
});

</script>

<template>
  <header
    class="relative z-[9999] flex flex-nowrap items-center justify-between gap-4 px-5 md:px-7 py-6"
  >
    <!-- Logo + sélecteur de langue desktop (masqué sur mobile, repris dans le drawer mobile plus bas) -->
    <div class="flex flex-col items-start shrink-0">
      <NuxtLink to="/">
        <img
          src="/images/logo_diefamilie.png"
          alt="diefamilie.ch"
          class="h-20 w-auto min-w-[140px] object-contain block"
        />
      </NuxtLink>

      <!-- Sélecteur de langue FR / EN / DE / IT, visible uniquement sur desktop -->
      <div
        class="self-start ml-[70px] text-sm font-semibold tracking-[1px] leading-[22px] items-center gap-1 max-md:hidden flex"
        style="color: #ffd1b5"
      >
        <span
          v-for="(lang, i) in ['fr', 'en', 'de', 'it']"
          :key="lang"
          class="flex items-center gap-1"
        >
          <button
            type="button"
            @click="emit('setLang', lang)"
            class=" transition-opacity uppercase"
            :class="
              currentLang === lang
                ? 'opacity-100 underline underline-offset-2'
                : 'opacity-70 hover:opacity-100'
            "
          >
            {{ lang }}
          </button>
          <span v-if="i < 3">|</span>
        </span>
      </div>
    </div>

    <!-- Navigation principale desktop : sous-menus déroulants au survol (classes "group" / "group-hover") -->

    <nav
      class="flex flex-wrap items-center justify-end gap-2 lg:gap-4 xl:gap-6 font-semibold text-[14px] lg:text-[15px] xl:text-[17px] max-md:hidden"
    >
      <!-- ============ JE CHERCHE... ============ -->
      <div class="relative group">
        <BaseButton
          type="button"
          variant="navMenuCherche"
          class="!w-auto lg:!w-[155px] !h-[52px] !bg-[#FFD1B5] !text-[#E61171] hover:!bg-[#FFF5F0] hover:!text-[#E61171]"
        >
          {{ t("navSearch") }}
        </BaseButton>
        <div
          class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full z-[9999] w-[min(700px,calc(100vw-20px))]"
        >
          <div
            class="!rounded-tr-[10px] !rounded-br-[10px] !rounded-bl-[10px] !rounded-tl-0 p-2"
            style="background: #fef2eb"
          >
            <div class="grid gap-2 grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
              <BaseButton
                v-for="cat in searchCategories"
                :key="cat.key"
                variant="articleCategory"
                :to="{
                  path: '/article',
                  query: {
                    category: searchCategoryToArticleKey[cat.key] ?? '',
                  },
                }"
              >
                <MenuIcon :name="cat.icon" class="w-11 h-11" />

                <span
                  class="text-sm leading-tight whitespace-normal break-words text-center"
                >
                  {{ t(cat.key) }}
                </span>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ ACTIVITÉS ============ -->
      <div class="relative group">
        <BaseButton variant="navMenu">
          {{ t("navActivites") }}
        </BaseButton>
        <div
          class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full z-[99999] w-[406px]"
        >
          <div
            class="!rounded-tr-[10px] !rounded-br-[10px] !rounded-bl-[10px] !rounded-tl-0 p-2"
            style="background: #fef2eb"
          >
            <div class="flex flex-col gap-2">
              <BaseButton
                v-for="item in activitesItems"
                :key="item.key"
                variant="categDesktop"
                class="!flex-row !justify-start !gap-4 !text-left !py-6 !px-6"
                :to="{
                  path: '/menu/agenda',
                  query: { categorie: 'activite', sousCategorie: item.key },
                }"
              >
                <MenuIcon :name="item.icon" class="w-8 h-8 shrink-0" />
                <span class="text-base font-bold">{{ t(item.key) }}</span>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ VACANCES ENFANTS ============ -->
      <div class="relative group">
        <BaseButton variant="navMenu">
          {{ t("navVacances") }}
        </BaseButton>
        <div
          class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full z-[99999] w-[380px]"
        >
          <div
            class="!rounded-tr-[10px] !rounded-br-[10px] !rounded-bl-[10px] !rounded-tl-0 p-2"
            style="background: #fef2eb"
          >
            <div class="flex flex-col gap-2">
              <BaseButton
                v-for="item in vacancesItems"
                :key="item.key"
                variant="categDesktop"
                class="!flex-row !justify-start !gap-4 !text-left !py-6 !px-6"
                :to="{
            path: '/menu/agenda',
            query: {
              categorie: item.key === 'vacCamps' ? 'campLogement' : 'campJour',
            },
          }"
              >
                <MenuIcon :name="item.icon" class="w-8 h-8 shrink-0" />
                <span class="text-base font-bold">{{ t(item.key) }}</span>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ COURS ============ -->
      <div class="relative group">
        <BaseButton variant="navMenu">
          {{ t("navCours") }}
        </BaseButton>
        <div
          class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full z-[99999] w-[380px]"
        >
          <div
            class="!rounded-tr-[10px] !rounded-br-[10px] !rounded-bl-[10px] !rounded-tl-0 p-2"
            style="background: #fef2eb"
          >
            <div class="flex flex-col gap-2">
              <BaseButton
                v-for="item in coursItems"
                :key="item.key"
                variant="categDesktop"
                class="!flex-row !justify-start !gap-4 !text-left !py-6 !px-6"
                :to="{
                  path: '/menu/agenda',
                  query: { categorie: 'cours', sousCategorie: item.key },
                }"
              >
                <MenuIcon :name="item.icon" class="w-8 h-8 shrink-0" />
                <span class="text-base font-bold">{{ t(item.key) }}</span>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ DEVENIR PARTENAIRE ============ -->
      <BaseButton variant="navMenuDevPart" to="/menu/devenirPartenaire">
        {{ t("navPartenaire") }}
      </BaseButton>
    </nav>

    <!-- Bloc de droite : login (desktop = icône + texte, mobile = icône seule) et bouton burger -->
    <div class="flex items-center gap-3 shrink-0">
      <a
        href="#"
        class="hidden md:flex items-center gap-2 font-bold text-base hover:opacity-80"
      >
        <img
          src="/images/icones/login.png"
          alt=""
          class="w-6 h-6 object-contain shrink-0"
        />
        {{ t("login") }}
      </a>

      <!-- Login mobile : icône seule, pas de texte -->

      <!-- Bouton burger : ouvre le tiroir de menu mobile -->
      <button
        type="button"
        @click="mobileOpen = true"
        class="md:hidden relative flex flex-col justify-center items-center gap-[6px] w-10 h-10"
        aria-label="Ouvrir le menu"
        aria-expanded="false"
      >
        <span class="block w-6 h-[2.5px] rounded-full bg-white"></span>
        <span class="block w-6 h-[2.5px] rounded-full bg-white"></span>
        <span class="block w-6 h-[2.5px] rounded-full bg-white"></span>
      </button>
    </div>
  </header>

  <!-- ================= MENU MOBILE (drawer) ================= -->
  <!-- Téléporté à la racine du body pour éviter tout problème d'empilement (z-index) -->
  <Teleport to="body">
    <Transition name="menu-fade">
      <!-- <div v-if="mobileOpen" class="fixed inset-0 z-[100] md:hidden"> -->
      <div v-if="mobileOpen" class="fixed inset-0 z-[999] md:hidden">
        <!-- Fond assombri, clic dessus = fermeture du menu -->
        <div
          class="absolute inset-0 bg-black/40"
          @click="closeMobileMenu"
        ></div>

        <!-- Panneau du menu, glisse depuis la droite -->
        <Transition name="menu-slide" appear>
          <div
            class="absolute right-0 top-0 h-full w-[86%] max-w-[380px] flex flex-col shadow-2xl"
            style="background: #fff8f4"
          >
            <!-- En-tête du drawer : logo + bouton fermer -->
            <div
              class="flex items-center justify-between px-5 py-5 shrink-0"
              style="background: #e61171"
            >
              <NuxtLink to="/" @click="closeMobileMenu">
                <img
                  src="/images/logo_diefamilie.png"
                  alt="diefamilie.ch"
                  class="h-12 w-auto object-contain"
                />
              </NuxtLink>
              <button
                type="button"
                @click="closeMobileMenu"
                aria-label="Fermer le menu"
                class="flex items-center justify-center w-10 h-10"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="w-6 h-6"
                  fill="none"
                  stroke="#FFD1B5"
                  stroke-width="2.5"
                  stroke-linecap="round"
                >
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>

            <!-- Sélecteur de langue FR / EN / DE / IT -->
            <div
              class="flex items-center justify-center gap-1 px-5 py-4 shrink-0"
              style="background: #ffd1b5"
            >
              <template
                v-for="(lang, i) in ['fr', 'en', 'de', 'it']"
                :key="lang"
              >
                <button
                  type="button"
                  @click="onSetLang(lang)"
                  class="px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-[0.5px] transition-colors"
                  :class="currentLang === lang ? 'text-white' : ''"
                  :style="
                    currentLang === lang
                      ? 'background:#E61171'
                      : 'color:#E61171'
                  "
                >
                  {{ lang }}
                </button>
                <span v-if="i < 3" style="color: #e61171" class="opacity-40"
                  >|</span
                >
              </template>
            </div>

            <!-- Contenu scrollable : sections de navigation en accordéon (une seule ouverte à la fois via "openSection") -->
            <div class="flex-1 overflow-y-auto overscroll-contain">
              <!-- ===== Je cherche... (grille d'icônes, dépliée si openSection === 'search') ===== -->
              <div class="border-b" style="border-color: #ffd1b5">
                <BaseButton
                  type="button"
                  variant="whiteOutline"
                  @click="toggleSection('search')"
                  class="!w-full !justify-between !p-5 !text-brand-pink"
                >
                  {{ t("navSearch") }}

                  <svg
                    viewBox="0 0 24 24"
                    class="w-5 h-5 shrink-0 transition-transform duration-200"
                    :class="openSection === 'search' ? 'rotate-180' : ''"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </BaseButton>
                <Transition name="accordion">
                  <div v-if="openSection === 'search'" class="px-5 pb-5">
                    <div class="grid grid-cols-2 gap-2.5">
                      <BaseButton
                        v-for="cat in searchCategories"
                        :key="cat.key"
                        variant="articleCategory"
                        :selected="false"
                        :to="{
                          path: '/article',
                          query: {
                            category: searchCategoryToArticleKey[cat.key] ?? '',
                          },
                        }"
                        @click="closeMobileMenu"
                      >
                        <MenuIcon :name="cat.icon" class="w-8 h-8" />

                        <span
                          class="text-xs font-bold leading-tight text-brand-pink"
                        >
                          {{ t(cat.key) }}
                        </span>
                      </BaseButton>
                    </div>
                  </div>
                </Transition>
              </div>

              <!-- ===== Activités (liste, dépliée si openSection === 'activites') ===== -->

              <div class="border-b" style="border-color: #ffd1b5">
                <!-- Bouton accordéon -->
                <BaseButton
                  type="button"
                  variant="whiteOutline"
                  @click="toggleSection('activites')"
                  class="!w-full !justify-between !p-5 !text-brand-pink"
                >
                  {{ t("navActivites") }}

                  <svg
                    viewBox="0 0 24 24"
                    class="w-5 h-5 shrink-0 transition-transform duration-200"
                    :class="openSection === 'activites' ? 'rotate-180' : ''"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </BaseButton>

                <Transition name="accordion">
                  <div
                    v-if="openSection === 'activites'"
                    class="px-5 pb-5 flex flex-col gap-2"
                  >
                    <BaseButton
                      v-for="item in activitesItems"
                      :key="item.key"
                      variant="thinOutline"
                      :to="{
                        path: '/menu/agenda',
                        query: {
                          categorie: 'activite',
                          sousCategorie: item.key,
                        },
                      }"
                      @click="closeMobileMenu"
                      class="!w-full !justify-start !gap-3"
                      style="border: 2px solid #ffd1b5"
                    >
                      <MenuIcon :name="item.icon" class="w-6 h-6 shrink-0" />

                      <span class="text-sm font-bold">
                        {{ t(item.key) }}
                      </span>
                    </BaseButton>
                  </div>
                </Transition>
              </div>

              <!-- ===== Vacances enfants (liste, dépliée si openSection === 'vacances') ===== -->

              <div class="border-b" style="border-color: #ffd1b5">
                <!-- Bouton accordéon -->
                <BaseButton
                  type="button"
                  variant="whiteOutline"
                  @click="toggleSection('vacances')"
                  class="!w-full !justify-between !p-5 !text-brand-pink"
                >
                  {{ t("navVacances") }}

                  <svg
                    viewBox="0 0 24 24"
                    class="w-5 h-5 shrink-0 transition-transform duration-200"
                    :class="openSection === 'vacances' ? 'rotate-180' : ''"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </BaseButton>

                <Transition name="accordion">
                  <div
                    v-if="openSection === 'vacances'"
                    class="px-5 pb-5 flex flex-col gap-2"
                  >
                    <BaseButton
                      v-for="item in vacancesItems"
                      :key="item.key"
                      variant="thinOutline"
                      :to="{
                        path: '/menu/agenda',
                        query: {
                          categorie:
                            item.key === 'vacCamps'
                              ? 'campLogement'
                              : 'campJour',
                        },
                      }"
                      @click="closeMobileMenu"
                      class="!w-full !justify-start !gap-3"
                      style="border: 2px solid #ffd1b5"
                    >
                      <MenuIcon :name="item.icon" class="w-6 h-6 shrink-0" />

                      <span class="text-sm font-bold">
                        {{ t(item.key) }}
                      </span>
                    </BaseButton>
                  </div>
                </Transition>
              </div>

              <!-- ===== Cours (liste, dépliée si openSection === 'cours') ===== -->

              <div class="border-b" style="border-color: #ffd1b5">
                <!-- Bouton accordéon -->
                <BaseButton
                  type="button"
                  variant="whiteOutline"
                  @click="toggleSection('cours')"
                  class="!w-full !justify-between !p-5 !text-brand-pink"
                >
                  {{ t("navCours") }}

                  <svg
                    viewBox="0 0 24 24"
                    class="w-5 h-5 shrink-0 transition-transform duration-200"
                    :class="openSection === 'cours' ? 'rotate-180' : ''"
                    fill="none"
                    stroke="#E61171"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </BaseButton>

                <Transition name="accordion">
                  <div
                    v-if="openSection === 'cours'"
                    class="px-5 pb-5 flex flex-col gap-2"
                  >
                    <BaseButton
                      v-for="item in coursItems"
                      :key="item.key"
                      variant="thinOutline"
                      :to="{
                        path: '/menu/agenda',
                        query: {
                          categorie: 'cours',
                          sousCategorie: item.key,
                        },
                      }"
                      @click="closeMobileMenu"
                      class="!w-full !justify-start"
                      style="border: 2px solid #ffd1b5"
                    >
                      <MenuIcon :name="item.icon" class="w-6 h-6 shrink-0" />

                      <span class="text-sm font-bold">
                        {{ t(item.key) }}
                      </span>
                    </BaseButton>
                  </div>
                </Transition>
              </div>

              <!-- ===== Devenir Partenaire : lien simple, pas d'accordéon ===== -->
              <BaseButton
                variant="whiteOutline"
                :to="`/devenirPartenaire`"
                @click="closeMobileMenu"
                class="!w-full !justify-start !p-5 !text-brand-pink"
              >
                {{ t("navPartenaire") }}
              </BaseButton>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Fondu du fond assombri à l'ouverture/fermeture du menu mobile */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.25s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

/* Glissement horizontal du panneau du menu mobile (depuis la droite) */
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1);
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateX(100%);
}

/* Dépliage/repliage des sections en accordéon dans le menu mobile */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 600px;
  opacity: 1;
}
</style>
