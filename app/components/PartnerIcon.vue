<!--
  PartnerIcon.vue
  ------------
  Petit composant utilitaire qui affiche une icône du menu (fichier PNG)
  à partir de son nom. Les images doivent se trouver dans
  /public/images/icones/partenaire/<name>.png
-->
<script setup lang="ts">
// "name" correspond au nom du fichier image (sans l'extension .png)
defineProps<{ name: string }>()
</script>

<template>
  <!-- encodeURIComponent() sécurise le nom au cas où il contiendrait des espaces ou accents -->
  <img :src="`/images/icones/partenaire/${encodeURIComponent(name)}.png`" :alt="name" class="object-contain" />
</template>
