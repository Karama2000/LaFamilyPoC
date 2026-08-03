📚 Documentation - diefamilie.ch / lafamily.ch

🏗️ Stack Technique
Framework: Nuxt 3 + Vue 3 + Composition API

Styling: Tailwind CSS (valeurs arbitraires)

Icônes: Tabler Icons

Traduction: LibreTranslate (Docker) + glossaire métier

Routing: Nuxt file-based

TypeScript: Mode strict

🚀 Démarrage Rapide
bash
# 1. Installation
npm install

# 2. Variables d'environnement (.env)
NUXT_PUBLIC_LIBRETRANSLATE_URL=http://localhost:5003

# 3. Démarrer LibreTranslate
docker run -d --name libretranslate -p 5003:5000 libretranslate/libretranslate

# 4. Lancer le projet
npm run dev

📁 Structure
text
app/
├── pages/
│   ├── index.vue          # Accueil
│   ├── agenda.vue         # Agenda + filtres
│   └── partenaires.vue    # Partenaires (filtrage SA)
├── components/            # 16 composants (Header, Footer, Carrousels, Cartes...)
├── composables/
│   └── useTranslation.ts  # Traduction FR→EN/DE/IT
└── data/
    ├── staticTexts.ts     # Tous les textes fixes (FR)
    ├── translationGlossary.ts # Overrides métier
    ├── mockContent.ts     # Démo carrousels
    ├── agendaData.ts      # 12 événements démo
    └── partnersData.ts    # 26 partenaires

🌍 Système de Traduction
Principe : Textes en FR → traduits à la volée via LibreTranslate


📄 Pages Principales
Page	Fonctionnalités
Accueil (/)	Hero + carrousels (sélection/nouveautés) + coups de cœur + newsletter
Agenda (/agenda)	Recherche dates + filtres (canton/âge/catégories) + grille résultats
Partenaires (/partenaires)	Filtres zone SR/SA + catégorie (affiche uniquement SA)

🎨 Charte Graphique

Rose	#E61171	Hero, boutons, accents
Pêche	#FFD1B5	Fonds alternés
Rose pâle	#FFCEE4	Badges
Texte	#2E2F30	Corps de texte
Fond	#FFF8F4	Pages agenda/partenaires
Orange	#FF863D	Flèches carrousel
Typo: Montserrat (bold pour titres, tracking-[0.2px])

⚠️ Pièges Connus
Problème	                            Solution
Casse composants (Windows)	Renommer en 2 temps + supprimer .nuxt
TypeScript strict (array[i] = T|undefined)	Fallback : array[i] ?? defaut
Port Docker occupé	Vérifier docker ps, changer .env
LibreTranslate lent	1er démarrage = téléchargement modèles (5-10 min)

📦 Assets Requis
text
/public/images/
├── famille.jpeg
├── logo_diefamilie.png
├── logo_lafamilyshop.png
├── icones/menu/*.png      # 10 icônes
├── selection/1-4.jpeg
├── nouveautes/1-8.jpeg
└── logos/*.png            # 26 logos partenaires

🔄 Commandes Utiles
bash
# Développement
npm run dev
npm run build
npm run preview

# Git
git add .
git commit -m "message"
git push -u origin master

# Docker (LibreTranslate)
docker start libretranslate
docker stop libretranslate
docker logs libretranslate -f

# Nettoyage
Remove-Item -Recurse -Force .nuxt
npm run dev

✅ À Faire (Priorités)
□ Créer/versionner package.json
□ Remplacer données démo → données réelles
□ Ajouter 26 logos partenaires
□ Décider page pour partenaires SR (100% Romandie)
□ Vérifier catégories partenaires (déduites automatiquement)
□ Intégrer pipeline n8n (scraping)

Repo: https://github.com/Karama2000/LaFam1yPoC
Site: https://lafamily.ch

