# LaFamily / DieFamilie 

Proof of Concept du portail familial LaFamily / DieFamilie. Ce dépôt contient le front-end Nuxt : accueil, agenda, blog, partenaires, partenariat, navigation responsive et traduction multilingue.

> L’interface Nuxt et plusieurs routes Nitro sont présentes. Les données externes proviennent de webhooks n8n configurés par variables d’environnement ; un CMS complet n’est pas fourni dans ce dépôt.

## Stack

- Nuxt `^4.4.8`
- Vue 3 et Composition API
- TypeScript
- Tailwind CSS
- Tabler Icons
- Vite (intégré à Nuxt)
- LibreTranslate lancé séparément avec Docker

## Installation

Prérequis : Node.js/npm et Docker Desktop pour la traduction.

```bash
git clone https://github.com/Karama2000/LaFam1yPoC.git
cd LaFamilyPoC
npm install
```

Créer `.env` à la racine :

```env
NUXT_PUBLIC_LIBRETRANSLATE_URL=http://localhost:5003
NUXT_N8N_AGENDA_WEBHOOK_URL=http://localhost:5678/webhook/agenda-events
NUXT_N8N_PARTNERS_WEBHOOK_URL=http://localhost:5678/webhook/partners
```

Cette variable est publique et ne doit contenir aucun secret.

Les deux variables `NUXT_N8N_*` sont privées : elles sont utilisées uniquement par les routes serveur `/api/agenda` et `/api/partners`. Leurs valeurs par défaut pointent vers un n8n local ; les remplacer par les webhooks de l’environnement utilisé.

## Docker et LibreTranslate

Démarrer LibreTranslate :

```powershell
docker run -d --name libretranslate -p 5003:5000 libretranslate/libretranslate
```

Le premier démarrage peut prendre plusieurs minutes (téléchargement des modèles).

Vérifier et gérer le conteneur :

```powershell
docker ps
docker logs -f libretranslate
docker start libretranslate
docker stop libretranslate
docker restart libretranslate
```

Tester directement l’API :

```powershell
$body = @{ q = "Bonjour la famille"; source = "fr"; target = "en"; format = "text" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5003/translate" -Method Post -ContentType "application/json" -Body $body
```

La réponse doit contenir `translatedText`.

Si le nom du conteneur existe déjà :

```powershell
docker ps -a --filter "name=libretranslate"
```

## Lancer et tester Nuxt

Dans un autre terminal :

```powershell
npm run dev
```

Ouvrir <http://localhost:3000>, puis cliquer sur `EN`, `DE` ou `IT` dans le header. Pour vérifier l’appel, ouvrir `F12` > **Network** et rechercher `localhost:5003/translate`. Les requêtes doivent être en `POST` avec le statut `200`.

Commandes disponibles :

```bash
npm run dev       # développement
npm run build     # build de production
npm run generate  # génération statique
npm run preview   # prévisualisation
```

## Fonctionnement de la traduction

Le composable `app/composables/useTranslation.ts` utilise le français comme langue source et supporte `fr`, `en`, `de` et `it`. Il lit `app/data/staticTexts.ts`, applique les exceptions de `app/data/translationGlossary.ts`, appelle `POST {NUXT_PUBLIC_LIBRETRANSLATE_URL}/translate`, met les résultats en cache mémoire et conserve le français en cas d’erreur. Le cache est perdu lors d’un rechargement complet et certains contenus mockés peuvent rester en français.

## Routes

| URL | Fichier | Fonction |
|---|---|---|
| `/` | `app/pages/index.vue` | Accueil |
| `/agenda` | `app/pages/agenda.vue` | Recherche et filtres d’événements |
| `/agendaFolder/:id` | `app/pages/agendaFolder/[id].vue` | Détail événement |
| `/blog` | `app/pages/blog.vue` | Liste et filtres d’articles |
| `/articlefolder/:id` | `app/pages/articlefolder/[id].vue` | Détail article |
| `/partenaires` | `app/pages/partenaires.vue` | Liste et filtres partenaires |
| `/partenairesFolder/:id` | `app/pages/partenairesFolder/[id].vue` | Détail partenaire |
| `/menuFolder/agenda?categorie=&sousCategorie=` | `app/pages/menuFolder/agenda.vue` | Agenda depuis le menu |
| `/menuFolder/article?category=` | `app/pages/menuFolder/article.vue` | Articles depuis le menu |
| `/menuFolder/devenirPartenaire` | `app/pages/menuFolder/devenirPartenaire.vue` | Offre partenaire |

## Architecture

```text
app/
├── app.vue                  # racine : <NuxtPage />
├── pages/                   # routing automatique Nuxt
├── components/              # composants fonctionnels
│   └── ui/                  # primitives UI réutilisables
├── composables/             # useTranslation, useReferenceHeight
├── data/                    # données et référentiels locaux
└── assets/css/              # variables CSS
public/images/               # logos, icônes et visuels
nuxt.config.ts               # configuration Nuxt/Vite/runtime
tailwind.config.ts           # thème Tailwind
```

Composants principaux : `SiteHeader`, `SiteFooter`, `FixedMobileHeader`, `HeroSection`, `PageHero`, `SelectionCarousel`, `BlogSection`, `ArticleCard`, `AgendaEventCard`, `AgendaFilterDrawer`, `AgendaDatePicker`, `PartnerCard`, `PartnersFilterBar`, `NewsletterSection` et `TarifCard`.

## Données et API Nitro

- `agendaData.ts` : événements, catégories, âges et cantons ;
- `articleData.ts` : articles et blocs texte/image ;
- `partnersData.ts` : partenaires, contacts, réseaux et galeries ;
- `menuData.ts` : structure du menu ;
- `mockContent.ts`, `coupsDeCoeur.ts` : contenus mis en avant ;
- `partnershipData.ts`, `foundersData.ts` : page partenaire ;
- `staticTexts.ts`, `translationGlossary.ts` : traduction.

Les filtres s’exécutent côté client. Les routes Nitro `server/api/agenda.get.ts` et `server/api/partners.get.ts` récupèrent les données depuis les webhooks n8n définis dans `runtimeConfig`, les normalisent et les mettent en cache pendant 10 minutes. `server/api/image.ts` et `server/api/image.get.ts` servent de proxy sécurisé pour les images des domaines autorisés.

## Design et responsive

La charte utilise Montserrat, Tailwind et les couleurs rose `#E61171`, orange `#FF863D`, pêche `#FFD1B5`, rose pâle `#FFCEE4`, crème `#FFF8F4` et texte `#2E2F30`. Le breakpoint personnalisé `xs: 380px` est défini dans `tailwind.config.ts`.

Le mobile utilise un header fixe, un menu drawer, un bandeau de coups de cœur et un drawer de filtres Agenda. Le desktop utilise le header complet, les grilles et une sidebar de coups de cœur.

## Limites connues

- Données métier mockées ;
- newsletter non connectée à un service réel ;
- traduction dépendante de LibreTranslate ;
- choix de langue non persisté ;
- aucun test, lint, formatter ou CI configuré ;
- aucune API, authentification, CMS ou back-office ;
- SEO et accessibilité à compléter ;
- certains logos partenaires et mappings de filtres restent à vérifier.

Avant livraison, exécuter `npm run build` et tester les routes principales sur mobile et desktop.

## Évolutions recommandées

1. Remplacer les données locales par une API ou un CMS.
2. Connecter la newsletter et persister la langue.
3. Ajouter ESLint, Prettier, tests unitaires, tests end-to-end et CI.
4. Compléter le SEO, l’accessibilité et l’optimisation des images.

## Liens

- Dépôt : <https://github.com/Karama2000/LaFam1yPoC>
- Site : <https://lafamily.ch>
- Nuxt : <https://nuxt.com/docs>
- LibreTranslate : <https://docs.libretranslate.com/>

## Routes actuelles a verifier dans l’arborescence

Le projet contient également les fichiers suivants, qui correspondent aux routes générées par la version actuelle du dépôt :

| URL actuelle | Fichier |
|---|---|
| `/articleFolder/:id` | `app/pages/articleFolder/[id].vue` |
| `/partenaire/:id` | `app/pages/partenaire/[id].vue` |
| `/menu/agenda` | `app/pages/menu/agenda.vue` |
| `/menu/article` | `app/pages/menu/article.vue` |
| `/menu/devenirPartenaire` | `app/pages/menu/devenirPartenaire.vue` |

En cas de différence avec le tableau précédent, vérifier le nom exact présent dans `app/pages/` avant de déployer : Nuxt génère les URLs à partir des fichiers.

## Endpoints Nitro internes

- `GET /api/agenda` : récupère et normalise les événements depuis le webhook n8n configuré ; cache de 10 minutes.
- `GET /api/partners` : récupère et normalise les partenaires depuis le webhook n8n configuré ; cache de 10 minutes.
- `GET /api/image?url=...` : proxy d’image limité aux domaines autorisés dans `server/api/image.ts`.

Les URLs n8n doivent être définies dans le `runtimeConfig` de `nuxt.config.ts` et ne doivent pas être exposées dans le navigateur.
