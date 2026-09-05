// Documentation officielle : https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  components: [{ path: "~/components", pathPrefix: false }],

  css: [
    "@tabler/icons-webfont/dist/tabler-icons.css",
    "~/assets/css/variables.css",
  ],

  compatibilityDate: "2026-07-14",

  runtimeConfig: {
    n8nAgendaWebhookUrl:
      process.env.NUXT_N8N_AGENDA_WEBHOOK_URL ||
      "http://localhost:5678/webhook/agenda-events",
    n8nPartnersWebhookUrl:
      process.env.NUXT_N8N_PARTNERS_WEBHOOK_URL ||
      "http://localhost:5678/webhook/partners",

    // Nuxt sur l’hôte : http://localhost:5003
    // Nuxt dans le même docker-compose : http://libretranslate:5000
    libretranslateUrl:
      process.env.NUXT_LIBRETRANSLATE_URL ||
      process.env.NUXT_PUBLIC_LIBRETRANSLATE_URL ||
      "http://localhost:5003",

    // Les URLs internes restent côté serveur et ne sont pas exposées au client.
    public: {},
  },

  vite: {
    server: {
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
