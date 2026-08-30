export interface MenuLink {
  key: string
  icon: string
  descriptionKey: string   // clé de traduction du texte affiché sous le titre de la page cible
}

// "Je cherche..." — chaque item pointe vers /blog filtré par catégorie d'article
export const searchCategories: MenuLink[] = [
  { key: 'catGrossesse', icon: 'grossesse', descriptionKey: 'Tout ce qu’il faut savoir pour vivre sereinement la grossesse et préparer l’arrivée de bébé.Contrary to popular belief.' },
  { key: 'catBebe', icon: 'bebe', descriptionKey: ' Conseils, services et ressources pour accompagner bébé dans ses premiers mois et ses premières années.' },
  { key: 'catPetiteEnfance', icon: 'petiteEnfance', descriptionKey: 'Des ressources et activités pour accompagner les enfants dans leurs premières années.' },
  { key: 'catEnfance', icon: 'enfance', descriptionKey: 'Services, activités et informations pour accompagner les enfants au quotidien et dans leur développement.' },
  { key: 'catAdolescence', icon: 'adolescence', descriptionKey: 'Des ressources, activités et services pour accompagner les adolescents dans cette période de changement.' },
  { key: 'catScolarite', icon: 'scolarite', descriptionKey: 'Tout pour accompagner les enfants et les jeunes dans leur parcours scolaire et leur réussite.' },
  { key: 'catParents', icon: 'parents', descriptionKey: 'Conseils, services et ressources pour accompagner les parents dans leur quotidien et leur rôle.' },
  { key: 'catVieDeFamille', icon: 'vieDeFamille', descriptionKey: 'Des ressources et services pour faciliter la vie familiale et profiter pleinement des moments en famille.' },
  { key: 'catTravail', icon: 'travail', descriptionKey: 'Informations, services et ressources pour concilier vie professionnelle, familiale et personnelle.' },
  { key: 'catBudgetAssurance', icon: 'assurances', descriptionKey: 'Des informations et services pour mieux gérer le budget familial, les dépenses et les assurances.' },
]

// Correspondance clé "Je cherche..." -> clé technique dans articleCategories (articleData.ts)
export const searchCategoryToArticleKey: Record<string, string> = {
  catGrossesse: 'grossesse',
  catBebe: 'bebe',
  catPetiteEnfance: 'petite enfance',
  catEnfance: 'enfance',
  catAdolescence: 'adolescence',
  catScolarite: 'scolarite',
  catParents: 'parents',
  catVieDeFamille: 'vie familiale',
  catTravail: 'travail',
  catBudgetAssurance: 'budget et assurance',
}

// "Activités" — chaque item pointe vers /agenda filtré (categorie: 'activite', sousCategorie: ...)
export const activitesItems: MenuLink[] = [
  { key: 'actPleinAir', icon: 'activités physiques', descriptionKey: 'Des activités sportives et de plein air pour bouger, se divertir et profiter du temps en famille.' },
  { key: 'actCulturelles', icon: 'activités culturelles', descriptionKey: 'Découvrez des activités culturelles, artistiques et créatives pour petits et grands.' },
  { key: 'actAutres', icon: 'autres activités', descriptionKey: 'Une sélection d’autres activités et idées de loisirs adaptées aux familles.' },
]

// "Vacances enfants" — pointe vers /agenda filtré (categorie: 'campLogement' | 'campJour')
export const vacancesItems: MenuLink[] = [
  { key: 'vacCamps', icon: 'camps', descriptionKey: 'Des camps de vacances pour permettre aux enfants et aux jeunes de s’amuser, découvrir et faire de nouvelles expériences.' },
  { key: 'vacCampsDuJour', icon: 'camps du jour', descriptionKey: 'Des camps à la journée pour occuper les enfants pendant les vacances tout en leur offrant des activités variées.' },
]

// "Cours" — pointe vers /agenda filtré (categorie: 'cours', sousCategorie: ...)
export const coursItems: MenuLink[] = [
  { key: 'coursSoutien', icon: 'soutienScolaire', descriptionKey: 'Des cours et accompagnements pour aider les élèves à progresser, comprendre et réussir à l’école.' },
  { key: 'coursLangues', icon: 'cours de langue', descriptionKey: 'Des cours de langues pour apprendre, pratiquer et développer ses compétences linguistiques.' },
  { key: 'coursArt', icon: 'atelier d art', descriptionKey: 'Des ateliers artistiques pour développer la créativité et découvrir différentes formes d’expression.' },
  { key: 'coursSport', icon: 'seanceDeSport', descriptionKey: 'Des séances sportives adaptées aux enfants, aux jeunes et aux familles pour bouger et prendre plaisir à pratiquer.' },
  { key: 'coursNumeriques', icon: 'coursNumeriques', descriptionKey: 'Des cours pour découvrir les outils numériques, développer ses compétences et apprendre autrement.' },
]

/**
 * Construit la route Nuxt cible pour un item de menu donné, selon la section
 * ("search" -> /blog, "activites"/"vacances"/"cours" -> /agenda).
 * Utilisé par SiteHeader.vue (desktop + mobile) pour transformer les <a href="#">
 * en vrais liens filtrés.
 */
export function menuLinkTarget(
  section: 'search' | 'activites' | 'vacances' | 'cours',
  key: string,
): { path: string; query: Record<string, string> } {
  if (section === 'search') {
    return { path: '/article', query: { category: searchCategoryToArticleKey[key] ?? '' } }
  }
  if (section === 'activites') {
    const sousCategorie = key // 'actPleinAir' | 'actCulturelles' | 'actAutres'
    return { path: '/agenda', query: { categorie: 'activite', sousCategorie } }
  }
  if (section === 'vacances') {
    const categorie = key === 'vacCamps' ? 'campLogement' : 'campJour'
    return { path: '/agenda', query: { categorie } }
  }
  // "cours"
  return { path: '/agenda', query: { categorie: 'cours', sousCategorie: key } }
}