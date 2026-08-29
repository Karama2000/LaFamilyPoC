// nuxt.config.ts — Configuration centrale du projet Nuxt.
// Documentation officielle : https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Modules Nuxt activés pour le projet.
  // @nuxtjs/tailwindcss intègre Tailwind CSS (classes utilitaires, purge
  // automatique du CSS inutilisé, hot-reload du fichier de config Tailwind).
  modules: ["@nuxtjs/tailwindcss"],

  // Désactive le préfixage automatique par nom de dossier (ex:
  // components/ui/BaseButton.vue s'enregistrerait sinon <UiBaseButton>
  // au lieu de <BaseButton>). On veut pouvoir ranger les composants
  // n'importe où (ui/, base/...) et les appeler juste par leur nom de fichier.
  components: [{ path: "~/components", pathPrefix: false }],

  // Feuilles de style chargées globalement sur toutes les pages.
  // Ici : la police d'icônes Tabler Icons (classes .ti.ti-xxx utilisables
  // partout dans l'app sans import supplémentaire par composant).
  css: [
    "@tabler/icons-webfont/dist/tabler-icons.css",
    "~/assets/css/variables.css",
  ],

  // Date de compatibilité Nuxt : fige le comportement du framework à la
  // version des règles internes en vigueur à cette date, pour éviter que
  // des mises à jour futures de Nuxt ne changent silencieusement des
  // comportements par défaut (breaking changes implicites).
  compatibilityDate: "2026-07-14",

  // Variables de configuration "runtime", c'est-à-dire accessibles à
  // l'exécution (contrairement aux imports statiques classiques).
  runtimeConfig: {
    // URLs privées des sources de données. Elles restent côté serveur et
    // sont utilisées par les handlers /api/agenda et /api/partners.
    n8nAgendaWebhookUrl:
      process.env.NUXT_N8N_AGENDA_WEBHOOK_URL ||
      "http://localhost:5678/webhook/agenda-events",
    n8nPartnersWebhookUrl:
      process.env.NUXT_N8N_PARTNERS_WEBHOOK_URL ||
      "http://localhost:5678/webhook/partners",

    // Tout ce qui est dans "public" est envoyé au NAVIGATEUR (client) en

    // plus du serveur — donc à ne JAMAIS utiliser pour des secrets/API keys.
    // Accessible dans le code via useRuntimeConfig().public.xxx
    public: {
      // URL du service LibreTranslate (traduction auto-hébergée).
      // process.env.NUXT_PUBLIC_LIBRETRANSLATE_URL permet de surcharger
      // cette valeur via une variable d'environnement (.env ou plateforme
      // d'hébergement) sans toucher au code ; sinon on retombe sur le
      // serveur local par défaut (utile en développement).
      libretranslateUrl:
        process.env.NUXT_PUBLIC_LIBRETRANSLATE_URL || "http://localhost:5003",
    },
  },

  // Configuration bas niveau transmise directement à Vite (le bundler
  // utilisé par Nuxt en interne pour le serveur de développement et le build).
  vite: {
    server: {
      // Liste blanche des noms d'hôtes autorisés à requêter le serveur dev.
      // Nécessaire ici car le projet est exposé publiquement via un tunnel
      // Cloudflare (trycloudflare.com) pour permettre un accès distant/démo
      // sans déployer — Vite bloque par défaut les hôtes inconnus par
      // sécurité (protection contre le DNS rebinding).
      allowedHosts: ["present-quotations-kai-challenging.trycloudflare.com"],
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap",
        },
      ],
    },
  },
  nitro: {
    routeRules: {
      "/api/proxy/**": {
        proxy: "https://www.anzere.ch/**",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
});