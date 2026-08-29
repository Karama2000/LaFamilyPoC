<!--
  NewsletterSection.vue
  ----------------------
  Section d'inscription à la newsletter : titre, texte d'accroche et
  formulaire (champ email + bouton "s'inscrire") sur fond rose.
-->
<script setup lang="ts">
defineProps<{ t: (key: string) => string }>();

// Champ email lié au formulaire
const email = ref("");

// Soumission du formulaire d'inscription
// TODO : remplacer le console.log par un vrai appel API d'inscription
function onSubscribe() {
  console.log("Inscription newsletter:", email.value);
  email.value = "";
}
</script>

<template>
  <section
    class="relative z-20 py-10 md:py-20 px-5 md:px-7"
    style="background: #e61171"
  >
    <!-- Forme décorative courbe pêche, visible seulement sur desktop -->

    <div
      class="relative max-w-[952px] mx-auto text-center flex flex-col items-center"
    >
      <!-- Titre de la section -->
      <BaseTitle size="section" class="text-center mb-6" style="">
        {{ t("newsletterTitle") }}</BaseTitle
      >

      <!-- Texte d'accroche -->

      <BaseSubtitle
        size="description"
        tag="p"
        class="mb-6 md:mb-7 max-w-[266px] md:max-w-[497px]"
      >
        {{ t("newsletterSubtitle") }}</BaseSubtitle
      >
      <!-- Formulaire : champ email + bouton d'envoi collé à droite -->
      <form
        class="relative w-full max-w-[688px] h-[58px]"
        @submit.prevent="onSubscribe"
      >
        <input
          v-model="email"
          type="email"
          required
          :placeholder="t('emailPlaceholder')"
          class="w-full h-full rounded-[10px] border border-white px-5 pr-[130px] text-sm tracking-[0.2px]"
          style="color: #737373"
        />

        <BaseButton
          type="submit"
          variant="rosePale"
          class="!absolute !right-1 !top-1/2 !-translate-y-1/2 !px-4 !py-4 !text-sm !font-bold !tracking-[0.2px]"
        >
          {{ t("subscribe") }}
        </BaseButton>
      </form>
    </div>
  </section>
</template>
