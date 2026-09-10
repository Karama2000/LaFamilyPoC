<!--
  MobileFixedHeader.vue
  ---------------------
-->

<script setup lang="ts">
const { currentLang, t, setLang } = useTranslation()

function onLangChange(lang: string) {
  setLang(lang as any,)
}
</script>

<template>
  <!-- Conteneur fixe affiché uniquement sur mobile -->
  <div class="mt- fixed top-0 left-0 right-0 z-[100] bg-[#e61171] md:hidden">

    <!-- En-tête principal du site (logo, menu, langue, etc.) -->
    <SiteHeader :t="t" :current-lang="currentLang"
      @set-lang="onLangChange"
    />

    <!-- Bande "Coups de cœur" affichée sous le header -->
    <CoupsDeCoeurMobileStrip class="-mt-10"/>
  </div>

  <!--
    Espace de compensation.
  -->
  <div class="h-[255px] md:hidden"></div>
</template>