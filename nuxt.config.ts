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
      title: "DieFamilie",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap",
        },
        // L'ancien favicon pointait vers le logo texte complet
        // (public/images/logo_diefamilie.png) : trop large et trop pâle,
        // il devient invisible une fois réduit à la taille d'un onglet.
        // On utilise à la place une icône carrée dédiée, fond rose de
        // marque (--color-primary / #e61171), lisible en petit.
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/favicon-192.png",
        },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
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