export interface MenuLink {
  key: string
  icon: string
  descriptionKey: string   // clé de traduction du texte affiché sous le titre de la page cible
}

// "Je cherche..." — chaque item pointe vers /blog filtré par catégorie d'article
export const searchCategories: MenuLink[] = [
  { key: 'catGrossesse', icon: 'grossesse', descriptionKey: 'catGrossesseDesc' },
  { key: 'catBebe', icon: 'bebe', descriptionKey: 'catBebeDesc' },
  { key: 'catPetiteEnfance', icon: 'petiteEnfance', descriptionKey: 'catPetiteEnfanceDesc' },
  { key: 'catEnfance', icon: 'enfance', descriptionKey: 'catEnfanceDesc' },
  { key: 'catAdolescence', icon: 'adolescence', descriptionKey: 'catAdolescenceDesc' },
  { key: 'catScolarite', icon: 'scolarite', descriptionKey: 'catScolariteDesc' },
  { key: 'catParents', icon: 'parents', descriptionKey: 'catParentsDesc' },
  { key: 'catVieDeFamille', icon: 'vieDeFamille', descriptionKey: 'catVieDeFamilleDesc' },
  { key: 'catTravail', icon: 'travail', descriptionKey: 'catTravailDesc' },
  { key: 'catBudgetAssurance', icon: 'assurances', descriptionKey: 'catBudgetAssuranceDesc' },
]

// Correspondance clé "Je cherche..." -> clé technique dans articleCategories (articleData.ts)
export const searchCategoryToArticleKey: Record<string, string> = {
  catGrossesse: 'grossesse',
  catBebe: 'bebe',
  catPetiteEnfance: 'petiteEnfance',
  catEnfance: 'enfance',
  catAdolescence: 'adolescence',
  catScolarite: 'scolarite',
  catParents: 'parents',
  catVieDeFamille: 'vieDeFamille',
  catTravail: 'travail',
  catBudgetAssurance: 'assurances',
}

// "Activités" — chaque item pointe vers /agenda filtré (categorie: 'activite', sousCategorie: ...)
export const activitesItems: MenuLink[] = [
  { key: 'actPleinAir', icon: 'activités physiques', descriptionKey: 'actPleinAirDesc' },
  { key: 'actCulturelles', icon: 'activités culturelles', descriptionKey: 'actCulturellesDesc' },
  { key: 'actAutres', icon: 'autres activités', descriptionKey: 'actAutresDesc' },
]

// "Vacances enfants" — pointe vers /agenda filtré (categorie: 'campLogement' | 'campJour')
export const vacancesItems: MenuLink[] = [
  { key: 'vacCamps', icon: 'camps', descriptionKey: 'vacCampsDesc' },
  { key: 'vacCampsDuJour', icon: 'camps du jour', descriptionKey: 'vacCampsDuJourDesc' },
]

// "Cours" — pointe vers /agenda filtré (categorie: 'cours', sousCategorie: ...)
export const coursItems: MenuLink[] = [
  { key: 'coursSoutien', icon: 'soutienScolaire', descriptionKey: 'coursSoutienDesc' },
  { key: 'coursLangues', icon: 'cours de langue', descriptionKey: 'coursLanguesDesc' },
  { key: 'coursArt', icon: 'atelier d art', descriptionKey: 'coursArtDesc' },
  { key: 'coursSport', icon: 'seanceDeSport', descriptionKey: 'coursSportDesc'},
  { key: 'coursNumeriques', icon: 'coursNumeriques', descriptionKey: 'coursNumeriquesDesc' },
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