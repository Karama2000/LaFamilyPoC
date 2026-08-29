// tailwind.config.ts — Configuration de Tailwind CSS pour le projet.
// Documentation officielle : https://tailwindcss.com/docs/configuration
import type { Config } from "tailwindcss";

export default {
  // Liste des fichiers que Tailwind doit analyser pour détecter les classes
  // utilitaires réellement utilisées (ex: "px-4", "text-pink-500"...).
  // Seules les classes trouvées dans ces fichiers sont incluses dans le CSS
  // final — c'est ce qui permet à Tailwind de générer un fichier CSS léger
  // au lieu d'embarquer l'intégralité du framework.
  content: [
    "./app/**/*.{vue,js,ts}", // composants, pages, layouts dans app/
    "./components/**/*.{vue,js,ts}", // au cas où des composants existent hors app/
    "./pages/**/*.{vue,js,ts}", // idem pour les pages hors app/
    "./layouts/**/*.{vue,js,ts}", // idem pour les layouts hors app/
  ],

  theme: {
    // "extend" ajoute des valeurs AU-DESSUS de la palette/config par défaut
    // de Tailwind, sans l'écraser (contrairement à une déclaration directe
    // dans "theme" qui remplacerait totalement les valeurs par défaut).
    extend: {
      // Point de rupture (breakpoint) responsive personnalisé.
      // Tailwind fournit déjà sm/md/lg/xl/2xl par défaut ; "xs" ajoute un
      // palier supplémentaire pour cibler les très petits écrans mobiles
      // (< 380px), utilisable via des classes comme "xs:text-sm".
      screens: {
        xs: "380px",
      },

      // Couleurs de marque personnalisées, utilisables via des classes
      // comme "bg-brand-pink", "text-brand-light", "border-brand-peach".
      // Permet de centraliser la charte graphique du site à un seul endroit
      // plutôt que de répéter des codes hexadécimaux dans chaque composant.
      colors: {
        // Palette de marque alignée avec app/assets/css/variables.css (source
        // de vérité couleurs) et la charte graphique. Utilisable via des
        // classes comme "bg-brand-pink", "text-brand-peach", etc.
        brand: {
          pink: "#e61171", // rose principal (titres, boutons, accents)
          pinkPale: "#ffcee4", // rose pâle (chips, fonds actifs légers)
          peach: "#ffd1b5", // pêche (badges, bordures, bouton "en savoir plus")
          peachLight: "#ffe4d3", // pêche très clair (bordures boutons "soft")
          orange: "#ff863d", // orange (accents ponctuels)
          cream: "#fff8f4", // fond crème (boutons soft, sections)
          creamAlt: "#fdf1ea", // variante crème (bg boutons "région")
          text: "#2e2f30", // texte foncé standard
        },
      },
      // Échelle typographique du design system (cf. charte : Montserrat
      // partout, 5 tailles fixes réutilisées dans toute l'app).
      // Usage : class="text-page-title", "text-subtitle", etc.
      fontSize: {
        "page-title": ["36px", { lineHeight: "1.2", fontWeight: "700" }], // grand titre de page
        subtitle: ["24px", { lineHeight: "1.3", fontWeight: "700" }], // sous-titre moyen
        description: ["20px", { lineHeight: "1.5", fontWeight: "400" }], // description sous grand titre
        "card-title": ["14px", { lineHeight: "1.4", fontWeight: "700" }], // titre de card
        body: ["12px", { lineHeight: "1.5", fontWeight: "400" }], // texte / détails / paragraphes
      },
      // Un seul radius utilisé partout dans l'app (boutons + cards).
      borderRadius: {
        DEFAULT: "10px",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // écrase la police par défaut de tout Tailwind
        montserrat: ["Montserrat", "sans-serif"], // dispo aussi via font-montserrat si besoin explicite
      },
    },
  },

  // "satisfies Config" (TypeScript) : vérifie que cet objet respecte bien le
  // type Config de Tailwind, tout en conservant l'inférence de type précise
  // de l'objet exporté (contrairement à une annotation ": Config" classique).
} satisfies Config;
