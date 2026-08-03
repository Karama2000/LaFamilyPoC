<!--
  app.vue — Racine de l'application Nuxt.

  Depuis que le projet utilise le dossier `app/pages/` (routing par fichiers :
  pages/index.vue, pages/partenaires.vue, pages/agenda.vue, etc.), ce fichier
  n'a plus besoin de contenir la mise en page complète (header, hero,
  sections...). Il sert uniquement de coquille racine : <NuxtPage /> est le
  composant qui affiche automatiquement la page correspondant à l'URL visitée.

  Concrètement :
  - sur "/"            → affiche app/pages/index.vue
  - sur "/partenaires" → affiche app/pages/partenaires.vue
  - sur "/agenda"      → affiche app/pages/agenda.vue

  Si un élément doit être commun à TOUTES les pages (header, footer, menu
  mobile, etc.), il vaut mieux le mettre dans un layout (app/layouts/default.vue)
  plutôt que directement ici, pour garder ce fichier minimal.
-->
<template>
  <NuxtPage />
</template>