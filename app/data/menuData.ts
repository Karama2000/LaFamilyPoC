// Données statiques du menu de navigation (SiteHeader.vue), utilisées à
// la fois pour la version desktop (dropdowns au survol) et la version
// mobile (accordéons dans le drawer).
export interface MenuLink {
  key: string    // clé de traduction (voir staticTexts.ts), affichée comme libellé du lien
  icon: string   // nom du fichier icône dans /public/images/icones/menu/<icon>.png (utilisé par MenuIcon.vue)
}

// "Je cherche..." — grille 5 colonnes x 2 lignes (méga-menu)
export const searchCategories: MenuLink[] = [
  { key: 'catGrossesse', icon: 'grocesse' },
  { key: 'catBebe', icon: 'bébé' },
  { key: 'catPetiteEnfance', icon: 'petite enfance' },
  { key: 'catEnfance', icon: 'enfance' },
  { key: 'catAdolescence', icon: 'adolescence' },
  { key: 'catScolarite', icon: 'scolarité' },
  { key: 'catParents', icon: 'parents' },
  { key: 'catVieDeFamille', icon: 'vie familiale' },
  { key: 'catTravail', icon: 'travail' },
  { key: 'catBudgetAssurance', icon: 'budget et assurance' }
]

// "Activités" — liste verticale
export const activitesItems: MenuLink[] = [
  { key: 'actPleinAir', icon: 'activités physiques' },
  { key: 'actCulturelles', icon: 'activités culturelles' },
  { key: 'actAutres', icon: 'autres activités' }
]

// "Vacances enfants" — liste verticale
export const vacancesItems: MenuLink[] = [
  { key: 'vacCamps', icon: 'camps' },
  { key: 'vacCampsDuJour', icon: 'camps du jour' }
]

// "Cours" — liste verticale
export const coursItems: MenuLink[] = [
  { key: 'coursSoutien', icon: 'soutien scolaire' },
  { key: 'coursLangues', icon: 'cours de langue' },
  { key: 'coursArt', icon: 'atelier d art' },
  { key: 'coursSport', icon: 'séances de sport' },
  { key: 'coursNumeriques', icon: 'cours numériques' }
]
