// Textes statiques de référence, en français, pour tout le site.
// Chaque clé est utilisée dans les composants via la fonction t('cléIci')
// fournie par useTranslation.ts. Les traductions EN/DE/IT sont générées
// (ou surchargées via translationGlossary.ts) à partir de ce fichier.
export const baseTexts: Record<string, string> = {
  // ---------- Header / navigation ----------
  navSearch: "Je cherche...", navActivites: "Activités", navVacances: "Vacances enfants",
  navCours: "Cours", navPartenaire: "Devenir Partenaire", login: "Login",

  // ---------- Menu "Je cherche..." ----------
  catGrossesse: "Grossesse", catBebe: "Bébé", catPetiteEnfance: "Petite enfance",
  catEnfance: "Enfance", catAdolescence: "Adolescence", catScolarite: "Scolarité",
  catParents: "Parents", catVieDeFamille: "Vie de famille", catTravail: "Travail",
  catBudgetAssurance: "Budget et assurance",

  // ---------- Menu "Activités" ----------
  actPleinAir: "Activités physiques", actCulturelles: "Activités culturelles", actAutres: "Autres activités",

  // ---------- Menu "Vacances enfants" ----------
  vacCamps: "Camps", vacCampsDuJour: "Camps du jour",

  // ---------- Menu "Cours" ----------
  coursSoutien: "Soutien scolaire", coursLangues: "Cours de langues", coursArt: "Ateliers d'art",
  coursSport: "Séances de sport", coursNumeriques: "Cours numériques",

  // ---------- Page d'accueil (hero, sélection, nouveautés, coups de cœur, newsletter, pied de page) ----------
  heroTitle1: "Centre Global d'informations", heroTitle2: "de la famille", heroTitle3: "suisse-alémanique",
  heroSubtitle: "Parce que les plus beaux moments ne se passent jamais à chercher.",
  ctaBonsPlans: "Découvrez nos bons plans", ctaPartenaires: "Découvrez nos partenaires",
  selectionTitle: "Notre Sélection de la semaine", enSavoirPlus: "En savoir plus",
  nouveautesTitle: "Nouveautés", voirPlus: "Voir plus",
  coupsDeCoeurTitle: "Nos Coups de cœur de la semaine",
  newsletterTitle: "Restez toujours informés de tout avec nous",
  newsletterSubtitle: "Inscrivez-vous à notre newsletter pour recevoir toutes les bonnes actualités.",
  emailPlaceholder: "Email", subscribe: "S'inscrire",
  mentionsLegales: "Mentions légales", rights: "Tous droits réservés",

  // ---------- Page Agenda ----------
  agendaTitle: "Notre agenda",
  agendaSubtitle: "Spectacles, loisirs et trocs pour les familles, partout en Suisse.",
  agendaFilterBtn: "Filtrer", agendaApply: "Voir les résultats", agendaReset: "Réinitialiser",
  agendaResultsSuffix: "résultat(s) trouvé(s)",
  agendaEmptyTitle: "Aucun résultat pour ces critères",
  agendaEmptyText: "Essayez d'élargir votre recherche en retirant un ou plusieurs filtres.",
  agendaCalendarClear: "Effacer", agendaCalendarToday: "Aujourd'hui",
  agendaSearchTitle: "Rechercher", agendaSearchDateFrom: "Du", agendaSearchDateTo: "Au",
  agendaFiltresTitle: "Filtres",

  // Libellés des sections de filtres (tiroir AgendaFilterDrawer.vue)
  filterRegion: "Région", filterRegionAll: "Toute la Suisse",
  filterAge: "Âge",
  filterActivites: "Activités",
  filterCamps: "Camps (avec logement)",
  filterCampsJour: "Camps de jour (sans logement)",
  filterCours: "Cours",
  filterLangues: "Langues", filterLoisirs: "Loisirs", filterSports: "Sports",
  filterEtudes: "Études", filterIT: "IT",
  filterClose: "Fermer",

  // Libellés des tranches d'âge
  ageBebe: "Bébé", agePetitEnfant: "Petit enfant", ageEnfant: "Enfant",
  ageAdolescent: "Adolescent", ageAdulte: "Adulte",

  // ---------- Page Partenaires ----------
  partnersTitle: "Nos partenaires",
  partnersSubtitle: "Découvrez les écoles, musées, associations et prestataires qui font vivre nos familles.",
  partnersFilterZone: "Zone", partnersZoneAll: "Toute la Suisse",
  partnersZoneSR: "Suisse romande", partnersZoneSA: "Suisse alémanique",
  partnersFilterCategory: "Catégorie", partnersCategoryAll: "Toutes",
  partnerCatEcole: "École", partnerCatMusee: "Musée", partnerCatAssociation: "Association",
  partnerCatGardeEnfants: "Garde d'enfants", partnerCatCabinet: "Cabinet", partnerCatExpert: "Expert",
  partnersResultsSuffix: "partenaire(s) trouvé(s)",
  partnersEmptyTitle: "Aucun partenaire pour ces critères",
  partnersEmptyText: "Essayez d'élargir votre recherche en retirant un ou plusieurs filtres.",
  visitSite: "Visiter le site", partnersReset: "Réinitialiser"
}