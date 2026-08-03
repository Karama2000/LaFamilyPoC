// tailwind.config.ts — Configuration de Tailwind CSS pour le projet.
// Documentation officielle : https://tailwindcss.com/docs/configuration
import type { Config } from 'tailwindcss'

export default {

  // Liste des fichiers que Tailwind doit analyser pour détecter les classes
  // utilitaires réellement utilisées (ex: "px-4", "text-pink-500"...).
  // Seules les classes trouvées dans ces fichiers sont incluses dans le CSS
  // final — c'est ce qui permet à Tailwind de générer un fichier CSS léger
  // au lieu d'embarquer l'intégralité du framework.
  content: [
    './app/**/*.{vue,js,ts}',        // composants, pages, layouts dans app/
    './components/**/*.{vue,js,ts}', // au cas où des composants existent hors app/
    './pages/**/*.{vue,js,ts}',      // idem pour les pages hors app/
    './layouts/**/*.{vue,js,ts}',    // idem pour les layouts hors app/
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
        xs: '380px',
      },

      // Couleurs de marque personnalisées, utilisables via des classes
      // comme "bg-brand-pink", "text-brand-light", "border-brand-peach".
      // Permet de centraliser la charte graphique du site à un seul endroit
      // plutôt que de répéter des codes hexadécimaux dans chaque composant.
      colors: {
        brand: {
          pink: '#e6007e',   // rose principal de la marque
          light: '#ffb3d9',  // rose clair (variante douce)
          peach: '#ffd7c2',  // pêche (couleur d'accent secondaire)
        },
      },
    },
  },

  // "satisfies Config" (TypeScript) : vérifie que cet objet respecte bien le
  // type Config de Tailwind, tout en conservant l'inférence de type précise
  // de l'objet exporté (contrairement à une annotation ": Config" classique).
} satisfies Config