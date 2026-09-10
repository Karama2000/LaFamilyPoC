<!--
  MobileFixedHeader.vue
  ---------------------
  Composant affichant l'en-tête fixe sur mobile.
  Il contient le header principal ainsi que la bande
  "Coups de cœur". Un espace est ajouté sous le header
  afin d'éviter que le contenu des pages soit masqué
  lorsque l'utilisateur fait défiler la page.
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
    Comme le header est en position "fixed", il ne prend plus
    de place dans le flux de la page. Ce bloc évite que le
    contenu commence sous le header et soit caché.
  -->
  <div class="h-[255px] md:hidden"></div>
</template>