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
import { searchCategories, activitesItems, vacancesItems, coursItems } from '~/data/menuData'

defineProps<{
  t: (key: string) => string     // fonction de traduction (i18n)
  currentLang: string            // langue actuellement sélectionnée ('fr', 'en', 'de', 'it')
}>()

const emit = defineEmits<{ setLang: [lang: string] }>()

// ---------- Menu mobile ----------
const mobileOpen = ref(false)
const openSection = ref<string | null>(null)

function toggleSection(key: string) {
  openSection.value = openSection.value === key ? null : key
}

function closeMobileMenu() {
  mobileOpen.value = false
  openSection.value = null
}

function onSetLang(lang: string) {
  emit('setLang', lang)
}

// Bloque le scroll du body quand le drawer est ouvert
watch(mobileOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<template>
  <header class="relative z-30 flex flex-wrap items-center justify-between gap-4 px-5 md:px-12 py-6">

    <!-- Logo + sélecteur de langue desktop (masqué sur mobile, repris dans le drawer mobile plus bas) -->
    <div class="flex flex-col items-start shrink-0">
      <NuxtLink to="/">
        <img src="/images/logo_diefamilie.png" alt="diefamilie.ch"
        class="h-20 w-auto min-w-[140px] object-contain block" />
      </NuxtLink>

      <!-- Sélecteur de langue FR / EN / DE / IT, visible uniquement sur desktop -->
      <div class="self-start ml-[70px] text-sm font-semibold tracking-[1px] leading-[22px] items-center gap-1 max-md:hidden flex"
        style="color:#FFD1B5">
        <span v-for="(lang, i) in ['fr', 'en', 'de', 'it']" :key="lang" class="flex items-center gap-1">
          <button type="button" @click="emit('setLang', lang)"
            class="uppercase transition-opacity"
            :class="currentLang === lang ? 'opacity-100 underline underline-offset-2' : 'opacity-70 hover:opacity-100'">
            {{ lang }}
          </button>
          <span v-if="i < 3">|</span>
        </span>
      </div>
    </div>

    <!-- Navigation principale desktop : sous-menus déroulants au survol (classes "group" / "group-hover") -->
    <nav class="flex items-center gap-6 font-semibold text-[17px] max-md:hidden">

      <!-- ============ JE CHERCHE... : grille 5x2 (survol pour afficher le méga-menu) ============ -->
      <div class="relative group">
        <button type="button"
          class="block rounded-t-[10px] px-5 py-4 font-bold tracking-[0.2px] transition-colors duration-150 text-white group-hover:bg-[#FFD1B5] group-hover:text-[#E61171]">
          {{ t('navSearch') }}
        </button>
        <div
          class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full z-40 w-[620px]">
          <div class="rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] p-2" style="background:#FFD1B5;border:8px solid #FFD1B5">
            <div class="grid grid-cols-5 rounded-[8px] overflow-hidden border-2" style="background:#FFFFFF;border-color:#E61171">
              <a v-for="(cat, i) in searchCategories" :key="cat.key" href="#"
                class="flex flex-col items-center justify-center gap-3 px-3 py-8 text-center hover:bg-[#FFF5F0] transition-colors"
                :class="[i % 5 !== 4 ? 'border-r-2' : '', i < 5 ? 'border-b-2' : '']" style="border-color:#E61171">
                <MenuIcon :name="cat.icon" class="w-11 h-11" />
                <span class="text-sm font-bold leading-tight" style="color:#E61171">{{ t(cat.key) }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- ============ ACTIVITÉS : liste verticale ============ -->
      <div class="relative group">
        <a href="#"
          class="block rounded-t-[10px] px-5 py-4 transition-colors duration-150 text-white group-hover:bg-[#FFD1B5] group-hover:text-[#E61171]">
          {{ t('navActivites') }}
        </a>
        <div
          class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full z-40 w-[406px]">
          <div class="rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] p-2" style="background:#FFD1B5;border:8px solid #FFD1B5">
            <div class="rounded-[8px] overflow-hidden border-2" style="background:#FFFFFF;border-color:#E61171">
              <a v-for="(item, i) in activitesItems" :key="item.key" href="#"
                class="flex items-center gap-4 px-6 py-6 hover:bg-[#FFF5F0] transition-colors"
                :class="i < activitesItems.length - 1 ? 'border-b-2' : ''" style="border-color:#E61171">
                <MenuIcon :name="item.icon" class="w-8 h-8 shrink-0" style="color:#E61171" />
                <span class="text-base font-bold" style="color:#E61171">{{ t(item.key) }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ VACANCES ENFANTS : liste verticale ============ -->
      <div class="relative group">
        <a href="#"
          class="block rounded-t-[10px] px-5 py-4 transition-colors duration-150 text-white group-hover:bg-[#FFD1B5] group-hover:text-[#E61171]">
          {{ t('navVacances') }}
        </a>
        <div
          class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full z-40 w-[380px]">
          <div class="rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] p-2" style="background:#FFD1B5;border:8px solid #FFD1B5">
            <div class="rounded-[8px] overflow-hidden border-2" style="background:#FFFFFF;border-color:#E61171">
              <a v-for="(item, i) in vacancesItems" :key="item.key" href="#"
                class="flex items-center gap-4 px-6 py-6 hover:bg-[#FFF5F0] transition-colors"
                :class="i < vacancesItems.length - 1 ? 'border-b-2' : ''" style="border-color:#E61171">
                <MenuIcon :name="item.icon" class="w-8 h-8 shrink-0" style="color:#E61171" />
                <span class="text-base font-bold" style="color:#E61171">{{ t(item.key) }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ COURS : liste verticale ============ -->
      <div class="relative group">
        <a href="#"
          class="block rounded-t-[10px] px-5 py-4 transition-colors duration-150 text-white group-hover:bg-[#FFD1B5] group-hover:text-[#E61171]">
          {{ t('navCours') }}
        </a>
        <div
          class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full z-40 w-[380px]">
          <div class="rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] p-2" style="background:#FFD1B5;border:8px solid #FFD1B5">
            <div class="rounded-[8px] overflow-hidden border-2" style="background:#FFFFFF;border-color:#E61171">
              <a v-for="(item, i) in coursItems" :key="item.key" href="#"
                class="flex items-center gap-4 px-6 py-6 hover:bg-[#FFF5F0] transition-colors"
                :class="i < coursItems.length - 1 ? 'border-b-2' : ''" style="border-color:#E61171">
                <MenuIcon :name="item.icon" class="w-8 h-8 shrink-0" style="color:#E61171" />
                <span class="text-base font-bold" style="color:#E61171">{{ t(item.key) }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ DEVENIR PARTENAIRE : lien simple, pas de dropdown ============ -->
      <a href="#"
        class="block rounded-t-[10px] px-5 py-4 transition-colors duration-150 text-white hover:bg-[#FFD1B5] hover:text-[#E61171]">
        {{ t('navPartenaire') }}
      </a>
    </nav>

    <!-- Bloc de droite : login (desktop = icône + texte, mobile = icône seule) et bouton burger -->
    <div class="flex items-center gap-3 shrink-0">
      <a href="#" class="hidden md:flex items-center gap-2 font-bold text-base hover:opacity-80">
        <img src="/images/icones/login.png" alt="" class="w-6 h-6 object-contain shrink-0" />
        {{ t('login') }}
      </a>

      <!-- Login mobile : icône seule, pas de texte -->
     <a href="#" :aria-label="t('login')"
  class="md:hidden flex items-center justify-center w-10 h-10 transition-colors">
  <img src="/images/icones/login.png" alt="" class="w-6 h-6 object-contain" />
</a>

   <!-- Bouton burger : ouvre le tiroir de menu mobile -->
   <button type="button" @click="mobileOpen = true"
  class="md:hidden relative flex flex-col justify-center items-center gap-[6px] w-10 h-10"
  aria-label="Ouvrir le menu" aria-expanded="false">
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
      <div v-if="mobileOpen" class="fixed inset-0 z-[100] md:hidden">
        <!-- Fond assombri, clic dessus = fermeture du menu -->
        <div class="absolute inset-0 bg-black/40" @click="closeMobileMenu"></div>

        <!-- Panneau du menu, glisse depuis la droite -->
        <Transition name="menu-slide" appear>
          <div class="absolute right-0 top-0 h-full w-[86%] max-w-[380px] flex flex-col shadow-2xl"
            style="background:#FFF8F4">

            <!-- En-tête du drawer : logo + bouton fermer -->
            <div class="flex items-center justify-between px-5 py-5 shrink-0" style="background:#E61171">
              <NuxtLink to="/" @click="closeMobileMenu">
                <img src="/images/logo_diefamilie.png" alt="diefamilie.ch" class="h-12 w-auto object-contain" />
              </NuxtLink>
              <button type="button" @click="closeMobileMenu" aria-label="Fermer le menu"
  class="flex items-center justify-center w-10 h-10">
  <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="#FFD1B5" stroke-width="2.5"
    stroke-linecap="round">
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
</button>
            </div>

            <!-- Sélecteur de langue FR / EN / DE / IT -->
            <div class="flex items-center justify-center gap-1 px-5 py-4 shrink-0" style="background:#FFD1B5">
              <template v-for="(lang, i) in ['fr', 'en', 'de', 'it']" :key="lang">
                <button type="button" @click="onSetLang(lang)"
                  class="px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-[0.5px] transition-colors"
                  :class="currentLang === lang ? 'text-white' : ''"
                  :style="currentLang === lang ? 'background:#E61171' : 'color:#E61171'">
                  {{ lang }}
                </button>
                <span v-if="i < 3" style="color:#E61171" class="opacity-40">|</span>
              </template>
            </div>

            <!-- Contenu scrollable : sections de navigation en accordéon (une seule ouverte à la fois via "openSection") -->
            <div class="flex-1 overflow-y-auto overscroll-contain">

              <!-- ===== Je cherche... (grille d'icônes, dépliée si openSection === 'search') ===== -->
              <div class="border-b" style="border-color:#FFD1B5">
                <button type="button" @click="toggleSection('search')"
                  class="w-full flex items-center justify-between px-5 py-4 font-bold text-[17px]"
                  style="color:#E61171">
                  {{ t('navSearch') }}
                  <svg viewBox="0 0 24 24" class="w-5 h-5 shrink-0 transition-transform duration-200"
                    :class="openSection === 'search' ? 'rotate-180' : ''" fill="none" stroke="#E61171"
                    stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <Transition name="accordion">
                  <div v-if="openSection === 'search'" class="px-5 pb-5">
                    <div class="grid grid-cols-2 gap-2.5">
                      <a v-for="cat in searchCategories" :key="cat.key" href="#" @click="closeMobileMenu"
                        class="flex flex-col items-center justify-center gap-2 rounded-[10px] px-2 py-4 text-center"
                        style="background:#FFFFFF; border:2px solid #FFD1B5">
                        <MenuIcon :name="cat.icon" class="w-8 h-8" />
                        <span class="text-xs font-bold leading-tight" style="color:#E61171">{{ t(cat.key) }}</span>
                      </a>
                    </div>
                  </div>
                </Transition>
              </div>

              <!-- ===== Activités (liste, dépliée si openSection === 'activites') ===== -->
              <div class="border-b" style="border-color:#FFD1B5">
                <button type="button" @click="toggleSection('activites')"
                  class="w-full flex items-center justify-between px-5 py-4 font-bold text-[17px]"
                  style="color:#E61171">
                  {{ t('navActivites') }}
                  <svg viewBox="0 0 24 24" class="w-5 h-5 shrink-0 transition-transform duration-200"
                    :class="openSection === 'activites' ? 'rotate-180' : ''" fill="none" stroke="#E61171"
                    stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <Transition name="accordion">
                  <div v-if="openSection === 'activites'" class="px-5 pb-5 flex flex-col gap-2">
                    <a v-for="item in activitesItems" :key="item.key" href="#" @click="closeMobileMenu"
                      class="flex items-center gap-3 rounded-[10px] px-4 py-3"
                      style="background:#FFFFFF; border:2px solid #FFD1B5">
                      <MenuIcon :name="item.icon" class="w-6 h-6 shrink-0" style="color:#E61171" />
                      <span class="text-sm font-bold" style="color:#E61171">{{ t(item.key) }}</span>
                    </a>
                  </div>
                </Transition>
              </div>

              <!-- ===== Vacances enfants (liste, dépliée si openSection === 'vacances') ===== -->
              <div class="border-b" style="border-color:#FFD1B5">
                <button type="button" @click="toggleSection('vacances')"
                  class="w-full flex items-center justify-between px-5 py-4 font-bold text-[17px]"
                  style="color:#E61171">
                  {{ t('navVacances') }}
                  <svg viewBox="0 0 24 24" class="w-5 h-5 shrink-0 transition-transform duration-200"
                    :class="openSection === 'vacances' ? 'rotate-180' : ''" fill="none" stroke="#E61171"
                    stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <Transition name="accordion">
                  <div v-if="openSection === 'vacances'" class="px-5 pb-5 flex flex-col gap-2">
                    <a v-for="item in vacancesItems" :key="item.key" href="#" @click="closeMobileMenu"
                      class="flex items-center gap-3 rounded-[10px] px-4 py-3"
                      style="background:#FFFFFF; border:2px solid #FFD1B5">
                      <MenuIcon :name="item.icon" class="w-6 h-6 shrink-0" style="color:#E61171" />
                      <span class="text-sm font-bold" style="color:#E61171">{{ t(item.key) }}</span>
                    </a>
                  </div>
                </Transition>
              </div>

              <!-- ===== Cours (liste, dépliée si openSection === 'cours') ===== -->
              <div class="border-b" style="border-color:#FFD1B5">
                <button type="button" @click="toggleSection('cours')"
                  class="w-full flex items-center justify-between px-5 py-4 font-bold text-[17px]"
                  style="color:#E61171">
                  {{ t('navCours') }}
                  <svg viewBox="0 0 24 24" class="w-5 h-5 shrink-0 transition-transform duration-200"
                    :class="openSection === 'cours' ? 'rotate-180' : ''" fill="none" stroke="#E61171"
                    stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <Transition name="accordion">
                  <div v-if="openSection === 'cours'" class="px-5 pb-5 flex flex-col gap-2">
                    <a v-for="item in coursItems" :key="item.key" href="#" @click="closeMobileMenu"
                      class="flex items-center gap-3 rounded-[10px] px-4 py-3"
                      style="background:#FFFFFF; border:2px solid #FFD1B5">
                      <MenuIcon :name="item.icon" class="w-6 h-6 shrink-0" style="color:#E61171" />
                      <span class="text-sm font-bold" style="color:#E61171">{{ t(item.key) }}</span>
                    </a>
                  </div>
                </Transition>
              </div>

              <!-- ===== Devenir Partenaire : lien simple, pas d'accordéon ===== -->
              <a href="#" @click="closeMobileMenu"
                class="block px-5 py-4 font-bold text-[17px] border-b" style="color:#E61171; border-color:#FFD1B5">
                {{ t('navPartenaire') }}
              </a>
            </div>

            <!-- Pied du drawer, toujours visible : bouton login -->
            <a href="#" @click="closeMobileMenu"
              class="flex items-center justify-center gap-2 px-5 py-4 font-bold text-base shrink-0"
              style="background:#E61171; color:#FFFFFF">
              <img src="/images/icones/login.png" alt="" class="w-5 h-5 object-contain" />
              {{ t('login') }}
            </a>
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