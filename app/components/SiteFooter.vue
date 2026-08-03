<!--
  SiteFooter.vue
  ----------------
  Pied de page du site, en deux blocs empilés :
    1) un bloc sombre avec coordonnées de contact + logo + liste des sites
       du réseau (Vaud famille, Genève famille, etc.)
    2) un bloc clair avec copyright, mentions légales et réseaux sociaux
  Chaque bloc a sa propre mise en page mobile (empilée/centrée) et
  desktop (alignée horizontalement), affichées via les classes
  Tailwind "flex md:hidden" / "hidden md:flex".
-->
<script setup lang="ts">
defineProps<{ t: (key: string) => string }>()
</script>

<template>
  <footer class="relative z-20" style="background:#1E1E1E">
    <div class="border-t-2" style="border-color:#E61171"></div>

    <div class="px-6 md:px-12 py-10" style="background:#2E2F30">
      <div class="max-w-[1050px] mx-auto">

        <!-- ============ VERSION MOBILE : coordonnées à gauche, liste des sites du réseau à droite ============ -->
        <div class="flex md:hidden flex-row items-start justify-between gap-4">
          <div class="flex flex-col gap-5 mt-6">
            <!-- Numéro de téléphone -->
            <div class="flex items-center gap-2.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <h6 class="text-base font-bold underline">021 652 52 93</h6>
            </div>
            <!-- Adresse postale -->
            <div class="flex items-start gap-2.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h6 class="text-base font-bold">Dailles 10, 1053 Cugy</h6>
            </div>
            <!-- Adresse email -->
            <div class="flex items-center gap-2.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              <h6 class="text-base font-bold underline">info@lafamily.ch</h6>
            </div>
          </div>

          <!-- Liste des sites du réseau (chaque nom en deux couleurs : rose + blanc) -->
          <div class="flex flex-col gap-2 text-right shrink-0">
            <p class="text-sm font-bold whitespace-nowrap">
              <span style="color:#FFFFFF">La</span><span style="color:#E61171">family</span>
            </p>
            <p class="text-sm font-bold"><span style="color:#E61171">Vaud</span><span
                style="color:#FFFFFF">famille</span></p>
            <p class="text-sm font-bold"><span style="color:#E61171">Genève</span><span
                style="color:#FFFFFF">famille</span></p>
            <p class="text-sm font-bold"><span style="color:#E61171">Neuchâtel</span><span
                style="color:#FFFFFF">famille</span></p>
            <p class="text-sm font-bold"><span style="color:#E61171">Valais</span><span
                style="color:#FFFFFF">famille</span></p>
            <p class="text-sm font-bold"><span style="color:#E61171">Die</span><span
                style="color:#FFFFFF">familie</span></p>
          </div>
        </div>

        <!-- ============ VERSION DESKTOP : coordonnées / logo centré / liste des sites du réseau (inchangée) ============ -->
        <div class="hidden md:flex md:flex-row md:items-center md:justify-between gap-10">

          <div class="flex flex-col gap-5">
            <div class="flex items-center gap-2.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <h6 class="text-sm font-bold underline">021 652 52 93</h6>
            </div>
            <div class="flex items-start gap-2.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h6 class="text-sm font-bold">Dailles 10, 1053 Cugy</h6>
            </div>
            <div class="flex items-center gap-2.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              <h6 class="text-sm font-bold underline">info@lafamily.ch</h6>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <p class="text-2xl font-bold whitespace-nowrap">
              <span style="color:#FFFFFF">La</span><span style="color:#E61171">family</span>
            </p>
          </div>

          <div class="flex flex-col gap-2 text-right">
            <p class="text-sm font-bold"><span style="color:#E61171">Vaud</span><span
                style="color:#FFFFFF">famille</span></p>
            <p class="text-sm font-bold"><span style="color:#E61171">Genève</span><span
                style="color:#FFFFFF">famille</span></p>
            <p class="text-sm font-bold"><span style="color:#E61171">Neuchâtel</span><span
                style="color:#FFFFFF">famille</span></p>
            <p class="text-sm font-bold"><span style="color:#E61171">Valais</span><span
                style="color:#FFFFFF">famille</span></p>
            <p class="text-sm font-bold"><span style="color:#E61171">Die</span><span
                style="color:#FFFFFF">familie</span></p>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 md:px-12 py-6" style="background:#FAFAFA">
      <div class="max-w-[1050px] mx-auto">

        <!-- ============ VERSION MOBILE : icônes réseaux sociaux en haut, copyright centré en dessous ============ -->
        <div class="flex md:hidden flex-col items-center text-center gap-4">
          <!-- Icônes des réseaux sociaux -->
          <div class="flex items-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=61588713791554" target="_blank" rel="noopener noreferrer"
              aria-label="Facebook">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#E61171" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 5 3.657 9.128 8.438 9.879V14.89h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 17 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/diefamilie.ch/" target="_blank" rel="noopener noreferrer"
              aria-label="Instagram">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
          <p class="text-sm font-bold tracking-[0.2px] leading-relaxed" style="color:#E61171">
            © 2026 . Lafamily.ch<br />
            {{ t('rights') }} |
            <a href="https://www.loisirs.ch/mentions/" target="_blank" rel="noopener noreferrer" class="underline">
              {{ t('mentionsLegales') }}
            </a>
          </p>
        </div>

        <!-- ============ VERSION DESKTOP : copyright à gauche, réseaux sociaux à droite (inchangée) ============ -->
        <div class="hidden md:flex md:flex-row items-center justify-between gap-4">
          <p class="text-sm font-bold tracking-[0.2px]" style="color:#E61171">
            © 2026 . Lafamily.ch | {{ t('rights') }} |
            <a href="https://www.loisirs.ch/mentions/" target="_blank" rel="noopener noreferrer" class="underline">
              {{ t('mentionsLegales') }}
            </a>
          </p>
          <div class="flex items-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=61588713791554" target="_blank" rel="noopener noreferrer"
              aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#E61171" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 5 3.657 9.128 8.438 9.879V14.89h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 17 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/diefamilie.ch/" target="_blank" rel="noopener noreferrer"
              aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E61171" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>