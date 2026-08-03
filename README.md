# 📚 Documentation du projet — diefamilie.ch / lafamily.ch

> **Proof of Concept (PoC)** développé avec **Nuxt 3** pour la plateforme **LaFamily / DieFamilie**.

---

# 🏗️ Stack technique

| Technologie | Description |
|-------------|-------------|
| Framework | Nuxt 3 |
| Front-end | Vue 3 + Composition API |
| Langage | TypeScript (mode strict) |
| Styling | Tailwind CSS |
| Icônes | Tabler Icons |
| Traduction | LibreTranslate (Docker) + Glossaire métier |
| Routing | File-Based Routing (Nuxt) |

---

# 🚀 Installation

## 1. Cloner le projet

```bash
git clone https://github.com/Karama2000/LaFam1yPoC.git
cd LaFam1yPoC
```

---

## 2. Installer les dépendances

```bash
npm install
```

---

## 3. Configurer les variables d'environnement

Créer un fichier **.env**

```env
NUXT_PUBLIC_LIBRETRANSLATE_URL=http://localhost:5003
```

---

## 4. Démarrer LibreTranslate

```bash
docker run -d \
--name libretranslate \
-p 5003:5000 \
libretranslate/libretranslate
```

> ⚠️ Lors du premier lancement, LibreTranslate télécharge les modèles de traduction. Cette opération peut durer entre **5 et 10 minutes**.

---

## 5. Lancer le projet

```bash
npm run dev
```

Le site est ensuite disponible sur :

```
http://localhost:3000
```

---

# 📁 Structure du projet

```text
app/
├── components/
│   ├── Header.vue
│   ├── Footer.vue
│   ├── Carousels/
│   ├── Cards/
│   └── ...
│
├── composables/
│   └── useTranslation.ts
│
├── data/
│   ├── staticTexts.ts
│   ├── translationGlossary.ts
│   ├── mockContent.ts
│   ├── agendaData.ts
│   └── partnersData.ts
│
├── pages/
│   ├── index.vue
│   ├── agenda.vue
│   └── partenaires.vue
│
└── assets/
```

---

# 🌍 Système de traduction

Le projet utilise **LibreTranslate** afin de générer automatiquement les traductions.

## Fonctionnement

```
Texte source (Français)
        │
        ▼
Glossaire métier
        │
        ▼
LibreTranslate
        │
        ▼
Anglais
Allemand
Italien
```

Les textes français sont stockés dans :

```
app/data/staticTexts.ts
```

Les termes spécifiques au métier sont corrigés grâce au glossaire :

```
app/data/translationGlossary.ts
```

---

# 📄 Pages principales

## 🏠 Accueil (`/`)

- Hero
- Carrousel Sélection
- Nouveautés
- Coups de cœur
- Newsletter

---

## 📅 Agenda (`/agenda`)

Fonctionnalités :

- Recherche par date
- Filtre par canton
- Filtre par âge
- Filtre par catégorie
- Affichage sous forme de grille

---

## 🤝 Partenaires (`/partenaires`)

Fonctionnalités :

- Filtre par région (SR / SA)
- Filtre par catégorie
- Affichage actuel des partenaires **SA uniquement**

---

# 🎨 Charte graphique

| Élément | Couleur |
|----------|----------|
| Rose principal | `#E61171` |
| Orange | `#FF863D` |
| Pêche | `#FFD1B5` |
| Rose pâle | `#FFCEE4` |
| Texte | `#2E2F30` |
| Fond | `#FFF8F4` |

### Typographie

- **Montserrat**
- Titres en **Bold**
- `tracking-[0.2px]`

---

# 📦 Ressources (Assets)

```
public/
└── images/
    ├── famille.jpeg
    ├── logo_diefamilie.png
    ├── logo_lafamilyshop.png
    ├── icones/
    │     └── menu/
    ├── selection/
    ├── nouveautes/
    └── logos/
```

Le projet utilise notamment :

- images d'accueil
- logos partenaires
- icônes du menu
- images des carrousels

---

# 🔄 Commandes utiles

## Développement

```bash
npm run dev
npm run build
npm run preview
```

---

## Git

```bash
git add .

git commit -m "message"

git push origin master
```

---

## Docker

Démarrer LibreTranslate

```bash
docker start libretranslate
```

Arrêter

```bash
docker stop libretranslate
```

Afficher les logs

```bash
docker logs -f libretranslate
```

---

## Nettoyer Nuxt

Windows PowerShell

```powershell
Remove-Item -Recurse -Force .nuxt
```

Puis

```bash
npm run dev
```

---

# ⚠️ Problèmes connus

| Problème | Solution |
|-----------|----------|
| Erreurs de casse des composants sous Windows | Renommer le fichier en deux étapes puis supprimer `.nuxt` |
| TypeScript strict (`undefined`) | Utiliser un fallback (`??`) |
| Port Docker déjà utilisé | Vérifier `docker ps` ou modifier le port dans `.env` |
| Premier lancement lent | Attendre le téléchargement des modèles LibreTranslate |

---

# 📌 Données de démonstration

Le projet utilise actuellement des données mockées :

- événements
- partenaires
- carrousels
- textes

Ces fichiers se trouvent dans :

```
app/data/
```

Ils pourront être remplacés ultérieurement par des données provenant :

- d'une API
- d'un CMS
- d'un pipeline n8n

---

# ✅ Travaux restants

- [ ] Versionner définitivement le `package.json`
- [ ] Remplacer les données de démonstration par les données réelles
- [ ] Ajouter les 26 logos partenaires
- [ ] Créer la version Romandie (SR)
- [ ] Vérifier les catégories partenaires
- [ ] Intégrer le pipeline n8n pour le scraping
- [ ] Optimiser les performances de traduction
- [ ] Ajouter les tests de validation

---

# 📂 Dépôt GitHub

https://github.com/Karama2000/LaFam1yPoC

---

# 🌐 Site web

https://lafamily.ch

---

# 👨‍💻 Technologies utilisées

- Nuxt 3
- Vue 3
- TypeScript
- Tailwind CSS
- Docker
- LibreTranslate
- Tabler Icons

---

## 📄 Licence

Projet réalisé dans le cadre du développement du **PoC LaFamily / DieFamilie**.
