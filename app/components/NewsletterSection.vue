<!--
  NewsletterSection.vue
  ----------------------
  Section d'inscription à la newsletter : titre, texte d'accroche et
  formulaire (champ email + bouton "s'inscrire") sur fond rose.
-->
<script setup lang="ts">
defineProps<{ t: (key: string) => string }>()

// Champ email lié au formulaire
const email = ref('')

// Soumission du formulaire d'inscription
// TODO : remplacer le console.log par un vrai appel API d'inscription
function onSubscribe() {
  console.log('Inscription newsletter:', email.value)
  email.value = ''
}
</script>

<template>
  <section class="relative z-20 pt-20 pb-16 px-6" style="background:#E61171">
    <!-- Forme décorative courbe pêche, visible seulement sur desktop -->
    <div class="absolute inset-x-0 top-0 h-[128px] -translate-y-1/2 rounded-[100%] pointer-events-none hidden md:block"
  style="background:#FFD1B5"></div>

    <div class="relative max-w-[952px] mx-auto text-center flex flex-col items-center">
      <!-- Titre de la section -->
      <h2 class="max-w-[281px] md:max-w-none font-bold tracking-[0.2px] mb-3 md:mb-7 text-[21px] leading-[25px] md:text-[40px] md:leading-[1.25]">
        {{ t('newsletterTitle') }}
      </h2>
      <!-- Texte d'accroche -->
      <p class="max-w-[266px] md:max-w-[497px] text-sm leading-5 tracking-[0.2px] mb-6 md:mb-7">
        {{ t('newsletterSubtitle') }}
      </p>

      <!-- Formulaire : champ email + bouton d'envoi collé à droite -->
      <form class="relative w-full max-w-[688px] h-[58px]" @submit.prevent="onSubscribe">
        <input v-model="email" type="email" required :placeholder="t('emailPlaceholder')"
          class="w-full h-full rounded-[5px] border border-white px-5 pr-[130px] text-sm tracking-[0.2px]"
          style="color:#737373" />
        <button type="submit"
          class="absolute right-0 top-0 h-full w-[117px] border-[4px] border-white rounded-r-[5px] text-sm font-bold tracking-[0.2px]"
          style="background:#FFCEE4;color:#E61171">
          {{ t('subscribe') }}
        </button>
      </form>
    </div>
  </section>
</template>
